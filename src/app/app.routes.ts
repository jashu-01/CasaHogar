import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },

  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      { path: 'home', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },
      { path: 'noticias', loadComponent: () => import('./pages/noticias/noticias.page').then(m => m.NoticiasPage) },
      { path: 'donar', loadComponent: () => import('./pages/donar/donar.page').then(m => m.DonarPage) },
      { path: 'actividades', loadComponent: () => import('./pages/actividades/actividades.page').then(m => m.ActividadesPage) },
      { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage) },
      { path: 'actividades',loadComponent: () => import('./pages/actividades/actividades.page').then( m => m.ActividadesPage)}
    ]
  }
];
