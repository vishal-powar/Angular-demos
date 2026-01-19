import { Component, computed, inject, signal } from '@angular/core';
import { LoggerPanelComponent } from './components/logger-panel/logger-panel.component';
import { FeatureAreaComponent } from './components/feature-area/feature-area.component';
import { TaskApiService, TaskItem } from './services/task-api.service';
import { AuditService } from './services/audit.service';
import { MetricsService } from './services/metrics.service';
import { UserPreferencesService } from './services/user-preferences.service';
import { FeatureToggleService } from './services/feature-toggle.service';
import { APP_CONFIG, APP_NAME } from './tokens';

@Component({
  selector: 'app-root',
  imports: [LoggerPanelComponent, FeatureAreaComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly appConfig = inject(APP_CONFIG);
  private readonly metrics = inject(MetricsService);
  private readonly featureToggles = inject(FeatureToggleService);

  readonly appName = inject(APP_NAME);
  readonly configItems = computed(() => [
    { label: 'App name', value: this.appConfig.appName },
    { label: 'API base URL', value: this.appConfig.apiBaseUrl },
    { label: 'Build time', value: this.appConfig.buildTime }
  ]);
  readonly featureFlags = this.featureToggles.snapshot;

  readonly tasks = signal<TaskItem[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(
    private readonly taskApi: TaskApiService,
    private readonly audit: AuditService,
    private readonly preferences: UserPreferencesService
  ) {}

  loadTasks(): void {
    this.loading.set(true);
    this.error.set(null);
    this.audit.record('User requested tasks');

    this.taskApi.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.metrics.track('tasks_loaded', { count: tasks.length });
      },
      error: () => {
        this.error.set('Unable to load tasks from the mock API.');
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  recordAudit(): void {
    this.audit.record('Audit button clicked');
  }

  recordMetric(): void {
    this.metrics.track('metric_button_clicked', { source: 'app' });
  }

  savePreference(): void {
    this.preferences.set('theme', 'violet');
    this.audit.record(`Preference saved using ${this.preferences.storageType}`);
  }

  get storageType(): string {
    return this.preferences.storageType;
  }
}
