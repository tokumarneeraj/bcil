import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BcilComponent } from './bcil.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '',redirectTo: 'Login', pathMatch: 'full', component: BcilComponent },
  {path:"Login",component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcilRoutingModule { }
