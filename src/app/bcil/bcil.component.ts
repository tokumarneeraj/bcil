import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-bcil',
  templateUrl: './bcil.component.html',
  styleUrls: ['./bcil.component.css']
})
export class BcilComponent implements OnInit {

  usertype:string;
  UserName:string;
  constructor(private _cookieService: CookieService) {
    this.usertype=this._cookieService.get("UserType");
    this.UserName=this._cookieService.get("UserName");
  }

  ngOnInit(): void {
  }

}
