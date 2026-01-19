import { InjectionToken } from '@angular/core';

export interface AppLogger {
  log(message: string): void;
}

export interface FeatureFlags {
  useMockApi: boolean;
  showDiagnostics: boolean;
}

export interface AppConfig {
  appName: string;
  apiBaseUrl: string;
  buildTime: string;
}

export const APP_NAME = new InjectionToken<string>('APP_NAME');
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const FEATURE_FLAGS = new InjectionToken<FeatureFlags>('FEATURE_FLAGS');
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
export const APP_LOGGER = new InjectionToken<AppLogger>('APP_LOGGER');
export const LOCAL_STORAGE = new InjectionToken<Storage>('LOCAL_STORAGE');
