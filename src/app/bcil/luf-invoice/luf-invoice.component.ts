import { Component, OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timeline } from 'console';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { commondata } from 'src/app/model/common';
import { activeusermou, LufInvoiceModel } from 'src/app/model/mou.model';
import { milestones, UploadFileViewModel } from 'src/app/model/uploadFile.model';
import { User } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { Utilities } from 'src/app/services/utilities';

@Component({
  selector: 'app-luf-invoice',
  templateUrl: './luf-invoice.component.html',
  styleUrls: ['./luf-invoice.component.scss']
})
export class LufInvoiceComponent implements OnInit {
  @ViewChild('editorModal2', { static: true })
  editorModal: ModalDirective;
  invoice=new LufInvoiceModel();
  ForwardForm: FormGroup;
  loading:boolean=false;
  submitted:boolean=false;
  selectedorg:string;
  Organization:any[];
  rowactivity:any[]=[{name:'activity 1'},{name:'activity 2'},{name:'activity 3'},{name:'activity 4'},{name:'activity 5'}]
  constructor(private route: ActivatedRoute,private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder,  private accountService: AccountService, private router: Router) { 
  }

  ngOnInit(): void {
    this.ForwardForm = this.formbuilder.group({

      invoiceno: ['', Validators.required],
      invoicedate: ['', Validators.required],
      clientname:[],
      files:[''],
      applicationno:[''],
      activity:[''],
      officialdata:this.formbuilder.array([this.officialFormGroup()]),
      professionaldata:this.formbuilder.array([this.ProfessionFormGroup()]),
      disbursementdata:this.formbuilder.array([this.DisbursementFormGroup()])
    });
  }
  showviewmodel(e?:string,value?:string,data?:any){
    this.invoice.app_status=value;
this.loading=false;
this.Bdoservice.Getorganization('all').subscribe(data=>{
  this.Organization=data;
  //this.selectedorg=this.Organization[0]?.value;
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

  //offical
  addOfficialItem(): void {
    (<FormArray>this.ForwardForm.get('officialdata')).push(this.officialFormGroup());
  }
  officialFormGroup(): FormGroup {
    return this.formbuilder.group({
      ID: [0],
      date: [''],
      description: [''],
      price: [''],
     
    });
  }
  get officialdata(): FormArray {
return this.ForwardForm.get('officialdata') as FormArray;
}
deleteOfficiaItem(deleteitem: number) {
var item = this.officialdata.at(deleteitem);
var items = item.get('ID').value;

var conf = confirm("Are you sure you want to delete this ?");
if (conf == true) {
   (<FormArray>this.ForwardForm.get('officialdata')).removeAt(deleteitem);
  }
  }
  //end offical
  //profeesional
  addProfessionalItem(): void {
    (<FormArray>this.ForwardForm.get('professionaldata')).push(this.ProfessionFormGroup());
  }
  ProfessionFormGroup(): FormGroup {
    return this.formbuilder.group({
      ID: [0],
      date: [''],
      description: [''],
      price: [''],
     
    });
  }
  get professionaldata(): FormArray {
return this.ForwardForm.get('professionaldata') as FormArray;
}
deleteProfessionaltem(deleteitem: number) {
var item = this.professionaldata.at(deleteitem);
var items = item.get('ID').value;

var conf = confirm("Are you sure you want to delete this ?");
if (conf == true) {
   (<FormArray>this.ForwardForm.get('professionaldata')).removeAt(deleteitem);
  }
  }
  //end professional
  //disbursement
  addDisbursementItem(): void {
    (<FormArray>this.ForwardForm.get('disbursementdata')).push(this.officialFormGroup());
  }
  DisbursementFormGroup(): FormGroup {
    return this.formbuilder.group({
      ID: [0],
      date: [''],
      description: [''],
      price: [''],
     
    });
  }
  get disbursementdata(): FormArray {
return this.ForwardForm.get('disbursementdata') as FormArray;
}
deletedisbursementItem(deleteitem: number) {
var item = this.disbursementdata.at(deleteitem);
var items = item.get('ID').value;

var conf = confirm("Are you sure you want to delete this ?");
if (conf == true) {
   (<FormArray>this.ForwardForm.get('disbursementdata')).removeAt(deleteitem);
  }
  }

  //end disbursement
  uploadClientFile(){
    this.invoice.invoiceno= this.ForwardForm.get('invoiceno').value;
    this.invoice.invoicedate= this.ForwardForm.get('invoicedate').value;
    this.invoice.applicationno= this.ForwardForm.get('applicationno').value;
  
   // let act=this.ForwardForm.get('activity').value?.map(t=>({id==t.name}));
    this.invoice.activity= this.ForwardForm.get('activity').value;//this.triggerinvoice.map(t=>({t.name==this.ForwardForm.get('activity').value});
    this.invoice.organization=this.ForwardForm.get('clientname').value;

    var tt=[];
    for (let arr of  this.ForwardForm.get('disbursementdata').value) {
      tt.push({date:arr['date'],description:arr['description'],price:arr['price'].toString(),type:"dis"});
    }
    for (let arr of  this.ForwardForm.get('professionaldata').value) {
      tt.push({date:arr['date'],description:arr['description'],price:arr['price'].toString(),type:"pro"}); }
    for (let arr of  this.ForwardForm.get('officialdata').value) {
      tt.push({date:arr['date'],description:arr['description'],price:arr['price'].toString(),type:"off"});  
     }
   this.invoice.luffeeinvoice= JSON.stringify(tt.filter(t=>t.description!=""));

   console.log(this.invoice,'pp');
    //this.invoice.invoiceno= this.ForwardForm.get('subject').value;
      if (this.ForwardForm.invalid) {
  return;
}

this.loading=true;
    this.Bdoservice.lufinvoice(this.invoice).subscribe((data) => {
     //  this.loading=false;
       this.submitted=false;
if(data.message=="success"){
      alert("Submitted Successfully")
     
      this.editorModal.hide();
}
});

  }
}
