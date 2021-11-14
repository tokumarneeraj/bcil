import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { ActivityComponent } from '../activity/activity.component';
import { Bdoservice } from 'src/app/services/bdo.service';

@Component({
  selector: 'app-trademark',
  templateUrl: './trademark.component.html',
  styleUrls: ['./trademark.component.scss']
})
export class TrademarkComponent implements OnInit {

trademarkdata:any;
  viewtab:any;
  commondata=new commondata();
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  activeusermou:activeusermou[];
  trademarkModel:any[];
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
  createact:boolean=false;
  array:any;//{"tablename":"Create Activity"}
  constructor(private route: ActivatedRoute,private Bdoservice:Bdoservice,private router:Router, private accountService: AccountService,) {
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
   
    this.isIPM = this.userRoles.includes('IPM');
  this.isSuperAdmin=this.userRoles.includes('Super Admin');
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
   ngOnInit(): void {

   
   
    this.viewtab=this.commondata.getotherpermissiondata('view').map((item)=>(item.split('-')[1]));
   
    this.Bdoservice.getdatapermission().subscribe(data=>{
      this.createact=data?.tabheading?.find(y=>y.stage=='trademark')?.activity?.includes(this.userRoles[0]);
      console.log(data);
      this.array=data?.tabheading?.find(y=>y.stage=="trademark")
      this.route.queryParams.subscribe((params) => {
let yy=["trademark_common_ip","trademark_er_er","trademark_er_accp"]
if(yy.includes(params?.stage)){
  
  this.trademarkdata=data?.trademark?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));

}
else{
        this.trademarkdata=data?.trademark?.filter(x=>this.viewtab.find(y=>y==x.value)|| x?.subchild?.some(t=>this.viewtab.find(y=>y==t.value)));
}

      });
     

    })
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetTrademarkModel().subscribe(data => {
      console.log(data)
      this.trademarkModel = data;
      this.showpage = true;
    })
  });
  }
trademarklistfilter(data) {
  let yy=["trademark_common_ip","trademark_er_er","trademark_er_accp"]
  if(this.isSuperAdmin){
    return this.trademarkModel?.filter(x=>(yy.includes(data)?this.trademarkdata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_Status):x.app_Status==data) ).length;
  }
  
  else{
    return this.trademarkModel?.filter(x=>(yy.includes(data)?this.trademarkdata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_Status):x.app_Status==data) && this.activeusermou?.some(t=>t.appref==x.refid) ).length;
  }
   
}

  createactivity(){
this.activity.showviewmodel('','S680');
  }

  queryparam(data:any){
    this.router.navigate(data?.subchild?.length>0?['/bcil/trademark-dashboard']:['/bcil/bcil-trademark-table'],  { queryParams: {stage:data?.subchild?.length>0?data.substage:data.stage, type: data.type}});
  
  // return  '{type:'+data+'}'
  }


}
