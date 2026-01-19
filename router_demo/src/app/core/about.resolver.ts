import { ResolveFn } from '@angular/router';
import { delay, of } from 'rxjs';

export interface AboutInfo {
  title: string;
  description: string;
  features: string[];
}

export const aboutResolver: ResolveFn<AboutInfo> = () =>
  of({
    title: 'Angular Router Demo',
    description:
      'This page uses a resolver to fetch data before the component is activated.',
    features: ['Resolvers', 'Route data', 'Title', 'Lazy loading']
  }).pipe(delay(300));
