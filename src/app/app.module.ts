import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Bdoservice} from './services/bdo.service'
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './bcil/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    // HeaderComponent,
    // FooterComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,

    ModalModule.forRoot(),
  ],
  providers: [Bdoservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
