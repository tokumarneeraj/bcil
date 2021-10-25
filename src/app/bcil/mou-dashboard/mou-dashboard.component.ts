import { Component, OnInit } from '@angular/core';
import { activeusermou, mouModel } from 'src/app/model/mou.model';
import { Bdoservice } from '../../services/bdo.service';
import { AccountService } from '../../services/account.service';
import { Permission } from 'src/app/model/permission.model';
import {commondata} from '../../model/common'
import { Router } from '@angular/router';
@Component({
  selector: 'app-mou-dashboard',
  templateUrl: './mou-dashboard.component.html',
  styleUrls: ['./mou-dashboard.component.css']
})
export class MouDashboardComponent implements OnInit {

  mouModel: mouModel[];
  showpage = false;
  isLM: boolean;
  isAdmin:boolean;
  isBDM: boolean;
  isIPM:boolean;
  isSuperAdmin:boolean;
  userRoles: string[];
  UserId: string;
commondata=new commondata();
activeusermou:activeusermou[];
moudata:any;
  viewtab:any;
  // usertype:string;
  // UserName:string;
  constructor(private Bdoservice: Bdoservice, private accountService: AccountService,private router:Router) {

    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBDM = this.userRoles.includes('BDM');
    this.isIPM = this.userRoles.includes('IPM');
  this.isSuperAdmin=this.userRoles.includes('Super Admin');
  }

 

 
  queryparam(data:any){
    this.router.navigate(['./bcil/bcil-table'], { queryParams: { type: data} });
  // return  '{type:'+data+'}'
  }
  
  ngOnInit(): void {
    
    this.viewtab=this.commondata.getotherpermissiondata('view').map((item)=>(item.split('-')[1]));
    this.Bdoservice.getdatapermission().subscribe(data=>{
      console.log(data);
      this.moudata=data?.mou?.filter(x=>this.viewtab.find(y=>y==x.value));

    })
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      this.mouModel = data;
      this.showpage = true;
    })
  });
  }
  get CanaddMouPermission() {
    return this.accountService.userHasPermission(Permission.addMouPermission);
  }

  cardname(data){
return this.commondata.moustatus().find(x=>x.value==data)?.tabelname;
  }
  moulistfilter(data) {
   
    if(this.isSuperAdmin){
      return this.mouModel?.filter(x=>x.app_Status==data || x.tto_approved==data).length;
    }
    else if(this.isAdmin){
   return this.mouModel?.filter(x=>(x.app_Status==data || x.tto_approved==data) &&(x.app_Status=='S101'|| this.activeusermou?.some(t=>t.appref==x.refid))).length;
    }
    else{
      return this.mouModel?.filter(x=>(x.app_Status==data || x.tto_approved==data)&& this.activeusermou?.some(t=>t.appref==x.refid)).length;
    }
   
}

}
