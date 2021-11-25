
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { ActivityComponent } from '../activity/activity.component';
import { Bdoservice } from 'src/app/services/bdo.service';
import { LufInvoiceComponent } from '../luf-invoice/luf-invoice.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accountdata:any;
  viewtab:any;
  commondata=new commondata();
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;

  @ViewChild(LufInvoiceComponent)
  lufinvoice: LufInvoiceComponent;
  activeusermou:activeusermou[];
  accountModel:any[];
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

createact:boolean=false;
  constructor(private route: ActivatedRoute,private Bdoservice:Bdoservice,private router:Router, private accountService: AccountService,) {
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isNodal=this.userRoles.includes('Nodal');
   this.isScientist=this.userRoles.includes('Scientist');
    this.isIPM = this.userRoles.includes('IPM');
  this.isSuperAdmin=this.userRoles.includes('Super Admin');
   }

   ngOnInit(): void {

   
   
    this.viewtab=this.commondata.getotherpermissiondata('view').map((item)=>(item.split('-')[1]));
   
    this.Bdoservice.getdatapermission().subscribe(data=>{
      console.log(data);
      this.array=data?.tabheading?.find(y=>y.stage=="account")
      
      this.createact=data?.tabheading?.find(y=>y.stage=='account')?.activity?.includes(this.userRoles[0]);
      this.route.queryParams.subscribe((params) => {
let yy=["client_invoice","luf_invoice"]
if(yy.includes(params?.stage)){
  
  this.accountdata=data?.account?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));

}
else{
        this.accountdata=data?.account?.filter(x=>this.viewtab.find(y=>y==x.value)|| x?.subchild?.some(t=>this.viewtab.find(y=>y==t.value)));
}

      });
     

    })
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetAllInvoiceTrigger("all").subscribe(data => {
      console.log(data)
      this.accountModel = data;
      this.showpage = true;
    })
  });
  }
  accountlistfilter(data) {
   
    let yy=["client_invoice","luf_invoice"]
  if(this.isSuperAdmin){
    return this.accountModel?.filter(x=>(yy.includes(data)?this.accountdata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_Status):x.app_Status==data) ).length;
  }
  
  else{
    return this.accountModel;
  //  return this.accountModel?.filter(x=>(yy.includes(data)?this.accountdata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_Status):x.app_Status==data) && this.activeusermou?.some(t=>t.appref==x.refid) ).length;
  }
   
}

  createactivity(){
this.lufinvoice.showviewmodel('','S755');
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
    this.router.navigate(data?.subchild?.length>0?['/bcil/account-dashboard']:['/bcil/bcil-account-table'],  { queryParams: {stage:data?.subchild?.length>0?data.substage:data.stage, type: data.type}});
  
  // return  '{type:'+data+'}'
  }


}
