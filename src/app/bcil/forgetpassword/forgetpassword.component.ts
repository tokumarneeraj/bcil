
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Utilities } from '../../services/utilities';
import { ForgetPassword } from '../../model/user-login.model';
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  forgetPassword = new ForgetPassword();
  isLoading = false;
  formResetToggle = true;
  modalClosedCallback: () => void;
  loginStatusSubscription: any;

  @Input()
  isModal = false;
  constructor(private alertService: AlertService, private accountService: AccountService, private authService: AuthService, private configurations: ConfigurationService) {

  }
  forgetpassword() {
   
    const currentUrl = window.location.href.split('://')[1].split('/')[0];
    this.isLoading = true;
    this.forgetPassword.ClientURI = window.location.href.split(currentUrl)[0]+currentUrl + "/resetpassword";
    this.accountService.forgetPassword(this.forgetPassword).subscribe(data => {
      console.log(data)
      this.isLoading = false;
      this.alertService.showMessage('ForgetPassword', `The Link has been sent,Please Check Your Email To Reset Password`, MessageSeverity.success);
    },
      error => {
        this.isLoading = false;

        this.alertService.stopLoadingMessage();

        if (Utilities.checkNoNetwork(error)) {
          this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail, MessageSeverity.error, error);
          //  this.offerAlternateHost();
        } else {
          const errorMessage = Utilities.getHttpResponseMessage(error);
          console.log(errorMessage)
          this.alertService.showStickyMessage('Email is not vaild', "Invalid Request", MessageSeverity.error, error);
          // if (errorMessage) {
          //   this.alertService.showStickyMessage('Unable to login', this.mapLoginErrorMessage(errorMessage), MessageSeverity.error, error);
          // } else {
          //   this.alertService.showStickyMessage('Unable to login', 'An error occured whilst logging in, please try again later.\nError: ' + Utilities.getResponseBody(error), MessageSeverity.error, error);
          // }
        }

        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        //this.alertService.stopLoadingMessage();

      })

    // this.alertService.startLoadingMessage('', 'Email Su');

  }
  ngOnInit(): void {

  }





  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }












}




