import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Utilities } from 'src/app/services/utilities';

@Component({
  selector: 'app-reminder-info',
  templateUrl: './reminder-info.component.html',
  styleUrls: ['./reminder-info.component.scss']
})
export class ReminderInfoComponent implements OnInit {

  constructor() { }
  public formResetToggle = true;

  public isEditMode = false;
  public uniqueId: string = Utilities.uniqueId();
  @Input()
  isGeneralEditor = false;
  @Input()
  isViewOnly: boolean;
  @ViewChild('f')
  public form;

  // ViewChilds Required because ngIf hides template variables from global scope
  @ViewChild('stateName')
  public userName;

  ngOnInit(): void {
  }
  ngSubmit(){
    
  }
}
