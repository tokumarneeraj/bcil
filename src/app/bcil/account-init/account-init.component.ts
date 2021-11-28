import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService, DialogType } from 'src/app/services/alert.service';
import { ActivityComponent } from '../activity/activity.component';
import { AdditionFileComponent } from '../addition-file/addition-file.component';
import { Bdoservice } from 'src/app/services/bdo.service';
import { ClientInvoiceComponent } from '../client-invoice/client-invoice.component';

@Component({
  selector: 'app-account-init',
  templateUrl: './account-init.component.html',
  styleUrls: ['./account-init.component.scss']
})
export class AccountInitComponent implements OnInit {

  showpage:boolean;
  accountdata:any;
  lufInvocie:any[];
  ClientInvoiceModel:any[];
  type:string;
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
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  @ViewChild(ClientInvoiceComponent)
  clientinvoice: ClientInvoiceComponent;
  array:any;
  activuser:activeusermou[];
  activebtn:any;
  commondata=new commondata();
  activeusermou:activeusermou[];
  @ViewChild(AdditionFileComponent)
  AdditionFile: AdditionFileComponent;
  accountModel:any[];
  viewtab:any;
  managetab:any;
  viewhistory:any;
  viewremark:any;
  stage:string;
  viewadditionalfileright:boolean;
  invoicetriggerModel:any[];
  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;
  constructor(private route: ActivatedRoute,private alertService: AlertService,private accountService: AccountService,private Bdoservice:Bdoservice,private router:Router


  ) {
    this.userRoles = this.accountService.currentUser.roles;


  }

  viewadditionalfile(data:any){
    this.AdditionFile.showviewmodel(data,true,"account");
  }
  remarksview(data:any){
    this.alertService.showDialog(data,DialogType.alert);

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
  clientinvoicepopup(data){
    this.clientinvoice.showviewmodel('','S806',data);
      }
  onmodalclick(e: string,value:any, data: any) {
    if(value=="S815"){
    var clientin=[];
    this.Bdoservice.GetClientInvoice('all').subscribe(data1 => {
      clientin=data1.filter(y=>y.app_status=='S809' && y.active==true && y.lufmapped==null);
      data={...data,clientinvoice:clientin};
      this.activity.showviewmodel('account',value,data);
    });
  }
  else{
  
    this.activity.showviewmodel('account',value,data);
  }
  console.log(data,'pp')
   this.activebtn=this.array?.button?.find(x=>x.value==value);

  
   
  }
  ngOnInit(): void {
    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBdm = this.userRoles.includes('BDM');
    this.isNodal = this.userRoles.includes('Nodal'); 
    
    this.isScientist=this.userRoles.includes('Scientist');
  this.isIPM=this.userRoles.includes('IPM');
  this.isSuperAdmin=this.userRoles.includes('Super Admin');
  
    this.viewadditionalfileright=this.commondata.CanviewadditionalfilesPermission;
    this.viewtab=this.commondata.getotherpermissiondata('view').map((item)=>(item.split('-')[1]));
        this.managetab=this.commondata.getotherpermissiondata('manage').map((item)=>(item.split('-')[1]));
        this.Bdoservice.getdatapermission().subscribe(data=>{
          console.log(data);
          
          this.accountdata=data?.account?.filter(x=>this.viewtab.find(y=>y==x.value));
          //this.moudata=data?.mou?.filter(x=>this.managetab.find(y=>y==x.value));
          this.route.queryParams.subscribe((params) => {
            let yy=["client_invoice","luf_invoice"]
            this.stage=params.stage;
            if(yy.includes(params.stage)){
      
              this.accountdata=data?.account?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));
      
            }
            else{
            this.accountdata=data?.account?.filter(x=>this.viewtab.find(y=>y==x.value));
            }
               this.array=this.accountdata.find(x => x.type == params.type);
               console.log(this.array,'arr')
             this.managetab.some(x=>x==this.array.value)?null:this.array={...this.array,button:[]};//this.array?.find(x=>this.managetab?.find(y=>y==x.value)); 
           
         
      
          })
      
      
          
    
       
    
   
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
   //  if(this.array?.value=="S805"){
      this.Bdoservice.GetAllInvoiceTrigger('all').subscribe(data => {
this.invoicetriggerModel=data;
      });
  //  }
//if(this.array?.value=="S112"){
this.Bdoservice.GetLufInvoice('all').subscribe(data => {
     this.lufInvocie=data;
     if(this.isSuperAdmin){
      this.lufInvocie = data.filter(x => x.app_status == this.array?.value);
    }


  else {
     this.lufInvocie= data.filter(x=>x.app_status== this.array?.value && this.activeusermou?.some(t=>t.appref==x.refid));;

     }
    console.log(this.lufInvocie,'lu')
    
  this.viewhistory=this.commondata.getotherpermissiondata('history').some(x=>x?.split('-')[1]==this.array?.value);
     this.viewremark= this.commondata.getotherpermissiondata('remark').some(x=>x?.split('-')[1]==this.array?.value);
     //this.emailpermission=this.commondata.getotherpermissiondata('email').some(x=>x?.split('-')[1]==this.type);
   // this.viewadditionfile= this.commondata.getotherpermissiondata('addfile').some(x=>x?.split('-')[1]==this.type);
    
      this.showpage = true;


     
    });
  //}
  //if(this.array?.value=="S806"){
    this.Bdoservice.GetClientInvoice('all').subscribe(data => {
      if(this.isSuperAdmin){
        this.accountModel = data.filter(x => x.app_status == this.array?.value);
      }
  

    else {
       this.accountModel= data.filter(x=>x.app_status== this.array?.value && this.activeusermou?.some(t=>t.appref==x.refid));

       }
      console.log(this.accountModel,'acc')
      
    this.viewhistory=this.commondata.getotherpermissiondata('history').some(x=>x?.split('-')[1]==this.array?.value);
       this.viewremark= this.commondata.getotherpermissiondata('remark').some(x=>x?.split('-')[1]==this.array?.value);
       //this.emailpermission=this.commondata.getotherpermissiondata('email').some(x=>x?.split('-')[1]==this.type);
     // this.viewadditionfile= this.commondata.getotherpermissiondata('addfile').some(x=>x?.split('-')[1]==this.type);
      
        this.showpage = true;


    }
    );
  
  

     // }
      });
    })
    }
  
    }



