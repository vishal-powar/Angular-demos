import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, of } from 'rxjs';
import { FEATURE_FLAGS, FeatureFlags } from '../tokens';
import { mockProfile, mockTasks } from '../mock-data';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const flags = inject<FeatureFlags>(FEATURE_FLAGS);

  if (!flags.useMockApi || !req.url.includes('/api/')) {
    return next(req);
  }

  if (req.method === 'GET' && req.url.endsWith('/tasks')) {
    return of(
      new HttpResponse({
        status: 200,
        body: mockTasks
      })
    ).pipe(delay(350));
  }

  if (req.method === 'GET' && req.url.endsWith('/profile')) {
    return of(
      new HttpResponse({
        status: 200,
        body: mockProfile
      })
    ).pipe(delay(200));
  }

  return next(req);
};
