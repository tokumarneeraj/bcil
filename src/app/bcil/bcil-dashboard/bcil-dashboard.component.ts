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

  mouModel:mouModel[];
  misModel:any[];
  ttaModel:any[];
  patentModel:any[];
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
    let data= this.jsondata?.[tab?.stage];
    let rr=[];
    
    data?.forEach(y => {
      if(this.viewtab?.some(w=>w==y.value)){
        rr.push(y.value);
      }
     
        y?.subchild?.forEach(x => {
         if(this.viewtab?.some(w=>w==x.value)){
          rr.push(x.value);
         }
        });
       
      
      
    });
    console.log(rr,'pp')
    if(tab?.stage=="tta"){
      return this.ttalist(rr);
    }
else if(tab?.stage=="mou"){
  return this.moulist(rr);
  
}
else if(tab?.stage=="patent"){
  return this.patentlist(rr);
  
}
else if(tab?.stage=="mis"){
  return this.mislist(rr);
  
}
else if(tab?.stage=="trademark"){
  return this.trademarklist(rr);
  
}
else if(tab?.stage=="design"){
  return this.designlist(rr);
  
}
else if(tab?.stage=="copyright"){
  return this.copyrightlist(rr);
  
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
     
this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
  console.log(data1,'mouref');
this.activeusermou=data1;
    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBDM = this.userRoles.includes('BDM');
    this.isIPM = this.userRoles.includes('IPM');
    this.isSuperAdmin = this.userRoles.includes('Super Admin');
    
    this.Bdoservice.GetMou().subscribe(data=>{console.log(data)
      this.mouModel=data;
      this.Bdoservice.GetTtaModel().subscribe(datatta=>{console.log(datatta)
this.ttaModel=datatta;
      this.Bdoservice.GetMis().subscribe(datamis=>{console.log(datamis)
        this.misModel=datamis;
        this.Bdoservice.GetPatentModel().subscribe(datapatent=>{console.log(datapatent)
          this.patentModel=datapatent;
          this.Bdoservice.GetTrademarkModel().subscribe(datatrademark=>{console.log(datatrademark)
            this.trademarkModel=datatrademark;
            this.Bdoservice.GetDesignModel().subscribe(datadesign=>{console.log(datadesign)
              this.designModel=datadesign;
              this.Bdoservice.GetCopyrightModel().subscribe(datacopyright=>{console.log(datacopyright)
                this.copyrightModel=datacopyright;});
          this.showpage=true;
            
            });
          
          
          });
        });
           
             
        });
        //this.showpage=true;
      }
     
      // this.Bdoservice.GetPatentModel().subscribe(datamis=>{console.log(datamis)
      //   this.patentModel=datamis;
      //   this.showpage=true;
      // });
  
   
  
    );
  });
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
moulist(permission:any){
  if(this.isSuperAdmin){
    return this.mouModel?.filter(x=>permission.find(p=>p==x.app_Status || x.tto_approved=="S108")).length;
  }
  else if(this.isAdmin){
  return this.mouModel?.filter(x=>permission.find(p=>p==x.app_Status || x.tto_approved=="S108") && (x.app_Status=="S101" || this.activeusermou?.some(t=>t.appref==x.refid))).length;
  }
  else{
    return this.mouModel?.filter(x=>permission.find(p=>p==x.app_Status || x.tto_approved=="S108") && this.activeusermou?.some(t=>t.appref==x.refid)).length;
 
  }
  
  }
  ttalist(permission:any){
    if(this.isSuperAdmin){
      return this.ttaModel?.filter(x=>permission.find(p=>p==x.app_Status)).length;
   
    }
    else{
    return this.ttaModel?.filter(x=>permission.find(p=>p==x.app_Status) &&  this.activeusermou?.some(t=>t.appref==x.refid)).length;
    
  }}
  trademarklist(permission:any){
    if(this.isSuperAdmin){
      return this.trademarkModel?.filter(x=>permission.find(p=>p==x.app_Status)).length;
   
    }
    else{
    return this.trademarkModel?.filter(x=>permission.find(p=>p==x.app_Status) &&  this.activeusermou?.some(t=>t.appref==x.refid)).length;
    
  }}
   designlist(permission:any){
    if(this.isSuperAdmin){
      return this.designModel?.filter(x=>permission.find(p=>p==x.app_Status)).length;
   
    }
    else{
    return this.designModel?.filter(x=>permission.find(p=>p==x.app_Status) &&  this.activeusermou?.some(t=>t.appref==x.refid)).length;
    
  }}
   copyrightlist(permission:any){
    if(this.isSuperAdmin){
      return this.copyrightModel?.filter(x=>permission.find(p=>p==x.app_Status)).length;
   
    }
    else{
    return this.copyrightModel?.filter(x=>permission.find(p=>p==x.app_Status) &&  this.activeusermou?.some(t=>t.appref==x.refid)).length;
    
  }}
  patentlist(permission:any){
    if(this.isSuperAdmin){
      return this.patentModel?.filter(x=>permission.find(p=>p==x.app_Status)).length;
   
    }
    else{
    return this.patentModel?.filter(x=>permission.find(p=>p==x.app_Status) &&  this.activeusermou?.some(t=>t.appref==x.refid)).length;
    
  }}
  mislist(permission:any){
    if(this.isSuperAdmin){
      return this.misModel?.filter(x=>permission.find(p=>p==x.app_Status)).length;
   
    }
    else{
    return this.misModel?.filter(x=>permission.find(p=>p==x.app_Status) &&  this.activeusermou?.some(t=>t.appref==x.refid)).length;
    
  }}
  
  
}
