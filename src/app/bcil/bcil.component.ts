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

const alertify: any = require('../../assets/scripts/alertify.js');
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
    storageManager.initialiseStorageSyncListener();

    this.toastaConfig.theme = 'bootstrap';
    this.toastaConfig.position = 'top-right';
    this.toastaConfig.limit = 100;
    this.toastaConfig.showClose = true;
    this.toastaConfig.showDuration = false;


    this.usertype = this.accountService.currentUser.roles.join(',');
    this.UserName = this.accountService.currentUser.userName;
    this.UserId = this.accountService.currentUser.id;
  }


  logout() {
    this.authService.logout();
    this.authService.redirectLogoutUser();
  }

  ngOnInit(): void {
    this.Bdoservice.GetMou().subscribe(data => {

      this.mouModel = data.filter(x => x.assignto == this.UserId && x.app_Status == "S102");
      for (let i = 0; i < this.mouModel.length; i++) {

        this.refidno = this.mouModel[i].refid;

        this.Bdoservice.Getfile(this.refidno).subscribe(fdata => {

          this.fileshistory = fdata

          for (let j = 0; j < this.fileshistory.length; j++) {

            if (this.fileshistory[i].status == "S102") {

              var splitted = this.fileshistory[i].createdondate.split(" ", 2);

              var dateParts = splitted[0].split("-");
              this.d_date = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0]



              this.app_date = new Date(this.d_date);


              this.date_diff = this.calculateDiff(this.app_date);
              if (this.date_diff == 3) {

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

  showDialog(dialog: AlertDialog) {

    alertify.set({
      labels: {
        ok: dialog.okLabel || 'OK',
        cancel: dialog.cancelLabel || 'Cancel'
      }
    });

    switch (dialog.type) {
      case DialogType.alert:
        alertify.alert(dialog.message);

        break;
      case DialogType.confirm:
        alertify
          .confirm(dialog.message, (e) => {
            if (e) {
              dialog.okCallback();
            } else {
              if (dialog.cancelCallback) {
                dialog.cancelCallback();
              }
            }
          });

        break;
      case DialogType.prompt:
        alertify
          .prompt(dialog.message, (e, val) => {
            if (e) {
              dialog.okCallback(val);
            } else {
              if (dialog.cancelCallback) {
                dialog.cancelCallback();
              }
            }
          }, dialog.defaultValue);

        break;
    }
  }



  showToast(alert: AlertCommand) {

    if (alert.operation === 'clear') {
      for (const id of this.stickyToasties.slice(0)) {
        this.toastaService.clear(id);
      }

      return;
    }

    const toastOptions: ToastOptions = {
      title: alert.message.summary,
      msg: alert.message.detail,
    };


    if (alert.operation === 'add_sticky') {
      toastOptions.timeout = 0;

      toastOptions.onAdd = (toast: ToastData) => {
        this.stickyToasties.push(toast.id);
      };

      toastOptions.onRemove = (toast: ToastData) => {
        const index = this.stickyToasties.indexOf(toast.id, 0);

        if (index > -1) {
          this.stickyToasties.splice(index, 1);
        }

        if (alert.onRemove) {
          alert.onRemove();
        }

        toast.onAdd = null;
        toast.onRemove = null;
      };
    } else {
      toastOptions.timeout = 4000;
    }


    switch (alert.message.severity) {
      case MessageSeverity.default: this.toastaService.default(toastOptions); break;
      case MessageSeverity.info: this.toastaService.info(toastOptions); break;
      case MessageSeverity.success: this.toastaService.success(toastOptions); break;
      case MessageSeverity.error: this.toastaService.error(toastOptions); break;
      case MessageSeverity.warn: this.toastaService.warning(toastOptions); break;
      case MessageSeverity.wait: this.toastaService.wait(toastOptions); break;
    }
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

  get canViewTechnologytransfer() {
    return this.accountService.userHasPermission(Permission.viewTechnologyTransferPermission);
  }
  get canViewMou() {
    return this.accountService.userHasPermission(Permission.viewMouPermission);
  }
}
