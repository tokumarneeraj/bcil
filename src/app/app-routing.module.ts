import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BcilComponent } from './bcil/bcil.component';
import { LoginComponent } from './bcil/login/login.component';


const routes: Routes = [
   { path: '',redirectTo: 'Login', pathMatch: 'full'},
  {path:"Login",component:LoginComponent},
  { path: 'bcil', component:BcilComponent, loadChildren: () => import('./bcil/bcil.module').then(m => m.BcilModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
