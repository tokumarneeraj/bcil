import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  LoginForm: FormGroup;
  constructor(private forms: FormBuilder, private _cookieService: CookieService, private router: Router) {
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
    // alert();
    this.submitted = true;

    if (this.LoginForm.invalid) {
      return;
    }
    var email = this.LoginForm.value.email;
    var password = this.LoginForm.value.password;
    //alert(email+"--"+password)
    if (email == "ipm@gmail.com" && password == "Test@321") {
      this._cookieService.set('UserType', "IPM");
      this._cookieService.set('UserName', "IPMTest");
      this.router.navigateByUrl("bcil/bcil-dashboard");
    }
    else if (email == "bdm@gmail.com" && password == "Test@321") {
      this._cookieService.set('UserType', "BDM");
      this._cookieService.set('UserName', "BDMTest");
      this.router.navigateByUrl("bcil/bcil-dashboard");
    }
    else if (email == "lm@gmail.com" && password == "Test@321") {
      this._cookieService.set('UserType', "LM");
      this._cookieService.set('UserName', "LMTest");
      this.router.navigateByUrl("bcil/bcil-dashboard");
    }
    else if (email == "Admin@gmail.com" && password == "Test@321") {
      this._cookieService.set('UserType', "ADMIN");
      this._cookieService.set('UserName', "AdminTest");
      this.router.navigateByUrl("bcil/bcil-dashboard");
    }
    else if (email == "sci@gmail.com" && password == "Test@321") {
      this._cookieService.set('UserType', "NODAL");
      this._cookieService.set('UserName', "NodalTest");
      this.router.navigateByUrl("bcil/bcil-dashboard");
    }

    else {
      alert("User Not Found");
    }

  }
}
