import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { ActivityComponent } from '../activity/activity.component';
import { Bdoservice } from 'src/app/services/bdo.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

designdata:any;
  viewtab:any;
  commondata=new commondata();
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  activeusermou:activeusermou[];
  designModel:any[];
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
  constructor(private route: ActivatedRoute,private Bdoservice:Bdoservice,private router:Router, private accountService: AccountService,) {
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
      this.route.queryParams.subscribe((params) => {
let yy=["design_common_ip","design_er_er","design_er_accp"]
if(yy.includes(params?.stage)){
  
  this.designdata=data?.design?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));

}
else{
        this.designdata=data?.design?.filter(x=>this.viewtab.find(y=>y==x.value)|| x?.subchild?.some(t=>this.viewtab.find(y=>y==t.value)));
}

      });
     

    })
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetDesignModel().subscribe(data => {
      console.log(data)
      this.designModel = data;
      this.showpage = true;
    })
  });
  }
designlistfilter(data) {
   
  let yy=["design_common_ip","design_er_er","design_er_accp"]
  if(this.isSuperAdmin){
    return this.designModel?.filter(x=>(yy.includes(data)?this.designdata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_Status):x.app_Status==data) ).length;
  }
  
  else{
    return this.designModel?.filter(x=>(yy.includes(data)?this.designdata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_Status):x.app_Status==data) && this.activeusermou?.some(t=>t.appref==x.refid) ).length;
  }
   
}

  createactivity(){
this.activity.showviewmodel('','S718');
  }

  queryparam(data:any){
    this.router.navigate(data?.subchild?.length>0?['/bcil/design-dashboard']:['/bcil/bcil-design-table'],  { queryParams: {stage:data?.subchild?.length>0?data.substage:data.stage, type: data.type}});
  
  // return  '{type:'+data+'}'
  }

}
