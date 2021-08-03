import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserLogin } from 'src/app/model/user-login.model';
import { AlertService, MessageSeverity } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { Utilities } from 'src/app/services/utilities';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  LoginForm: FormGroup;
  userLogin = new UserLogin();
  isLoading = false;
  @Input()
  isModal = false;
  constructor(private alertService: AlertService, private authService: AuthService, private configurations: ConfigurationService,private forms: FormBuilder,private _cookieService: CookieService, private router: Router) {
  this.LoginForm = this.forms.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
    
  })
}
get f() {
  return this.LoginForm.controls;
}
  ngOnInit(): void {
  }
  loginSubmit() {
    this.submitted = true;

    if (this.LoginForm.invalid) {
          return;
      }
    this.isLoading = true;
    this.userLogin.userName= this.LoginForm.controls["email"].value;
    this.userLogin.password= this.LoginForm.controls["password"].value;
    this.alertService.startLoadingMessage('', 'Attempting login...');

    this.authService.loginWithPassword(this.userLogin.userName, this.userLogin.password,true)
      .subscribe(
        user => {
          this.router.navigateByUrl('bcil/bcil-dashboard')
          setTimeout(() => {
            this.alertService.stopLoadingMessage();
            this.isLoading = false;
            this.reset();

            if (!this.isModal) {
              this.alertService.showMessage('Login', `Welcome ${user.userName}!`, MessageSeverity.success);
            } else {
              this.alertService.showMessage('Login', `Session for ${user.userName} restored!`, MessageSeverity.success);
              setTimeout(() => {
                this.alertService.showStickyMessage('Session Restored', 'Please try your last operation again', MessageSeverity.default);
              }, 500);

              ////this.closeModal();
            }
          }, 500);
        },
        error => {

          this.alertService.stopLoadingMessage();

          if (Utilities.checkNoNetwork(error)) {
            this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail, MessageSeverity.error, error);
           // this.offerAlternateHost();
          } else {
            const errorMessage = Utilities.getHttpResponseMessage(error);

            if (errorMessage) {
             this.alertService.showStickyMessage('Unable to login', this.mapLoginErrorMessage(errorMessage), MessageSeverity.error, error);
            } else {
              this.alertService.showStickyMessage('Unable to login', 'An error occured whilst logging in, please try again later.\nError: ' + Utilities.getResponseBody(error), MessageSeverity.error, error);
            }
          }

          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
  }
  mapLoginErrorMessage(error: string) {

    if (error === 'invalid_username_or_password') {
      return 'Invalid username or password';
    }

    if (error === 'invalid_grant') {
      return 'This account has been disabled';
    }

    return error;
  }
  
  reset() {
   
  }
}
