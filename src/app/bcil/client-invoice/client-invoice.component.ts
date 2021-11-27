import { Component, OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timeline } from 'console';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { commondata } from 'src/app/model/common';
import { activeusermou, clientInvoiceModel } from 'src/app/model/mou.model';
import { milestones, UploadFileViewModel } from 'src/app/model/uploadFile.model';
import { User } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { Utilities } from 'src/app/services/utilities';

@Component({
  selector: 'app-client-invoice',
  templateUrl: './client-invoice.component.html',
  styleUrls: ['./client-invoice.component.scss']
})
export class ClientInvoiceComponent implements OnInit {
  @ViewChild('editorModal2', { static: true })
  editorModal: ModalDirective;
  Organization:any[];
  triggerinvoice:any[];
  invoice=new clientInvoiceModel();
  ForwardForm: FormGroup;
  loading:boolean=false;
  submitted:boolean=false;
  selectedorg:string;
  rowactivity:any[]=[];
  constructor(private route: ActivatedRoute,private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder,  private accountService: AccountService, private router: Router) { 
  }

  ngOnInit(): void {
    this.ForwardForm = this.formbuilder.group({

      invoiceno: ['', Validators.required],
      invoicedate: ['', Validators.required],
      applicationno: ['', Validators.required],
      clientname:[],
      files:[''],
      activity:[''],
     
    });
  }
  showviewmodel(e?:string,value?:string,data?:any){
    this.invoice.app_status=value;
    this.Bdoservice.Getorganization(data?.appref).subscribe(data=>{
      this.Organization=data;
      this.selectedorg=this.Organization[0]?.value;
    })
    this.Bdoservice.GetAllInvoiceTrigger('all').subscribe(data=>{
      this.triggerinvoice=data.filter(x=>x.organization==this.Organization[0]?.value);

      this.rowactivity=this.triggerinvoice.map(u=>({id:u.refid,name:u.appno+"("+u.activityref+")"  + (u.milestoneref==null?"":"("+u.milestoneref+")")}))
   console.log(this.rowactivity)
    })
    this.editorModal.show();
      }
      fileChangeEvent(event){
        if (event.target.files && event.target.files[0]) {
          this.ForwardForm.get('files').setValue("vgv");
          const fileUpload = event.target.files[0];
          const filee = fileUpload.files;
          if( fileUpload.size<=30*1024*1024){
          this.invoice.filename = fileUpload.name;
    
          const sFileExtension = fileUpload.name
            .split('.')
          [fileUpload.name.split('.').length - 1].toLowerCase();
          Utilities.getBase64(event.target.files[0]).then((data) => {
            console.log(data);
          //  this.UploadFileViewModel.fileType = '.' + sFileExtension;
    
            let data1: any = data;
            let contentType = data1?.split(',')[1];
    
            this.invoice.url = contentType;
          });
        }
        
          else{
            this.ForwardForm.get('files').setValue("");
            alert("File Size Should be less than 30 MB")
          
        }
        }
      }
      get f() { return this.ForwardForm.controls; }
      uploadClientFile(){
        this.invoice.invoiceno= this.ForwardForm.get('invoiceno').value;
        this.invoice.invoicedate= this.ForwardForm.get('invoicedate').value;
        this.invoice.applicationno= this.ForwardForm.get('applicationno').value;
      
        let act=[];//this.ForwardForm.get('activity').value?.map(t=>({id==t.name}));
        for(let rr of this.ForwardForm.get('activity').value){
          act.push(this.rowactivity.find(r=>r.name==rr)?.id);
        }
        this.invoice.activity= act;//this.ForwardForm.get('activity').value;//this.triggerinvoice.map(t=>({t.name==this.ForwardForm.get('activity').value});
        this.invoice.organization=this.ForwardForm.get('clientname').value;
       // this.invoice.invoiceno= this.ForwardForm.get('subject').value;
        //this.invoice.invoiceno= this.ForwardForm.get('subject').value;
       
          if (this.ForwardForm.invalid) {
      return;
    }

    this.loading=true;
        this.Bdoservice.clientinvoice(this.invoice).subscribe((data) => {
         //  this.loading=false;
           this.submitted=false;
    if(data.message=="success"){
          alert("Submitted Successfully")
         
          this.editorModal.hide();
          this.router.navigateByUrl('bcil/account-dashboard')
    }
  },error=>{
    this.loading=true;
    this.submitted=false;
    this.editorModal.hide();
  });

      }
    
}
