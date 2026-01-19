# RxjsDemo

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

## RxJS Operators Demo

This project shows common RxJS operators with mock API calls and easy-to-follow
logs. It is designed for interview prep and concept clarity.

### Routes
- `/home` - overview.
- `/operators` - interactive operator demos.

### Operators Included
- `forkJoin` - wait for all requests to complete and emit once.
- `switchMap` - cancel previous request and keep the latest.
- `concatMap` - queue requests sequentially.
- `mergeMap` - run requests in parallel.
- `combineLatest` - react to latest values from multiple streams.
- `exhaustMap` - ignore new triggers until current completes.
- `debounceTime` - emit only after a pause in input.
- `throttleTime` - emit at most once per time window.
- `shareReplay` - share and replay the latest value to new subscribers.
- `catchError` - handle errors and recover with fallback values.
- `distinctUntilChanged` - suppress consecutive duplicates.
- `takeUntil` - complete a stream when a notifier emits.

### How the Demo Is Implemented
- `MockApiService` simulates delayed API responses.
- `OperatorsComponent` triggers each operator flow and logs results.
- Logs are capped and time-stamped to make ordering clear.

### Diagrams + Explanation

#### forkJoin
Use it when you need multiple independent requests and want to render only when
all complete (e.g., dashboard widgets).
```
API A ----\ 
API B -----+--> forkJoin --> single combined result
API C ----/
```

#### switchMap
Best for autocomplete/search. Each new input cancels the previous request so
only the latest result matters.
```
User clicks: 1 --2 --3
switchMap keeps only the latest
Request 1 canceled, Request 2 canceled, Request 3 completes
```

#### concatMap
Best for ordered queues (saving items one-by-one). It waits for each inner
observable to finish before starting the next.
```
Input: A -> B -> C
concatMap: A completes -> B completes -> C completes
```

#### mergeMap
Best for parallel work (batch requests). Outputs as each inner completes.
```
Input: A -> B -> C
mergeMap: A, B, C run in parallel and emit as they finish
```

#### combineLatest
Great for UI filters: it emits whenever any input changes (after both emitted).
```
Term:   laptop ---- phone ----
Filter: all ------ tech ------
combineLatest emits when either changes (after both emitted once)
```

#### exhaustMap
Best for login/submit buttons. It ignores clicks while a request is running.
```
Click: 1 --2 --3
exhaustMap runs first, ignores 2/3 until done
```

#### debounceTime
Waits for silence before emitting. Great for typeahead inputs to avoid
spamming the API.
```
Input: a-b-c----d|
Out:        ----c---d|
```

#### throttleTime
Emits the first value and then ignores until the window ends. Useful for
scroll or resize events.
```
Click: a-b-c-d-e|
Out:   a---c---e|
```

#### shareReplay
Shares a single request across subscribers and replays the last value.
```
Source: ---x|
Sub1:   ---x|
Sub2:      x| (replayed)
```

#### catchError
Handles errors and returns a fallback observable.
```
Source: --x--#
Out:    --x--(fallback)|
```

#### distinctUntilChanged
Emits only when the value changes from the previous one.
```
Input: a-a-b-b-c|
Out:   a---b---c|
```

#### takeUntil
Stops a stream when a notifier emits.
```
Source: 0-1-2-3-4-5-6|
Stop:         s|
Out:    0-1-2-3|
```

### Marble Testing Reference
The RxJS marble testing guide is useful when you want to test operator logic
using time diagrams.
https://rxjs.dev/guide/testing/marble-testing

### Quick Start
```bash
cd rxjs_demo
npm start
```