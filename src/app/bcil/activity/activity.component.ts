import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { commondata } from 'src/app/model/common';
import { UploadFileViewModel } from 'src/app/model/uploadFile.model';
import { User } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { Utilities } from 'src/app/services/utilities';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @ViewChild('editorModal', { static: true })
  editorModal2: ModalDirective;
  isAdmin:boolean;
  isBdm:boolean;
  isIPM:boolean;
  type:string;
  isNodal:boolean;
  isSuperAdmin:boolean;
  isScientist:boolean;
  userRoles:string[];
  viewtab:any;
  managetab:any;
  viewadditionalfileright:any;
  commondata=new commondata();
  ForwardForm: FormGroup;
  activebtn:any;
  UploadFileViewModel = new UploadFileViewModel();
  loading:boolean=false;
  customrem: boolean;
  array:any;
  appref:string;
  rows:User[];
  rows1:User[];
  selected:string;
  submitted:boolean=false;
  constructor(private route: ActivatedRoute,private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder,  private accountService: AccountService, private router: Router) { 
    
  }

  ngOnInit(): void {


      this.isAdmin = this.userRoles.includes('Admin');
      this.isBdm = this.userRoles.includes('BDM');
      this.isIPM=this.userRoles.includes('IPM');
      this.isNodal = this.userRoles.includes('Nodal'); 
  this.isSuperAdmin=this.userRoles.includes('Super Admin');
  this.isScientist=this.userRoles.includes('Scientist');
  
  this.viewadditionalfileright=this.commondata.CanviewadditionalfilesPermission;
  this.viewtab=this.commondata.getotherpermissiondata('view').map((item)=>(item.split('-')[1]));
  this.managetab=this.commondata.getotherpermissiondata('manage').map((item)=>(item.split('-')[1]));
  this.Bdoservice.getdatapermission().subscribe(data=>{
    console.log(data);
  
  })
  
  this.ForwardForm = this.formbuilder.group({

    subject: ['', Validators.required],
    remarks: [''],
    remindertype:['default',Validators.required],
    type: [''],
    assigntobdo:[''],
    files:['', Validators.required]
  });
   
  }
  reminderchange(data){
    if(data=="default"){
      this.customrem=false;
    }
    
    else if(data=="custom"){
      this.customrem=true;
      //this.editorModal2.show();
    
    }
      }
      uploadFile(){

  }
  fileChangeEvent(event){
    if (event.target.files && event.target.files[0]) {
      this.ForwardForm.get('files').setValue("vgv");
      const fileUpload = event.target.files[0];
      const filee = fileUpload.files;
      if( fileUpload.size<=30*1024*1024){
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
  get f() { return this.ForwardForm.controls; }

}
