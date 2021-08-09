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
  isIPM: boolean;
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
  array = [

    { tabelname: "Enter Lead", name: 'enter_lead', value: 'S130', forwordtitle: "Enter Lead", forward: "S132", forwardCheck: true, type: false, forwardText: 'Enter Lead', approvedvalue: '', backStatus: '', permissionforword: this.CanviewTLP_EnterLead_forwordbutton_permission},

    { tabelname: "Lead Entered by BDM", name: 'lead_entered_by_bdm', value: 'S132', forwordtitle: "Enter Company Profile ", forward: "S133", forwardCheck: true, type: false, forwardText: 'Enter Company Profile ', approvedvalue: '', backStatus: '', permissionforword: this.CanviewTLP_Lead_Entered_by_bdm_forwordbutton_permission},
    { tabelname: "Due Deligence Done", name: 'due_deligence_done', value: 'S133', backtitle: "Forward to BDM", forwardCheck: true, back: true, backStatus: "S134", forwordtitle: "Forward to LUF", forward: 'S135', approved: false, forwardText: "Approved", backbuttonText: 'Change Req', permissionback: this.CanviewTLP_due_deligence_done_change_req_button_permission, permissionforword: this.CanviewTLP_due_deligence_done_approve_button_permission},
    { tabelname: "Due Deligence Change Request by Admin", name: 'due_deligence_change_req_by_admin', value: 'S134', forwordtitle: "Update", forward: "S133", forwardCheck: true, type: false, forwardText: 'Update Due Deligence', approvedvalue: '', backStatus: '', permissionforword: this.CanviewTLP_due_deligence_change_req_by_admin_forwordbutton_permission},

    { tabelname: "Lead Approved by Admin", name: 'lead_approved_by_admin', value: 'S135', forwordtitle: "Draft for NDA/PEA/MTA", forward: "S137", forwardCheck: true, forwardText: 'Draft for NDA/PEA/MTA', back: true, backStatus: "S136", backbuttonText: 'Share NCP', backtitle: "Share NCP", permissionforword: this.CanviewTLP_lead_approved_by_admin_forwordbutton_permission, permissionback: this.CanviewTLP_lead_approved_by_admin_forword2button_permission },
    { tabelname: "NCP Shared", name: 'ncp_shared', value: 'S136', forwardCheck: true, type: false, forward: "S146", forwordtitle: "Enter Termsheet", forwardText: "Draft Termsheet", permissionforword: true},

    { tabelname: "NDA Request by LUF", name: 'nda_req_by_luf', value: 'S137', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S138", approvetitle: "Forward to N.O.", approvedvalue: 'S139', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: this.CanviewTLP_nda_req_by_luf_change_req_button_permission, permissionapprove: this.CanviewTLP_nda_req_by_luf_approve_button_permission },
    { tabelname: "NDA Change Request by Admin", name: 'nda_change_req_by_Admin', value: 'S138', forwordtitle: "Forward to Admin", forward: "S137", forwardCheck: true, type: false, forwardText: 'Update NDA/PEA', approvedvalue: '', backStatus: '', permissionforword: this.CanviewTLP_nda_change_req_by_Admin_forwordbutton_permission },

    { tabelname: "NDA Approved by Admin", name: 'nda_approved_by_Admin', value: 'S139', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S140", approvetitle: "Forward to N.O.", approvedvalue: 'S141', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: this.CanviewTLP_nda_approved_by_Admin_change_req_button_permission, permissionapprove: this.CanviewTLP_nda_approved_by_Admin_approve_button_permission },

    { tabelname: "NDA Change Request by NO", name: 'nda_change_req_by_no', value: 'S140', forwordtitle: "Change Request", forward: "S138", forwardCheck: true, type: false, forwardText: 'Change Request', approvedvalue: '', backStatus: '',permissionforword:this.CanviewTLP_nda_change_req_by_no_change_req_button_permission},

    { tabelname: "NDA Approved by NO", name: 'nda_approved_by_no', value: 'S141', backtitle: "Change Request", forwardCheck: false, back: true, backStatus: "S138", approvetitle: "Forward to N.O.", approvedvalue: 'S142', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: this.CanviewTLP_nda_approved_by_no_change_req_button_permission, permissionapprove: this.CanviewTLP_nda_approved_by_no_approve_button_permission },


    { tabelname: "NDA Approved by Company", name: 'nda_approved_by_company', value: 'S142', forwordtitle: "Forward to LUF", forward: "S143", forwardCheck: true, type: false, forwardText: 'Upload Agreement', approvedvalue: '', backStatus: '', permissionforword: this.CanviewTLP_nda_approved_by_company_forwordbutton_permission },

    { tabelname: "NDA Executed", name: 'nda_executed', value: 'S143', forwordtitle: "Share NCP & CIP", forward: "S144", forwardCheck: true, forwardText: 'Share NCP & CIP', back: true, backStatus: "S145", backbuttonText: 'Share CIP', backtitle: "Share CIP", permissionforword: this.CanviewTLP_nda_executed_forwordbutton_permission, permissionback: this.CanviewTLP_nda_executed_forword2button_permission },
    { tabelname: "NCP and CIP Shared", name: 'ncp_cip_shared', value: 'S144', forwardCheck: true, type: false, forward: "S146", forwordtitle: "Enter Termsheet", forwardText: "Draft Termsheet", permissionforword:true},
    { tabelname: "CIP Shared", name: 'cip_shared', value: 'S145', forwardCheck: true, type: false, forward: "S146", forwordtitle: "Enter Termsheet", forwardText: "Draft Termsheet", permissionforword: true },


  ]



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


    this.route.queryParams.subscribe((params) => {

      this.createdBy = this.UserId;

      this.type = this.array.find(x => x.name == params.type).value;
      this.activearray = this.array.find(x => x.name == params.type);
       this.permission = this.array.find(x => x.name == params.type).permissionforword;
      this.permissionbutton1 = this.array.find(x => x.name == params.type).permissionback;
      this.permissionbutton2 = this.array.find(x => x.name == params.type).permissionapprove;


    })
    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      debugger

      //this.mouModel = data.filter(x => x.app_Status == this.type);
      this.showpage = true;

      if (this.isAdmin == true) {
        this.mouModel = data.filter(x => x.app_Status == this.type && x.assigntoadmin == this.UserId);
      }

      else if (this.isBdm == true) {

        this.mouModel = data.filter(x => x.app_Status == this.type && x.createdBy == this.UserId);
      }
      else if (this.isLUF == true) {
        this.mouModel = data.filter(x => x.app_Status == this.type && x.assigntoluf == this.UserId);
      }
      else if (this.isCompany == true) {
        this.mouModel = data.filter(x => x.app_Status == this.type && x.assigntocompany == this.UserId);
      }

      else if (this.isScientist == true) {
        this.mouModel = data.filter(x => x.app_Status == this.type && x.assigntoscientist == this.UserId);
      }

      else {
        this.mouModel = data.filter(x => x.nodal_Email == this.UserEmail && x.app_Status == this.type);
      }


    })



    this.ForwardForm = this.formbuilder.group({

      subject: ['', Validators.required],
      remarks: [''],
      type: [''],
      assigntoluf: [''],

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

    this.UploadFileViewModel.subject = this.ForwardForm.get('subject').value;
    this.UploadFileViewModel.remarks = this.ForwardForm.get('remarks').value;
    this.UploadFileViewModel.type = this.ForwardForm.get('type').value;
    this.UploadFileViewModel.assigntoluf = this.ForwardForm.get('assigntoluf').value;
    this.UploadFileViewModel.createdBy = this.createdBy;

    console.log(this.UploadFileViewModel);
    this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {

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


  get CanviewTLP_EnterLead_forwordbutton_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_EnterLead_forwordbutton_permission);
  }

  get CanviewTLP_Lead_Entered_by_bdm_forwordbutton_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_Lead_Entered_by_bdm_forwordbutton_permission);
  }

  get CanviewTLP_due_deligence_done_change_req_button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_due_deligence_done_change_req_button_permission);
  }

  get CanviewTLP_due_deligence_done_approve_button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_due_deligence_done_approve_button_permission);
  }
  
  get CanviewTLP_due_deligence_change_req_by_admin_forwordbutton_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_due_deligence_change_req_by_admin_forwordbutton_permission);
  }

  get CanviewTLP_lead_approved_by_admin_forwordbutton_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_lead_approved_by_admin_forwordbutton_permission);
  }

  get CanviewTLP_lead_approved_by_admin_forword2button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_lead_approved_by_admin_forword2button_permission);
  }

  get CanviewTLP_nda_req_by_luf_approve_button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_req_by_luf_approve_button_permission);
  }

  get CanviewTLP_nda_req_by_luf_change_req_button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_req_by_luf_change_req_button_permission);
  }

  get CanviewTLP_nda_change_req_by_Admin_forwordbutton_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_change_req_by_Admin_forwordbutton_permission);
  }

  get CanviewTLP_nda_approved_by_Admin_approve_button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_approved_by_Admin_approve_button_permission);
  }

  get CanviewTLP_nda_approved_by_Admin_change_req_button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_approved_by_Admin_change_req_button_permission);
  }

  get CanviewTLP_nda_change_req_by_no_change_req_button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_change_req_by_no_change_req_button_permission);
  }

  get CanviewTLP_nda_approved_by_no_approve_button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_approved_by_no_approve_button_permission);
  }

  get CanviewTLP_nda_approved_by_no_change_req_button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_approved_by_no_change_req_button_permission);
  }

  get CanviewTLP_nda_approved_by_company_forwordbutton_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_approved_by_company_forwordbutton_permission);
  }
  get CanviewTLP_nda_executed_forwordbutton_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_executed_forwordbutton_permission);
  }
  get CanviewTLP_nda_executed_forword2button_permission() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_executed_forword2button_permission);
  }
}
