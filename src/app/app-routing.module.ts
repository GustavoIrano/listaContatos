import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './pages/menu/menu.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: '', 
    component: MenuPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      { 
        path: 'contact-add',
        loadChildren: ()=> import('./pages/contact-add/contact-add.module').then(m => m.ContactAddPageModule) 
      },
      { 
        path: 'contact-edit/:id', 
        loadChildren: ()=> import('./pages/contact-edit/contact-edit.module').then(m => m.ContactEditPageModule)  
      }
    ] },   
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
