import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserLogin } from 'src/app/model/user-login.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService, MessageSeverity } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DBkeys } from 'src/app/services/db-keys';
import { LocalStoreManager } from 'src/app/services/local-store-manager.service';
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
  querstring:any;
  @Input()
  isModal = false;
  constructor(private route: ActivatedRoute,private accountService: AccountService, private localStorage: LocalStoreManager,private alertService: AlertService, private authService: AuthService, private configurations: ConfigurationService,private forms: FormBuilder,private _cookieService: CookieService, private router: Router) {
  this.LoginForm = this.forms.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
    
  })
}
get f() {
  return this.LoginForm.controls;
}
  ngOnInit(): void {
    //this.querstring="";
   this.route.queryParams.subscribe((params) => {
    this.querstring=params?.url;
    if (this.authService.isLoggedIn) {
     
       if( this.querstring!=undefined){
      this.router.navigateByUrl(this.querstring)
       }
      return true;
    }
    else{

    }
    //  alert(params?.url)
    //  this.querstring=params?.url;
    //  if( this.querstring!=undefined){
    //  this.router.navigateByUrl(this.querstring)
    //  }
   });
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
          
          this.accountService.getOtherpermissionbyrolename(user.roles[0]).subscribe(data=>{
            var arrNames = [];
//iterate through object keys
data.forEach(function(item) {
  //get the value of name
  var val = item.permission
  //push the name string in the array
  arrNames.push(val);
});
            this.localStorage.savePermanentData(arrNames, DBkeys.USER_OTHERPERMISSIONS);
            // if( this.querstring==undefined){
            // this.router.navigateByUrl('bcil/bcil-dashboard')
            // }
            // else{
            //   this.router.navigateByUrl(this.querstring)
            // }
            if( this.querstring!=undefined){
              this.router.navigateByUrl(this.querstring)
               }
               else{
            this.router.navigateByUrl('bcil/bcil-dashboard')
               }
          })
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
