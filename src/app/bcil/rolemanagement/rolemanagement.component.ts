import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Permission } from 'src/app/model/permission.model';
import { Role } from 'src/app/model/role.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService, DialogType, MessageSeverity } from 'src/app/services/alert.service';
import { AppTranslationService } from 'src/app/services/app-translation.service';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/utilities';
import { RoleEditorComponent } from '../role-editor/role-editor.component';

@Component({
  selector: 'app-rolemanagement',
  templateUrl: './rolemanagement.component.html',
  styleUrls: ['./rolemanagement.component.css']
})
export class RolemanagementComponent implements OnInit {
  @ViewChild('editorModal', { static: true })
  editorModal: ModalDirective;
  
  @ViewChild('roleEditor', { static: true })
  roleEditor: RoleEditorComponent;
  columns: any[] = [];
  rows: Role[] = [];
  rowsCache: Role[] = [];
  allPermissions: Permission[] = [];
  editedRole: Role;
  sourceRole: Role;
  editingRoleName: { name: string };
  loadingIndicator: boolean;
  count = 0;
  roleview: any[] = [];
  constructor(private authService: AuthService, private alertService: AlertService, private translationService: AppTranslationService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadData();
  }

ngAfterViewInit() {

  this.roleEditor.changesSavedCallback = () => {
    this.addNewRoleToList();
    this.editorModal.hide();
  };

  this.roleEditor.changesCancelledCallback = () => {
    this.editedRole = null;
    this.sourceRole = null;
    this.editorModal.hide();
  };
}


addNewRoleToList() {
  if (this.sourceRole) {
    Object.assign(this.sourceRole, this.editedRole);

    let sourceIndex = this.rowsCache.indexOf(this.sourceRole, 0);
    if (sourceIndex > -1) {
      Utilities.moveArrayItem(this.rowsCache, sourceIndex, 0);
    }

    sourceIndex = this.rows.indexOf(this.sourceRole, 0);
    if (sourceIndex > -1) {
      Utilities.moveArrayItem(this.rows, sourceIndex, 0);
    }

    this.editedRole = null;
    this.sourceRole = null;
  } else {
    const role = new Role();
    Object.assign(role, this.editedRole);
    this.editedRole = null;

    let maxIndex = 0;
    for (const r of this.rowsCache) {
      if ((r as any).index > maxIndex) {
        maxIndex = (r as any).index;
      }
    }

    (role as any).index = maxIndex + 1;

    this.rowsCache.splice(0, 0, role);
    this.rows.splice(0, 0, role);
    this.rows = [...this.rows];
  }
}
onEditorModalHidden() {
  this.editingRoleName = null;
  this.roleEditor.resetForm(true);
}


newRole() {
  this.editingRoleName = null;
  this.sourceRole = null;
  this.editedRole = this.roleEditor.newRole(this.allPermissions);
  this.editorModal.show();
}


editRole(row: Role) {
  this.editingRoleName = { name: row.name };
  this.sourceRole = row;
  this.editedRole = this.roleEditor.editRole(row, this.allPermissions);
  this.editorModal.show();
}

deleteRole(row: Role) {
 
  this.alertService.showDialog('Are you sure you want to delete the \"' + row.name + '\" role?', DialogType.confirm, () => this.deleteRoleHelper(row));
}


deleteRoleHelper(row: Role) {

  this.alertService.startLoadingMessage('Deleting...');
  this.loadingIndicator = true;

  this.accountService.deleteRole(row)
    .subscribe(results => {
      this.alertService.stopLoadingMessage();
      this.loadingIndicator = false;

      this.rowsCache = this.rowsCache.filter(item => item !== row);
      this.rows = this.rows.filter(item => item !== row);
    },
      error => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.alertService.showStickyMessage('Delete Error', `An error occured whilst deleting the role.\r\nError: "${Utilities.getHttpResponseMessages(error)}"`,
          MessageSeverity.error, error);
      });
}


get canManageRoles() {
  return this.accountService.userHasPermission(Permission.manageRolesPermission);
}





loadData() {

  this.alertService.startLoadingMessage();
  this.loadingIndicator = true;

  this.accountService.getRolesAndPermissions()
    .subscribe(results => {
      this.alertService.stopLoadingMessage();
      this.loadingIndicator = false;

      const roles = results[0];
      const permissions = results[1];



    
      console.log(roles, this.roleview)
      let row = this;
      let roles1 = roles;
      // roles=roles.filter(item=>this.roleview())

      roles1.forEach((role, index) => {
        (role as any).index = index + 1;
      });
      this.rowsCache = [...roles1];
      this.rows = roles1;

      this.allPermissions = permissions;



    },
      error => {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.alertService.showStickyMessage('Load Error', `Unable to retrieve roles from the server.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
          MessageSeverity.error, error);
      });
}
}
