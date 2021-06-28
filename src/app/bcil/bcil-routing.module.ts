import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BcilComponent } from './bcil.component';
import { LoginComponent } from './login/login.component';
import { BcilDashboardComponent } from './bcil-dashboard/bcil-dashboard.component';
import { MouAddComponent } from './mou-add/mou-add.component';
const routes: Routes = [
  { path: '',redirectTo: 'Login', pathMatch: 'full', component: BcilComponent },
  {path:"Login",component:LoginComponent},
  {path:"bcil-dashboard",component:BcilDashboardComponent},
  {path:"mou-add",component:MouAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcilRoutingModule { }
