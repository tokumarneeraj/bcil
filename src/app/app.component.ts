import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastaConfig, ToastaService, ToastData, ToastOptions } from 'ngx-toasta';
import { filter } from 'rxjs/operators';
import { AccountService } from './services/account.service';
import { AlertCommand, AlertDialog, AlertService, DialogType, MessageSeverity } from './services/alert.service';
import { AppTranslationService } from './services/app-translation.service';
import { AuthService } from './services/auth.service';
import { ConfigurationService } from './services/configuration.service';
import { DBkeys } from './services/db-keys';
import { LocalStoreManager } from './services/local-store-manager.service';

const alertify: any = require('../assets/scripts/alertify.js');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bcilAngular';
  isUserLoggedIn: boolean;
  stickyToasties: number[] = [];
  userRoles:string[];
  constructor( storageManager: LocalStoreManager,
    private toastaService: ToastaService,
    private toastaConfig: ToastaConfig,
    private accountService: AccountService,
    private alertService: AlertService,
    private localStorage: LocalStoreManager,
    private authService: AuthService,
    private translationService: AppTranslationService,
    public configurations: ConfigurationService,
    public router: Router){
      this.userRoles = this.accountService?.currentUser?.roles;
    storageManager.initialiseStorageSyncListener();

    this.toastaConfig.theme = 'bootstrap';
    this.toastaConfig.position = 'top-right';
    this.toastaConfig.limit = 100;
    this.toastaConfig.showClose = true;
    this.toastaConfig.showDuration = false;
    if(this.userRoles!=undefined)
    this.loadpermission()
    // this.router.events
    // .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    // .subscribe(event => {
    //   if (
    //     event.id === 1 &&
    //     event.url === event.urlAfterRedirects 
    //   ) {
       
    //  this.loadpermission()
    //   }
    // })

  }
  loadpermission(){
    this.accountService.getOtherpermissionbyrolename(this.userRoles[0]).subscribe(data=>{
     var arrNames = [];
 //iterate through object keys
 data?.forEach(function(item) {
 //get the value of name
 var val = item.permission
 //push the name string in the array
 arrNames.push(val);
 });
 //this.localStorage.s
 //this.localStorage
 //localStorage.setItem("user_otherpermissions",arrNames?.join(","))
 
    this.localStorage.savePermanentData(arrNames, DBkeys.USER_OTHERPERMISSIONS);
 });
 }
  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : '';
  }

  ngOnInit(){
    this.isUserLoggedIn = this.authService.isLoggedIn;

    setTimeout(() => {
      if (this.isUserLoggedIn) {
        this.alertService.resetStickyMessage();

        // if (!this.authService.isSessionExpired)
        this.alertService.showMessage('Login', `Welcome back ${this.userName}!`, MessageSeverity.default);
        // else
        //    this.alertService.showStickyMessage("Session Expired", "Your Session has expired. Please log in again", MessageSeverity.warn);
      }
    }, 2000);

    this.alertService.getDialogEvent().subscribe(alert => this.showDialog(alert));
    this.alertService.getMessageEvent().subscribe(message => this.showToast(message));

  }
  logout() {
    this.authService.logout();
    this.authService.redirectLogoutUser();
  }
  @HostListener('window:unload ', ['$event'])
unloadHandler(event: any) {
  //alert()
  

       /// this.logout();
    
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
}
