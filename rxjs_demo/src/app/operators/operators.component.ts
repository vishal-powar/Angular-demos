import { CommonModule } from '@angular/common';
import { Component, DestroyRef, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  concatMap,
  exhaustMap,
  forkJoin,
  from,
  map,
  mergeMap,
  switchMap,
  tap,
  finalize,
  debounceTime,
  throttleTime,
  shareReplay,
  catchError,
  distinctUntilChanged,
  interval,
  of,
  takeUntil
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MockApiService } from '../services/mock-api.service';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.scss'
})
export class OperatorsComponent {
  private readonly api = inject(MockApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly forkJoinLogs = signal<string[]>([]);
  readonly switchMapLogs = signal<string[]>([]);
  readonly concatMapLogs = signal<string[]>([]);
  readonly mergeMapLogs = signal<string[]>([]);
  readonly combineLatestLogs = signal<string[]>([]);
  readonly exhaustMapLogs = signal<string[]>([]);
  readonly debounceLogs = signal<string[]>([]);
  readonly throttleLogs = signal<string[]>([]);
  readonly shareReplayLogs = signal<string[]>([]);
  readonly catchErrorLogs = signal<string[]>([]);
  readonly distinctLogs = signal<string[]>([]);
  readonly takeUntilLogs = signal<string[]>([]);

  readonly term$ = new BehaviorSubject<string>('laptop');
  readonly category$ = new BehaviorSubject<string>('all');

  private readonly switchUserId$ = new Subject<number>();
  private readonly saveTask$ = new Subject<string>();
  private readonly loginClick$ = new Subject<void>();
  private readonly debounceInput$ = new Subject<string>();
  private readonly throttleClick$ = new Subject<void>();
  private readonly shareReplayTrigger$ = new Subject<void>();
  private readonly distinctInput$ = new Subject<string>();
  private readonly stopTakeUntil$ = new Subject<void>();

  readonly categories = ['all', 'office', 'tech', 'lifestyle'];
  termValue = this.term$.value;
  categoryValue = this.category$.value;

  constructor() {
    combineLatest([this.term$, this.category$])
      .pipe(
        map(([term, category]) => `Searching "${term}" in ${category}`),
        tap((message) => this.pushLog(this.combineLatestLogs, message)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.switchUserId$
      .pipe(
        tap((id) => this.pushLog(this.switchMapLogs, `User selected: ${id}`)),
        switchMap((id) =>
          this.api.getUser(id).pipe(
            switchMap((user) =>
              this.api.getOrdersForUser(user.id).pipe(
                map((orders) => ({
                  user,
                  orders
                }))
              )
            ),
            tap((payload) =>
              this.pushLog(
                this.switchMapLogs,
                `Loaded ${payload.orders.length} orders for ${payload.user.name}`
              )
            ),
            finalize(() =>
              this.pushLog(this.switchMapLogs, `Request finalized for user ${id}`)
            )
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.saveTask$
      .pipe(
        concatMap((title) =>
          this.api.saveTask(title).pipe(
            tap((task) =>
              this.pushLog(this.concatMapLogs, `Saved task: ${task.title}`)
            )
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.loginClick$
      .pipe(
        exhaustMap(() =>
          this.api.login().pipe(
            tap((result) =>
              this.pushLog(
                this.exhaustMapLogs,
                `Login success: ${result.at}`
              )
            )
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.debounceInput$
      .pipe(
        debounceTime(500),
        tap((value) =>
          this.pushLog(this.debounceLogs, `Debounced value: ${value}`)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.throttleClick$
      .pipe(
        throttleTime(1000),
        tap(() =>
          this.pushLog(this.throttleLogs, 'Accepted click (throttled)')
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.shareReplayTrigger$
      .pipe(
        switchMap(() =>
          this.api.getStats().pipe(
            shareReplay({ bufferSize: 1, refCount: true }),
            tap((stats) =>
              this.pushLog(
                this.shareReplayLogs,
                `Fetched stats: ${stats.active} active`
              )
            )
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    this.distinctInput$
      .pipe(
        distinctUntilChanged(),
        tap((value) =>
          this.pushLog(this.distinctLogs, `Distinct value: ${value}`)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  runForkJoin(): void {
    forkJoin({
      user: this.api.getUser(1),
      orders: this.api.getOrdersForUser(1),
      stats: this.api.getStats()
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.pushLog(
          this.forkJoinLogs,
          `User: ${result.user.name}, Orders: ${result.orders.length}, Active: ${result.stats.active}`
        );
      });
  }

  runSwitchMapDemo(): void {
    [1, 2, 3].forEach((id, index) => {
      setTimeout(() => this.switchUserId$.next(id), index * 250);
    });
  }

  queueTasks(): void {
    ['Draft email', 'Review PR', 'Sync meeting'].forEach((title) =>
      this.saveTask$.next(title)
    );
  }

  runMergeMap(): void {
    this.pushLog(this.mergeMapLogs, 'Running parallel order fetch...');
    from([101, 102, 103, 104])
      .pipe(
        mergeMap((orderId) =>
          this.api.getOrder(orderId).pipe(
            tap((order) =>
              this.pushLog(
                this.mergeMapLogs,
                `Order ${order.id} ${order.status}`
              )
            )
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  updateTerm(value: string): void {
    this.termValue = value;
    this.term$.next(value.trim() || 'all');
  }

  updateCategory(value: string): void {
    this.categoryValue = value;
    this.category$.next(value);
  }

  triggerLogin(): void {
    this.pushLog(this.exhaustMapLogs, 'Login clicked');
    this.loginClick$.next();
  }

  updateDebounce(value: string): void {
    this.debounceInput$.next(value);
  }

  triggerThrottle(): void {
    this.throttleClick$.next();
  }

  runShareReplay(): void {
    this.pushLog(this.shareReplayLogs, 'Triggering shared request');
    this.shareReplayTrigger$.next();
  }

  runCatchError(): void {
    this.api
      .getFailingCall()
      .pipe(
        catchError((error) => {
          this.pushLog(this.catchErrorLogs, `Caught error: ${error.message}`);
          return of({ recovered: true });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((result) => {
        this.pushLog(
          this.catchErrorLogs,
          `Fallback result: ${JSON.stringify(result)}`
        );
      });
  }

  updateDistinct(value: string): void {
    this.distinctInput$.next(value);
  }

  startTakeUntil(): void {
    this.pushLog(this.takeUntilLogs, 'Start interval');
    interval(500)
      .pipe(
        tap((tick) => this.pushLog(this.takeUntilLogs, `Tick ${tick}`)),
        takeUntil(this.stopTakeUntil$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  stopTakeUntil(): void {
    this.pushLog(this.takeUntilLogs, 'Stop signal emitted');
    this.stopTakeUntil$.next();
  }

  private pushLog(target: WritableSignal<string[]>, message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    target.update((logs) => [`${timestamp} • ${message}`, ...logs].slice(0, 8));
  }
}
