import { analyzeAndValidateNgModules, ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { ActivityComponent } from '../activity/activity.component';


@Component({
  selector: 'app-mis-dashboard',
  templateUrl: './mis-dashboard.component.html',
  styleUrls: ['./mis-dashboard.component.scss']
})
export class MisDashboardComponent implements OnInit {
  misdata:any;
  viewtab:any;
  commondata=new commondata();
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  activeusermou:activeusermou[];
  misModel:any[];
  showpage:boolean=false;
  UserId: string;
  userRoles: string[];
  isAdmin: boolean;
  formHeader: string;
  isBdm: boolean;
  isScientist:boolean;
  isNodal: boolean;
  isLM: boolean;
  milestonearray:any[];
  milestonedata:any;
  isSuperAdmin: boolean;
  isIPM:boolean;
  stage:string;
  array:any;//{"tablename":"Create Activity","organization":true,"getscientist":true,"assignlabel":"Assign Scientist","assignarray":['Scientist']}
  constructor(private route:ActivatedRoute,private Bdoservice:Bdoservice,private router:Router, private accountService: AccountService,) {
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
        this.stage=params?.stage;
        let yy=["milestones"]
        if(yy.includes(params?.stage)){
          
          this.misdata=data?.mis?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));
        
        }
        else{
                this.misdata=data?.mis?.filter(x=>this.viewtab.find(y=>y==x.value)|| x?.subchild?.some(t=>this.viewtab.find(y=>y==t.value)));
        }
        this.milestonedata=data?.milestones;
        console.log(this.misdata,'uu')
              });
             
      this.array=data?.tabheading?.find(y=>y.stage=="mis")
      //this.misdata=data?.mis?.filter(x=>this.viewtab.find(y=>y==x.value));

    })
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetMis().subscribe(data => {
      this.Bdoservice.GetAllMilestone().subscribe(datamilestone=>{
this.milestonearray=datamilestone;
      })
      console.log(data)
      this.misModel = data;
      this.showpage = true;
    })
  });
  }
   ngAfterViewInit() {

    this.activity.changesSavedCallback = () => {
      //this.addNewRoleToList();
      this.ngOnInit();
    };
  
    // this.roleEditor.changesCancelledCallback = () => {
    //   this.editedRole = null;
    //   this.sourceRole = null;
    //   this.editorModal.hide();
    // };
  }
  mislistfilter(data) {
   if(data=="milestones"){
    if(this.isSuperAdmin){
      return this.milestonearray?.filter(x=>this.milestonedata[0]?.status.find(t=>t==x.app_status)).length;
    }
   
    else{
      return this.milestonearray?.filter(x=>(this.milestonedata[0]?.status.find(t=>t==x.app_status))&& this.activeusermou?.some(t=>t.appref==x.refid)).length;
    }
   }
   else{
    if(this.isSuperAdmin){
      if(this.stage=="milestones"){

        return this.milestonearray?.filter(x=>x.app_status==data).length;
      }
      else{
      return this.misModel?.filter(x=>x.app_Status==data).length;
      }
    }
   
    else{
      if(this.stage=="milestones"){
        return this.milestonearray?.filter(x=>(x.app_status==data )&& this.activeusermou?.some(t=>t.appref==x.refid)).length;
      }else{
      return this.misModel?.filter(x=>(x.app_Status==data )&& this.activeusermou?.some(t=>t.appref==x.refid)).length;
      }
    }
  }
}

  createactivity(){
this.activity.showviewmodel('','S170');
  }

  queryparam(data:any){
    this.router.navigate(data?.subchild?.length>0?['/bcil/mis-dashboard']:['/bcil/bcil-mis-table'],  { queryParams: {stage:data?.subchild?.length>0?data.substage:data.stage, type: data.type}});
   
    //this.router.navigate(['./bcil/bcil-mis-table'], { queryParams: { type: data} });
  // return  '{type:'+data+'}'
  }

}
