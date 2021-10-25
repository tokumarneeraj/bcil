import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { ActivityComponent } from '../activity/activity.component';
import { Bdoservice } from 'src/app/services/bdo.service';
@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent implements OnInit {
  copyrightdata:any;
  viewtab:any;
  commondata=new commondata();
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  activeusermou:activeusermou[];
  copyrightModel:any[];
  showpage:boolean=false;
  UserId: string;
  userRoles: string[];
  isAdmin: boolean;
  formHeader: string;
  isBdm: boolean;
  isScientist:boolean;
  isNodal: boolean;
  isLM: boolean;
  isSuperAdmin: boolean;
  isIPM:boolean;
  array={"tablename":"Create Activity"}
  constructor(private Bdoservice:Bdoservice,private router:Router, private accountService: AccountService,) {
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
   
    this.isIPM = this.userRoles.includes('IPM');
  this.isSuperAdmin=this.userRoles.includes('Super Admin');
   }

   ngOnInit(): void {

   
   
    this.viewtab=this.commondata.getotherpermissiondata('view').map((item)=>(item.split('-')[1]));
    this.Bdoservice.getdatapermission().subscribe(data=>{
      console.log(data);
      this.copyrightdata=data?.mis?.filter(x=>this.viewtab.find(y=>y==x.value));

    })
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetMis().subscribe(data => {
      console.log(data)
      this.copyrightModel = data;
      this.showpage = true;
    })
  });
  }
  copyrightlistfilter(data) {
   
    if(this.isSuperAdmin){
      return this.copyrightModel?.filter(x=>x.app_Status==data).length;
    }
   
    else{
      return this.copyrightModel?.filter(x=>(x.app_Status==data )&& this.activeusermou?.some(t=>t.appref==x.refid)).length;
    }
   
}

  createactivity(){
this.activity.showviewmodel('','S170');
  }

  queryparam(data:any){
    this.router.navigate(['./bcil/bcil-copyright-table'], { queryParams: { type: data} });
  // return  '{type:'+data+'}'
  }

}
