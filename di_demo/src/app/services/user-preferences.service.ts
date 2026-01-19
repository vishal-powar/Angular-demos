import { Injectable, inject } from '@angular/core';
import { LOCAL_STORAGE } from '../tokens';

@Injectable({ providedIn: 'root' })
export class UserPreferencesService {
  private readonly storage = inject(LOCAL_STORAGE, { optional: true });
  private readonly memory = new Map<string, string>();

  get storageType(): string {
    return this.storage ? 'localStorage' : 'in-memory';
  }

  get(key: string): string | null {
    if (this.storage) {
      return this.storage.getItem(key);
    }
    return this.memory.get(key) ?? null;
  }

  set(key: string, value: string): void {
    if (this.storage) {
      this.storage.setItem(key, value);
      return;
    }
    this.memory.set(key, value);
  }
}
