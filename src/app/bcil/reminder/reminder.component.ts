import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppTranslationService } from 'src/app/services/app-translation.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStoreManager } from 'src/app/services/local-store-manager.service';
import { ReminderInfoComponent } from '../reminder-info/reminder-info.component';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  @ViewChild('editorModal', { static: true })
  editorModal: ModalDirective;

  @ViewChild('reminderEditor', { static: true })
  reminderEditor: ReminderInfoComponent;
  constructor(private localStorage: LocalStoreManager, private alertService: AlertService, private authService: AuthService, private translationService: AppTranslationService, private accountService: AccountService)
   { }

  ngOnInit(): void {
  }
  newReminder(){
    this.editorModal.show();
  }
}
