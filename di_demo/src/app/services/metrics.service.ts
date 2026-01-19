import { Injectable, inject } from '@angular/core';
import { APP_LOGGER, AppLogger } from '../tokens';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private readonly logger = inject<AppLogger>(APP_LOGGER);

  track(eventName: string, data: Record<string, unknown> = {}): void {
    const payload = Object.keys(data).length ? ` ${JSON.stringify(data)}` : '';
    this.logger.log(`Metric: ${eventName}${payload}`);
  }
}
