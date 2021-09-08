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
import { nodalOfficer, UploadFileViewModel } from '../../model/uploadFile.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from '../../services/account.service';
import { Departments } from 'src/app/model/department';
import { AlertService, DialogType, MessageSeverity } from 'src/app/services/alert.service';
import { Permission } from 'src/app/model/permission.model';
import { StringDecoder } from 'string_decoder';
import {commondata} from '../../model/common'
import { AdditionFileComponent } from '../addition-file/addition-file.component';

@Component({
  selector: 'app-tlp-main',
  templateUrl: './tlp-main.component.html',
  styleUrls: ['./tlp-main.component.scss']
})
export class TlpMainComponent implements OnInit {
  mouModel: mouModel[];
  mouModel1: mouModel;
  showpage = false;
  type: string;
  closeResult = '';
  ForwardForm: FormGroup;
  submitted = false;
  createdBy = "";
  @ViewChild(AdditionFileComponent)
  AdditionFile: AdditionFileComponent;
  UploadFileViewModel = new UploadFileViewModel();
  commondata=new commondata();
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
  isIPM: boolean;
  loading=false;
  users: User[] = [];
  rows: User[] = [];
  rowsCache: User[] = [];
  departments: Departments[] = [];
  userview: any[] = [];
  usermanage: any[] = [];
  roleassign: any[] = [];
  allRoles: Role[] = [];
  loadingIndicator: boolean;
  user: any;
  permission: boolean;
  permissionbutton1: boolean;
  permissionbutton2: boolean;
  moucreatedby_role: string;
  forword = false;
  isScientist: boolean;
  isLUF: boolean;
  isCompany: boolean;
  isSuperAdmin:boolean;
  activeusermou:activeusermou[];
  array=this.commondata.ttaarray().filter(x=>x.stage=="tlp");
  
  viewhistory:boolean;
  viewremark:boolean;
  
  viewadditionalfileright:boolean;

  activearray = this.array[0];




  constructor(private route: ActivatedRoute, private Bdoservice: Bdoservice, private formbuilder: FormBuilder, private _cookieService: CookieService, private accountService: AccountService, private router: Router, private alertService: AlertService) {


    this.UserEmail = this.accountService.currentUser.email;
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;

    this.accountService.getUsersandRolesForDropdown().subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));

  }

  ngOnInit(): void {
    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBdm = this.userRoles.includes('BDM');

    this.isIPM = this.userRoles.includes('IPM');
    this.isLUF = this.userRoles.includes('LUF');
    this.isScientist = this.userRoles.includes('Scientist');
    this.isCompany = this.userRoles.includes('Company');
this.isSuperAdmin=this.userRoles.includes('Super Admin')

    this.route.queryParams.subscribe((params) => {

      this.createdBy = this.UserId;

      this.type = this.array.find(x => x.name == params.type).value;
      this.activearray = this.array.find(x => x.name == params.type);
       this.permission = this.array.find(x => x.name == params.type).permissionforword;
      this.permissionbutton1 = this.array.find(x => x.name == params.type).permissionback;
      this.permissionbutton2 = this.array.find(x => x.name == params.type).permissionapprove;


    })
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      debugger

      //this.mouModel = data.filter(x => x.app_Status == this.type);
      this.showpage = true;
      if(this.isSuperAdmin){
        this.mouModel = data.filter(x=>x.app_Status==this.type);
      }
      
      else{
        this.mouModel = data.filter(x=>x.app_Status==this.type && this.activeusermou?.find(t=>t.mouref==x.refid));
      }
      this.viewhistory=this.commondata.getotherpermissiondata('history').some(x=>x?.split('-')[1]==this.type);
      this.viewremark= this.commondata.getotherpermissiondata('remark').some(x=>x?.split('-')[1]==this.type);
     
      // if (this.isAdmin == true) {
      //   this.mouModel = data.filter(x => x.app_Status == this.type && x.assigntoadmin == this.UserId);
      // }

      // else if (this.isBdm == true) {

      //   this.mouModel = data.filter(x => x.app_Status == this.type && x.createdBy == this.UserId);
      // }
      // else if (this.isLUF == true) {
      //   this.mouModel = data.filter(x => x.app_Status == this.type && x.assigntoluf == this.UserId);
      // }
      // else if (this.isCompany == true) {
      //   this.mouModel = data.filter(x => x.app_Status == this.type && x.assigntocompany == this.UserId);
      // }

      // else if (this.isScientist == true) {
      //   this.mouModel = data.filter(x => x.app_Status == this.type && x.assigntoscientist == this.UserId);
      // }

      // else {
      //   this.mouModel = data.filter(x => x.nodal_Email == this.UserEmail && x.app_Status == this.type);
      // }


    })
  });


    this.ForwardForm = this.formbuilder.group({

      subject: ['', Validators.required],
      remarks: [''],
      type: [''],
      assigntoluf: [''],

    });
  }

  viewadditionalfile(data:mouModel){
    this.AdditionFile.showviewmodel(data,true,"tta");
  }
  remarksview(data:any){
    this.alertService.showDialog(data,DialogType.alert);

  }
  get f() { return this.ForwardForm.controls; }

  fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
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
  uploadFile() {

    this.submitted = true;
    if (this.ForwardForm.invalid) {
      return;
    }
this.loading=true;
    this.UploadFileViewModel.subject = this.ForwardForm.get('subject').value;
    this.UploadFileViewModel.remarks = this.ForwardForm.get('remarks').value;
    this.UploadFileViewModel.type = this.ForwardForm.get('type').value;
    this.UploadFileViewModel.assignto = this.ForwardForm.get('assigntoluf').value;
    this.UploadFileViewModel.createdBy = this.createdBy;

    console.log(this.UploadFileViewModel);
    this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {
this.loading=false;
      alert("Application Forward Successfully")
      this.editorModal1.hide();
      this.router.navigateByUrl('bcil/tlp-dashboard')

    })


  }

  onmodalclick(e: string, data: mouModel) {

    this.UploadFileViewModel.app_Status = e == "approve" ? this.array.find(x => x.value == this.type).approvedvalue :
      e == "forword" ? this.array.find(x => x.value == this.type).forward : this.array.find(x => x.value == this.type).backStatus;
    this.UploadFileViewModel.app_ref_id = data.refid;
    debugger;
    this.mouModel1 = this.mouModel.find(x => x.refid == data.refid);
    // this.moucreatedby_role = this.users.find(x => x.id == this.mouModel1.createdBy).roles[0];
    this.forword = e == "forword" ? true : false;




    console.log(this.mouModel1)


    if (e == "forword" || e == "back") {
      this.editorModal1.show();
    }
    else if ("approve") {
      this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {

        alert("Application Approved Successfully")
        //this.editorModal1.hide();
        this.ngOnInit();
        this.router.navigateByUrl('bcil/tlp-dashboard')
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
    this.users = users;

    console.log(this.users, 'users')
    this.rows = users.filter(x => x.roles.includes('LUF'));



  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }


  
}
