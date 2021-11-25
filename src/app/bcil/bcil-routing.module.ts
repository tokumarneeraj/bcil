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



import { ReminderComponent } from './reminder/reminder.component';

import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MouApplicationComponent } from './mou-application/mou-application.component';
import { MisInitComponent } from './mis-init/mis-init.component';
import { MisDashboardComponent } from './mis-dashboard/mis-dashboard.component';
import { PatentComponent } from './patent/patent.component';
import { DesignComponent } from './design/design.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { TrademarkComponent } from './trademark/trademark.component';
import { PlantVarityComponent } from './plant-varity/plant-varity.component';
import { PatentInitComponent } from './patent-init/patent-init.component';
import { DesignInitComponent } from './design-init/design-init.component';
import { CopyrightInitComponent } from './copyright-init/copyright-init.component';
import { TrademarkInitComponent } from './trademark-init/trademark-init.component';
import { PlantVarietyInitComponent } from './plant-variety-init/plant-variety-init.component';
import { AccountComponent } from './account/account.component';
import { AccountInitComponent } from './account-init/account-init.component';
const routes: Routes = [
  //{ path: '',redirectTo: 'Login', pathMatch: 'full', component: BcilComponent },
  // {path:"Login",component:LoginComponent},
  {path:"users",canActivate:[AuthGuard],component:UsermanagementComponent},
  {path:"roles",canActivate:[AuthGuard],component:RolemanagementComponent},
  {path:"reminder",canActivate:[AuthGuard],component:ReminderComponent},
  {path:"account-dashboard",canActivate:[AuthGuard],component:AccountComponent},
  {path:"bcil-account-table",canActivate:[AuthGuard],component:AccountInitComponent},
  {path:"dashboard",canActivate:[AuthGuard],component:DashboardComponent},
  {path:"bcil-dashboard",canActivate:[AuthGuard],component:BcilDashboardComponent},
  {path:"mou-add",canActivate:[AuthGuard],component:MouAddComponent},
  {path:"bcil-table",canActivate:[AuthGuard],component:BcilInitComponent},
  {path:"file-history",canActivate:[AuthGuard],component:ViewfileComponent},
  {path:"user-profile",canActivate:[AuthGuard],component:ProfileComponent},
  { path: "mou-dashboard", canActivate: [AuthGuard], component: MouDashboardComponent },
  { path: "tta-dashboard", canActivate: [AuthGuard], component: TtaDashboardComponent },
  { path: "design-dashboard", canActivate: [AuthGuard], component: DesignComponent },
  { path: "patent-dashboard", canActivate: [AuthGuard], component: PatentComponent },
  { path: "bcil-patent-table", canActivate: [AuthGuard], component: PatentInitComponent },
  { path: "copyright-dashboard", canActivate: [AuthGuard], component: CopyrightComponent },
  { path: "trademark-dashboard", canActivate: [AuthGuard], component: TrademarkComponent },
  { path: "plant-variety-dashboard", canActivate: [AuthGuard], component: PlantVarityComponent },
  { path: "mis-dashboard", canActivate: [AuthGuard], component: MisDashboardComponent },
  { path: "bcil-mis-table", canActivate: [AuthGuard], component: MisInitComponent },
  { path: "bcil-design-table", canActivate: [AuthGuard], component: DesignInitComponent },

  { path: "bcil-plant-variety-table", canActivate: [AuthGuard], component: PlantVarietyInitComponent },
  { path: "bcil-copyright-table", canActivate: [AuthGuard], component: CopyrightInitComponent },
  { path: "bcil-trademark-table", canActivate: [AuthGuard], component: TrademarkInitComponent },
  { path: "bcil-tta-table", canActivate: [AuthGuard], component: TtaMainComponent },
 
  {path:"mou-application",canActivate:[AuthGuard],component:MouApplicationComponent},
  
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BcilRoutingModule { }
