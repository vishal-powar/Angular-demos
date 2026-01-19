# LifecycleDemo

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

## Angular Lifecycle Demo

This project demonstrates Angular lifecycle hooks, content projection, and a
separate documentation tab that explains core app files and bootstrapping.

### Routes
- `/lifecycle` - lifecycle hook playground + content projection demo.
- `/docs` - app anatomy, bootstrap flow, and diagrams.

### Lifecycle Hooks Covered
The demo logs the following hooks in both parent and child components:
- `constructor`
- `ngOnChanges`
- `ngOnInit`
- `ngDoCheck`
- `ngAfterContentInit`
- `ngAfterContentChecked`
- `ngAfterViewInit`
- `ngAfterViewChecked`
- `ngOnDestroy`

### Content Projection
The projection demo uses named slots with `ng-content`:
- Header slot: `select="[slot='header']"`
- Body slot: default `ng-content`
- Footer slot: `select="[slot='footer']"`

### App Anatomy (Docs Tab)
The docs page outlines the most important files:
- `package.json` - dependencies and scripts
- `angular.json` - build and serve configuration
- `src/main.ts` - application bootstrap entry
- `src/app/app.config.ts` - providers (router, HTTP, etc.)
- `src/app/app.routes.ts` - route definitions
- `src/app/app.html` - root app shell
- `src/styles.scss` - global styles

### Lifecycle Flow Diagram
```
constructor
  -> ngOnChanges (inputs)
  -> ngOnInit
  -> ngDoCheck
  -> ngAfterContentInit / Checked
  -> ngAfterViewInit / Checked
  -> ngOnDestroy
```

### Bootstrap Flow Diagram
```
main.ts
  -> bootstrapApplication(App, appConfig)
    -> providers from app.config.ts
    -> router reads app.routes.ts
    -> renders app.html
```

### Quick Start
```bash
cd lifecycle_demo
npm start
```