import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Utilities } from '../../services/utilities';
import { ResetPassword } from '../../model/user-login.model';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetPassword = new ResetPassword();
  isLoading = false;
  formResetToggle = true;
  modalClosedCallback: () => void;
  loginStatusSubscription: any;
  loading = false;

  submitted = false;
  resetForm: FormGroup;
  @Input()
  isModal = false;
  constructor(private _route: ActivatedRoute, private formBuilder: FormBuilder, private alertService: AlertService, private accountService: AccountService, private authService: AuthService, private configurations: ConfigurationService) {

  }
  get f() { return this.resetForm.controls; }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('Password').value;
    const confirmPassword = group.get('ConfirmPassword').value;

    return password === confirmPassword ? null : { notSame: true }
  }
  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      Password: ['', [Validators.required]],
      ConfirmPassword: [''],


    }, { validators: this.checkPasswords });
  }
  resetpassword() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }

    this.resetPassword.Email = this._route.snapshot.queryParams['email'];
    this.resetPassword.Token = this._route.snapshot.queryParams['token'];
    this.resetPassword.Password = this.resetForm.get("Password").value;
    this.resetPassword.ConfirmPassword = this.resetForm.get("ConfirmPassword").value;
    this.isLoading = true;

    this.accountService.resetPassword(this.resetPassword).subscribe(data => {
      console.log(data)
      this.isLoading = false;
      this.alertService.showMessage('resetPassword', `Password Reset successfully`, MessageSeverity.success);
      window.location.href = '/Login';

    },
      error => {
        this.isLoading = false;
        if (Utilities.checkNoNetwork(error)) {
          this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail, MessageSeverity.error, error);
          // this.offerAlternateHost();
        } else {
          const errorMessage = Utilities.getHttpResponseMessage(error);
          console.log(errorMessage)
          this.alertService.showStickyMessage("resetPassword", "Invalid Request", MessageSeverity.error, error);

        }
      })

  }
}
