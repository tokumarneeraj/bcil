import { Component, OnInit } from '@angular/core';
import {Bdoservice} from '../../services/bdo.service'
import {mouModel} from '../../model/mou.model';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-bcil-dashboard',
  templateUrl: './bcil-dashboard.component.html',
  styleUrls: ['./bcil-dashboard.component.css']
})
export class BcilDashboardComponent implements OnInit {

  mouModel:mouModel[];
  showpage=false;
  usertype:string;
  UserName:string;
  constructor(private Bdoservice:Bdoservice,private _cookieService: CookieService) {
    this.usertype=this._cookieService.get("UserType");
    this.UserName=this._cookieService.get("UserName");
   }

  ngOnInit(): void {
    debugger;

    this.Bdoservice.GetMou().subscribe(data=>{console.log(data)
    this.mouModel=data;
    this.showpage=true;
    })
  }

moulistfilter(data){
  console.log(this.mouModel?.filter(x=>x.app_Status==data).length)
 return this.mouModel?.filter(x=>x.app_Status==data).length;
}

}
