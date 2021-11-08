import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Bdoservice} from './services/bdo.service'
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './bcil/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { ThemeManager } from './services/theme-manager';
import { ConfigurationService } from './services/configuration.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { AccountService } from './services/account.service';
import { OidcHelperService } from './services/oidc-helper.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { AccountEndpoint } from './services/account-endpoint.service';
import { AuthService } from './services/auth.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './services/auth-guard.service';
import { ToastaModule } from 'ngx-toasta';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppErrorHandler } from './app-error.handler';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { KeysPipe } from './pipes/keys.pipe';


// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   
    // HeaderComponent,
    // FooterComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
   
    ToastaModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader,
      },
    }),
    OAuthModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
  Bdoservice,
  
    DatePipe,
    AlertService,
    ThemeManager,
    ConfigurationService,
    AuthGuard,
    AppTranslationService,
   AuthService,
    AccountService,
    AccountEndpoint,
    LocalStoreManager,
   
    OidcHelperService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
