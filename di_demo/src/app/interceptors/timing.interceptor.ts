import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoggerService } from '../services/logger.service';

export const timingInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService);
  const start = Date.now();

  return next(req).pipe(
    finalize(() => {
      const duration = Date.now() - start;
      logger.log(`HTTP ${req.method} ${req.url} (${duration}ms)`);
    })
  );
};
