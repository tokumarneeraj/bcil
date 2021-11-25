import { Component, OnInit } from '@angular/core';
import {Bdoservice} from '../../services/bdo.service'
import { activeusermou, mouModel } from '../../model/mou.model';
import { CookieService } from 'ngx-cookie-service';
import {commondata} from '../../model/common'

import { AccountService } from 'src/app/services/account.service';
import { Permission, PermissionValues } from 'src/app/model/permission.model';
import { ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-bcil-dashboard',
  templateUrl: './bcil-dashboard.component.html',
  styleUrls: ['./bcil-dashboard.component.css']
})
export class BcilDashboardComponent implements OnInit {
dashboardModel:any;
  mouModel:mouModel[];
  misModel:any[];
  ttaModel:any[];
  accountModel:any[];
  patentModel:any[];
  plant_varietyModel:any[];
  trademarkModel:any[];
copyrightModel:any[];
designModel:any[];
  showpage=false;
  usertype:string;
  UserName: string;
  mouModelFinal: mouModel[];
  viewtab:any;
  jsondata:any;
  permission:string[];
  userper:any[];
  userpertta:any[];
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
  isSuperAdmin:boolean;
  userRoles: string[];
  commondata=new commondata();
  activeusermou:activeusermou[];
  viewadditionalfile:boolean=false;
  //permission:PermissionValues[];
  constructor(private Bdoservice:Bdoservice, private accountService: AccountService,private router:Router) {
    // this.usertype=this._cookieService.get("UserType");
    // this.UserName=this._cookieService.get("UserName");
    this.userRoles = this.accountService.currentUser.roles;

    this.UserId = this.accountService.currentUser.id;
    this.permission=JSON.parse(localStorage.getItem('user_permissions'));
    console.log(this.permission)
   // this.permission[0].link= this.accountService.permissions;
   }
   counttotal(tab:any){
    
    if(tab?.stage=="tta"){
      return this.dashboardModel?.ttacount;
    }
else if(tab?.stage=="mou"){
  return this.dashboardModel?.moucount;
  
}
else if(tab?.stage=="patent"){
  return this.dashboardModel?.patentcount;
  
}
else if(tab?.stage=="mis"){
  return this.dashboardModel?.miscount;
  
}
else if(tab?.stage=="trademark"){
  return this.dashboardModel?.trademarkcount;
  
}
else if(tab?.stage=="design"){
  return this.dashboardModel?.designcount;
  
}
else if(tab?.stage=="copyright"){
  return this.dashboardModel?.copyrightcount;
  
}
else if(tab?.stage=="plant_variety"){
  return this.dashboardModel?.plantvarietycount;
  
}else if(tab?.stage=="account"){
  return this.dashboardModel?.accountcount;
  
}
else
{
  return 0;
}
   //return this.mouModel?.filter(x=>data?.find(y=>y.value==x.app_Status)).length;
   }
  ngOnInit(): void {
    this.viewtab=this.commondata.getotherpermissiondata('view')?.map((item)=>(item?.split('-')[1]));
    // this.notify_call();
    this.Bdoservice.getdatapermission().subscribe(data=>{
 this.jsondata=data;
     


    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBDM = this.userRoles.includes('BDM');
    this.isIPM = this.userRoles.includes('IPM');
    this.isSuperAdmin = this.userRoles.includes('Super Admin');
    
    this.Bdoservice.GetDashboardData().subscribe(data=>{console.log(data)
    this.dashboardModel=data;
        this.showpage=true;
      
     
      // this.Bdoservice.GetPatentModel().subscribe(datamis=>{console.log(datamis)
      //   this.patentModel=datamis;
      //   this.showpage=true;
      // });
  
   
  
});
    });
  }
  taburl(url:any){
this.router.navigate([url]);
  }
  checktab(){
    let menu=  this.jsondata?.tabheading.filter(x=>
      this.jsondata?.[x.stage]?.some(t=>this.viewtab?.find(r=>r==t.value)) ||
     this.jsondata?.[x.stage]?.some(y=>y.subchild?.some(t=>this.viewtab?.find(r=>r==t.value))));
     return menu;
    
     }

  
}
