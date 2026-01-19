import { Injectable, signal } from '@angular/core';
import { AppLogger } from '../tokens';

@Injectable({ providedIn: 'root' })
export class LoggerService implements AppLogger {
  readonly entries = signal<string[]>([]);

  log(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.entries.update((entries) => [...entries, `[${timestamp}] ${message}`]);
  }

  clear(): void {
    this.entries.set([]);
  }
}
