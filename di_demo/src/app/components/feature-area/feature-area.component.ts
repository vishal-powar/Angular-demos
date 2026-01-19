import { Component, inject } from '@angular/core';
import { LoggerPanelComponent } from '../logger-panel/logger-panel.component';
import { LoggerService } from '../../services/logger.service';
import { VerboseLoggerService } from '../../services/verbose-logger.service';

@Component({
  selector: 'app-feature-area',
  imports: [LoggerPanelComponent],
  templateUrl: './feature-area.component.html',
  styleUrl: './feature-area.component.scss',
  providers: [
    {
      provide: LoggerService,
      useClass: VerboseLoggerService
    }
  ]
})
export class FeatureAreaComponent {
  private readonly featureLogger = inject(LoggerService);
  readonly parentLogger = inject(LoggerService, { skipSelf: true, optional: true });

  logFeature(): void {
    this.featureLogger.log('Feature area action logged with useClass.');
  }

  logParent(): void {
    this.parentLogger?.log('Feature area asked parent to log.');
  }
}
