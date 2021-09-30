import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { commondata } from 'src/app/model/common';
import { filehistoryModel } from 'src/app/model/filehistory';
import { activeusermou, mouModel } from 'src/app/model/mou.model';
import { UploadFileViewModel } from 'src/app/model/uploadFile.model';
import { AlertService, DialogType } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { Utilities } from 'src/app/services/utilities';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addition-file',
  templateUrl: './addition-file.component.html',
  styleUrls: ['./addition-file.component.scss']
})
export class AdditionFileComponent implements OnInit {
  ForwardForm: FormGroup;
  submitted:boolean=false;
  loading:boolean=false;
  fileHistory:filehistoryModel[];
  commondata=new commondata();
  activeusermou:activeusermou[];
  @ViewChild('editorModal1', { static: true })
  editorModal1: ModalDirective;

  @ViewChild('editorModal2', { static: true })
  editorModal2: ModalDirective;

  deletefileright:boolean=false;
  @Output() newItemEvent = new EventEmitter<string>();
  getbaseurl=environment.baseUrl;
  viewadditionalfile:boolean=false;
  moudetails:mouModel;
  deletesuccess:boolean=false;
  stage:string;
  UploadFileViewModel = new UploadFileViewModel();
  constructor(private route: ActivatedRoute,private authService: AuthService, private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
      this.ForwardForm = this.formbuilder.group({
fileaccess:['Internal',Validators.required],
      subject: ['', Validators.required],
      files: ['', Validators.required],
      remarks: [''],
     
    });
    this.deletefileright=this.commondata.CanviewmanageadditobalfilePermission;
  }
   checkFileType(control: AbstractControl): { [key: string]: any } | null {
    const files: File[] = control.value;
    let errors: string[] = [];
    if (files.length == 0) {
      debugger;
      errors.push(`File is Required`);
      return  errors.length >= 1 ? { invalid_type: errors } : null;
    }

  //  if (files.length >= 1 ) {
  //      for (let index = 0; index < files.length; index++) {
  //          //Use a type list here to check for your types for example "image/jpeg"
  //          if (files[index].type === '') {                 
  //              errors.push(`${files[index].name} has an invalid type of unknown\n`);
  //          }
  //      }

  //      return  errors.length >= 1 ? { invalid_type: errors } : null;           
  //  }
   return null;  // no file, can be capture by "Required" validation 
}
  deletefileHelper(refid:any){
    this.Bdoservice.RemoveAdditionalfile(refid).subscribe(data1=>{
      if(data1.message=="success"){
        this.deletesuccess=true;
        this.showviewmodel(this.moudetails,false,this.stage)
    // this.Bdoservice.GetAdditionalfile(refid).subscribe(data=>{
    //   this.fileHistory=data;
    //   });
      }
    });
  }
  deletefile(refid:any){
    if(confirm("'Are you sure you want to delete the file?'")==true){
      this.deletefileHelper(refid);
    }
   
   // this.alertService.showDialog('Are you sure you want to delete the file?', DialogType.confirm, () => this.deletefileHelper(refid));

   

  }
  get f() { return this.ForwardForm.controls; }
  fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      const fileUpload = event.target.files[0];
      const filee = fileUpload.files;

      // const file: File = fileEvent.target.files[0];
      console.log('size', fileUpload.size);
      console.log('type', fileUpload.type);
    if( fileUpload.size<=30*1024*1024){
      this.ForwardForm.get('files').setValue("vgv");
      this.UploadFileViewModel.fileFullName = fileUpload.name;

      const sFileExtension = fileUpload.name
        .split('.')
      [fileUpload.name.split('.').length - 1].toLowerCase();
      Utilities.getBase64(event.target.files[0]).then((data) => {
        console.log(data);
        this.UploadFileViewModel.fileType = '.' + sFileExtension;

        let data1: any = data;
        let contentType = data1?.split(',')[1];

        this.UploadFileViewModel.file64 = contentType;
      });
    }
    else{
      this.ForwardForm.get('files').setValue("");
      alert("File Size Should be less than 30 MB")
    }
    }
  }
  showmodel(data:mouModel,stage:any){
    this.moudetails=data;
    this.UploadFileViewModel.stage=stage;
    this.UploadFileViewModel.app_Status=data.app_Status;
    this.UploadFileViewModel.app_ref_id=data.refid;
    this.editorModal1.show();
  }
  remarksview(data:any){
    this.alertService.showDialog(data,DialogType.alert);

  }
  showviewmodel(data:mouModel,show:boolean,stage:any){
    this.moudetails=data;
    this.stage=stage;
    this.Bdoservice.GetActiveUserMoubyrefid(data.refid).subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetAdditionalfile(data.refid).subscribe(data=>{
      this.fileHistory=data.filter(x=>x.stage==stage).map((item)=>({...item,createdby:this.activeusermou.find(x=>x.userid==item.createdby).username}));
      if(this.commondata.CanviewinternalfilesPermission==false){
        this.fileHistory=this.fileHistory.filter(x=>x.fileaccess!="Internal");
      }
      if(this.commondata.CanviewgobalfilesPermission==false){
        this.fileHistory= this.fileHistory.filter(x=>x.fileaccess!="External");
      }
if(show==true){
    this.editorModal2.show();
}

    });
  });
  }
  uploadFile() {

    this.submitted = true;
    if (this.ForwardForm.invalid) {
      return;
    }
   
    this.UploadFileViewModel.subject = this.ForwardForm.get('subject').value;
    this.UploadFileViewModel.remarks = this.ForwardForm.get('remarks').value;
    this.UploadFileViewModel.fileaccess = this.ForwardForm.get('fileaccess').value;
    this.UploadFileViewModel.fileused = "Additional";
    this.Bdoservice.Addadditionalfile(this.UploadFileViewModel).subscribe((data) => {
      this.loading=false;
      if(data.message=="success"){
            alert("Additional files Added Successfully")
      }
      else{
        alert(data.reason)
      }
            this.editorModal1.hide();
            //this.ngOnInit();
      
          })
  }
}
