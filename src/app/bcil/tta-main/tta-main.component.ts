import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { activeusermou, addusertomou, mouModel } from '../../model/mou.model';
import { Router } from '@angular/router';
import { Bdoservice } from '../../services/bdo.service'
import { Utilities } from '../../services/utilities';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { emailsend, UploadFileViewModel } from '../../model/uploadFile.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from '../../services/account.service';
import {commondata} from '../../model/common'
import { error } from 'jquery';
import { AdditionFileComponent } from '../addition-file/addition-file.component';
import { AlertService, DialogType } from 'src/app/services/alert.service';
import { User } from 'src/app/model/user.model';
import { AddScientistComponent } from '../add-scientist/add-scientist.component';
import { ActivityComponent } from '../activity/activity.component';
import { DocumentviewComponent } from '../documentview/documentview.component';

@Component({
  selector: 'app-tta-main',
  templateUrl: './tta-main.component.html',
  styleUrls: ['./tta-main.component.css']
})

export class TtaMainComponent implements OnInit {
ttaModel:any[];
  mouModel: mouModel[];
  mouref:string;
  showpage = false;
  loading=false;
  type: string;
  selected:string;
  customrem:boolean;
  closeResult = '';
  ForwardForm: FormGroup;
  AssignScientistForm:FormGroup;
  submitted = false;
  submitted1 = false;
  createdBy = "";
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  @ViewChild(AdditionFileComponent)
  AdditionFile: AdditionFileComponent;
  @ViewChild(AddScientistComponent)
  addscientist: AddScientistComponent;
  @ViewChild(DocumentviewComponent)
  Document: DocumentviewComponent;
  UploadFileViewModel = new UploadFileViewModel();
  @ViewChild('editorModal1', { static: true })
  editorModal1: ModalDirective;
  usertype: string;
  UserName: string;
  showClientPage = false;
  users: User[] = [];
  rows: User[] = [];
  rows1: User[] = [];
  @ViewChild('editorModal2', { static: true })
  editorModal2: ModalDirective;
  datapermission:any;
  @ViewChild('editorModal3', { static: true })
  editorModal3: ModalDirective;
  showextrafield:boolean=false;
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
  array:any;
  activeusermou: activeusermou[];
  
  activuser:activeusermou[];
addusertomou=new addusertomou();
viewhistory:boolean;
viewremark:boolean;
emailpermission:boolean;
viewadditionalfileright:boolean;
viewtab:any;
activetab:string;
managetab:any;
ttadata:any;
activebtn:any;
  constructor(private route: ActivatedRoute,private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder, private _cookieService: CookieService, private accountService: AccountService, private router: Router) {
    this.UserEmail = this.accountService.currentUser.email;
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;
    this.showextrafield=false;
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
//this.accountService.getOtherpermissionbyrolename(roledata?.name).subscribe(data=>{
this.Bdoservice.getdatapermission().subscribe(data=>{
  console.log(data);
 this.datapermission=data;
    this.route.queryParams.subscribe((params) => {
      let yy=["tlp","nttsa","tstl"];
      this.activetab=params?.activetab;
      if(yy.includes(params.stage)){

        this.ttadata=data?.tta?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));

      }
      else{
      this.ttadata=data?.tta?.filter(x=>this.viewtab.find(y=>y==x.value));
      }
         this.array=this.ttadata.find(x => x.type == params.type);
       this.managetab.some(x=>x==this.array.value)?null:this.array={...this.array,button:[]};//this.array?.find(x=>this.managetab?.find(y=>y==x.value)); 
     
   

    //})
  });


    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetTtaModel(this.activetab).subscribe(data => {
      console.log(data)
      this.showClientPage = true;

      if(this.isSuperAdmin){
        this.ttaModel = data.filter(x=>x.app_Status==this.array?.value);
      }
      
      else{
        this.ttaModel = data.filter(x=>x.app_Status==this.array?.value && this.activeusermou?.some(t=>t.appref==x.refid));
      }
      this.viewhistory=this.commondata.getotherpermissiondata('history').some(x=>x?.split('-')[1]==this.type);
      this.viewremark= this.commondata.getotherpermissiondata('remark').some(x=>x?.split('-')[1]==this.type);
  

    });
  })
});
   
    this.ForwardForm = this.formbuilder.group({

      subject: ['', Validators.required],
      remarks: [''],
      remindertype:['default',Validators.required],
      type: [''],
      assigntobdo:[''],
      files:['', Validators.required]
    });
  }



  get f() { return this.ForwardForm.controls; }

  ngAfterViewInit() {

    this.activity.changesSavedCallback = () => {
      //this.addNewRoleToList();
      this.ngOnInit();
    };
  }
  viewadditionalfile(data:mouModel){
    this.AdditionFile.showviewmodel(data,true,"tta");
  }
  remarksview(data:any){
    this.alertService.showDialog(data,DialogType.alert);

  }

 viewdocumentfile(data){
    this.route.queryParams.subscribe((params)=>{
    this.Document.onmodalshow(data,params?.stage);
    });
  }
  onmodalclick(e: string,value:any, data: any) {
    this.loading=false;
    this.submitted=false;
    let yy="",querystring="";
this.datapermission?.tta?.forEach(element => {
  if(yy==undefined ||yy==""){
  yy=(element.value==value)==true?element?.tablename:undefined||element?.subchild?.find(x=>x.value==value)?.tablename;
   querystring=(element.value==value)==true?"bcil/bcil-tta-table?stage="+element?.stage+"&type="+element?.type:undefined ||
      "bcil/bcil-tta-table?stage="+element?.subchild?.find(x=>x.value==value)?.stage+"&type="+element?.subchild?.find(x=>x.value==value)?.type+"";
 
   if(yy!=undefined) 
      return true;
  }
  
  data={...data,message:this.array?.tablename+' To '+yy,querystring:querystring}
  this.activity.showviewmodel('tta',value,data);
})

    // this.UploadFileViewModel.app_no=data.mou_no;
    // this.UploadFileViewModel.app_ref_id = data.refid;
    // this.mouref=data.refid;
    // this.UploadFileViewModel.app_Status=value;
    // debugger;
    // this.activebtn=this.array?.button?.find(x=>x.value==value);
 
    // if(this.activebtn?.form?.bdoassigned==true || this.activebtn?.form?.lmassigned==true){
    //  // this.accountService.getUsersandRolesForDropdown().subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));
  
    //  this.accountService.getAllUser(0,0).subscribe(data=>{
    //    this.rows1=data.filter((x)=>x.roles.includes('BDM'));
    //    this.rows=data.filter((x)=>x.roles.includes('LM'));
    //  })
 
    // }
    // this.editorModal2.show();
    // this.Bdoservice.GetActiveUserMoubyrefid(data.refid).subscribe(data1=>{
    //   this.activuser=data1;
    //   this.selected=this.activuser.find(x=>this.rows1?.find(y=>y.id==x.userid))?.userid;
    //   //$("[name='assignbdo'] option[value='"+this.activuser.find(x=>this.rows?.find(y=>y.id==x.userid).id)?.userid+"']").prop('selected',true);
    //  //this.ForwardForm.get('assigntobdo').setValue("bdmuser")
    //   //this.activuser.find(x=>this.rows?.find(y=>y.id==x.userid)?.userName
    //             });
  }
    
  //for client start
  onClientClick(data: mouModel, status) {
    this.showextrafield=status=="S114"?true:false;
    status=="S401"?this.formHeader="Assign To Nodal/Scientist":this.formHeader;
    this.UploadFileViewModel.app_no=data.tto_no;
    this.UploadFileViewModel.app_ref_id = data.refid;
    this.mouref=data.refid;
    this.UploadFileViewModel.app_Status = status;

    this.editorModal2.show();
this.Bdoservice.GetActiveUserMoubyrefid(data.refid).subscribe(data1=>{
    this.activuser=data1;
    this.selected=this.activuser.find(x=>this.rows?.find(y=>y.id==x.userid))?.userid;
    //$("[name='assignbdo'] option[value='"+this.activuser.find(x=>this.rows?.find(y=>y.id==x.userid).id)?.userid+"']").prop('selected',true);
   //this.ForwardForm.get('assigntobdo').setValue("bdmuser")
    //this.activuser.find(x=>this.rows?.find(y=>y.id==x.userid)?.userName
              });
  }

  ClientfileChangeEvent(event) {
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
  reminderchange(data){
    if(data=="default"){
      this.customrem=false;
    }
    
    else if(data=="custom"){
      this.customrem=true;
      //this.editorModal2.show();
    
    }
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
    this.UploadFileViewModel.remindertype = this.ForwardForm.get('remindertype').value;
    if(this.activuser?.find(x=>this.rows?.find(y=>y.id==x.userid))?.userid!=this.ForwardForm.get('assigntobdo').value && this.ForwardForm.get('assigntobdo').value!="")
{
    this.UploadFileViewModel.assigntobdo = this.ForwardForm.get('assigntobdo').value;
}
    this.UploadFileViewModel.createdBy = this.createdBy;
    // if(this.emailpermission==true){
    //   this.UploadFileViewModel.emailsend=new emailsend();
    //   this.UploadFileViewModel.emailsend.emailcheck=true;
    //   this.UploadFileViewModel.emailsend.email=this.UserEmail;

    // }

    this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((data) => {
       this.loading=false;
       this.submitted=false;
if(data.message=="success"){
      alert("Submitted Successfully")
     
      this.editorModal2.hide();
      //this.ngOnInit();
      this.router.navigateByUrl('bcil/tta-dashboard')
}
      else{
        alert(data.reason)
      }
    })
  }
  //for client end
}
