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
import { param } from 'jquery';

@Component({
  selector: 'app-nttsa-main',
  templateUrl: './nttsa-main.component.html',
  styleUrls: ['./nttsa-main.component.scss']
})
export class NttsaMainComponent implements OnInit {
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

  isNodal: boolean;
  isSuperAdmin:boolean;
  activeusermou:activeusermou[];
  isLUF: boolean;
  isCompany: boolean;

  array = [

    ]



 activearray = this.array[0];




  constructor(private route: ActivatedRoute, private Bdoservice: Bdoservice, private formbuilder: FormBuilder, private _cookieService: CookieService, private accountService: AccountService, private router: Router, private alertService: AlertService) {


    this.UserEmail = this.accountService.currentUser.email;
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;
  }

  permissiongiven(data:string):boolean{
   
    if(data=="S148")
  {
  
return this.isScientist==true|| this.isNodal==true ?true:false;
  }
  if(data=="S149"){ 
  return this.isAdmin==true?true:false;
  }
  if(data=="S150"){ 
    return this.isAdmin==true?true:false;
    }
    if(data=="S151"){ 
      return this.isBdm==true?true:false;
      }
      if(data=="S153"){ 
        return   this.isLUF==true?true:false;
        }

    
  return true;
  }


  ngOnInit(): void {
    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBdm = this.userRoles.includes('BDM');

    this.isIPM = this.userRoles.includes('IPM');
    this.isLUF = this.userRoles.includes('LUF');
    this.isNodal = this.userRoles.includes('Nodal');
    this.isScientist = this.userRoles.includes('Scientist');
    this.isCompany = this.userRoles.includes('Company');
    this.isSuperAdmin = this.userRoles.includes('Super Admin');
    this.array=[ { tabelname: "TS Entered by LUF", name: 'ts_entered_by_luf', value: 'S146', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S147", approvetitle: "Forward to Nodal/Scientist", approvedvalue: 'S148', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },
    { tabelname: "TS Change Request by Admin", name: 'ts_change_req_by_admin', value: 'S147', forwordtitle: "Update Termsheet ", forward: "S146", forwardCheck: true, type: false, forwardText: 'Update Termsheet ', approvedvalue: '', backStatus: '', permissionforword: true },
    
    { tabelname: "TS Approved by Admin", name: 'ts_approved_by_admin', value: 'S148', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S149", approvetitle: "Forward to Admin", approvedvalue: 'S150', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: this.permissiongiven("S148"), permissionapprove: this.permissiongiven("S148") },
    
    { tabelname: "TS Change Request by Client", name: 'ts_change_req_by_client', value: 'S149', forwordtitle: "Approve Change Request", forward: "S147", forwardCheck: true, type: false, forwardText: 'Approve Change Request in Termsheet ', approvedvalue: '', backStatus: '', permissionforword: this.permissiongiven("S149")},
    
    { tabelname: "TS Approved by Client", name: 'ts_approved_by_client', value: 'S150', forwordtitle: "Forward to Company ", forward: "S151", forwardCheck: true, type: false, forwardText: 'Forward', approvedvalue: '', backStatus: '',  permissionforword: this.permissiongiven("S150") },
    
    { tabelname: "TS SHARED BY COMPANY", name: 'ts_shared_with_company', value: 'S151', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S152", approvetitle: "Forward to Admin", approvedvalue: 'S153', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: this.permissiongiven("S151") , permissionapprove: this.permissiongiven("S151") },
    { tabelname: "TS Change Request by Company", name: 'ts_change_req_by_company', value: 'S152', forwordtitle: "Approve Change Request", forward: "S147", forwardCheck: true, type: false, forwardText: 'Approve Change Request in Termsheet ', approvedvalue: '', backStatus: '', permissionforword: this.permissiongiven("S152") },
    { tabelname: "TS Approved by Company", name: 'ts_approved_by_company', value: 'S153', forwardCheck: true, type: false, forwardText: 'Upload Signed Termsheet ', forwordtitle: 'Upload Termsheet ', permissionforword:  this.permissiongiven("S153"), forward:'S154'},
   ]
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
      
      debugger
      if(this.isSuperAdmin){
        this.mouModel = data.filter(x=>x.app_Status==this.type);
      }
      
      else{
        this.mouModel = data.filter(x=>x.app_Status==this.type && this.activeusermou?.find(t=>t.mouref==x.refid));
      }
      console.log(data)
       this.showpage = true;
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


    });

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
      this.router.navigateByUrl('bcil/nttsa-dashboard')

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
        this.router.navigateByUrl('bcil/nttsa-dashboard')
      })

    }

  }


}
