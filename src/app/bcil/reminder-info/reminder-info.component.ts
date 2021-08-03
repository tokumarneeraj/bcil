import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusMaster } from 'src/app/model/mou.model';
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

  constructor(private forms: FormBuilder,private alertService: AlertService,private bdoservice:Bdoservice,private accountService: AccountService) { }
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
  StatusMaster:StatusMaster[];
  @Input()
  isViewOnly: boolean;
  @ViewChild('f')
  public form;

  // ViewChilds Required because ngIf hides template variables from global scope
  @ViewChild('stateName')
  public userName;
  timetype(value,type){
    switch(type){
      case 'deadline':
        
       value=="NA"? this.ReminderInfoForm.controls.deadlineinputtime.disable():
       this.ReminderInfoForm.controls.deadlineinputtime.enable()
       ; break;
       case 'lapselowrem':
        
        value=="NA"? this.ReminderInfoForm.controls.lapselowreminputtime.disable():
        this.ReminderInfoForm.controls.lapselowreminputtime.enable()
        ;
        case 'lapsemedrem':
        
          value=="NA"? this.ReminderInfoForm.controls.lapsemedreminputtime.disable():
          this.ReminderInfoForm.controls.lapsemedreminputtime.enable()
          ;
          break;
          case 'lapsehighrem':
        
            value=="NA"? this.ReminderInfoForm.controls.lapsehighreminputtime.disable():
            this.ReminderInfoForm.controls.lapsehighreminputtime.enable()
            ;
            break;
            case 'deadlinelowrem':
        
              value=="NA"? this.ReminderInfoForm.controls.deadlinelowreminputtime.disable():
              this.ReminderInfoForm.controls.deadlinelowreminputtime.enable()
              ;
              break;
              case 'deadlinemedrem':
        
                value=="NA"? this.ReminderInfoForm.controls.deadlinemedreminputtime.disable():
                this.ReminderInfoForm.controls.deadlinemedreminputtime.enable()
                ;
                break;
                case 'deadlinehighrem':
        
                  value=="NA"? this.ReminderInfoForm.controls.deadlinehighreminputtime.disable():
                  this.ReminderInfoForm.controls.deadlinehighreminputtime.enable()
                  ;
                  break;
                  case 'repeatrem':
        
                    value=="NA"? this.ReminderInfoForm.controls.repeatreminputtime.disable():
                    this.ReminderInfoForm.controls.repeatreminputtime.enable()
                    ;

        
        break;
        default:
          break;
    }
    //alert(value)
  }
  ngOnInit(): void {
    this.ReminderInfoForm = this.forms.group({
      stage: ['', Validators.required],
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
   
    this.resetForm();

    this.alertService.showMessage('Cancelled', 'Operation cancelled by user', MessageSeverity.default);
    this.alertService.resetStickyMessage();

    if (this.changesCancelledCallback) {
      this.changesCancelledCallback();
    }
  }
  get f() {
    return this.ReminderInfoForm.controls;
  }
  save(){
    this.submitted = true;

    if (this.ReminderInfoForm.invalid) {
          return;
      }
    this.isLoading = true;

    this.bdoservice.AddReminder(this.ReminderInfoForm.value).subscribe(data=>{
      console.log(data)
    })
  }
}
