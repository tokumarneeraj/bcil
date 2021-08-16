import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BcilComponent } from './bcil/bcil.component';
import { ForgetpasswordComponent } from './bcil/forgetpassword/forgetpassword.component';
import { LoginComponent } from './bcil/login/login.component';
import { NotFoundComponent } from './bcil/not-found/not-found.component';
import { ResetpasswordComponent } from './bcil/resetpassword/resetpassword.component';

import { AuthGuard } from './services/auth-guard.service';



const routes: Routes = [
   { path: '',canActivate: [AuthGuard],redirectTo: 'bcil/bcil-dashboard', pathMatch: 'full'},
  {path:"Login",component:LoginComponent},
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent,
   
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
  
  },
 
  { path: 'bcil',   canActivate: [AuthGuard], component:BcilComponent, loadChildren: () => import('./bcil/bcil.module').then(m => m.BcilModule) }
  ,{
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
    data: { title: 'Page Not Found' },
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
