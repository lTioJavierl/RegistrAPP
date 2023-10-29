import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'contra',
    loadChildren: () => import('./paginas/contra/contra.module').then( m => m.ContraPageModule)
  },
  {
    path: 'home_alumnos',
    loadChildren: () => import('./paginas/home_alumnos/home_alumnos.module').then( m => m.HomePageModule)
  },
  {
    path: 'home_profesor',
    loadChildren: () => import('./paginas/home_profesor/home_profesor.module').then( m => m.HomeProfesorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
