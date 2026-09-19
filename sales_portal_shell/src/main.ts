import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeWebFragments } from 'web-fragments';

// Initialize the Web Fragments library
initializeWebFragments();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

