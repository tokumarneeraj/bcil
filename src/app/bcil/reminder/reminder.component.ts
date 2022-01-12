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
  NextStatusMaster:StatusMaster[];
  @ViewChild('editorModal', { static: true })
  editorModal: ModalDirective;
Role:Role[];
Reminder:Reminder[];
customReminder:Reminder[];
editedReminder:Reminder;
editmode=false;
@Input()
type:any;
@Input()
reminderfilter:any[];
@Input()
customrem:boolean;
@Input()
appref:string;
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
      
      //this.addNewRoleToList();
      this.editorModal.hide();
     setTimeout(()=>{ this.ngOnInit()},500);
    //  this.ngOnInit();
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
      this.NextStatusMaster=data;

      if(this.appref!=undefined){
        this.bdoService.GetCustomremiderbystage(this.appref).subscribe(data=>{
          // if(this.type==undefined){
          //   this.customReminder=data.map(obj=> ({ ...obj,  stagename:this.StatusMaster?.find(x=>x.status_code==obj.stage)?.status_name ,
          //   }))
          // }
          // else{
          //   if(this.type=="S101"){
          //     this.customReminder=data.map(obj=> ({ ...obj,  stagename:this.StatusMaster?.find(x=>x.status_code==obj.stage)?.status_name ,
          //     })).filter(x=>x.stagetype=="mou")
          //   }
          //   else if(this.type=="S113"){
          //     this.customReminder=data.map(obj=> ({ ...obj,  stagename:this.StatusMaster?.find(x=>x.status_code==obj.stage)?.status_name ,
          //     })).filter(x=>x.stagetype=="tta" || x.stagetype=="tlp"|| x.stagetype=="nttsa")
          //   }
          //   else{
    
              this.customReminder=data?.map(obj=> ({ ...obj,  stagename:this.StatusMaster?.find(x=>x.status_code==obj.stage)?.status_name ,
              }))?.filter(x=>this.type?.form?.reminderfilter.includes(x.stagetype))
        //     }
        // }
        });
      }
   
    this.bdoService.GetReminder().subscribe(data=>{

      this.Reminder=data.map(obj=> ({ ...obj,  stagename:this.StatusMaster?.find(x=>x.status_code==obj.stage)?.status_name ,
       }))?.filter(x=>this.type?.form?.reminderfilter.includes(x.stagetype))
       console.log("reminder",data,this.type)
      // if(this.type==undefined){
      //   this.Reminder=data.map(obj=> ({ ...obj,  stagename:this.StatusMaster?.find(x=>x.status_code==obj.stage)?.status_name ,
      //   }))
      // }
      // else{
      //   if(this.type=="S101"){
      //     this.Reminder=data.map(obj=> ({ ...obj,  stagename:this.StatusMaster?.find(x=>x.status_code==obj.stage)?.status_name ,
      //     })).filter(x=>x.stagetype=="mou")
      //   }
      //   else if(this.type=="S113"){
      //     this.Reminder=data.map(obj=> ({ ...obj,  stagename:this.StatusMaster?.find(x=>x.status_code==obj.stage)?.status_name ,
      //     })).filter(x=>x.stagetype=="tta" || x.stagetype=="tlp"|| x.stagetype=="nttsa")
      //   }
      //   else{

      //     this.Reminder=data.map(obj=> ({ ...obj,  stagename:this.StatusMaster?.find(x=>x.status_code==obj.stage)?.status_name ,
      //     }))
      //   }
     
     
    //}
    this.Reminder=this.Reminder.filter((item)=>!this.customReminder?.find(y=>y.stage==item.stage));
    this.customReminder?.forEach(element => {
      this.Reminder.splice(0,0,element)
});
    
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
