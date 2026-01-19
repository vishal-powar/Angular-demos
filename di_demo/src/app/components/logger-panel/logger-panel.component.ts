import { Component, Input, inject } from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-logger-panel',
  templateUrl: './logger-panel.component.html',
  styleUrl: './logger-panel.component.scss'
})
export class LoggerPanelComponent {
  private readonly injectedLogger = inject(LoggerService);

  @Input() title = 'Logger';
  @Input() logger?: LoggerService;

  get activeLogger(): LoggerService {
    return this.logger ?? this.injectedLogger;
  }

  clear(): void {
    this.activeLogger.clear();
  }
}
