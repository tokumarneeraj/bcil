import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BcilRoutingModule } from './bcil-routing.module';
import { BcilComponent } from './bcil.component';
// import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared.module';
import { BcilDashboardComponent } from './bcil-dashboard/bcil-dashboard.component';
import { MouAddComponent } from './mou-add/mou-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BcilInitComponent } from './bcil-init/bcil-init.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ViewfileComponent } from './viewfile/viewfile.component';
import { RolemanagementComponent } from './rolemanagement/rolemanagement.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { RoleEditorComponent } from './role-editor/role-editor.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateLanguageLoader } from '../services/app-translation.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastaModule } from 'ngx-toasta';
import { ProfileComponent } from './profile/profile.component';
import { MouDashboardComponent } from './mou-dashboard/mou-dashboard.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TtaDashboardComponent } from './tta-dashboard/tta-dashboard.component';
import { TtaMainComponent } from './tta-main/tta-main.component';

import { TlpDashboardComponent } from './tlp-dashboard/tlp-dashboard.component';
import { TlpMainComponent } from './tlp-main/tlp-main.component';

import { ReminderComponent } from './reminder/reminder.component';
import { ReminderInfoComponent } from './reminder-info/reminder-info.component';
import { NttsaDashboardComponent } from './nttsa-dashboard/nttsa-dashboard.component';
import { NttsaMainComponent } from './nttsa-main/nttsa-main.component';
import { TstlDashboardComponent } from './tstl-dashboard/tstl-dashboard.component';
import { TstlMainComponent } from './tstl-main/tstl-main.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AdditionFileComponent } from './addition-file/addition-file.component';
import { RemarksComponent } from './remarks/remarks.component';
import { MouApplicationComponent } from './mou-application/mou-application.component';
import { ImageUploaderComponent } from './image-uploader.component';
import { MisDashboardComponent } from './mis-dashboard/mis-dashboard.component';
import { MisInitComponent } from './mis-init/mis-init.component';

@NgModule({
  declarations: [BcilComponent, BcilDashboardComponent, MouAddComponent, BcilInitComponent, DashboardComponent, ViewfileComponent,
    RolemanagementComponent,
    UsermanagementComponent,
    ImageUploaderComponent,
    RoleEditorComponent,
    UserInfoComponent,
    ProfileComponent,
    MouDashboardComponent,
    TtaDashboardComponent,
    TtaMainComponent,

    TlpDashboardComponent,
    TlpMainComponent,
    ReminderComponent,
    ReminderInfoComponent,
    NttsaDashboardComponent,
    NttsaMainComponent,
    TstlDashboardComponent,
    TstlMainComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    AdditionFileComponent,
    RemarksComponent,
    MouApplicationComponent,
    MisDashboardComponent,
    MisInitComponent,
     ],

  imports: [
    
    CommonModule,
    ToastaModule.forRoot(),
  
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    NgSelectModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    BcilRoutingModule,
    AccordionModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader,
      },
    }),
   
    SharedModule
  ]
})
export class BcilModule { }
