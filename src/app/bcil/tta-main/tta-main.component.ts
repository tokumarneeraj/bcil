import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { activeusermou, addusertomou, mouModel } from '../../model/mou.model';
import { Router } from '@angular/router';
import { Bdoservice } from '../../services/bdo.service'
import { Utilities } from '../../services/utilities';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UploadFileViewModel } from '../../model/uploadFile.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from '../../services/account.service';
import {commondata} from '../../model/common'
import { error } from 'jquery';

@Component({
  selector: 'app-tta-main',
  templateUrl: './tta-main.component.html',
  styleUrls: ['./tta-main.component.css']
})

export class TtaMainComponent implements OnInit {

  mouModel: mouModel[];
  mouref:string;
  showpage = false;
  loading=false;
  type: string;
  customrem:boolean;
  closeResult = '';
  ForwardForm: FormGroup;
  AssignScientistForm:FormGroup;
  submitted = false;
  submitted1 = false;
  createdBy = "";
  UploadFileViewModel = new UploadFileViewModel();
  @ViewChild('editorModal1', { static: true })
  editorModal1: ModalDirective;
  usertype: string;
  UserName: string;
  showClientPage = false;
  @ViewChild('editorModal2', { static: true })
  editorModal2: ModalDirective;

  @ViewChild('editorModal3', { static: true })
  editorModal3: ModalDirective;
  
  UserEmail: string;
  UserId: string;
  userRoles: string[];
  isAdmin: boolean;
  formHeader: string;
  isBdm: boolean;
  isIPM: boolean;
  isNodal: boolean;
  isScientist: boolean;
  isSuperAdmin:boolean;
tablename:string;
commondata=new commondata();
  array=this.commondata.ttaarray();
  activeusermou: activeusermou[];
  activearray = this.array[0];

addusertomou=new addusertomou();



  constructor(private route: ActivatedRoute, private Bdoservice: Bdoservice, private formbuilder: FormBuilder, private _cookieService: CookieService, private accountService: AccountService, private router: Router) {
    this.UserEmail = this.accountService.currentUser.email;
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;
  }

  ngOnInit(): void {

    this.isAdmin = this.userRoles.includes('Admin');
    this.isBdm = this.userRoles.includes('BDM');
    this.isIPM=this.userRoles.includes('IPM');
    this.isNodal = this.userRoles.includes('Nodal'); 
this.isSuperAdmin=this.userRoles.includes('Super Admin');
this.isScientist=this.userRoles.includes('Scientist');
    this.route.queryParams.subscribe((params) => {
      this.createdBy = this.UserId;

      this.type = this.array.find(x => x.name == params.type).value;
      this.formHeader = this.array.find(x => x.name == params.type).formHeader;
this.tablename=this.array.find(x => x.name == params.type).tablename;
    })


    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      this.showClientPage = true;

      if(this.isSuperAdmin){
        this.mouModel = data.filter(x=>x.app_Status==this.type);
      }
      
      else{
        this.mouModel = data.filter(x=>x.app_Status==this.type && this.activeusermou?.find(t=>t.mouref==x.refid));
      }

      // if (this.isAdmin == true) {
      //   this.mouModel = data.filter(x => x.app_Status == this.type && x.assigntoadmin == this.UserId);
      // }

      // else if (this.isBdm == true) {

      //   this.mouModel = data.filter(x => x.app_Status == this.type && x.createdBy == this.UserId);
      // }

      // else {
      //   this.mouModel = data.filter(x => x.nodal_Email == this.UserEmail && x.app_Status == this.type);
      // }


    });
  })

    this.AssignScientistForm=this.formbuilder.group({
      scientist:['',Validators.required]
    });
    this.ForwardForm = this.formbuilder.group({

      subject: ['', Validators.required],
      remarks: [''],
      remindertype:['default',Validators.required],
      type: ['']
    });
  }



  get f() { return this.ForwardForm.controls; }



  //for client start
  onClientClick(data: mouModel, status) {
    this.UploadFileViewModel.app_ref_id = data.refid;
    this.mouref=data.refid;
    this.UploadFileViewModel.app_Status = status;
    this.editorModal2.show();

  }

  ClientfileChangeEvent(event) {
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
  reminderchange(data){
    if(data=="default"){
      this.customrem=false;
    }
    
    else if(data=="custom"){
      this.customrem=true;
      //this.editorModal2.show();
    
    }
      }
      get f1() { return this.AssignScientistForm.controls; }
      saveassignscien(){
        
        this.submitted1=true;
        if (this.AssignScientistForm.invalid) {
          return;
        }
        this.loading=true;
        this.addusertomou.userid=this.AssignScientistForm.get("scientist").value;
      // alert(this.addusertomou.userid)
        this.Bdoservice.AddScientist(this.addusertomou).subscribe(data=>{
          if(data.message=="success"){
            this.submitted1=false;
            this.editorModal3.hide();
           
alert("data save successfully")
this.loading=false;
this.ngOnInit();
          }
         
          
        },error=>{
          this.loading=false;
        })

      }
      assignscientist(mou:mouModel){
        this.Bdoservice.GetScientistbynodal().subscribe(data=>{
          this.activeusermou=data;
          if(data.length>0){
            this.editorModal3.show();
            this.addusertomou.mouref=mou.refid;
          }
          else{
            alert("Add Scientist");
          }
          console.log(data)
        
        })
      }
  uploadClientFile() {

    this.submitted = true;
    if (this.ForwardForm.invalid) {
      return;
    }
    this.loading=true;
    this.UploadFileViewModel.subject = this.ForwardForm.get('subject').value;
    this.UploadFileViewModel.remarks = this.ForwardForm.get('remarks').value;
    this.UploadFileViewModel.type = this.ForwardForm.get('type').value;
    this.UploadFileViewModel.remindertype = this.ForwardForm.get('remindertype').value;
    this.UploadFileViewModel.createdBy = this.createdBy;
    this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {

      alert("Submitted Successfully")
      this.loading=false;
      this.editorModal2.hide();
      //this.ngOnInit();
      this.router.navigateByUrl('bcil/tta-dashboard')
    })
  }
  //for client end
}
