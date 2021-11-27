import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { activeusermou, mouModel } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { Bdoservice } from 'src/app/services/bdo.service';
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
//   mouModel:mouModel[]=[];
//   misModel:any[];
//   patentModel:any[];
//   trademarkModel:any[];
//   copyrightModel:any[];
//   designModel:any[];
// ttaModel:any[];
booleanlist:any[];
activeuserModel:any[];
@ViewChild('editorModal3', { static: true })
  editorModal3: ModalDirective;
  @ViewChild('editorModal4', { static: true })
  editorModal4: ModalDirective;
mouModel:any[];
clientinvoiceModel:any[];
lufinvoiceModel:any[];
  showpage:boolean=false;
  isSuperAdmin:boolean=false;
  userRoles:string[];
  stage:string;
   @ViewChild(ClientInvoiceComponent)
  clientinvoice: ClientInvoiceComponent;
  @ViewChild(LufInvoiceComponent)
  lufinvoice: LufInvoiceComponent;
  @ViewChild(AdditionFileComponent)
  AdditionFile: AdditionFileComponent;
  constructor(private route: ActivatedRoute, private Bdoservice: Bdoservice,private accountService:AccountService, private formbuilder: FormBuilder) { 
    this.userRoles = this.accountService.currentUser.roles;

    this.isSuperAdmin=this.userRoles.includes('Super Admin');
    this.route.queryParams.subscribe((params) => {
this.stage=params.stage;
    });
  }
  additionfile(data:any){
    
    this.AdditionFile.showmodel(data,this.stage);
  }
  activeuser(data:any){
this.editorModal3.show();
this.Bdoservice.GetActiveUserMoubyrefid(data?.refid).subscribe(data=>{
  this.activeuserModel=data;
  console.log(data);
})
  }
  viewform(data:any){
    if(this.stage=="luf_invoice"){
    this.lufinvoice.showviewmodel("edit","",data);
    }
    else if(this.stage=="client_invoice"){
      this.clientinvoice.showviewmodel("edit","",data);
    }
  }
  ngOnInit(): void {
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
  if(this.stage=='luf_invoice'){
    this.Bdoservice.GetLufInvoice('all').subscribe(data => {
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
