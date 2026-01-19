# RouterDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

## Router Demo - Interview Notes

This project is a compact showcase of Angular Router features, designed to be
explained quickly in interviews. It is built with standalone components and
lazy-loaded route trees.

### What This Demo Covers
- Lazy loading with `loadChildren` for feature areas.
- Guards: class-based (`canActivate`, `canActivateChild`) and functional guards.
- Resolver usage to preload data before navigation.
- `canDeactivate` flow for unsaved form changes.
- `canMatch` to block lazy routes before loading.
- `loadComponent` for standalone route-level components.
- Route titles, redirects, wildcard routes, and preloading.

### Route Map (High-Level)
- `/home` - landing page with links to features.
- `/about` - resolver demo (data fetched before activation).
- `/users` - lazy-loaded users area with auth guard + resolver + deactivation.
- `/admin` - lazy-loaded admin area with `canMatch`, functional guard,
  and child guard.
- `/legacy` - `loadComponent` example.
- `/login` - mock login to flip auth state.
- `**` - fallback 404 page.

### Implementation Walkthrough (Interview Style)

#### 1) Router Configuration
The main route table lives in `src/app/app.routes.ts`. It shows:
- Redirect to `/home`.
- `title` usage for route titles.
- `resolve` on `/about` to demonstrate resolvers.
- Lazy routes for `/users` and `/admin`.
- `loadComponent` for `/legacy`.
- Wildcard route for 404.

#### 2) Router Providers
`src/app/app.config.ts` configures:
- `withPreloading(PreloadAllModules)` for eager preloading after initial load.
- `withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })`.
- `withComponentInputBinding()` for future input binding support.

#### 3) Auth + Guards
`src/app/core/auth.service.ts` is a minimal auth state provider. It exposes
signals for role and login status.

Guards are split across:
- `AuthGuard` (class-based) in `src/app/core/auth.guard.ts`.
- `AdminChildGuard` (class-based) in `src/app/core/admin-child.guard.ts`.
- Functional guards in `src/app/core/guards.ts`:
  - `authGuardFn` (`canActivate`)
  - `adminMatchGuard` (`canMatch`)
  - `pendingChangesGuard` (`canDeactivate`)

#### 4) Resolver Flow
`src/app/core/about.resolver.ts` returns `AboutInfo` with a short delay to show
the resolver waiting. `AboutComponent` reads data from `route.data`.

`src/app/features/users/user.resolver.ts` resolves a specific user by id. If
missing, it navigates back to `/users`.

#### 5) Lazy-Loaded Feature Areas
- `Users` feature: `src/app/features/users/users.routes.ts`
  - List route
  - Detail route (resolver)
  - Edit route (resolver + `canDeactivate`)
- `Admin` feature: `src/app/features/admin/admin.routes.ts`
  - Child routes guarded with `canActivateChild`

#### 6) Deactivation Guard
`UserEditComponent` implements `CanComponentDeactivate` and exposes
`hasUnsavedChanges()` so the guard can block navigation.

#### 7) Template Shell
`src/app/app.html` provides the navigation and auth controls to drive guard
behavior during the demo. This gives a clear, interactive way to show how
route protection works.

### Talking Points (Quick Interview Summary)
- "I used lazy-loaded route trees for `/users` and `/admin` to keep initial
  bundles small."
- "I demonstrated both class-based and functional guards, including `canMatch`
  to prevent loading the admin bundle for unauthorized users."
- "I used resolvers to prefetch data and show how components can rely on
  `route.data`."
- "I added a `canDeactivate` guard to simulate unsaved form protection."
- "I configured router providers for preloading and scroll restoration."

### Quick Start
```bash
cd router_demo
npm start
```