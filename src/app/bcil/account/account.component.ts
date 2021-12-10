
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
  triggerinvoiceModel:any[];
  commondata=new commondata();
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;

  @ViewChild(LufInvoiceComponent)
  lufinvoice: LufInvoiceComponent;
  activeusermou:activeusermou[];
  accountModel:any[];
  lufModel:any[];
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
  stage:string;
  array={"tablename":"Create Activity"}

createact:boolean=false;
public changesSavedCallback: () => void;
public changesFailedCallback: () => void;
public changesCancelledCallback: () => void;
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
        this.stage=params?.stage;
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
      this.Bdoservice.GetClientInvoice("all").subscribe(data => {
        this.accountModel = data;
      });

      this.Bdoservice.GetLufInvoice("all").subscribe(data => {
        this.lufModel = data;
      });
      
    this.Bdoservice.GetAllInvoiceTrigger("all").subscribe(data => {
      console.log(data)
      this.triggerinvoiceModel=data.filter(tt=>tt.active==true);
    
      this.showpage = true;
    })
  });
  }
  queryparamclient(data:any){

    this.router.navigate(['/bcil/bcil-account-table'],  { queryParams: {stage:'client_invoice', type: data}});
  
  }
  clientlistfilter(data){
    return this.accountModel?.filter(x=>(data=='pending')?x.app_status=='S808':(data=='paid')?(x.app_status=='S809' ||x.app_status=='S810' || x.app_status=='S811'):null).length;
  
  }
  accountlistfilter(data) {
   
    let yy=["client_invoice","luf_invoice"]

  
   if(this.stage=="luf_invoice"){
    return this.lufModel?.filter(x=>(yy.includes(data)?this.accountdata?.find(t=>t.substage==this.stage)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_status):x.app_status==data) && this.activeusermou?.some(t=>t.appref==x.refid) ).length;
  
   }
   else if(this.stage=="client_invoice"){
    return this.accountModel?.filter(x=>x.app_status==data)?.length+ (data=="S805" ?this.triggerinvoiceModel?.length:0);
  
   }
   else{
    //return this.accountModel.length + this.triggerinvoiceModel?.length;
   return  (data=="client_invoice"? this.accountModel?.length+this.triggerinvoiceModel?.length:0)
   +this.lufModel?.filter(x=>(yy.includes(data)?this.accountdata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_status):x.app_status==data) && this.activeusermou?.some(t=>t.appref==x.refid) ).length ;
  }

   
}

  createactivity(){
this.lufinvoice.showviewmodel('','S812');
  }
  ngAfterViewInit() {

    this.activity.changesSavedCallback = () => {
      //this.addNewRoleToList();
      this.ngOnInit();
    };
    this.lufinvoice.changesSavedCallback = () => {
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
