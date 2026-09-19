import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./customers/customers.component').then(m => m.CustomersComponent)
  },
  {
    path: 'summary',
    loadComponent: () => import('./customer-summary/customer-summary.component').then(m => m.CustomerSummaryComponent)
  },
  {
    path: 'customer',
    loadComponent: () => import('./customers/customers.component').then(m => m.CustomersComponent)
  },
  {
    path: 'customer/summary',
    loadComponent: () => import('./customer-summary/customer-summary.component').then(m => m.CustomerSummaryComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./customers/customers.component').then(m => m.CustomersComponent)
  }
];
