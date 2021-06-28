import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Bdoservice} from './services/bdo.service'
import { HttpClientModule } from '@angular/common/http';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // FooterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Bdoservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
