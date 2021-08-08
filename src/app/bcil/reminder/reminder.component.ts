import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Reminder, StatusMaster } from 'src/app/model/mou.model';
import { Role } from 'src/app/model/role.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService, DialogType } from 'src/app/services/alert.service';
import { AppTranslationService } from 'src/app/services/app-translation.service';
import { AuthService } from 'src/app/services/auth.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { LocalStoreManager } from 'src/app/services/local-store-manager.service';
import { ReminderInfoComponent } from '../reminder-info/reminder-info.component';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  StatusMaster:StatusMaster[];
  @ViewChild('editorModal', { static: true })
  editorModal: ModalDirective;
Role:Role[];
Reminder:Reminder[];
editedReminder:Reminder;
editmode=false;
@Input()
customrem:boolean;
@Input()
mouref:string;
  @ViewChild('reminderEditor', { static: true })
  reminderEditor: ReminderInfoComponent;
  constructor(private localStorage: LocalStoreManager, private alertService: AlertService, private authService: AuthService,private bdoService: Bdoservice, private translationService: AppTranslationService, private accountService: AccountService)
   { 
     this.customrem=false;
   }
   editReminder(reminder:Reminder){
    this.editmode=true;
    this.editedReminder = this.reminderEditor.EditReminder(reminder);
    //this.editorModal.show();
    this.editorModal.show();

   }
   deleteReminder(reminder:Reminder){
    this.alertService.showDialog('Are you sure you want to delete the \"' + this.StatusMaster.find(x=>x.status_code==reminder.stage).status_name + '\" role?', DialogType.confirm, () => this.deleteRoleHelper(reminder));

   }

   ngAfterViewInit() {

    this.reminderEditor.changesSavedCallback = () => {
      this.ngOnInit();
      //this.addNewRoleToList();
      this.editorModal.hide();
    };
  
    this.reminderEditor.changesCancelledCallback = () => {
     // this.editedRole = null;
     // this.sourceRole = null;
      this.editorModal.hide();
    };
  }
   
deleteRoleHelper(row: Reminder) {

  //this.alertService.startLoadingMessage('Deleting...');
  //this.loadingIndicator = true;
}
  ngOnInit(): void {
   
    this.bdoService.GetStatusMaster().subscribe(data=>{

      this.StatusMaster=data;
   
    this.bdoService.GetReminder().subscribe(data=>{
      this.Reminder=data.map(obj=> ({ ...obj,  stagename:this.StatusMaster?.find(x=>x.status_code==obj.stage)?.status_name ,
      }))
     
    })
  })
   //if(this.customrem==false){
    this.accountService.getRoles(0,0).subscribe(data=>{

      this.Role=data;
    })
  //}
  }
  
  newReminder(){
    this.editmode=false;
    this.editorModal.show();
  }
}
