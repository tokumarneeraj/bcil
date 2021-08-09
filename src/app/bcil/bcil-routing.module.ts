import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { BcilComponent } from './bcil.component';
// import { LoginComponent } from './login/login.component';
import { BcilDashboardComponent } from './bcil-dashboard/bcil-dashboard.component';
import { MouAddComponent } from './mou-add/mou-add.component';
import { BcilInitComponent } from './bcil-init/bcil-init.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewfileComponent } from './viewfile/viewfile.component';
import { RolemanagementComponent } from './rolemanagement/rolemanagement.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { AuthGuard } from '../services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { MouDashboardComponent } from './mou-dashboard/mou-dashboard.component';
import { TtaDashboardComponent } from './tta-dashboard/tta-dashboard.component';
import { TtaMainComponent } from './tta-main/tta-main.component';

import { TlpDashboardComponent } from './tlp-dashboard/tlp-dashboard.component';
import { TlpMainComponent } from './tlp-main/tlp-main.component';

import { ReminderComponent } from './reminder/reminder.component';
import { NttsaDashboardComponent } from './nttsa-dashboard/nttsa-dashboard.component';
import { NttsaMainComponent } from './nttsa-main/nttsa-main.component';
import { TstlDashboardComponent } from './tstl-dashboard/tstl-dashboard.component';
import { TstlMainComponent } from './tstl-main/tstl-main.component';

const routes: Routes = [
  //{ path: '',redirectTo: 'Login', pathMatch: 'full', component: BcilComponent },
  // {path:"Login",component:LoginComponent},
  {path:"users",canActivate:[AuthGuard],component:UsermanagementComponent},
  {path:"roles",canActivate:[AuthGuard],component:RolemanagementComponent},
  {path:"reminder",canActivate:[AuthGuard],component:ReminderComponent},
  
  {path:"dashboard",canActivate:[AuthGuard],component:DashboardComponent},
  {path:"bcil-dashboard",canActivate:[AuthGuard],component:BcilDashboardComponent},
  {path:"mou-add",canActivate:[AuthGuard],component:MouAddComponent},
  {path:"bcil-table",canActivate:[AuthGuard],component:BcilInitComponent},
  {path:"file-history",canActivate:[AuthGuard],component:ViewfileComponent},
  {path:"user-profile",canActivate:[AuthGuard],component:ProfileComponent},
  { path: "mou-dashboard", canActivate: [AuthGuard], component: MouDashboardComponent },
  { path: "tta-dashboard", canActivate: [AuthGuard], component: TtaDashboardComponent },
  { path: "bcil-tta-table", canActivate: [AuthGuard], component: TtaMainComponent },
  { path: "tlp-dashboard", canActivate: [AuthGuard], component: TlpDashboardComponent },
  { path: "bcil-tlp-table", canActivate: [AuthGuard], component: TlpMainComponent },
  { path: "nttsa-dashboard", canActivate: [AuthGuard], component: NttsaDashboardComponent },
  { path: "bcil-nttsa-table", canActivate: [AuthGuard], component: NttsaMainComponent },
  { path: "tstl-dashboard", canActivate: [AuthGuard], component: TstlDashboardComponent },
  { path: "bcil-tstl-table", canActivate: [AuthGuard], component: TstlMainComponent },

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcilRoutingModule { }
