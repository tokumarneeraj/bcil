import { Component, OnInit } from '@angular/core';
import {Bdoservice} from '../../services/bdo.service'
import { mouModel } from '../../model/mou.model';
import { CookieService } from 'ngx-cookie-service';


import { AccountService } from 'src/app/services/account.service';
import { Permission } from 'src/app/model/permission.model';
//import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-bcil-dashboard',
  templateUrl: './bcil-dashboard.component.html',
  styleUrls: ['./bcil-dashboard.component.css']
})
export class BcilDashboardComponent implements OnInit {

  mouModel:mouModel[];
  showpage=false;
  usertype:string;
  UserName: string;
  mouModelFinal: mouModel[];
moustatus=['S101','S102','S103','S104','S105','S106','S107','S108','S019','S110','S111','S112'];
ttostatus=['S113','S114','S115','S116','S117','S118','S119','S120','S121','S122','S123','S124','S125','S126','S127','S128','S129','S130','S131'];
  //constructor(private Bdoservice: Bdoservice, private _cookieService: CookieService) {
  //  this.usertype = this._cookieService.get("UserType");
  //  this.UserName = this._cookieService.get("UserName");
  //}
  
  
  get canViewDesign() {
    return this.accountService.userHasPermission(Permission.viewDesignPermission);
  }

  get canViewCopyright() {
    return this.accountService.userHasPermission(Permission.viewCopyrightPermission);
  }
  get canViewTrademark() {
    return this.accountService.userHasPermission(Permission.viewTrademarkPermission);
  }

  get canViewPatent() {
    return this.accountService.userHasPermission(Permission.viewPatentPermission);
  }
  get canViewPlantvarity() {
    return this.accountService.userHasPermission(Permission.viewPlantvarityPermission);
  }

  get canViewOtherservices() {
    return this.accountService.userHasPermission(Permission.viewOtherservicesPermission);
  }
  get canViewReport() {
    return this.accountService.userHasPermission(Permission.viewReportPermission);
  }

  get canViewTechnologytransfer() {
    return this.accountService.userHasPermission(Permission.viewTechnologyTransferPermission);
  }
  get canViewMou() {
    return this.accountService.userHasPermission(Permission.viewMouPermission);
  }
  // usertype:string;
  // UserName:string;
  constructor(private Bdoservice:Bdoservice, private accountService: AccountService) {
    // this.usertype=this._cookieService.get("UserType");
    // this.UserName=this._cookieService.get("UserName");
   }

  ngOnInit(): void {
    debugger;

    this.Bdoservice.GetMou().subscribe(data=>{console.log(data)
    this.mouModel=data;
    this.showpage=true;
    })
  }

moulist(){
  console.log(this.mouModel?.filter(x=>!this.moustatus.includes(x.app_Status)).length)
 return this.mouModel?.filter(x=>this.moustatus.includes(x.app_Status)).length;
  }
  ttolist(){
    console.log(this.mouModel?.filter(x=>!this.ttostatus.includes(x.app_Status)).length)
   return this.mouModel?.filter(x=>this.ttostatus.includes(x.app_Status)).length;
    }


  // for client
  clientMouListFilter(data) {
    
    return this.mouModel?.filter(x => x.nodal_Email == data).length;

  }
  moufilter(data,email) {

    return this.mouModel?.filter(x => x.app_Status == data && x.nodal_Email==email).length;
  }
  //-------

}
