import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enableProdMode, importProvidersFrom } from '@angular/core';

import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { register } from 'swiper/element/bundle';
register();

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app/home/home.component').then(mod => mod.HomeComponent)
  },
];

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule)
  ],
})
  .catch((err) => console.error(err));

