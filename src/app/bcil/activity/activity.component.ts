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
import { AlertService, DialogType } from 'src/app/services/alert.service';
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
  lufinvoice:any[];
  clientinvoice:any[];
  viewadditionalfileright:any;
  commondata=new commondata();
  ForwardForm: FormGroup;
  activebtn:any;
   applicationno:string;
   prioritydate:string;
  UploadFileViewModel = new UploadFileViewModel();
  loading:boolean=false;
  customrem: boolean;
  @Input() array:any;
  activeusermou: activeusermou[];
  viewassign:boolean=false;
  activuser:activeusermou[];
  countrys:any[];
  appref:string;
  rowslm:User[];
  rowsbdm:User[];
  rowsassign:User[];
  rowcountry:any[];
  selectcountry:string;
  selectpct:string="PCT";
  selectedbdm:string;
  selectedlm:string;
  selectassign:string;
  organizations:any[];
  scientistlist:any[];
  submitted:boolean=false;
  process:string;
  UserId:string;
  dynamicForm: FormGroup;
  selectorg:string;
  foreignlist:any[];
  @ViewChild('country')
  public country;
  milestone=new milestones();
  message:string="";
  fields = [];
  extrafield=['PCT'];

  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;
  constructor(private cdRef: ChangeDetectorRef,private route: ActivatedRoute,private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder,  private accountService: AccountService, private router: Router) { 
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;
  }

  ngOnInit(): void {

    this.selectpct='PCT';

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
    clientinvocie:[''],
    foreign:[''],
    booleanvalue:[false],
    milestonedata:this.formbuilder.array([this.addItemFormGroup()]),
    nextactiondata:this.formbuilder.array([this.addNextActionItemFormGroup()])
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
      onchangepct(event:any){
     //   this.fields=[];
       // this.dynamicafiledset();
       // alert(event.target.value);
       this.selectpct=event.target.value;
      this.dynamicForm.controls['COUNTRY'].setValue("");
        

 this.fields=this.fields.map(obj=> ({ ...obj, hideshow:obj?.filter==undefined||obj?.filter==this.selectpct?.toLowerCase()?true:false }))
// if(event.target.value=="PCT"){
// this.fields=this.fields.map(obj=> ({ ...obj, hideshow:obj.filter=='pct'?true:false }))
//  // this.fields.push(this.activebtn?.form?.jsondata?.find(e=>e.type=="countryselect")?.pct)
// }
// else{
//   this.fields=this.fields.map(obj=> ({ ...obj, hideshow:obj.filter=='non_pct'?true:false }))
//  //  this.fields.push(this.activebtn?.form?.jsondata?.find(e=>e.type=="countryselect")?.non_pct)
// }

//alert(this.fields);
console.log(this.fields)
       
      }
      selectedcountry(event: any[]){
        //this.countrys.push(event);
        //console.log(event[event.length-1]?.name);
        // this.userEdit.roles=[];
        // this.userEdit.roles.push(event[event.length-1]?.name);
        // this.userEdit.roles=this.userEdit.roles.filter(x=>x!=null)
          }


          dynamicafiledset(){
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
        if(res.type=='file'){
          controls["FILENAME"] = new FormControl('');
          controls["FILE"] = new FormControl('');
        }
        // if(this.activebtn?.form?.nextaction==true){
        //   controls["NEXTACTION"] = new FormControl('');
        //   //this.dynamicForm.addControl['NEXTACTION'];
        // }
        if(res.type=="countryselect"){
          controls["PCT"] = new FormControl('PCT');
        }
          controls[res.label] = new FormControl('', validationsArray);
        });
        this.dynamicForm = new FormGroup(
          controls
        );
}
          }
          selectedclient(data){

          }
      showviewmodel(e?:string,value?:string,data?:any){
        this.cdRef.detectChanges();
        this.loading=false;
        this.process=e;
        this.message=data?.message;
        this.UploadFileViewModel.app_no=data?.appno ||data?.mou_no;
        this.UploadFileViewModel.querystring=data?.querystring;

        this.ForwardForm.controls['subject'].setValue(data?.forwardsubject)
        this.UploadFileViewModel.app_ref_id = data?.refid;
        this.applicationno=data?.applicationno;
        this.prioritydate=data?.prioritydate;
        this.appref=data?.refid;
        this.UploadFileViewModel.app_Status=value;
        this.lufinvoice=data?.lufinvoice;
        this.clientinvoice=data?.clientinvoice;
        this.foreignlist=data?.foreign;
console.log(data,'luf')
        this.activebtn=this.array?.button.find(x=>x.value==value);

 
    if(this.activebtn?.form?.bdoassigned==true || this.activebtn?.form?.lmassigned==true||this.activebtn?.form?.assign==true){
     // this.accountService.getUsersandRolesForDropdown().subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));
  
     this.accountService.getAllUser(0,0).subscribe(data=>{
       this.rowsbdm=data.filter((x)=>x.roles.includes('BDM'));
       this.rowslm=data.filter((x)=>x.roles.includes('LM'));
       this.rowsassign=data.filter((x)=>x.roles.find(t=>this.activebtn?.form?.assignarray?.includes(t)));

     })
     
     }
     if(this.activebtn?.form?.organization==true){
      this.Bdoservice.Getorganization("all").subscribe(data=>{
        this.organizations=data;
        if(this.userRoles[0]=='Admin'){
          
        }
        
        else {
          this.Bdoservice.Getorganizationbyuserid().subscribe(data1=>{
            
            this.organizations=this.organizations.filter(y=>y.value==data1[0]?.value);
           
            this.selectorg=data1[0]?.value;
            this.organizationchnage(this.selectorg);
            if(this.userRoles[0]=='Scientist'){
              this.activebtn.form.assign=false;
              this.viewassign=false;
              this.ForwardForm.controls['assignto'].setValue(this.UserId)
             // this.ForwardForm.controls('assign').setValue()
            }
            console.log(data1)

         // let nodalid= this.organizations.find(x=>x.value==this.UserId).key
        })
      }


      })
      }
      this.dynamicafiledset();
      if(this.activebtn?.form?.jsondata?.some(x=>x.type=="countryselect")==true){
        this.Bdoservice.Getcountry().subscribe(data1=>{
          this.rowcountry=data1;

          });

      }
      
     this.Bdoservice.GetActiveUserMoubyrefid(data?.refid).subscribe(data1=>{
      this.activuser=data1;
      console.log(this.activuser);
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
          milestone: [''],
          paymentterm: [''],
          timeline: [''],
          paymenttype:['YES']
         
        });
      }
      get milestonedata(): FormArray {
    return this.ForwardForm.get('milestonedata') as FormArray;
  }

  addNextActionItemButtonClick(): void {
    (<FormArray>this.ForwardForm.get('nextactiondata')).push(this.addNextActionItemFormGroup());
  }
  addNextActionItemFormGroup(): FormGroup {
    return this.formbuilder.group({
      ID: [0],
      nextaction: [''],
      deadline: [''],
      remarks: [''],
     
     
    });
  }
  get nextactiondata(): FormArray {
return this.ForwardForm.get('nextactiondata') as FormArray;
}
deletenextactionitem(deleteitem: number){

  var item = this.nextactiondata.at(deleteitem);
    var items = item.get('ID').value;

    var conf = confirm("Are you sure you want to delete this ?");
    if (conf == true) {
       (<FormArray>this.ForwardForm.get('nextactiondata')).removeAt(deleteitem);
      }
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
    
         let nodalid= this.organizations.find(r=>r.value==el)?.nodalid;
//console.log(data)
if(nodalid!=""){
  if(this.activebtn?.form?.getscientist==true){
      //  this.Bdoservice.GetScientistbynodal_org(nodalid).subscribe(data=>{
 // this.organizations=data;
  this.viewassign=true;
  this.accountService.getAllUser(0,0).subscribe(data=>{
  this.rowsassign=data.filter((x)=>x.roles.find(t=>x.createdBy==nodalid && (this.activebtn?.form?.assignarray?.includes(t)||this.array?.assignarray?.includes(t))));
//});
  
        })
      }
    }
    else
    {
      this.rowsassign=[];
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
      if(this.activebtn?.form?.remarks){
        this.ForwardForm.controls['remarks'].setValidators([Validators.required]);              
    } else {                
      this.ForwardForm.controls["remarks"].clearValidators();              
    }
    this.ForwardForm.controls['remarks'].updateValueAndValidity();

      if(this.array?.foreignlabel==true){
        this.ForwardForm.controls['foreign'].setValidators([Validators.required]);
        this.ForwardForm.controls['foreign'].updateValueAndValidity();
      }
      else{
        this.ForwardForm.controls['foreign'].clearValidators();
        this.ForwardForm.controls['foreign'].updateValueAndValidity();
      }
     if(this.array?.foreignlabel==true){
      this.UploadFileViewModel.app_ref_id=this.ForwardForm.get('foreign').value;
     }
       if(this.activebtn?.form?.mappedinvoice){
        let act=[];//this.ForwardForm.get('activity').value?.map(t=>({id==t.name}));
        for(let rr of this.ForwardForm.get('clientinvocie').value){
          act.push(this.clientinvoice.find(r=>r.appno==rr)?.refid);
        }
        this.UploadFileViewModel.arraytype=act;
       }
        this.UploadFileViewModel.subject = this.ForwardForm.get('subject').value;
        this.UploadFileViewModel.remarks = this.ForwardForm.get('remarks').value;
        this.UploadFileViewModel.type = this.ForwardForm.get('type').value;
        this.UploadFileViewModel.assigntobdo = this.ForwardForm.get('assigntobdo').value;
        this.UploadFileViewModel.assigntolm = this.ForwardForm.get('assigntolm').value;
        this.UploadFileViewModel.assignto=this.ForwardForm.get('assignto').value;
        this.UploadFileViewModel.remindertype = this.ForwardForm.get('remindertype').value;
        this.UploadFileViewModel.organization = this.ForwardForm.get('organization').value;
        if(this.activebtn?.form?.toggle){
        this.UploadFileViewModel.booleancheck = this.ForwardForm.get('booleanvalue').value;
        }
       for(let control of this.fields){
         if(control?.label=='NBA'){
          console.log(this.dynamicForm?.value)
           if(this.dynamicForm?.value?.NBA=="YES"){
            
            this.dynamicForm?.controls['NBA_FILE'].setValidators([Validators.required]);
        
            this.dynamicForm?.controls['NBA_REMARKS'].setValidators([Validators.required]);
        
           }
           else{
            this.dynamicForm?.controls["NBA_REMARKS"].clearValidators();  
            this.dynamicForm?.controls["NBA_FILE"].clearValidators();  
           }
           this.dynamicForm?.controls['NBA_REMARKS'].updateValueAndValidity();
           this.dynamicForm?.controls['NBA_FILE'].updateValueAndValidity();
           
         // alert(this.dynamicForm?.value?.get('NBA').value)
         }
          if(control?.filter!=undefined && control?.filter!=this.selectpct?.toLowerCase()){

          
      this.dynamicForm.removeControl(control.label);
      console.log(control.label);
          }
        }
        if(this.activebtn?.form?.nextaction==true){
          const controls = {};
          controls["NEXTACTION"] = new FormControl('')
          this.dynamicForm = new FormGroup(
controls
            
          );
        //this.dynamicForm.addControl['NEXTACTION'];
        this.dynamicForm.controls['NEXTACTION'].setValue(this.ForwardForm.get('nextactiondata').value)

        }
        else{
          this.ForwardForm.get('nextactiondata').clearValidators();
          this.ForwardForm.get('nextactiondata').updateValueAndValidity();

        }
        
        this.UploadFileViewModel.jsondata=JSON.stringify(this.dynamicForm.value);
var tt=[];

        for (let arr of  this.ForwardForm.get('milestonedata').value) {
          tt.push({milestone:arr['milestone'],timelines:arr['timeline'],paymentterm:arr['paymentterm'],misref: this.UploadFileViewModel.app_ref_id,id:0,paymenttype:arr['paymenttype']});
        }
        this.UploadFileViewModel.milestones= tt.filter(y=> y.milestone!="");//this.ForwardForm.get('milestonedata').value;
    //     if(this.activuser?.find(x=>this.rows?.find(y=>y.id==x.userid))?.userid!=this.ForwardForm.get('assigntobdo').value && this.ForwardForm.get('assigntobdo').value!="")
    // {
    //     this.UploadFileViewModel.assigntobdo = this.ForwardForm.get('assigntobdo').value;
    // }
    console.log( this.UploadFileViewModel,this.ForwardForm.get('milestonedata').value)
     // return false;
     if (this.dynamicForm.invalid) {
      return;
    }
     if (this.ForwardForm.invalid) {
      return;
    }
  
    this.alertService.showDialog(this.message==undefined?"Are you sure You Want To Submit":"Are you sure you want to move from <b style='font-weight: 800'>"+this.message+"</b>", DialogType.confirm, () => this.updatedata());
    
   
  }

  updatedata(){
    this.loading=true;
    this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((data) => {
     //  this.loading=false;
       this.submitted=false;
if(data.message=="success"){
      //alert("")
     
    
      this.editorModal.hide();
      this.cdRef.detectChanges();
      if (this.changesSavedCallback) {
        this.changesSavedCallback();
      }
      this.alertService.showDialog("Submitted Successfully", DialogType.confirm,()=>{this.redirectlink()})
        
      
    
      
     
}
      else{
        alert(data.reason)
        this.loading=false;
        this.submitted=false;
      }
    })

  }

  redirectlink(){
  //this.ngOnInit();
  this.process=="mou"? this.router.navigateByUrl('bcil/mou-dashboard'): 
  this.process=="tta"?this.router.navigateByUrl('bcil/tta-dashboard'):
  this.process=="mis"?this.router.navigateByUrl('bcil/mis-dashboard'):
  this.process=="plant_varity"?this.router.navigateByUrl('bcil/plant-variety-dashboard'):
  this.process=="patent"?this.router.navigateByUrl('bcil/patent-dashboard'):
  this.process=="trademark"?this.router.navigateByUrl('bcil/trademark-dashboard'):
  this.process=="design"?this.router.navigateByUrl('bcil/design-dashboard'):
  this.process=="copyright"?this.router.navigateByUrl('bcil/copyright-dashboard'):
  this.process=="account"?this.router.navigateByUrl('bcil/account-dashboard'):
 // this.process=="lufinvocie"?this.router.navigateByUrl('bcil/account-dashboard'):
  ''
  ;
  }
  otherfileChangeEvent(event){
    if (event.target.files && event.target.files[0]) {
     // this.ForwardForm.get('files').setValue("vgv");
      const fileUpload = event.target.files[0];
      const filee = fileUpload.files;
      if( fileUpload.size<=30*1024*1024){
      this.dynamicForm.controls['FILENAME'].setValue(fileUpload.name);

     // const sFileExtension = fileUpload.name
       // .split('.')
      //[fileUpload.name.split('.').length - 1].toLowerCase();
      Utilities.getBase64(event.target.files[0]).then((data) => {
        console.log(data);
       // this.UploadFileViewModel.fileType = '.' + sFileExtension;

        let data1: any = data;
        let contentType = data1?.split(',')[1];
        //this.dynamicForm.controls['FEE_RECEIPT_FILE'].setValue(contentType);
        this.dynamicForm.controls['FILE'].setValue(contentType);
      });
  }
}
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
