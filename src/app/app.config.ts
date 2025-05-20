import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SessionService} from './services/session/session.service';
import {AssetService} from './services/asset/asset.service';

function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './locale/', '.json');
}

function initializeApp() {
  const sessionService = inject(SessionService)
  const assetService = inject(AssetService)

  return new Promise((resolve) => {sessionService.init().then(() => {resolve(true)})})
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })),
    provideAppInitializer(initializeApp)
  ]
};
