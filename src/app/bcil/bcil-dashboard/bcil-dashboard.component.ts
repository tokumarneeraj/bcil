import { Component, OnInit } from '@angular/core';
import {Bdoservice} from '../../services/bdo.service'
import { mouModel } from '../../model/mou.model';
import { CookieService } from 'ngx-cookie-service';
import {moustatus,ttaarray} from '../../model/common'

import { AccountService } from 'src/app/services/account.service';
import { Permission, PermissionValues } from 'src/app/model/permission.model';
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

  permission:string[];
  

  ttostatus = ['S113', 'S114', 'S115', 'S116', 'S117', 'S118', 'S119', 'S120', 'S121', 'S122', 'S123', 'S124', 'S125', 'S126', 'S127',
    'S128', 'S129', 'S130', 'S131', 'S132', 'S133', 'S134', 'S135', 'S136', 'S137', 'S138', 'S139', 'S140', 'S141', 'S142', 'S143',
    'S144', 'S145', 'S146', 'S147', 'S148', 'S149', 'S150', 'S151', 'S152', 'S153',
    'S154', 'S155', 'S156', 'S157', 'S158', 'S159', 'S160', 'S161', 'S162', 'S163', 'S164'];

  tlpstatus = ['S132', 'S133', 'S134', 'S135', 'S136', 'S137', 'S138', 'S139', 'S140', 'S141', 'S142', 'S143', 'S144', 'S145'];

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

  get canViewTlp() {
    return this.accountService.userHasPermission(Permission.viewTechnologyLeadPermission);
  }

  // usertype:string;
  // UserName:string;
  UserId:string;
  isLM: boolean;
  isAdmin:boolean;
  isBDM: boolean;
  isIPM:boolean;
  userRoles: string[];
  //permission:PermissionValues[];
  constructor(private Bdoservice:Bdoservice, private accountService: AccountService) {
    // this.usertype=this._cookieService.get("UserType");
    // this.UserName=this._cookieService.get("UserName");
    this.userRoles = this.accountService.currentUser.roles;

    this.UserId = this.accountService.currentUser.id;
    this.permission=JSON.parse(localStorage.getItem('user_permissions'));
    console.log(this.permission)
   // this.permission[0].link= this.accountService.permissions;
   }

  ngOnInit(): void {
    debugger;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('admin');
    this.isBDM = this.userRoles.includes('BDM');
    this.isIPM = this.userRoles.includes('IPM');
    this.Bdoservice.GetMou().subscribe(data=>{console.log(data)
    this.mouModel=data;
    this.showpage=true;
    })
  }

moulist(){
  if(this.isBDM ||this.isIPM){
    return this.mouModel?.filter(x=>moustatus.filter(r=>this.permission.includes(r.permission)).find(y=>y.status==x.app_Status) && x.createdBy==this.UserId ).length;
  }
  else{
  console.log(this.mouModel?.filter(x=>moustatus.filter(r=>this.permission.includes(r.permission)).find(y=>y.status==x.app_Status)).length)
 return this.mouModel?.filter(x=>moustatus.filter(r=>this.permission.includes(r.permission)).find(y=>y.status==x.app_Status) && (x.createdBy==this.UserId ||x.app_Status=='S101'||
 x.assignto==this.UserId||x.assigntoadmin==this.UserId)).length;
  }
  }
  ttolist(){
    console.log(this.mouModel?.filter(x=>ttaarray.filter(r=>this.permission.includes(r.permission)).find(y=>y.value==x.app_Status)).length)
   return this.mouModel?.filter(x=>ttaarray.filter(r=>this.permission.includes(r.permission)).find(y=>y.value==x.app_Status)).length;
    }

  tlplist() {
    console.log(this.mouModel?.filter(x => !this.tlpstatus.includes(x.app_Status)).length)
    return this.mouModel?.filter(x => this.tlpstatus.includes(x.app_Status)).length;
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
