# di_demo - Dependency Injection Showcase

This Angular demo app focuses on **Dependency Injection (DI)** patterns, mock APIs,
and HTTP interceptors. It is intentionally small but feature-rich so each DI
variation is easy to see in action.

## What this demo covers

- **Constructor injection** in components and services.
- **`inject()` usage** inside services and interceptors.
- **Provider variations**:
  - `useValue` for configuration tokens
  - `useFactory` for computed config
  - `useExisting` to alias providers
  - `useClass` for component-level overrides
  - `Optional` dependency with fallback storage
- **Hierarchical DI** with a component providing its own logger and still
  retrieving the parent logger using `skipSelf`.
- **Mock APIs** served entirely via interceptors (no backend required).
- **Multiple interceptors** executed in a defined order.

## Key files to review

- `src/app/app.config.ts` - app-level providers and interceptors.
- `src/app/tokens.ts` - injection tokens and typed config.
- `src/app/services/` - constructor vs `inject()` usage.
- `src/app/interceptors/` - auth header, timing, and mock API interceptors.
- `src/app/components/feature-area/` - component-level provider override.
- `src/app/components/logger-panel/` - logger UI and DI usage.

## Mock API behavior

The `MockApiInterceptor` responds to:

- `GET /api/tasks` → returns `mockTasks`
- `GET /api/profile` → returns `mockProfile`

The interceptor is enabled by `FEATURE_FLAGS.useMockApi`.

## Interceptor order

Interceptors are registered in this order (see `app.config.ts`):

1. `AuthHeaderInterceptor`
2. `TimingInterceptor`
3. `MockApiInterceptor`

This lets you see headers applied, timing logs written, and mock responses
returned in one flow.

## Run the app

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Suggested demo flow

1. Click **Load tasks** to trigger the mock API + interceptors.
2. Click **Record audit** and **Track metric** to see constructor vs `inject()`.
3. Click **Save preference** to see the optional `LOCAL_STORAGE` provider.
4. Scroll to the **Component-level Provider Override** section to see
   `useClass` + `skipSelf` in action.
