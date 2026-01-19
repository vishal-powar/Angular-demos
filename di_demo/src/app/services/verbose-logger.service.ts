import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class VerboseLoggerService extends LoggerService {
  override log(message: string): void {
    super.log(`(feature) ${message}`);
  }
}
