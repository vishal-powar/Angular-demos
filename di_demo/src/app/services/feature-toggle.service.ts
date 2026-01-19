import { Injectable, inject } from '@angular/core';
import { FEATURE_FLAGS, FeatureFlags } from '../tokens';

@Injectable({ providedIn: 'root' })
export class FeatureToggleService {
  private readonly flags = inject<FeatureFlags>(FEATURE_FLAGS);

  get snapshot(): FeatureFlags {
    return { ...this.flags };
  }
}
