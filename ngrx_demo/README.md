# NgrxDemo

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

## NgRx Demo Overview

This project demonstrates core NgRx concepts in two areas:
- Tasks store (actions, reducer, selectors, effects).
- Books feature area using NgRx Entity.

### What is NgRx?
NgRx is a state management library for Angular built on Redux patterns and RxJS.
It centralizes application state in a store and uses:
- **Actions** to describe events.
- **Reducers** to update state immutably.
- **Selectors** to read and compute derived state.
- **Effects** to handle side effects like API calls.

### Routes
- `/home` - overview of the demo.
- `/tasks` - NgRx core workflow with effects.
- `/books` - lazy-loaded entity module.

### Core NgRx Workflow (Tasks)
- Files: `src/app/tasks/store/*`.
- Actions drive load/add/toggle flows.
- Reducer stores tasks, loading, and error state.
- Selectors compute remaining/completed counts.
- Effects simulate async APIs via `TasksApiService`.
- Store wiring in `src/app/app.config.ts` using `provideStore` and `provideEffects`.

#### Tasks Walkthrough (Interview Style)
1) **Component dispatches actions** from `TasksPageComponent` (`loadTasks`, `addTask`, `toggleTask`, `clearCompleted`).
2) **Effects listen** for `loadTask/addTask/toggleTask`, call `TasksApiService`, and emit success/failure actions.
3) **Reducer updates state** (`items`, `loading`, `error`) on success/failure.
4) **Selectors compute derived data** (remaining/completed counts) for UI rendering.

#### Tasks Flow Diagram
```
Component UI
   | dispatch(action)
   v
Actions ---> Effects ---> API Service
   |             |            |
   |         success/fail <---+
   v
Reducer ---> Store State ---> Selectors ---> UI
```

### NgRx Entity Feature (Books)
- Files: `src/app/books/*`.
- Lazy-loaded route providers register feature state and effects.
- Entity adapter manages normalized book state.
- Effects simulate CRUD-style workflows.

#### Books Entity Walkthrough (Interview Style)
1) **Route providers register feature state** in `books.routes.ts` with `provideState` and `provideEffects`.
2) **Effects call `BooksApiService`** for load/add/toggle and emit success/failure.
3) **Entity adapter updates normalized state** (`ids`, `entities`) in `books.reducer.ts`.
4) **Selectors read entity state** (all books, totals, available count) for the UI.

#### Books Entity Diagram
```
Feature Route (Books)
   | provideState + provideEffects
   v
Books Feature Store
   | actions
   v
Effects ---> BooksApiService
   | success/fail
   v
Entity Reducer (ids + entities)
   v
Entity Selectors ---> UI
```

### How It's Implemented Here
- Root store is registered in `src/app/app.config.ts`.
- Tasks use a classic store slice with selectors and effects.
- Books use NgRx Entity with `createEntityAdapter` for normalized state.
- Books feature state is registered lazily in `src/app/books/books.routes.ts`.

### Quick Start
```bash
cd ngrx_demo
npm start
```