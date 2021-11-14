import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { ActivityComponent } from '../activity/activity.component';
import { Bdoservice } from 'src/app/services/bdo.service';

@Component({
  selector: 'app-patent',
  templateUrl: './patent.component.html',
  styleUrls: ['./patent.component.scss']
})
export class PatentComponent implements OnInit {
  patentdata:any;
  viewtab:any;
  commondata=new commondata();
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  activeusermou:activeusermou[];
  patentModel:any[];
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
  showactivity:boolean=true;
  stagevalue='S601';
  array:any;//{"tablename":"Create Activity"}
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
      this.array=data?.tabheading?.find(y=>y.stage=="patent")
      this.route.queryParams.subscribe((params) => {
let yy=["patentdraft","patentfinalfiling","patentforeignfiling","patentrequiredforexamination","patentfirstexamreport","ertoacceptancepatent"]
if(yy.includes(params?.stage)){
  // if(params?.stage=='patentforeignfiling'){
  //   this.showactivity=true;
  //   this.stagevalue="S666";
  // this.array={"tablename":"Create Foreign Filing"}
  
  
  // }
  // else{
  //   this.showactivity=false;
  // }
  this.showactivity=false;
  this.patentdata=data?.patent?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));

}
else{
  this.showactivity=true;
  this.stagevalue="S601";
  this.array={"tablename":"Create Activity"}
        this.patentdata=data?.patent?.filter(x=>this.viewtab.find(y=>y==x.value)|| x?.subchild?.some(t=>this.viewtab.find(y=>y==t.value)));
}

      });
     

    })
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetPatentModel().subscribe(data => {
      console.log(data)
      this.patentModel = data;
      this.showpage = true;
    })
  });
   
  }
  patentlistfilter(data) {
   
    let yy=["patentdraft","patentfinalfiling","patentforeignfiling","patentrequiredforexamination","patentfirstexamreport","ertoacceptancepatent"]

    if(this.isSuperAdmin){
      return this.patentModel?.filter(x=>(yy.includes(data)?this.patentdata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_Status):x.app_Status==data) ).length;
    }
    
    else{
      return this.patentModel?.filter(x=>(yy.includes(data)?this.patentdata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_Status):x.app_Status==data) && this.activeusermou?.some(t=>t.appref==x.refid) ).length;
    }
   
}

  createactivity(){
this.activity.showviewmodel('',this.stagevalue);
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

  queryparam(data:any){
      // }
      this.router.navigate(data?.subchild?.length>0?['/bcil/patent-dashboard']:['/bcil/bcil-patent-table'],  { queryParams: {stage:data?.subchild?.length>0?data.substage:data.stage, type: data.type}});
  
    //this.router.navigate(['./bcil/bcil-patent-table'], { queryParams: { type: data} });
  // return  '{type:'+data+'}'
  }


}
