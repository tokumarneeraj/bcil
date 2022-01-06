import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { activeusermou, mouModel } from '../../model/mou.model';
import { Role } from 'src/app/model/role.model';
import { UserEdit } from 'src/app/model/user-edit.model';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { Bdoservice } from '../../services/bdo.service'
import { Utilities } from '../../services/utilities';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { emailsend, nodalOfficer, UploadFileViewModel } from '../../model/uploadFile.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from '../../services/account.service';
import { Departments } from 'src/app/model/department';
import { AlertService, DialogType, MessageSeverity } from 'src/app/services/alert.service';
import { Permission } from 'src/app/model/permission.model';
import { StringDecoder } from 'string_decoder';
import {commondata} from '../../model/common'
import { AdditionFileComponent } from '../addition-file/addition-file.component';
import { ActivityComponent } from '../activity/activity.component';
import { AddScientistComponent } from '../add-scientist/add-scientist.component';
@Component({
  selector: 'app-bcil-init',
  templateUrl: './bcil-init.component.html',
  styleUrls: ['./bcil-init.component.css']
})
export class BcilInitComponent implements OnInit {
  mouModel: mouModel[];
  mouModel1: mouModel;
  showpage = false;
  type: string;
  closeResult = '';
  ForwardForm: FormGroup;
  submitted = false;
  createdBy = "";
  UploadFileViewModel = new UploadFileViewModel();
  activeusermou:activeusermou[];
  activuser:activeusermou[];
  @ViewChild('editorModal1', { static: true })
  editorModal1: ModalDirective;
  @ViewChild(AdditionFileComponent)
  AdditionFile: AdditionFileComponent;

  @ViewChild(AddScientistComponent)
  assignscientist: AddScientistComponent;
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  usertype: string;
  UserName: string;
  showClientPage = false;
  @ViewChild('editorModal2', { static: true })
  editorModal2: ModalDirective;
  UserEmail: string;
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
  users: User[] = [];
  rows: User[] = [];
  rows1: User[] = [];
  rowsCache: User[] = [];
  departments: Departments[] = [];
  editedUser: UserEdit;
  userview: any[] = [];
  usermanage: any[] = [];
  roleassign: any[] = [];
  allRoles: Role[] = [];
  loadingIndicator: boolean;
  user: any;
  allusers:User[];
permission:boolean;
permissionbutton1:boolean;
permissionbutton2:boolean;
moucreatedby_role:string;
mouref:string;
forword=false;
nodalofficer:string;
customrem:boolean;
commondata=new commondata();
loading=false;
viewhistory:boolean;
viewremark:boolean;
emailpermission:boolean;
showstatus:any[]=[];
selected:string;
viewadditionalfileright:boolean;
viewtab:any;
managetab:any;
showbutton:any;
moudata:any;
activebtn:any;
array:any;
datapermission:any;
 // array:any[];
 // activearray = this.commondata.moustatus()[0];

  constructor(private route: ActivatedRoute, private Bdoservice: Bdoservice, private formbuilder: FormBuilder, private _cookieService: CookieService, private accountService: AccountService, private router: Router, private alertService: AlertService) {


    this.UserEmail = this.accountService.currentUser.email;
  
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;

   this.customrem=false;
    
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
          this.datapermission=data;
          console.log(data);
          this.moudata=data?.mou?.filter(x=>this.viewtab.find(y=>y==x.value));
          //this.moudata=data?.mou?.filter(x=>this.managetab.find(y=>y==x.value));
      this.route.queryParams.subscribe((params) => {

        
        //this.type=this.moudata.find(x => x.type == params.type).value;
        this.array=this.moudata.find(x => x.type == params.type);
       this.managetab.some(x=>x==this.array?.value)?null:this.array={...this.array,button:[]};//this.array?.find(x=>this.managetab?.find(y=>y==x.value)); 
        //this.showbutton=this.array?.button
       
      });
          
    
        })
    
   
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      debugger
      if(this.isSuperAdmin){
        this.mouModel = data.filter(x => x.app_Status == this.array?.value || x.tto_approved==this.array?.value);
      }
  

    else if(this.isAdmin){
       this.mouModel= data.filter(x=>(x.app_Status== this.array?.value|| x.tto_approved==this.array?.value) &&(x.app_Status=='S101'  || this.activeusermou?.some(t=>t.appref==x.refid)));
       }
       else{
          this.mouModel=data.filter(x=>(x.app_Status== this.array?.value || x.tto_approved==this.array?.value) && this.activeusermou?.some(t=>t.appref==x.refid));
       }
       debugger;
       console.log( this.commondata.getotherpermissiondata('history'),'his')
    this.viewhistory=this.commondata.getotherpermissiondata('history').some(x=>x?.split('-')[1]==this.array?.value);
       this.viewremark= this.commondata.getotherpermissiondata('remark').some(x=>x?.split('-')[1]==this.array?.value);
       //this.emailpermission=this.commondata.getotherpermissiondata('email').some(x=>x?.split('-')[1]==this.type);
     // this.viewadditionfile= this.commondata.getotherpermissiondata('addfile').some(x=>x?.split('-')[1]==this.type);
      
        this.showpage = true;
    });

    })

    

    this.ForwardForm = this.formbuilder.group({

      subject: ['', Validators.required],
      remarks: [''],
      remindertype:['default'],
      type: [''],
      assignto:[''],
      assigntobdo:[''],
      files:['', Validators.required]
    });
  }
  get f() { return this.ForwardForm.controls; }
  fileChangeEvent(event) {
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
  viewadditionalfile(data:mouModel){
    this.AdditionFile.showviewmodel(data,true,"mou");
  }
  remarksview(data:any){
    this.alertService.showDialog(data,DialogType.alert);

  }
  uploadFile() {

    this.submitted = true;
    
    if(this.activebtn?.form?.fileuploadreq==true){
      this.ForwardForm.controls['files'].setValidators([Validators.required]);              
  } else {                
    this.ForwardForm.controls["files"].clearValidators();              
  }
  this.ForwardForm.controls['files'].updateValueAndValidity();

    if (this.ForwardForm.invalid) {
      return;
    }
    
    
    this.UploadFileViewModel.subject = this.ForwardForm.get('subject').value;
    this.UploadFileViewModel.remarks = this.ForwardForm.get('remarks').value;
    this.UploadFileViewModel.type = this.ForwardForm.get('type').value;
    this.UploadFileViewModel.assignto = this.ForwardForm.get('assignto').value;
    if(this.activuser?.find(x=>this.rows?.find(y=>y.id==x.userid))?.userid!=this.ForwardForm.get('assigntobdo').value && this.ForwardForm.get('assigntobdo').value!="")
{
    this.UploadFileViewModel.assigntobdo = this.ForwardForm.get('assigntobdo').value;
}
    this.UploadFileViewModel.remindertype = this.ForwardForm.get('remindertype').value;
//this.UploadFileViewModel.assigntoadmin= this.UploadFileViewModel.createdBy;
    this.UploadFileViewModel.createdBy = this.UserId;

    // if(this.emailpermission==true){
    //   this.UploadFileViewModel.emailsend=new emailsend();
    //   this.UploadFileViewModel.emailsend.emailcheck=true;
    //   this.UploadFileViewModel.emailsend.email=this.UserEmail;

    // }

    console.log(this.UploadFileViewModel);
    this.loading=true;
    this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((data) => {
this.loading=false;
this.submitted=false;
if(data.message=="success"){
  alert("Submitted Successfully")
     
      this.editorModal1.hide();
      this.router.navigateByUrl('bcil/mou-dashboard')
      //this.ngOnInit();
}
else{
  alert(data.reason)
}

    })


  }

  onmodalclick(e: string,value:any, data: any) {
    if(value!='assign'){
    let yy="",querystring="";
    this.datapermission?.mou?.forEach(element => {
      if(yy==undefined ||yy==""){
      yy=(element.value==value)==true?element?.tablename:undefined||element?.subchild?.find(x=>x.value==value)?.tablename;
      querystring=(element.value==value)==true?"bcil/bcil-table?stage="+element?.stage+"&type="+element?.type:undefined ||
      "bcil/bcil-table?stage="+element?.subchild?.find(x=>x.value==value)?.stage+"&type="+element?.subchild?.find(x=>x.value==value)?.type+"";
 
       if(yy!=undefined) 
          return true;
      }
      
    
    }) 
    data={...data,message:this.array?.tablename+' To '+yy,querystring:querystring}
    this.activity.showviewmodel('mou',value,data);
   this.activebtn=this.array?.button?.find(x=>x.value==value);

  
   
  }
  else
{
  this.assignscientist.onmodalshow(data);
}
}


  
}
