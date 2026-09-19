import { ApplicationConfig, inject, PLATFORM_ID, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { MicroFrontendService } from './services/micro-frontend.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      if (!isPlatformBrowser(platformId)) {
        return;
      }

      return inject(MicroFrontendService).preloadMicroFrontendConfig();
    })
  ]
};

