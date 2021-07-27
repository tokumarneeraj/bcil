import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { Utilities } from '../../services/utilities';
import { User } from '../../model/user.model';
import { UserEdit } from '../../model/user-edit.model';
import { Role } from '../../model/role.model';
import { Permission } from '../../model/permission.model';
import { Departments } from 'src/app/model/department';
import { DBkeys } from 'src/app/services/db-keys';
import { LocalStoreManager } from 'src/app/services/local-store-manager.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public isEditMode = false;
  public isNewUser = false;
  public isSaving = false;
  public isChangePassword = false;
  public isEditingSelf = false;
  public showValidationErrors = false;
  public uniqueId: string = Utilities.uniqueId();
  public user: User = new User();
  public userEdit: UserEdit;
  public allRoles: Role[] = [];

  public allDepartment: Departments[] = [];
  public allDepartment1: Departments[] = [];
  public formResetToggle = true;

  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;

  @Input()
  isViewOnly: boolean;

  @Input()
  isGeneralEditor = false;


  @Input() roleArray: any[];

  @Input() departments: any[];
  @ViewChild('f')
  public form;

  // ViewChilds Required because ngIf hides template variables from global scope
  @ViewChild('userName')
  public userName;

  @ViewChild('userPassword')
  public userPassword;

  @ViewChild('email')
  public email;

  @ViewChild('currentPassword')
  public currentPassword;

  @ViewChild('newPassword')
  public newPassword;

  @ViewChild('confirmPassword')
  public confirmPassword;

  @ViewChild('roles')
  public roles;
  @ViewChild('department')
  public department;
  user1: any;
  isNodal: boolean;
  userRoles: string[];


  constructor(private localStorage: LocalStoreManager,private alertService: AlertService, private accountService: AccountService) {
    this.user1 = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
    this.userRoles = this.accountService.currentUser.roles;
    this.isNodal = this.userRoles.includes('Nodal'); 
  }

  ngOnInit() {
    // this.accountService.getDepartment(0, 0).subscribe(depart => {
    //   if(this.user1.roles.find(x=>x=="Super Admin")!==undefined){
    //     this.allDepartment =depart;//.filter(x => x.id === this.user1.department);
    //     this.allDepartment1 = depart;//.filter(x => x.id === this.user1.department);
    //   }
    //   else
    //   {
    //     this.allDepartment =depart.filter(x => x.id === this.user1.department);
    //   this.allDepartment1 = depart.filter(x => x.id === this.user1.department);
    //   }

    // });
    debugger;

    if (!this.isGeneralEditor) {
      console.log(this.roleArray);
      this.loadCurrentUserData();
    }

  }



  private loadCurrentUserData() {
    console.log(this.departments, 'o')

    this.alertService.startLoadingMessage();

    if (this.canViewAllRoles) {
      this.accountService.getUserAndRoles().subscribe(results => this.onCurrentUserDataLoadSuccessful(results[0], results[1]), error => this.onCurrentUserDataLoadFailed(error));
    }

    else if (this.isNodal) {
      this.accountService.getUserandRolesForDropdown().subscribe(results => this.onCurrentUserDataLoadSuccessful(results[0], results[1]), error => this.onCurrentUserDataLoadFailed(error));
      
    }
    else {
      this.accountService.getUser().subscribe(user => this.onCurrentUserDataLoadSuccessful(user, user.roles.map(x => new Role(x))), error => this.onCurrentUserDataLoadFailed(error));
    }
  }


  private onCurrentUserDataLoadSuccessful(user: User, roles: Role[]) {
    this.alertService.stopLoadingMessage();

    this.user = user;
    this.allDepartment = this.allDepartment.filter(x => x.id === this.user.department);

    if (this.isNodal) {
      this.allRoles = roles.filter(r => r.name === 'Scientist');
    }
    else {
    this.allRoles = roles;
    }


  }

  private onCurrentUserDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Load Error', `Unable to retrieve user data from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);

    this.user = new User();
  }



  getRoleByName(name: string) {

    if (this.isNodal) {
      return this.allRoles.filter((r) => r.name === 'Scientist');
    }
    else {
      return this.allRoles.find((r) => r.name === name);
    }
   
  }



  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }


  deletePasswordFromUser(user: UserEdit | User) {
    const userEdit = user as UserEdit;

    delete userEdit.currentPassword;
    delete userEdit.newPassword;
    delete userEdit.confirmPassword;
  }


  edit() {
    debugger;
    if (!this.isGeneralEditor) {
      this.isEditingSelf = true;
      this.userEdit = new UserEdit();
      Object.assign(this.userEdit, this.user);
    } else {
      if (!this.userEdit) {
        this.userEdit = new UserEdit();
      }

      this.isEditingSelf = this.accountService.currentUser ? this.userEdit.id === this.accountService.currentUser.id : false;
    }
this.allDepartment=this.allDepartment1;
    this.isEditMode = true;
    this.showValidationErrors = true;
    this.isChangePassword = false;
  }


  save() {
    this.isSaving = true;
    this.alertService.startLoadingMessage('Saving changes...');
    console.log(this.userEdit)

    if (this.isNewUser) {
      this.accountService.newUser(this.userEdit).subscribe(user => this.saveSuccessHelper(user), error => this.saveFailedHelper(error));
    } else {
      this.accountService.updateUser(this.userEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
  }


  private saveSuccessHelper(user?: User) {
    this.testIsRoleUserCountChanged(this.user, this.userEdit);

    if (user) {
      Object.assign(this.userEdit, user);
    }

    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.isChangePassword = false;
    this.showValidationErrors = false;

    this.deletePasswordFromUser(this.userEdit);
    Object.assign(this.user, this.userEdit);
    this.userEdit = new UserEdit();
    this.resetForm();


    if (this.isGeneralEditor) {
      if (this.isNewUser) {
        this.alertService.showMessage('Success', `User \"${this.user.userName}\" was created successfully`, MessageSeverity.success);
      } else if (!this.isEditingSelf) {
        this.alertService.showMessage('Success', `Changes to user \"${this.user.userName}\" was saved successfully`, MessageSeverity.success);
      }
    }

    if (this.isEditingSelf) {
      this.alertService.showMessage('Success', 'Changes to your User Profile was saved successfully', MessageSeverity.success);
      this.refreshLoggedInUser();
    }

    this.isEditMode = false;


    if (this.changesSavedCallback) {
      this.changesSavedCallback();
    }
  }


  private saveFailedHelper(error: any) {
    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Save Error', 'The below errors occured whilst saving your changes:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);

    if (this.changesFailedCallback) {
      this.changesFailedCallback();
    }
  }



  private testIsRoleUserCountChanged(currentUser: User, editedUser: User) {

    const rolesAdded = this.isNewUser ? editedUser.roles : editedUser.roles.filter(role => currentUser.roles.indexOf(role) === -1);
    const rolesRemoved = this.isNewUser ? [] : currentUser.roles.filter(role => editedUser.roles.indexOf(role) === -1);

    const modifiedRoles = rolesAdded.concat(rolesRemoved);

    if (modifiedRoles.length) {
      setTimeout(() => this.accountService.onRolesUserCountChanged(modifiedRoles));
    }
  }



  cancel() {
    if (this.isGeneralEditor) {
      this.userEdit = this.user = new UserEdit();
    } else {
      this.userEdit = new UserEdit();
    }

    this.showValidationErrors = false;
    this.resetForm();

    this.alertService.showMessage('Cancelled', 'Operation cancelled by user', MessageSeverity.default);
    this.alertService.resetStickyMessage();

    if (!this.isGeneralEditor) {
      this.isEditMode = false;
    }

    if (this.changesCancelledCallback) {
      this.changesCancelledCallback();
    }
  }


  close() {
    this.userEdit = this.user = new UserEdit();
    this.showValidationErrors = false;
    this.resetForm();
    this.isEditMode = false;

    if (this.changesSavedCallback) {
      this.changesSavedCallback();
    }
  }



  private refreshLoggedInUser() {
    this.accountService.refreshLoggedInUser()
      .subscribe(user => {
        this.loadCurrentUserData();
      },
        error => {
          this.alertService.resetStickyMessage();
          this.alertService.showStickyMessage('Refresh failed', 'An error occured whilst refreshing logged in user information from the server', MessageSeverity.error, error);
        });
  }


  changePassword() {
    this.isChangePassword = true;
  }


  unlockUser() {
    this.isSaving = true;
    this.alertService.startLoadingMessage('Unblocking user...');


    this.accountService.unblockUser(this.userEdit.id)
      .subscribe(() => {
        this.isSaving = false;
        this.userEdit.isLockedOut = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showMessage('Success', 'User has been successfully unblocked', MessageSeverity.success);
      },
        error => {
          this.isSaving = false;
          this.alertService.stopLoadingMessage();
          this.alertService.showStickyMessage('Unblock Error', 'The below errors occured whilst unblocking the user:', MessageSeverity.error, error);
          this.alertService.showStickyMessage(error, null, MessageSeverity.error);
        });
  }


  resetForm(replace = false) {
    this.isChangePassword = false;

    if (!replace) {
      this.form.reset();
    } else {
      this.formResetToggle = false;

      setTimeout(() => {
        this.formResetToggle = true;
      });
    }
  }


  newUser(allRoles: Role[]) {
    this.isGeneralEditor = true;
    this.isNewUser = true;

    if (this.isNodal) {
      this.allRoles = allRoles.filter(x => x.name.includes ('Scientist'));

    }
    else {
      this.allRoles = [...allRoles];

    }
    this.allDepartment = this.departments;

    this.user = this.userEdit = new UserEdit();
    this.userEdit.isEnabled = true;
    this.edit();

    return this.userEdit;
  }

  editUser(user: User, allRoles: Role[]) {
    if (user) {
      this.isGeneralEditor = true;
      this.isNewUser = false;

      this.setRoles(user, allRoles);
      this.allDepartment = this.departments;

      this.user = new User();
      this.userEdit = new UserEdit();
      Object.assign(this.user, user);
      Object.assign(this.userEdit, user);
      this.edit();

      return this.userEdit;
    } else {
      return this.newUser(allRoles);
    }
  }


  displayUser(user: User, allRoles?: Role[]) {

    this.user = new User();
    Object.assign(this.user, user);
    this.deletePasswordFromUser(this.user);
    this.setRoles(user, allRoles);

    this.isEditMode = false;
  }



  private setRoles(user: User, allRoles?: Role[]) {

    this.allRoles = allRoles ? [...allRoles] : [];

    if (user.roles) {
      for (const ur of user.roles) {
        if (!this.allRoles.some(r => r.name === ur)) {
          this.allRoles.unshift(new Role(ur));
        }
      }
    }
  }



  get canViewAllRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }
}
