import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService, DialogType } from 'src/app/services/alert.service';
import { ActivityComponent } from '../activity/activity.component';
import { AdditionFileComponent } from '../addition-file/addition-file.component';
import { Bdoservice } from 'src/app/services/bdo.service';
import { notificationmodel } from 'src/app/model/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  UserId: string;
  userRoles: string[];
  showpage=false;
  submitting=false;
  isAdmin: boolean;
  formHeader: string;
  isBdm: boolean;
  isScientist:boolean;
  isNodal: boolean;
  isLM: boolean;
  isSuperAdmin: boolean;
  snooze=new notificationmodel();
  noticfy_class: notificationmodel[] = [];
  isIPM:boolean;
  constructor(private route: ActivatedRoute,private alertService: AlertService,private accountService: AccountService,private Bdoservice:Bdoservice,private router:Router


    ) {
      this.userRoles = this.accountService.currentUser.roles;
  
  
    }
  notificationModel:any[];
  snoozebtn(data1:any,index:any){
    this.snooze.refid=data1.refid;
     this.snooze.customremrefid=data1.customremrefid;
      this.snooze.remindercategory=data1.remindercategory;
      data1.loading=true;
      //this.loading.map(u=>({u=false}))
      //this.loading[index]=true;
    this.Bdoservice.SnoozeNotification(this.snooze).subscribe(data=>{
      data1.loading=false;
    this.noticfy_class= this.noticfy_class.map((item)=>({ ...item,"loading":false,"snoozecheck":(item.refid==data1?.refid)?data?.message:item?.snoozecheck}))
    //this.getnotification();
     // this.loading[index]=false;
    //alert(data?.refid)
    
    });
  }
  remarksview(data:any){
    this.alertService.showDialog(data,DialogType.alert);

  }
  ngOnInit(): void {
    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBdm = this.userRoles.includes('BDM');
    this.isNodal = this.userRoles.includes('Nodal'); 
    
    this.isScientist=this.userRoles.includes('Scientist');
  this.isIPM=this.userRoles.includes('IPM');
  this.isSuperAdmin=this.userRoles.includes('Super Admin');
  this.Bdoservice.AllNotification().subscribe(data => {
   
     this.noticfy_class= data.map((item)=>({...item,"loading":false}));
     this.showpage=true;
     }
  )
    }

}
