import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import {
  API_BASE_URL,
  APP_CONFIG,
  APP_LOGGER,
  APP_NAME,
  FEATURE_FLAGS,
  LOCAL_STORAGE
} from './tokens';
import { LoggerService } from './services/logger.service';
import { authHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { timingInterceptor } from './interceptors/timing.interceptor';
import { mockApiInterceptor } from './interceptors/mock-api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authHeaderInterceptor, timingInterceptor, mockApiInterceptor])),
    {
      provide: APP_NAME,
      useValue: 'DI Demo'
    },
    {
      provide: API_BASE_URL,
      useValue: '/api'
    },
    {
      provide: FEATURE_FLAGS,
      useValue: {
        useMockApi: true,
        showDiagnostics: true
      }
    },
    {
      provide: APP_CONFIG,
      useFactory: () => {
        const appName = inject(APP_NAME);
        const apiBaseUrl = inject(API_BASE_URL);
        return {
          appName,
          apiBaseUrl,
          buildTime: new Date().toLocaleString()
        };
      }
    },
    {
      provide: LOCAL_STORAGE,
      useFactory: () => (typeof window === 'undefined' ? undefined : window.localStorage)
    },
    {
      provide: APP_LOGGER,
      useExisting: LoggerService
    }
  ]
};
