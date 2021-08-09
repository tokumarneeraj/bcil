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
import { param } from 'jquery';

@Component({
  selector: 'app-tstl-main',
  templateUrl: './tstl-main.component.html',
  styleUrls: ['./tstl-main.component.scss']
})
export class TstlMainComponent implements OnInit {

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

    { tabelname: "TS Executed", name: 'ts_executed', value: 'S154', forwordtitle: "Draft license agreement", forward: "S155", forwardCheck: true, type: false, forwardText: 'Draft license agreement', approvedvalue: '', backStatus: '', permissionforword: true },

    { tabelname: "LA Entered by LUF", name: 'la_entered_by_luf', value: 'S155', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S156", approvetitle: "Forward to Nodal/Scientist", approvedvalue: 'S157', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },
    
    { tabelname: "LA Change Request by Admin", name: 'la_change_req_by_admin', value: 'S156', forwordtitle: "Update license agreement", forward: "S155", forwardCheck: true, type: false, forwardText: 'Update license agreement', approvedvalue: '', backStatus: '', permissionforword: true },

    { tabelname: "LA Approved by Admin", name: 'la_approved_by_admin', value: 'S157', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S158", approvetitle: "Forward to Admin", approvedvalue: 'S159', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },
    { tabelname: "LA Change Request by Client", name: 'la_change_req_by_client', value: 'S158', forwordtitle: "Forword to LUF", forward: "S156", forwardCheck: true, type: false, forwardText: 'Forward Change Request', approvedvalue: '', backStatus: '', permissionforword: true },

    { tabelname: "LA Approved by Client", name: 'la_approved_by_client', value: 'S159', forwordtitle: "Share license agreement", forward: "S160", forwardCheck: true, type: false, forwardText: 'Share license agreement', approvedvalue: '', backStatus: '', permissionforword: true },

    { tabelname: "LA shared with Company", name: 'la_shared_with_company', value: 'S160', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S156", approvetitle: "Forward to BDM", approvedvalue: 'S161', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },

    { tabelname: "LA Approved by Company", name: 'la_approved_by_company', value: 'S161', forwordtitle: "Forward to Client", forward: "S162", forwardCheck: true, type: false, forwardText: 'Forward', approvedvalue: '', backStatus: '', permissionforword: true },

    { tabelname: "LA Uploaded", name: 'la_uploaded', value: 'S162', forwordtitle: "Forward to BDM", forward: "S163", forwardCheck: true, type: false, forwardText: 'Submit TT Docket', approvedvalue: '', backStatus: '', permissionforword: true },

    { tabelname: "TT Docket by Client", name: 'tt_docket_by_client', value: 'S163', forwordtitle: "Forward to Company", forward: "S164", forwardCheck: true, type: false, forwardText: 'Share TT Docket', approvedvalue: '', backStatus: '', permissionforword: true },

    { tabelname: "TT Docket shared with Company", name: 'tt_docket_shared_with_company', value: 'S164',  forwardCheck: false, type: false, approvedvalue: '', backStatus: '' },

    
    
  ]



  activearray = this.array[0];




  constructor(private route: ActivatedRoute, private Bdoservice: Bdoservice, private formbuilder: FormBuilder, private _cookieService: CookieService, private accountService: AccountService, private router: Router, private alertService: AlertService) {


    this.UserEmail = this.accountService.currentUser.email;
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;
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
      assignto: [''],
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
    this.UploadFileViewModel.assignto = this.ForwardForm.get('assignto').value;
    this.UploadFileViewModel.createdBy = this.createdBy;

    console.log(this.UploadFileViewModel);
    this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {

      alert("Application Forward Successfully")
      this.editorModal1.hide();
      this.router.navigateByUrl('bcil/tstl-dashboard')

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
        this.router.navigateByUrl('bcil/tstl-dashboard')
      })

    }

  }


}
