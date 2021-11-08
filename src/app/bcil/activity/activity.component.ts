import { Component, Input, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timeline } from 'console';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { milestones, UploadFileViewModel } from 'src/app/model/uploadFile.model';
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
  viewassign:boolean=false;
  activuser:activeusermou[];
  appref:string;
  rowslm:User[];
  rowsbdm:User[];
  rowsassign:User[];
  selectedbdm:string;
  selectedlm:string;
  selectassign:string;
  organizations:any[];
  scientistlist:any[];
  submitted:boolean=false;
  process:string;
  dynamicForm: FormGroup;
  milestone=new milestones();
  fields = [];
  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;
  constructor(private cdRef: ChangeDetectorRef,private route: ActivatedRoute,private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder,  private accountService: AccountService, private router: Router) { 
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
    organization:[''],
    type: [''],
    assigntobdo:[''],
    assigntolm:[''],
    assignto:[''],
    files:[''],
    
    milestonedata:this.formbuilder.array([this.addItemFormGroup()])
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
        this.loading=false;
        this.process=e;
        this.UploadFileViewModel.app_no=data?.mis_no ||data?.mou_no;
        this.UploadFileViewModel.app_ref_id = data?.refid;
        this.appref=data?.refid;
        this.UploadFileViewModel.app_Status=value;

        this.activebtn=this.array?.button?.find(x=>x.value==value);
this.fields=this.activebtn?.form?.jsondata||[];
if(this.fields!=undefined){
        const controls = {};
        this.fields.forEach(res => {
          const validationsArray = [];
          res.validations.forEach(val => {
            if (val.name === 'required') {
              validationsArray.push(
                Validators.required
              );
            }
            if (val.name === 'pattern') {
              validationsArray.push(
                Validators.pattern(val.validator)
              );
            }
          });
          controls[res.label] = new FormControl('', validationsArray);
        });
        this.dynamicForm = new FormGroup(
          controls
        );
}
 
    if(this.activebtn?.form?.bdoassigned==true || this.activebtn?.form?.lmassigned==true||this.activebtn?.form?.assign==true){
     // this.accountService.getUsersandRolesForDropdown().subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));
  
     this.accountService.getAllUser(0,0).subscribe(data=>{
       this.rowsbdm=data.filter((x)=>x.roles.includes('BDM'));
       this.rowslm=data.filter((x)=>x.roles.includes('LM'));
       this.rowsassign=data.filter((x)=>x.roles.find(t=>this.activebtn?.form?.assignarray?.includes(t)));
     })
     
     }
     if(this.activebtn?.form?.organization==true || this.array?.organization==true){
      this.Bdoservice.Getallorganization("").subscribe(data=>{
this.organizations=data;
      })
      }
    
     this.Bdoservice.GetActiveUserMoubyrefid(data?.refid).subscribe(data1=>{
      this.activuser=data1;
      this.selectedbdm=this.activuser?.find(x=>this.rowsbdm?.find(y=>y.id==x.userid))?.userid||"";
      this.selectedlm=this.activuser?.find(x=>this.rowslm?.find(y=>y.id==x.userid))?.userid||"";
      this.selectassign=this.activuser?.find(x=>this.rowslm?.find(y=>y.id==x.userid))?.userid||"";
      //$("[name='assignbdo'] option[value='"+this.activuser.find(x=>this.rows?.find(y=>y.id==x.userid).id)?.userid+"']").prop('selected',true);
     //this.ForwardForm.get('assigntobdo').setValue("bdmuser")
      //this.activuser.find(x=>this.rows?.find(y=>y.id==x.userid)?.userName
                });
    
        this.editorModal.show();
        debugger;
      
       
      }
      addItemButtonClick(): void {
        (<FormArray>this.ForwardForm.get('milestonedata')).push(this.addItemFormGroup());
      }
      addItemFormGroup(): FormGroup {
        return this.formbuilder.group({
          ID: [0],
          milestone: [],
          paymentterm: [],
          timeline: [],
         
        });
      }
      get milestonedata(): FormArray {
    return this.ForwardForm.get('milestonedata') as FormArray;
  }
  deleteitem(deleteitem: number) {
    var item = this.milestonedata.at(deleteitem);
    var items = item.get('ID').value;

    var conf = confirm("Are you sure you want to delete this ?");
    if (conf == true) {
       (<FormArray>this.ForwardForm.get('milestonedata')).removeAt(deleteitem);
      }
      }
      organizationchnage(el){
     let nodalid= this.organizations.find(x=>x.value==el).key
//console.log(data)
  if(this.activebtn?.form?.getscientist==true || this.array?.getscientist==true){
      //  this.Bdoservice.GetScientistbynodal_org(nodalid).subscribe(data=>{
 // this.organizations=data;
  this.viewassign=true;
  this.accountService.getAllUser(0,0).subscribe(data=>{
  this.rowsassign=data.filter((x)=>x.roles.find(t=>x.createdBy==nodalid && (this.activebtn?.form?.assignarray?.includes(t)||this.array?.assignarray?.includes(t))));
//});
  
        })
      }
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
        if(this.activebtn?.form?.assign==true){
          this.ForwardForm.controls['assignto'].setValidators([Validators.required]);
          this.ForwardForm.controls['assignto'].updateValueAndValidity();
        }
        if(this.activebtn?.form?.organization==true ||this.array?.organization){
          this.ForwardForm.controls['organization'].setValidators([Validators.required]);
          this.ForwardForm.controls['organization'].updateValueAndValidity();
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
        this.UploadFileViewModel.assignto=this.ForwardForm.get('assignto').value;
        this.UploadFileViewModel.remindertype = this.ForwardForm.get('remindertype').value;
        this.UploadFileViewModel.organization = this.ForwardForm.get('organization').value;
        this.UploadFileViewModel.jsondata=JSON.stringify(this.dynamicForm.value);
var tt=[];

        for (let arr of  this.ForwardForm.get('milestonedata').value) {
          tt.push({milestone:arr['milestone'],timelines:arr['timeline'],paymentterm:arr['paymentterm'],misref: this.UploadFileViewModel.app_ref_id,id:0});
        }
        this.UploadFileViewModel.milestones= tt;//this.ForwardForm.get('milestonedata').value;
    //     if(this.activuser?.find(x=>this.rows?.find(y=>y.id==x.userid))?.userid!=this.ForwardForm.get('assigntobdo').value && this.ForwardForm.get('assigntobdo').value!="")
    // {
    //     this.UploadFileViewModel.assigntobdo = this.ForwardForm.get('assigntobdo').value;
    // }
    console.log( this.UploadFileViewModel,this.ForwardForm.get('milestonedata').value)
     // return false;
    
        this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((data) => {
         //  this.loading=false;
           this.submitted=false;
    if(data.message=="success"){
          alert("Submitted Successfully")
         
          this.editorModal.hide();
          if (this.changesSavedCallback) {
            this.changesSavedCallback();
          }
          //this.ngOnInit();
          this.process=="mou"? this.router.navigateByUrl('bcil/mou-dashboard'): 
          this.process=="mis"?this.router.navigateByUrl('bcil/mis-dashboard'):
          this.process=="plant_varity"?this.router.navigateByUrl('bcil/plant-variety-dashboard'):
          this.process=="patent"?this.router.navigateByUrl('bcil/patent-dashboard'):
          this.process=="trademark"?this.router.navigateByUrl('bcil/trademark-dashboard'):
          this.process=="design"?this.router.navigateByUrl('bcil/design-dashboard'):
          this.process=="copyright"?this.router.navigateByUrl('bcil/copyright-dashboard'):
          ''
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
