import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Departments } from 'src/app/model/department';
import { Permission } from 'src/app/model/permission.model';
import { Role } from 'src/app/model/role.model';
import { UserEdit } from 'src/app/model/user-edit.model';
import { User } from 'src/app/model/user.model';
import { ViewuserpermissiontoaddUser } from 'src/app/model/userpermissiontoaddUser';
import { AccountService } from 'src/app/services/account.service';
import { AlertService, DialogType, MessageSeverity } from 'src/app/services/alert.service';
import { AppTranslationService } from 'src/app/services/app-translation.service';
import { AuthService } from 'src/app/services/auth.service';
import { DBkeys } from 'src/app/services/db-keys';
import { LocalStoreManager } from 'src/app/services/local-store-manager.service';
import { Utilities } from 'src/app/services/utilities';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  columns: any[] = [];
  rows: User[] = [];
  rowsCache: User[] = [];
  departments: Departments[] = [];
  editedUser: UserEdit;
  user: any;
  sourceUser: UserEdit;
  editingUserName: { name: string };
  loadingIndicator: boolean;
  userview: any[] = [];
  usermanage: any[] = [];
  roleassign: any[] = [];
  allRoles: Role[] = [];
  count = 0;
  ViewuserpermissiontoaddUserList: ViewuserpermissiontoaddUser[] = [];

  @ViewChild('indexTemplate', { static: true })
  indexTemplate: TemplateRef<any>;

  @ViewChild('userNameTemplate', { static: true })
  userNameTemplate: TemplateRef<any>;

  @ViewChild('rolesTemplate', { static: true })
  rolesTemplate: TemplateRef<any>;



  @ViewChild('aprroveTemplate', { static: true })
  aprroveTemplate: TemplateRef<any>;
  @ViewChild('actionsTemplate', { static: true })
  actionsTemplate: TemplateRef<any>;

  @ViewChild('editorModal', { static: true })
  editorModal: ModalDirective;

  @ViewChild('userEditor', { static: true })
  userEditor: UserInfoComponent;

  constructor(private localStorage: LocalStoreManager, private alertService: AlertService, private authService: AuthService, private translationService: AppTranslationService, private accountService: AccountService) {
    this.user = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
  }
  async ngOnInit() {
    const gT = (key: string) => this.translationService.getTranslation(key);
    this.columns = [
      { prop: 'index', name: '#', width: 40, cellTemplate: this.indexTemplate, canAutoResize: false },
      { prop: 'jobTitle', name: gT('users.management.Title'), width: 50 },
      { prop: 'userName', name: gT('users.management.UserName'), width: 90 },
      { prop: 'fullName', name: gT('users.management.FullName'), width: 120 },
      { prop: 'email', name: gT('users.management.Email'), width: 140 },
      { prop: 'roles', name: gT('users.management.Roles'), width: 120, cellTemplate: this.rolesTemplate },

      { prop: 'phoneNumber', name: gT('users.management.PhoneNumber'), width: 100 }
    ];
    this.count = 0;
    this.loadData();

  }
  ngAfterViewInit() {

    this.userEditor.changesSavedCallback = () => {
      this.addNewUserToList();
      this.editorModal.hide();
    };

    this.userEditor.changesCancelledCallback = () => {
      this.editedUser = null;
      this.sourceUser = null;
      this.editorModal.hide();
    };
  }


  addNewUserToList() {
    if (this.sourceUser) {
      Object.assign(this.sourceUser, this.editedUser);

      let sourceIndex = this.rowsCache.indexOf(this.sourceUser, 0);
      if (sourceIndex > -1) {
        Utilities.moveArrayItem(this.rowsCache, sourceIndex, 0);
      }

      sourceIndex = this.rows.indexOf(this.sourceUser, 0);
      if (sourceIndex > -1) {
        Utilities.moveArrayItem(this.rows, sourceIndex, 0);
      }

      this.editedUser = null;
      this.sourceUser = null;
    } else {
      const user = new User();
      Object.assign(user, this.editedUser);
      this.editedUser = null;

      let maxIndex = 0;
      for (const u of this.rowsCache) {
        if ((u as any).index > maxIndex) {
          maxIndex = (u as any).index;
        }
      }

      (user as any).index = maxIndex + 1;

      this.rowsCache.splice(0, 0, user);
      this.rows.splice(0, 0, user);
      this.rows = [...this.rows];
    }
  }


  async loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    if (this.canViewRoles) {
      this.accountService.getUsersAndRoles().subscribe(results => this.onDataLoadSuccessful(results[0], results[1]), error => this.onDataLoadFailed(error));
    } else {

      this.accountService.getUsers().subscribe(users => this.onDataLoadSuccessful(users, this.accountService.currentUser.roles.map(x => new Role(x))), error => this.onDataLoadFailed(error));
    }
  }
  onDataLoadSuccessful(users: User[], roles: Role[]) {
    //this.accountService.getDepartment(0, 0).subscribe(depart => {
    //  this.getdepartment(depart);

    //  console.log(depart, 'll')
      this.accountService.getRoles(0, 0).subscribe(data => { })
      console.log(users, roles)
      this.alertService.stopLoadingMessage();
      this.loadingIndicator = false;
      // this.allRoles = roles;
      let rol = [];
      let rol1 = [];
      debugger;

      // for (let e = 0; e < roles.length; e++) {
      //   if (this.userview.find(x => x.rolepermission == roles[e].id) != undefined) {
      //     rol.push(roles[e]);
      //   }
      // }
      // for (let e = 0; e < roles.length; e++) {
      //   if (this.roleassign.find(x => x.rolepermission == roles[e].id) != undefined) {
      //     rol1.push(roles[e]);
      //   }
      // }
      //console.log(rol, rol1, "i", this.userview)

      this.allRoles = roles;

      //users = users.filter(function (e) { return rol.some(r => r.name == e.roles.find(x => x == r.name)) });

      // if (this.user.roles.find(y => y === 'Super Admin') === undefined) {
      //   users = users.filter(x => x.department === this.user.department);
      // }
      users.forEach((user, index) => {
        (user as any).index = index + 1;
      });

      // for(let e=0;e<users.length;e++){
      //   if(users.some(x=>x.roles.includes(rol))){
      //     rol.push(this.allRoles[e]);
      //   }
      // }
      console.log(rol, this.userview, 'i', this.roleassign, this.usermanage)
      this.rowsCache = [...users];

      this.rows = users;


     
  }

  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error', `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
      MessageSeverity.error, error);
  }
  newUser() {
    this.editingUserName = null;
    this.sourceUser = null;
    console.log(this.allRoles)
    // this.getdepartment(depart);
    this.editedUser = this.userEditor.newUser(this.allRoles);
    this.editorModal.show();
  }


  editUser(row: UserEdit) {
    this.editingUserName = { name: row.userName };
    this.sourceUser = row;
    //  this.getdepartment(depart);
    console.log(this.allRoles)
    this.editedUser = this.userEditor.editUser(row, this.allRoles);
    this.editorModal.show();
  }


  deleteUser(row: UserEdit) {
    this.alertService.showDialog('Are you sure you want to delete \"' + row.userName + '\"?', DialogType.confirm, () => this.deleteUserHelper(row));
  }


  deleteUserHelper(row: UserEdit) {

    this.alertService.startLoadingMessage('Deleting...');
    this.loadingIndicator = true;

    this.accountService.deleteUser(row)
      .subscribe(results => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.rowsCache = this.rowsCache.filter(item => item !== row);
        this.rows = this.rows.filter(item => item !== row);
      },
        error => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;

          this.alertService.showStickyMessage('Delete Error', `An error occured whilst deleting the user.\r\nError: "${Utilities.getHttpResponseMessages(error)}"`,
            MessageSeverity.error, error);
        });
  }

  approveUser(row: UserEdit) {
    this.alertService.showDialog('Are you sure you want to Approved this User \"' + row.userName + '\"?',
      DialogType.confirm, () => {
        row.isapproved = '1';
        this.accountService.updateUser(row).subscribe(user => {
          console.log(user);
          this.loadData();
        });

      });

  }
  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }
  isapproved(row) {
    return row?.isApproved === "1" ? true : false;
  }

  get canManageUsers() {
    return this.accountService.userHasPermission(Permission.manageUsersPermission);
  }
  get canApproveUsers() {

    return this.accountService.userHasPermission(Permission.approvedUsersPermission);
  }
}
