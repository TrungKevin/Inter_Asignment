import {Routes} from '@angular/router';
import { authGuard, adminGuard, adminOrUserGuard } from '../auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('../register/register').then(m => m.Register)
  },
  
  // (removed) reset-password route
  
  {
    path: 'home',
    loadComponent: () => import('../home/home').then(m => m.Home),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('../profile/profile').then(m => m.Profile),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('../admin/admin-panel').then(m => m.AdminPanel),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'access-requests/create',
    loadComponent: () => import('../access-request/create-request/create-request').then(m => m.CreateAccessRequest),
    canActivate: [authGuard]
  },
  {
    path: 'access-requests/mine',
    loadComponent: () => import('../access-request/my-request/my-requests').then(m => m.MyAccessRequests),
    canActivate: [authGuard]
  },
  {
    path: 'camunda/tasks',
    loadComponent: () => import('../access-request/pending-task/pending-tasks').then(m => m.PendingAccessTasks),
    canActivate: [authGuard, adminOrUserGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
