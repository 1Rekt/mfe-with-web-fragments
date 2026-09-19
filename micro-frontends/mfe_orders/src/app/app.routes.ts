import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent)
  },
  {
    path: 'summary',
    loadComponent: () => import('./order-summary/order-summary.component').then(m => m.OrderSummaryComponent)
  },
  {
    path: 'order',
    loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent)
  },
  {
    path: 'order/summary',
    loadComponent: () => import('./order-summary/order-summary.component').then(m => m.OrderSummaryComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent)
  }
];
