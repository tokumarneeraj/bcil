import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { activeusermou, booleanvalue, mouModel } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { environment } from 'src/environments/environment';
import { ActivityComponent } from '../activity/activity.component';
import { AdditionFileComponent } from '../addition-file/addition-file.component';
import { ClientInvoiceComponent } from '../client-invoice/client-invoice.component';
import { LufInvoiceComponent } from '../luf-invoice/luf-invoice.component';

@Component({
  selector: 'app-mou-application',
  templateUrl: './mou-application.component.html',
  styleUrls: ['./mou-application.component.scss']
})
export class MouApplicationComponent implements OnInit {
  activeusermou:activeusermou[];
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  array:any;
//   mouModel:mouModel[]=[];
//   misModel:any[];
//   patentModel:any[];
//   trademarkModel:any[];
//   copyrightModel:any[];
//   designModel:any[];
// ttaModel:any[];
booleanlist:any[];
Checkbox:any[];
submitted:boolean=false;
booleanvalue=new booleanvalue();
activeuserModel:any[];
@ViewChild('editorModal3', { static: true })
  editorModal3: ModalDirective;
  @ViewChild('editorModal4', { static: true })
  editorModal4: ModalDirective;
  @ViewChild('editorModal5', { static: true })
  editorModal5: ModalDirective;
mouModel:any[];
clientinvoiceModel:any[];
lufinvoiceModel:any[];
ForwardForm: FormGroup;
  showpage:boolean=false;
  isSuperAdmin:boolean=false;
  isAdmin:boolean;
  isNodal:boolean=false;
  isBDM: boolean;
  isLM:boolean;
  isIPM:boolean;
  userRoles:string[];
  stage:string;
  getbaseurl=environment.baseUrl;
   @ViewChild(ClientInvoiceComponent)
  clientinvoice: ClientInvoiceComponent;
  @ViewChild(LufInvoiceComponent)
  lufinvoice: LufInvoiceComponent;
  @ViewChild(AdditionFileComponent)
  AdditionFile: AdditionFileComponent;
  datapermission:any;
  tabdata:any;
  constructor(private route: ActivatedRoute,private router:Router, private Bdoservice: Bdoservice,private accountService:AccountService, private formbuilder: FormBuilder) { 
    this.userRoles = this.accountService.currentUser.roles;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBDM = this.userRoles.includes('BDM');
    this.isIPM = this.userRoles.includes('IPM');
    this.isSuperAdmin=this.userRoles.includes('Super Admin');
    this.route.queryParams.subscribe((params) => {
this.stage=params.stage;
this.Bdoservice.getdatapermission().subscribe(data=>{
          this.datapermission=data;
this.array=data?.[this.stage].find(x=>x.type=='rejected');
 });
    });
  }
  onmodalclick(e,value,data:any){
     
          console.log(data);
       
         
    this.activity.showviewmodel(this.stage, value,data);
    //this.activebtn=this.array?.button?.find(x=>x.value==value);

    // this.Bdoservice.RejectApp(data?.refid).subscribe(data=>{

      
    
  }
  get f() { return this.ForwardForm.controls; }
  additionfile(data:any){
    
    this.AdditionFile.showmodel(data,this.stage);
  }
  activeuser(data:any){

this.Bdoservice.GetActiveUserMoubyrefid(data?.refid).subscribe(data=>{
  this.activeuserModel=data;
  this.editorModal3.show();
  console.log(data);
})
  }
  queryparam(data:any){
    this.router.navigate(['/bcil/file-history'],  { queryParams: {stage:this.stage, refid: data.refid}});
  
  
  }
  viewform(data:any){
    if(this.stage=="luf_invoice"){
    this.lufinvoice.showviewmodel("view","",data);
    }
    else if(this.stage=="client_invoice"){
      this.clientinvoice.showviewmodel("view","",data);
    }
  }
  boolvalues(data:any){
    this.editorModal4.show();
this.booleanvalue.refid=data?.refid;
this.Bdoservice.GetBoolvalues(data?.refid).subscribe(data=>{
  this.booleanlist=data;
  console.log(data);
})
  }
  checkboolean(e,data:any){
    //alert(e);
    console.log(e)
if(e.target.checked==true){
  if(confirm("Are You Sure You Want To Update Value")){
   // this.booleanvalue.refid=data?.refid;
    this.booleanvalue.stagevalue=data?.stagevalue;
    this.booleanvalue.boolvalue=true;
    this.Bdoservice.updatebooleanvalue(this.booleanvalue).subscribe(data=>{
      //this..r=data;
     
      alert("Data Save Successfully")
      this.editorModal4.hide();
      //console.log(data);
    })
  }
}
  }
  ngOnInit(): void {
    this.ForwardForm = this.formbuilder.group({

      subject: ['', Validators.required],
      remarks: ['', Validators.required]
    });
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
      if(this.stage=='mou'){
    this.Bdoservice.GetMou().subscribe(data => {
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
    
      this.showpage=true;
  });
  }
  if(this.stage=='tta'){
    this.Bdoservice.GetTtaModel().subscribe(data => {
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
    
      this.showpage=true;
  });
  }
  if(this.stage=='luf_invoice'){
    this.Bdoservice.GetLufInvoice('all').subscribe(data => {
      let datepipe=new DatePipe('en-US');
      data=data?.map((item,i)=>({...item,invoicedate:datepipe.transform(item?.invoicedate,'dd/MM/yyyy')}));
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
    
      this.showpage=true;
  });
  }
  if(this.stage=='client_invoice'){
    this.Bdoservice.GetClientInvoice('all').subscribe(data => {
      let datepipe=new DatePipe('en-US');
      data=data?.map((item,i)=>({...item,invoicedate:datepipe.transform(item?.invoicedate,'dd/MM/yyyy')}));
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
    
      this.showpage=true;
  });
  }
  if(this.stage=='mis'){
    this.Bdoservice.GetMis().subscribe(data => {
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
    
      this.showpage=true;
  });
  }
  if(this.stage=='patent'){
    this.Bdoservice.GetPatentModel().subscribe(data => {
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
    
      this.showpage=true;
  });
  }
  if(this.stage=='plant_variety'){
    this.Bdoservice.GetPlantvarietyModel().subscribe(data => {
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
    
      this.showpage=true;
  });
  }
  if(this.stage=='copyright'){
    this.Bdoservice.GetTrademarkModel().subscribe(data => {
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
    
      this.showpage=true;
  });
  }
  if(this.stage=='design'){
    this.Bdoservice.GetDesignModel().subscribe(data => {
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
    
      this.showpage=true;
  });
  }
  if(this.stage=='trademark'){
    this.Bdoservice.GetTrademarkModel().subscribe(data => {
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
    
      this.showpage=true;
  });
  }
});
  }

}
