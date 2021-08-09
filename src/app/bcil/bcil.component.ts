import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastaConfig, ToastaService, ToastData, ToastOptions } from 'ngx-toasta';
import { Permission } from '../model/permission.model';
import { AccountService } from '../services/account.service';
import { AlertCommand, AlertDialog, AlertService, DialogType, MessageSeverity } from '../services/alert.service';
import { AppTranslationService } from '../services/app-translation.service';
import { AuthService } from '../services/auth.service';
import { ConfigurationService } from '../services/configuration.service';
import { LocalStoreManager } from '../services/local-store-manager.service';
import { Bdoservice } from '../services/bdo.service';
import { mouModel } from '../model/mou.model';
import { filehistoryModel } from 'src/app/model/filehistory';
import { DatePipe } from '@angular/common';
import { notificationmodel } from 'src/app/model/notification.model';
import {commondata} from '../model/common'
const alertify: any = require('../../assets/scripts/alertify.js');
declare var jQuery:any;
@Component({
  selector: 'app-bcil',
  templateUrl: './bcil.component.html',
  styleUrls: ['./bcil.component.css']
})
export class BcilComponent implements OnInit {

  usertype: string;
  UserName: string;
  stickyToasties: number[] = [];
  gT = (key: string | Array<string>, interpolateParams?: object) => this.translationService.getTranslation(key, interpolateParams);
  notify = false;
  mouModel: mouModel[];
  UserId: string;
  fileshistory: filehistoryModel[];
  refidno: string;
  f_check: boolean;
  app_date = new Date();
  current_date = new Date();
  date_diff: number;
  d_date: string;
  noticfy_class: notificationmodel[] = [];
  notificationcount=0;
  commondata=new commondata();
  doticon=false;
  showdiv=false;
  constructor(private _cookieService: CookieService, storageManager: LocalStoreManager,
    private toastaService: ToastaService,
    private toastaConfig: ToastaConfig,
    private accountService: AccountService,
    private alertService: AlertService,


    private authService: AuthService,
    private translationService: AppTranslationService,
    public configurations: ConfigurationService,
    public router: Router,
    private Bdoservice: Bdoservice,
    private datePipe: DatePipe) {
   

    this.usertype = this.accountService.currentUser.roles.join(',');
    this.UserName = this.accountService.currentUser.userName;
    this.UserId = this.accountService.currentUser.id;
  }


  logout() {
    this.authService.logout();
    this.authService.redirectLogoutUser();
  }
mouleftmenu(data){
return this.commondata.moustatus().find(x=>x.value==data)?.tabelname;
}
  notifymessage=[{stage:'S101',message:'Initiation- to be suggested by client is pending, please take necessary action'},
  {stage:'S102',message:'MOU is pending, please take necessary action'},
  {stage:'S103',message:'MOU Change Required By Admin is pending, please take necessary action'},
  {stage:'S104',message:'MOU Proposed By Legal Manager is pending, please take necessary action'},
  {stage:'S105',message:'Agreement Signed is pending, please take necessary action'},
  {stage:'S106',message:'MOU Accepted by Client is pending, please take necessary action'},
  {stage:'S107',message:'Business Development Manager Assiged is pending, please take necessary action'},
  {stage:'S108',message:'TTO Req Approved is pending, please take necessary action'},
  {stage:'S109',message:'IP Manager Assigned is pending, please take necessary action'},
  {stage:'S110',message:'MOU Proposed by Admin is pending, please take necessary action'},
  {stage:'S111',message:'MOU Change By Client is pending, please take necessary action'},
  {stage:'S112',message:'MOU Proposed by Admin is pending, please take necessary action'},

  {stage:'S113',message:'MOU is pending, please take necessary action'},
  {stage:'S114',message:'MOU Change Required By Admin is pending, please take necessary action'},
  {stage:'S115',message:'MOU Proposed By Legal Manager is pending, please take necessary action'},
  {stage:'S116',message:'Agreement Signed is pending, please take necessary action'},
  {stage:'S117',message:'MOU Accepted by Client is pending, please take necessary action'},
  {stage:'S118',message:'Business Development Manager Assiged is pending, please take necessary action'},
  {stage:'S119',message:'TTO Req Approved is pending, please take necessary action'},
  {stage:'S120',message:'IP Manager Assigned is pending, please take necessary action'},
  {stage:'S121',message:'MOU Proposed by Admin is pending, please take necessary action'},
  {stage:'S122',message:'MOU Change By Client is pending, please take necessary action'},
  {stage:'S123',message:'MOU Proposed by Admin is pending, please take necessary action'},

  {stage:'S124',message:'MOU is pending, please take necessary action'},
  {stage:'S125',message:'MOU Change Required By Admin is pending, please take necessary action'},
  {stage:'S126',message:'MOU Proposed By Legal Manager is pending, please take necessary action'},
  {stage:'S127',message:'Agreement Signed is pending, please take necessary action'},
  {stage:'S128',message:'MOU Accepted by Client is pending, please take necessary action'},
  {stage:'S129',message:'Business Development Manager Assiged is pending, please take necessary action'},
  {stage:'S130',message:'TTO Req Approved is pending, please take necessary action'},
  {stage:'S131',message:'IP Manager Assigned is pending, please take necessary action'},
  {stage:'S132',message:'MOU Proposed by Admin is pending, please take necessary action'},
  {stage:'S133',message:'MOU Change By Client is pending, please take necessary action'},
  {stage:'S134',message:'MOU Proposed by Admin is pending, please take necessary action'},

  {stage:'S135',message:'MOU is pending, please take necessary action'},
  {stage:'S136',message:'MOU Change Required By Admin is pending, please take necessary action'},
  {stage:'S137',message:'MOU Proposed By Legal Manager is pending, please take necessary action'},
  {stage:'S138',message:'Agreement Signed is pending, please take necessary action'},
  {stage:'S139',message:'MOU Accepted by Client is pending, please take necessary action'},
  {stage:'S140',message:'Business Development Manager Assiged is pending, please take necessary action'},
  {stage:'S141',message:'TTO Req Approved is pending, please take necessary action'},
  {stage:'S142',message:'IP Manager Assigned is pending, please take necessary action'},
  {stage:'S143',message:'MOU Proposed by Admin is pending, please take necessary action'},
  {stage:'S144',message:'MOU Change By Client is pending, please take necessary action'},
  {stage:'S145',message:'MOU Proposed by Admin is pending, please take necessary action'},

  {stage:'S146',message:'MOU is pending, please take necessary action'},
  {stage:'S147',message:'MOU Change Required By Admin is pending, please take necessary action'},
  {stage:'S148',message:'MOU Proposed By Legal Manager is pending, please take necessary action'},
  {stage:'S149',message:'Agreement Signed is pending, please take necessary action'},
  {stage:'S150',message:'MOU Accepted by Client is pending, please take necessary action'},
  {stage:'S151',message:'Business Development Manager Assiged is pending, please take necessary action'},
  {stage:'S152',message:'TTO Req Approved is pending, please take necessary action'},
  {stage:'S153',message:'IP Manager Assigned is pending, please take necessary action'},
  {stage:'S154',message:'MOU Proposed by Admin is pending, please take necessary action'},
  {stage:'S155',message:'MOU Change By Client is pending, please take necessary action'},
  {stage:'S156',message:'MOU Proposed by Admin is pending, please take necessary action'},

]


notificationseen(data){
  this.Bdoservice.Notificationseen(data).subscribe(data=>{
this.ngOnInit();

  });
}
  ngOnInit(): void {

   // this.notify_call();
    this.Bdoservice.GetNotification().subscribe(data=>{
      if(data.length>0){
        this.doticon=data.some(x=>x.active==true);
        this.notificationcount=data.filter(x=>x.active==true).length;
      this.notify = true;
      this.noticfy_class=data.map(obj=>({...obj,message:this.notifymessage?.find(x=>x.stage==obj.stageon)?.message
      ,user:this.UserName}));
      }
      else{
        this.notify = false;
      }
    })
    

  }

  ngAfterViewInit(): void {
    this.loadscript();

  }
  notify_call() {
    this.Bdoservice.GetMou().subscribe(data => {

      this.mouModel = data.filter(x => x.assignto == this.UserId && x.app_Status == "S102");
      for (let i = 0; i < this.mouModel.length; i++) {

        this.refidno = this.mouModel[i].refid;

        this.Bdoservice.Getfile(this.refidno).subscribe(fdata => {

          this.fileshistory = fdata

          for (let j = 0; j < this.fileshistory.length; j++) {

            if (this.fileshistory[i]?.status == "S102") {

              var splitted = this.fileshistory[i].createdondate.split(" ", 2);

              var dateParts = splitted[0].split("-");
              this.d_date = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0]



              this.app_date = new Date(this.d_date);


              this.date_diff = this.calculateDiff(this.app_date);
              if (this.date_diff >= 3) {

                this.notify = true;

                let n = new notificationmodel();
                n.user = "Admin";
                n.msg = "MOU is pending, please take necessary action";
                n.time = splitted[0];

                this.noticfy_class.push(n);
              }



            }

          }


        })

      }
    })
  }

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }

 
 
  get canViewRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canViewusers() {
    return this.accountService.userHasPermission(Permission.viewUsersPermission);
  }

  get canViewDesign() {
    return this.accountService.userHasPermission(Permission.viewDesignPermission);
  }

  get canViewCopyright() {
    return this.accountService.userHasPermission(Permission.viewCopyrightPermission);
  }
  get canViewTrademark() {
    return this.accountService.userHasPermission(Permission.viewTrademarkPermission);
  }

  get canViewPatent() {
    return this.accountService.userHasPermission(Permission.viewPatentPermission);
  }
  get canViewPlantvarity() {
    return this.accountService.userHasPermission(Permission.viewPlantvarityPermission);
  }

  get canViewOtherservices() {
    return this.accountService.userHasPermission(Permission.viewOtherservicesPermission);
  }
  get canViewReport() {
    return this.accountService.userHasPermission(Permission.viewReportPermission);
  }
  get canViewReminder() {
    return this.accountService.userHasPermission(Permission.viewReminderPermission);
  }
  

  get canViewTechnologytransfer() {
    return this.accountService.userHasPermission(Permission.viewTechnologyTransferPermission);
  }
  get canViewMou() {
    return this.accountService.userHasPermission(Permission.viewMouPermission);
  }

  //mou internal menu

  get canviewMou_initPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_initPermission);
  }
  get canviewMou_pendingPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_pendingPermission);
  }
  get canviewMou_proposed_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_proposed_by_adminPermission);
  }
  get canviewMou_change_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_change_req_by_adminPermission);
  }

  get canviewMou_change_by_clientPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_change_req_by_clientPermission);
  }
  get canviewMou_proposed_by_lmPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_proposed_by_lmPermission);
  }
  get canviewMou_accepted_by_clientPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_accepted_by_clientPermission);
  }
  get canviewagreementsignedPermission() {
    return this.accountService.userHasPermission(Permission.viewagreementsignedPermission);
  }
  get canviewbdoassignedPermission() {
    return this.accountService.userHasPermission(Permission.viewbdoassignedPermission);
  }
  get canviewtto_required_aproved_Permission() {
    return this.accountService.userHasPermission(Permission.viewtto_required_aproved_Permission);
  }
  get canviewip_manager_assignedPermission() {
    return this.accountService.userHasPermission(Permission.viewip_manager_assignedPermission);
  }


//tto internal menu

get canviewTta_initPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_initPermission);
}
get canviewTta_evaluation_assignedPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_evaluation_assignedPermission);
}
get canviewTta_evaluation_upload_by_bdmPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_evaluation_upload_by_bdmPermission);
}
get canviewTta_evaluation_closure_by_adminPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_evaluation_closure_by_adminPermission);
}
get canviewTta_evaluation_approved_by_adminPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_evaluation_approved_by_adminPermission);
}
get canviewTta_evaluation_change_request_by_adminPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_evaluation_change_request_by_adminPermission);
}
get canviewTta_Closure_request_by_bdmPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_Closure_request_by_bdmPermission);
}
get canviewTta_closePermission() {
  return this.accountService.userHasPermission(Permission.viewTta_closePermission);
}
get canviewTta_evaluation_change_request_by_clientPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_evaluation_change_request_by_clientPermission);
}
get canviewTta_evaluation_accepted_by_clientPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_evaluation_accepted_by_clientPermission);
}


get canviewTta_strategy_assignedPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_strategy_assignedPermission);
}
get canviewTta_strategy_uploaded_by_bdmPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_strategy_uploaded_by_bdmPermission);
}
get canviewtta_strategy_change_request_by_adminPermission() {
  return this.accountService.userHasPermission(Permission.viewtta_strategy_change_request_by_adminPermission);
}
get canviewTta_techb_and_flier_approved_by_adminPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_techb_and_flier_approved_by_adminPermission);
}
get canviewTta_techb_and_flier_approved_by_scientistPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_techb_and_flier_approved_by_scientistPermission);
}
get canviewTta_chnage_req_by_scientistPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_change_req_by_scientistPermission);
}
get canviewstartegy_implementedPermission() {
  return this.accountService.userHasPermission(Permission.viewstartegy_implementedPermission);
}
get canviewTta_interest_receivedPermission() {
  return this.accountService.userHasPermission(Permission.viewTta_interest_receivedPermission);
  }
  toggle(){
    this.showdiv=!this.showdiv;
  }
  loadscript() {
(function($){
  $(document).ready(function(){
    
console.log("jquery")
  });
})(jQuery);
    const dynamicScripts = [
      // './assets/js/jquery/jquery.min.js',
      // './assets/js/SmoothScroll.js',
      // './assets/js/jquery.mCustomScrollbar.concat.min.js ',
      // './assets/js/pcoded.min.js',
      // './assets/js/vertical-layout.min.js',
      // './assets/pages/dashboard/custom-dashboard.js',

      //'./assets/js/jquery-slimscroll/jquery.slimscroll.js',
      //'./assets/js/modernizr/modernizr.js',
      //'./assets/js/SmoothScroll.js',
      //'./assets/js/jquery.mCustomScrollbar.concat.min.js ',
      // './assets/pages/waves/js/waves.min.js',
      // './assets/js/jquery-slimscroll/jquery.slimscroll.js',
      // './assets/js/modernizr/modernizr.js',
      // './assets/js/SmoothScroll.js',
      // './assets/js/jquery.mCustomScrollbar.concat.min.js ',
      // './assets/js/pcoded.min.js',
      // './assets/js/vertical-layout.min.js',
      // './assets/pages/dashboard/custom-dashboard.js',

     './assets/js/script.js'



    ];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      //  document.getElementsByClassName('pcoded-container')[0].appendChild(node);
      document.getElementsByTagName('body')[0].appendChild(node);
    }
  }


}
