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



import { ReminderComponent } from './reminder/reminder.component';
import { ReminderInfoComponent } from './reminder-info/reminder-info.component';

import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AdditionFileComponent } from './addition-file/addition-file.component';
import { RemarksComponent } from './remarks/remarks.component';
import { MouApplicationComponent } from './mou-application/mou-application.component';
import { ImageUploaderComponent } from './image-uploader.component';
import { MisDashboardComponent } from './mis-dashboard/mis-dashboard.component';
import { MisInitComponent } from './mis-init/mis-init.component';
import { ActivityComponent } from './activity/activity.component';
import { AddScientistComponent } from './add-scientist/add-scientist.component';
import { PatentComponent } from './patent/patent.component';
import { DesignComponent } from './design/design.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { TrademarkComponent } from './trademark/trademark.component';
import { PlantVarityComponent } from './plant-varity/plant-varity.component';
import { PatentInitComponent } from './patent-init/patent-init.component';
import { CopyrightInitComponent } from './copyright-init/copyright-init.component';
import { TrademarkInitComponent } from './trademark-init/trademark-init.component';
import { DesignInitComponent } from './design-init/design-init.component';
import { KeysPipe } from '../pipes/keys.pipe';
import { PlantVarietyInitComponent } from './plant-variety-init/plant-variety-init.component';
import { AccountComponent } from './account/account.component';
import { AccountInitComponent } from './account-init/account-init.component';
import { LufInvoiceComponent } from './luf-invoice/luf-invoice.component';
import { ClientInvoiceComponent } from './client-invoice/client-invoice.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { DocumentviewComponent } from './documentview/documentview.component';

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

    
    ReminderComponent,
    ReminderInfoComponent,
    
    ForgetpasswordComponent,
    ResetpasswordComponent,
    AdditionFileComponent,
    RemarksComponent,
    MouApplicationComponent,
    MisDashboardComponent,
    MisInitComponent,
    ActivityComponent,
    AddScientistComponent,
    PatentComponent,
    DesignComponent,
    CopyrightComponent,
    TrademarkComponent,
    PlantVarityComponent,
    PatentInitComponent,
    CopyrightInitComponent,
    TrademarkInitComponent,
    DesignInitComponent,
    PlantVarietyInitComponent,
    AccountComponent,
    AccountInitComponent,
    LufInvoiceComponent,
    ClientInvoiceComponent,
    NotificationsComponent,
    MenuListItemComponent,
    DocumentviewComponent,
    
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
