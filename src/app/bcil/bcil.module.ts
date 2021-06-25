import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BcilRoutingModule } from './bcil-routing.module';
import { BcilComponent } from './bcil.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [BcilComponent, LoginComponent],
  imports: [
    CommonModule,
    BcilRoutingModule,
    SharedModule
  ]
})
export class BcilModule { }
