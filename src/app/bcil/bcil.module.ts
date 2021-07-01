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
import { ViewfileComponent } from './viewfile/viewfile.component';
@NgModule({
  declarations: [BcilComponent, BcilDashboardComponent, MouAddComponent, BcilInitComponent, DashboardComponent, ViewfileComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    BcilRoutingModule,
    SharedModule
  ]
})
export class BcilModule { }
