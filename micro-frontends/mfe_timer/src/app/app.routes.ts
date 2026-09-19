import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./timer/timer.component').then(m => m.TimerComponent)
  },
  {
    path: 'timer',
    loadComponent: () => import('./timer/timer.component').then(m => m.TimerComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./timer/timer.component').then(m => m.TimerComponent)
  }
];
