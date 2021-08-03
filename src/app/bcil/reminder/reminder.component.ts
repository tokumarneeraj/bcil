import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { StatusMaster } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
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

  @ViewChild('reminderEditor', { static: true })
  reminderEditor: ReminderInfoComponent;
  constructor(private localStorage: LocalStoreManager, private alertService: AlertService, private authService: AuthService,private bdoService: Bdoservice, private translationService: AppTranslationService, private accountService: AccountService)
   { }

  ngOnInit(): void {

    this.bdoService.GetStatusMaster().subscribe(data=>{

      this.StatusMaster=data;
    })
  }
  
  newReminder(){
    this.editorModal.show();
  }
}
