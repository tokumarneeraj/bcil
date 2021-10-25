import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
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
  editorModal: ModalDirective;
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
  @Input() array:any;
  activeusermou: activeusermou[];
  
  activuser:activeusermou[];
  appref:string;
  rowslm:User[];
  rowsbdm:User[];
  selectedbdm:string;
  selectedlm:string;
  submitted:boolean=false;
  process:string;
  constructor(private route: ActivatedRoute,private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder,  private accountService: AccountService, private router: Router) { 
    this.userRoles = this.accountService.currentUser.roles;
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
    assigntolm:[''],
    files:['']
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
      showviewmodel(e?:string,value?:string,data?:any){
        this.process=e;
        this.UploadFileViewModel.app_no=data?.mis_no ||data?.mou_no;
        this.UploadFileViewModel.app_ref_id = data?.refid;
        this.appref=data?.refid;
        this.UploadFileViewModel.app_Status=value;
        this.activebtn=this.array?.button?.find(x=>x.value==value);
 
    if(this.activebtn?.form?.bdoassigned==true || this.activebtn?.form?.lmassigned==true){
     // this.accountService.getUsersandRolesForDropdown().subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));
  
     this.accountService.getAllUser(0,0).subscribe(data=>{
       this.rowsbdm=data.filter((x)=>x.roles.includes('BDM'));
       this.rowslm=data.filter((x)=>x.roles.includes('LM'));
     })
     this.Bdoservice.GetActiveUserMoubyrefid(data?.refid).subscribe(data1=>{
      this.activuser=data1;
      this.selectedbdm=this.activuser?.find(x=>this.rowsbdm?.find(y=>y.id==x.userid))?.userid||"";
      this.selectedlm=this.activuser?.find(x=>this.rowslm?.find(y=>y.id==x.userid))?.userid||"";
      //$("[name='assignbdo'] option[value='"+this.activuser.find(x=>this.rows?.find(y=>y.id==x.userid).id)?.userid+"']").prop('selected',true);
     //this.ForwardForm.get('assigntobdo').setValue("bdmuser")
      //this.activuser.find(x=>this.rows?.find(y=>y.id==x.userid)?.userName
                });
    }
        this.editorModal.show();
        debugger;
      
       
      }
      uploadFile(){
        this.submitted = true;
        if(this.activebtn?.form?.bdoassigned==true){
          this.ForwardForm.controls['assigntobdo'].setValidators([Validators.required]);
          this.ForwardForm.controls['assigntobdo'].updateValueAndValidity();
        }
        if(this.activebtn?.form?.lmassigned==true){
          this.ForwardForm.controls['assigntolm'].setValidators([Validators.required]);
          this.ForwardForm.controls['assigntolm'].updateValueAndValidity();
        }
        //if(this.type=="S113" ||this.type=="S115" ||this.type=="S124"||this.type=="S403"||this.type=="S405"){
          if(this.activebtn?.form?.fileuploadreq){
          this.ForwardForm.controls['files'].setValidators([Validators.required]);              
      } else {                
        this.ForwardForm.controls["files"].clearValidators();              
      }
      this.ForwardForm.controls['files'].updateValueAndValidity();
        if (this.ForwardForm.invalid) {
          return;
        }
        this.loading=true;
        this.UploadFileViewModel.subject = this.ForwardForm.get('subject').value;
        this.UploadFileViewModel.remarks = this.ForwardForm.get('remarks').value;
        this.UploadFileViewModel.type = this.ForwardForm.get('type').value;
        this.UploadFileViewModel.assigntobdo = this.ForwardForm.get('assigntobdo').value;
        this.UploadFileViewModel.assigntolm = this.ForwardForm.get('assigntolm').value;
        this.UploadFileViewModel.remindertype = this.ForwardForm.get('remindertype').value;
    //     if(this.activuser?.find(x=>this.rows?.find(y=>y.id==x.userid))?.userid!=this.ForwardForm.get('assigntobdo').value && this.ForwardForm.get('assigntobdo').value!="")
    // {
    //     this.UploadFileViewModel.assigntobdo = this.ForwardForm.get('assigntobdo').value;
    // }
      
    
        this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((data) => {
           this.loading=false;
           this.submitted=false;
    if(data.message=="success"){
          alert("Submitted Successfully")
         
          this.editorModal.hide();
          //this.ngOnInit();
          this.process=="mou"? this.router.navigateByUrl('bcil/mou-dashboard'): 
          this.process=="mis"?this.router.navigateByUrl('bcil/mis-dashboard'):
          this.router.navigateByUrl('bcil/patent-dashboard')
          ;
         
    }
          else{
            alert(data.reason)
          }
        })

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
