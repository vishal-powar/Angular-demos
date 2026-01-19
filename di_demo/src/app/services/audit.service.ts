import { Inject, Injectable } from '@angular/core';
import { APP_LOGGER, AppLogger } from '../tokens';

@Injectable({ providedIn: 'root' })
export class AuditService {
  constructor(@Inject(APP_LOGGER) private readonly logger: AppLogger) {}

  record(action: string): void {
    this.logger.log(`Audit: ${action}`);
  }
}
