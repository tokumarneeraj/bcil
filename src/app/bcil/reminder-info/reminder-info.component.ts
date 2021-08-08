import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {  Reminder, StatusMaster } from 'src/app/model/mou.model';
import { Role } from 'src/app/model/role.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService, MessageSeverity } from 'src/app/services/alert.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { Utilities } from 'src/app/services/utilities';

@Component({
  selector: 'app-reminder-info',
  templateUrl: './reminder-info.component.html',
  styleUrls: ['./reminder-info.component.scss']
})
export class ReminderInfoComponent implements OnInit {
  userRoles:string;
  constructor(private forms: FormBuilder,private alertService: AlertService,private bdoservice:Bdoservice,private accountService: AccountService) {
    this.userRoles = this.accountService.currentUser.roles.join(',');

   }
  public formResetToggle = true;
  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;
  timeing=['NA','minutes','hours','days','month','years']
ReminderInfoForm: FormGroup;
  public isEditMode = false;
  isSaving=false;
  submitted=false;
  isLoading=false;
  public uniqueId: string = Utilities.uniqueId();
  @Input()
  isGeneralEditor = false;

  @Input()
  customrem:boolean;
  @Input()
  mouref:string;
  @Input()
  editmode = false;
  @Input()
  StatusMaster:StatusMaster[];
  @ViewChild('editorModal1', { static: true })
  editorModal1: ModalDirective;
  @Input()
  Role:Role[];
  @Input()
  isViewOnly: boolean;
  @ViewChild('f')
  public form;
stagetext:string;
tempsection:string;
  // ViewChilds Required because ngIf hides template variables from global scope
  @ViewChild('stateName')
  public userName;
  
  timetype(value,type){
    switch(type){
      case 'deadline':
        
       value=="NA" || ""? (this.ReminderInfoForm.get("deadlineinputtime").setValue(0)):
       this.ReminderInfoForm.controls.deadlineinputtime.enable()
       ; break;
       case 'lapselowrem':
        
        value=="NA"? (this.ReminderInfoForm.get("lapselowreminputtime").setValue(0)):
        this.ReminderInfoForm.controls.lapselowreminputtime.enable()
        ;
        case 'lapsemedrem':
        
          value=="NA"? (this.ReminderInfoForm.get("lapsemedreminputtime").setValue(0)):
          this.ReminderInfoForm.controls.lapsemedreminputtime.enable()
          ;
          break;
          case 'lapsehighrem':
        
            value=="NA"? (this.ReminderInfoForm.get("lapsehighreminputtime").setValue(0)):
            this.ReminderInfoForm.controls.lapsehighreminputtime.enable()
            ;
            break;
            case 'deadlinelowrem':
        
              value=="NA"?  (this.ReminderInfoForm.get("deadlinelowreminputtime").setValue(0)):
              this.ReminderInfoForm.controls.deadlinelowreminputtime.enable()
              ;
              break;
              case 'deadlinemedrem':
        
                value=="NA"?  (this.ReminderInfoForm.get("deadlinemedreminputtime").setValue(0)):
                this.ReminderInfoForm.controls.deadlinemedreminputtime.enable()
                ;
                break;
                case 'deadlinehighrem':
        
                  value=="NA"? (this.ReminderInfoForm.get("deadlinehighreminputtime").setValue(0)):
                  this.ReminderInfoForm.controls.deadlinehighreminputtime.enable()
                  ;
                  break;
                  case 'repeatrem':
        
                    value=="NA"?  (this.ReminderInfoForm.get("repeatreminputtime").setValue(0)):
                    this.ReminderInfoForm.controls.repeatreminputtime.enable()
                    ;

        
        break;
        default:
          break;
    }
    //alert(value)
  }

  radiochange(data){
    this.tempsection=data;
  
    switch(data){
      case 1:
       
        break;
        case 2:
         
          break;
          default:
            break;

    }
  }

  ngOnInit(): void {
   
    this.radiochange('1');
    this.ReminderInfoForm = this.forms.group({
      stage: ['', Validators.required],
      typereminder:['1',Validators.required],
      deadlineinputtime: ['0', Validators.required],
      deadlinetimetype:['NA',Validators.required],
      owner:['',Validators.required],
      lapselowreminputtime:['0',Validators.required],
      lapselowremtypetime:['NA',Validators.required],
      lapsemedreminputtime:['0',Validators.required],
      lapsemedremtypetime:['NA',Validators.required],
      lapsehighreminputtime:['0',Validators.required],
      lapsehighremtypetime:['NA',Validators.required],
      deadlinelowreminputtime:['0',Validators.required],
      deadlinelowremtypetime:['NA',Validators.required],
      deadlinemedreminputtime:['0',Validators.required],
      deadlinemedremtypetime:['NA',Validators.required],
      deadlinehighreminputtime:['0',Validators.required],
      deadlinehighremtypetime:['NA',Validators.required],
      repeatreminputtime:['0',Validators.required],
      repeatremtypetime:['NA',Validators.required],
    })


  // public id:string;
  // public createdBy:string;
  // public status:boolean;
  }
  resetForm(replace = false) {

    if (!replace) {
      this.form.reset();
    } else {
      this.formResetToggle = false;

      setTimeout(() => {
        this.formResetToggle = true;
      });
    }
  }
  cancel() {
   
  //  this.resetForm();

    this.alertService.showMessage('Cancelled', 'Operation cancelled by user', MessageSeverity.default);
    this.alertService.resetStickyMessage();

    if (this.changesCancelledCallback) {
      this.changesCancelledCallback();
    }
    //this.editorModal1.hide();
  }
  get f() {
    return this.ReminderInfoForm.controls;
  }
  EditReminder(reminder:Reminder){
   // alert(this.customrem)
  //  this.ReminderInfoForm.get('deadlineinputtime').setValue(reminder.mouref);
this.ReminderInfoForm.get('deadlineinputtime').setValue(reminder.deadlineinputtime);
this.ReminderInfoForm.get('stage').setValue(reminder.stage);
this.stagetext=this.StatusMaster?.find(x=>x.status_code==reminder.stage)?.status_name;
this.ReminderInfoForm.get('deadlinetimetype').setValue(reminder.deadlinetimetype);
this.ReminderInfoForm.get('owner').setValue(reminder.owner);
this.ReminderInfoForm.get('lapselowreminputtime').setValue(reminder.lapselowreminputtime);
this.ReminderInfoForm.get('lapselowremtypetime').setValue(reminder.lapselowremtypetime);
this.ReminderInfoForm.get('lapsemedreminputtime').setValue(reminder.lapsemedreminputtime);
this.ReminderInfoForm.get('lapsemedremtypetime').setValue(reminder.lapsemedremtypetime);
this.ReminderInfoForm.get('lapsehighreminputtime').setValue(reminder.lapsehighreminputtime);
this.ReminderInfoForm.get('lapsehighremtypetime').setValue(reminder.lapsehighremtypetime);
this.ReminderInfoForm.get('deadlinelowreminputtime').setValue(reminder.deadlinelowreminputtime);
this.ReminderInfoForm.get('deadlinelowremtypetime').setValue(reminder.deadlinelowremtypetime);
this.ReminderInfoForm.get('deadlinemedreminputtime').setValue(reminder.deadlinemedreminputtime);
this.ReminderInfoForm.get('deadlinemedremtypetime').setValue(reminder.deadlinemedremtypetime);
this.ReminderInfoForm.get('deadlinehighreminputtime').setValue(reminder.deadlinehighreminputtime);

this.ReminderInfoForm.get('deadlinehighremtypetime').setValue(reminder.deadlinehighremtypetime);

this.ReminderInfoForm.get('repeatreminputtime').setValue(reminder.repeatreminputtime);

this.ReminderInfoForm.get('repeatremtypetime').setValue(reminder.repeatremtypetime);


return reminder;

  }

  

  edit(){
    this.submitted = true;

    // if (this.ReminderInfoForm.invalid) {
    //       return;
    //   }
    this.isLoading = true;
    this.alertService.startLoadingMessage('Saving changes...');

    this.bdoservice.EditReminder(this.ReminderInfoForm.value,this.mouref).subscribe(data=>{
      this.alertService.stopLoadingMessage();

    //  this.resetForm();
      this.alertService.showMessage('Success', `Reminder  was Edit successfully`, MessageSeverity.success);

      if (this.changesSavedCallback) {
        this.changesSavedCallback();
      }
    });
    //this.editorModal1.hide();
  }
  save(){
    this.submitted = true;

    if (this.ReminderInfoForm.invalid) {
          return;
      }
    this.isLoading = true;
    this.alertService.startLoadingMessage('Saving changes...');

    this.bdoservice.AddReminder(this.ReminderInfoForm.value,this.mouref).subscribe(data=>{
    //  this.resetForm();
      this.alertService.stopLoadingMessage();

      if(data=="already_exist"){
alert(data);
      }
      else{
        this.alertService.showMessage('Success', `Reminder  was created successfully`, MessageSeverity.success);
      }
      console.log(data)
      if (this.changesSavedCallback) {
        this.changesSavedCallback();
      }
     // this.editorModal1.hide();
    })
  }
}
