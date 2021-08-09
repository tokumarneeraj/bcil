import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { mouModel } from '../../model/mou.model';
import { Role } from 'src/app/model/role.model';
import { UserEdit } from 'src/app/model/user-edit.model';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { Bdoservice } from '../../services/bdo.service'
import { Utilities } from '../../services/utilities';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { nodalOfficer, UploadFileViewModel } from '../../model/uploadFile.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from '../../services/account.service';
import { Departments } from 'src/app/model/department';
import { AlertService, DialogType, MessageSeverity } from 'src/app/services/alert.service';
import { Permission } from 'src/app/model/permission.model';
import { StringDecoder } from 'string_decoder';
import {commondata} from '../../model/common'
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
  
  @ViewChild('editorModal1', { static: true })
  editorModal1: ModalDirective;
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
  isLM: boolean;
  isIPM:boolean;
  users: User[] = [];
  rows: User[] = [];
  rowsCache: User[] = [];
  departments: Departments[] = [];
  editedUser: UserEdit;
  userview: any[] = [];
  usermanage: any[] = [];
  roleassign: any[] = [];
  allRoles: Role[] = [];
  loadingIndicator: boolean;
  user: any;
permission:boolean;
permissionbutton1:boolean;
permissionbutton2:boolean;
moucreatedby_role:string;
mouref:string;
forword=false;
nodalofficer:string;
customrem:boolean;
commondata=new commondata();


 // array:any[];
  activearray = this.commondata.moustatus()[0];

  constructor(private route: ActivatedRoute, private Bdoservice: Bdoservice, private formbuilder: FormBuilder, private _cookieService: CookieService, private accountService: AccountService, private router: Router, private alertService: AlertService) {


    this.UserEmail = this.accountService.currentUser.email;
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;

    this.accountService.getUsersandRolesForDropdown().subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));
    
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

  this.isIPM=this.userRoles.includes('IPM');
    this.route.queryParams.subscribe((params) => {

        this.createdBy = this.UserId;

        this.type = this.commondata.moustatus().find(x => x.name == params.type).value;
        this.activearray = this.commondata.moustatus().find(x => x.name == params.type);
        this.permission=this.commondata.moustatus().find(x => x.name == params.type).permissionforword;
        this.permissionbutton1=this.commondata.moustatus().find(x => x.name == params.type).permissionbutton1;
        //this.createdBy = this.array.find(x => x.name == params.type).createdBy;
      

    })
    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      debugger
      if(this.isBdm ||this.isIPM){
        this.mouModel = data.filter(x => x.app_Status == this.type &&  x.createdBy==this.UserId);
      }
      else{
      this.mouModel = data.filter(x => x.app_Status == this.type &&  (x.createdBy==this.UserId ||  x.assigntoadmin==this.UserId||
        x.assignto==this.UserId || x.app_Status=='S101'));
      }

      
        this.showpage = true;
     

    })

    

    this.ForwardForm = this.formbuilder.group({

      subject: ['', Validators.required],
      remarks: [''],
      remindertype:['default',Validators.required],
      type: [''],
      assignto:[''],
    });
  }
  get f() { return this.ForwardForm.controls; }
  fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      const fileUpload = event.target.files[0];
      const filee = fileUpload.files;
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
  }
  uploadFile() {

    this.submitted = true;

    
    if(this.type=="S107"||this.type=="S109"){
      //create nodal
      console.log('dd')
      this.UploadFileViewModel.nodal=new nodalOfficer();
      this.UploadFileViewModel.nodal.nodal_name=this.mouModel1?.nodal_Name;
      this.UploadFileViewModel.nodal.nodal_email=this.mouModel1?.nodal_Email;
      this.UploadFileViewModel.nodal.nodal_mobile=this.mouModel1?.nodal_Mobile_No;
    }
    this.UploadFileViewModel.subject = this.ForwardForm.get('subject').value;
    this.UploadFileViewModel.remarks = this.ForwardForm.get('remarks').value;
    this.UploadFileViewModel.type = this.ForwardForm.get('type').value;
    this.UploadFileViewModel.assignto = this.ForwardForm.get('assignto').value;
    this.UploadFileViewModel.remindertype = this.ForwardForm.get('remindertype').value;
//this.UploadFileViewModel.assigntoadmin= this.UploadFileViewModel.createdBy;
    this.UploadFileViewModel.createdBy = this.UserId;

    console.log(this.UploadFileViewModel);
    this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {

      alert("Application Forward Successfully")
      this.editorModal1.hide();
      this.ngOnInit();

    })


  }

  onmodalclick(e: string, data: mouModel) {
   
    this.UploadFileViewModel.app_Status = e == "approve" ? this.commondata.moustatus().find(x => x.value == this.type).approvedvalue :
     e== "forword" ? this.commondata.moustatus().find(x => x.value == this.type).forward : this.commondata.moustatus().find(x => x.value == this.type).backStatus;
    this.UploadFileViewModel.app_ref_id = data.refid;
    this.mouref=data.refid;
debugger;
    this.mouModel1= this.mouModel.find(x=>x.refid==data.refid);
    this.moucreatedby_role=this.users.find(x=>x.id==this.mouModel1.createdBy)?.roles[0];
   this.forword=e=="forword"?true:false;
if((this.type=="S101" &&e=="back") ||this.type=="S105"){
 this.moucreatedby_role=="IPM"?this.UploadFileViewModel.app_Status="S109":
   this.moucreatedby_role=="IBM"?this.UploadFileViewModel.app_Status="S107":null;
  
}



   console.log(this.mouModel1)


    if (e == "forword" || e == "back") {
      this.editorModal1.show();
    }
    else if ("approve") {
      this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {

        alert("Application Approved Successfully")
        //this.editorModal1.hide();
        this.ngOnInit();
      })

    }
   
  }

  onDataLoadSuccessful(users: User[], roles: Role[]) {

   // this.accountService.getRoles(0, 0).subscribe(data => { })
    console.log(users, roles)
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    let rol = [];
    let rol1 = [];
    debugger;

    
    this.allRoles = roles;

    users.forEach((user, index) => {
      (user as any).index = index + 1;
    });

   
    this.rowsCache = [...users];
    this.users=users;

    console.log(this.users,'users')
    this.rows = users.filter(x => x.roles.includes('LM'));



  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }

}
