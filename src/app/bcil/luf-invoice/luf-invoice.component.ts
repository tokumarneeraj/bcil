import { Component, OnInit,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timeline } from 'console';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
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
  ForwardForm: FormGroup;
  loading:boolean=false;
  submitted:boolean=false;
  rowactivity:any[]=[{name:'activity 1'},{name:'activity 2'},{name:'activity 3'},{name:'activity 4'},{name:'activity 5'}]
  constructor(private route: ActivatedRoute,private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder,  private accountService: AccountService, private router: Router) { 
  }

  ngOnInit(): void {
    this.ForwardForm = this.formbuilder.group({

      invoiceno: ['', Validators.required],
      invoicedate: ['', Validators.required],
      clientname:[],
      files:[''],
      activity:[''],
      officialdata:this.formbuilder.array([this.officialFormGroup()]),
      professionaldata:this.formbuilder.array([this.ProfessionFormGroup()]),
      disbursementdata:this.formbuilder.array([this.DisbursementFormGroup()])
    });
  }
  showviewmodel(e?:string,value?:string,data?:any){
this.editorModal.show();
  }
  fileChangeEvent(event){
    if (event.target.files && event.target.files[0]) {
      this.ForwardForm.get('files').setValue("vgv");
      const fileUpload = event.target.files[0];
      const filee = fileUpload.files;
      if( fileUpload.size<=30*1024*1024){
     // this.UploadFileViewModel.fileFullName = fileUpload.name;

      const sFileExtension = fileUpload.name
        .split('.')
      [fileUpload.name.split('.').length - 1].toLowerCase();
      Utilities.getBase64(event.target.files[0]).then((data) => {
        console.log(data);
      //  this.UploadFileViewModel.fileType = '.' + sFileExtension;

        let data1: any = data;
        let contentType = data1?.split(',')[1];

       // this.UploadFileViewModel.file64 = contentType;
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

  }
}
