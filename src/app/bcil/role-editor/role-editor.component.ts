// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Component, ViewChild } from '@angular/core';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { otherpermission, Role } from '../../model/role.model';
import { Permission } from '../../model/permission.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ViewuserpermissiontoaddUser } from '../../model/userpermissiontoaddUser'
import { Bdoservice } from 'src/app/services/bdo.service';
import { StatusMaster } from 'src/app/model/mou.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { error } from 'jquery';

@Component({
  selector: 'app-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.scss']
})
export class RoleEditorComponent {
  @ViewChild('editorModal3', { static: true })
  editorModal3: ModalDirective;
  StatusMaster:StatusMaster[];
  ViewuserpermissiontoaddUserList: ViewuserpermissiontoaddUser[] = [];
  ViewuserpermissiontoaddUser = new ViewuserpermissiontoaddUser();
  private isNewRole = false;
  public isSaving: boolean;
  otherpermissions:otherpermission[]=[];
  public showValidationErrors = true;
  public roleEdit: Role = new Role();
  public allPermissions: Permission[] = [];
  public selectedValues: { [key: string]: boolean; } = {};
  public selectedValues1: { [key: string]: boolean; } = {};

  private editingRoleName: string;
editmode=true;
  public formResetToggle = true;
  array1: any[] = [];
  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;


  @ViewChild('f')
  private form;

  @ViewChild('editorModal1', { static: true })
  editorModal1: ModalDirective;
  rows: Role[] = [];
  usertext = "";
  uservalue = "";
  myForm: FormGroup;
  constructor(private alertService: AlertService, private accountService: AccountService,private bdoService: Bdoservice,private fb: FormBuilder) {
    this.editmode=false;
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      permission: this.fb.array([])
    });
  }
  otherpermission(){
    this.bdoService.GetStatusMaster().subscribe(data=>{

      this.StatusMaster=data;
      this.StatusMaster.map((item)=>({...item,
      check:false

      }))
      this.accountService.getOtherpermission(this.roleEdit.id).subscribe(data=>
        {
          console.log(data)
          data.forEach(element => {
            $("[name="+element.permission+"]").trigger('click');
            //this.myForm.controls.permission.value
          });

          this.editorModal3.show();
        })
   
    });
  }

  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }
  checkboxbvalue(id, event) {
    if (event == true) {
      this.array1.push(id);
    }
    else {
      const index: number = this.array1.indexOf(id);
      if (index !== -1) {
        this.array1.splice(index, 1);
      }
    }
    console.log(this.array1)
  }
  addrolepermissionsubmit() {
    //this.ViewuserpermissiontoaddUserList = [];
    console.log(this.rows)
    let rolesused = this.rows.filter(p => this.selectedValues1[p.id + this.uservalue] === true);
    for (let i = 0; i < rolesused.length; i++) {
      this.ViewuserpermissiontoaddUser = new ViewuserpermissiontoaddUser();
      this.ViewuserpermissiontoaddUser.role = this.roleEdit.id;
      this.ViewuserpermissiontoaddUser.roletype = this.uservalue;
      this.ViewuserpermissiontoaddUser.rolepermission = rolesused[i].id;
      this.ViewuserpermissiontoaddUser.active = "1";
      this.ViewuserpermissiontoaddUserList.push(this.ViewuserpermissiontoaddUser);

      this.editorModal1.hide();

    }
    console.log(this.ViewuserpermissiontoaddUserList)




  }
  Addrolepermission(value, description) {
    debugger;
    //  this.selectedValues1={};
    this.accountService.GetUserpermissiontoAdduser(this.roleEdit.id, value)
      .subscribe(data1 => {
        console.log(data1)

        this.usertext = description;
        this.uservalue = value;
        this.accountService.getRolesAndPermissions()
          .subscribe(results => {

            const roles = results[0];
            const permissions = results[1];

            roles.forEach((role, index) => {
              (role as any).index = index + 1;
            });
            this.rows = roles;
            let rr = this.rows.filter(item => data1.some(d => d.rolepermission === item.id))

            for (let t = 0; t < rr.length; t++) {
              this.selectedValues1[rr[t].id + this.uservalue] = true
            }
            if(rr.length===0){
              this.selectedValues1={};
            }
            console.log(rr, data1, this.rows);
            this.editorModal1.show();
          });
      });

  }

  save() {
    this.isSaving = true;
    this.alertService.startLoadingMessage('Saving changes...');

    this.roleEdit.permissions = this.getSelectedPermissions();

    if (this.isNewRole) {
      this.accountService.newRole(this.roleEdit).subscribe(role => this.saveSuccessHelper(role), error => this.saveFailedHelper(error));
    } else {
      this.accountService.updateRole(this.roleEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
  }




  private saveSuccessHelper(role?: Role) {

    // debugger;
    // let re = [];
    // for (let r = 0; r < this.ViewuserpermissiontoaddUserList.length; r++) {
    //   let t = this.ViewuserpermissiontoaddUserList[r].rolepermission + this.ViewuserpermissiontoaddUserList[r].roletype;
    //   if ($.inArray(t, re) == -1) {
    //     this.ViewuserpermissiontoaddUserList[r].role = role === undefined ? this.roleEdit.id : role.id;
    //     re.push(this.ViewuserpermissiontoaddUserList[r]);

    //   }
    //   console.log(re)
    // }
    // this.accountService.UserpermissiontoAdduser(re).subscribe(data => {
    //   this.array1 = [];
    //   this.selectedValues1={};
    //   this.editorModal1.hide();
    //   console.log(data)
    // });
    // if (role) {
    //   Object.assign(this.roleEdit, role);
    // }

    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.showValidationErrors = false;

    if (this.isNewRole) {
      this.alertService.showMessage('Success', `Role \"${this.roleEdit.name}\" was created successfully`, MessageSeverity.success);
    } else {
      this.alertService.showMessage('Success', `Changes to role \"${this.roleEdit.name}\" was saved successfully`, MessageSeverity.success);
    }


    this.roleEdit = new Role();
    this.resetForm();


    if (!this.isNewRole && this.accountService.currentUser.roles.some(r => r === this.editingRoleName)) {
      this.refreshLoggedInUser();
    }

    if (this.changesSavedCallback) {
      this.changesSavedCallback();
    }
    this.editmode=false;
  }


  private refreshLoggedInUser() {
    this.accountService.refreshLoggedInUser()
      .subscribe(user => { },
        error => {
          this.alertService.resetStickyMessage();
          this.alertService.showStickyMessage('Refresh failed', 'An error occured whilst refreshing logged in user information from the server', MessageSeverity.error, error);
        });
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
  onChange(name:string,value:string, isChecked: boolean) {
    let newvalue=name+'-'+value;
    const emailFormArray = <FormArray>this.myForm.controls.permission;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(newvalue));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == newvalue)
      emailFormArray.removeAt(index);
    }
  }
  permissionsubmit(){
    this.isSaving=true;
    let permission1= <FormArray>this.myForm.controls.permission;
    for(let per of permission1.value){
    this.otherpermissions.push({roleid:this.roleEdit.id,permission:per,status:true})
    }

    this.accountService.AddOtherpermission(this.otherpermissions).subscribe(data=>{
      console.log(data)
      this.otherpermissions=[];
      this.isSaving=false;
      this.editorModal3.hide();
        this.alertService.showMessage('Success', 'Permission Change Successfully', MessageSeverity.success);
    },error=>{
      this.isSaving=false;
      this.editorModal3.hide();
    })
  }

  cancel() {
    this.roleEdit = new Role();

    this.showValidationErrors = false;
    this.resetForm();

    this.alertService.showMessage('Cancelled', 'Operation cancelled by user', MessageSeverity.default);
    this.alertService.resetStickyMessage();

    if (this.changesCancelledCallback) {
      this.changesCancelledCallback();
    }
  }



  selectAll() {
    this.allPermissions.forEach(p => this.selectedValues[p.value] = true);
  }


  selectNone() {
    this.allPermissions.forEach(p => this.selectedValues[p.value] = false);
  }


  toggleGroup(groupName: string) {
    let firstMemberValue: boolean;

    this.allPermissions.forEach(p => {
      if (p.groupName !== groupName) {
        return;
      }

      if (firstMemberValue == null) {
        firstMemberValue = this.selectedValues[p.value] === true;
      }

      this.selectedValues[p.value] = !firstMemberValue;
    });
  }


  private getSelectedPermissions() {
    return this.allPermissions.filter(p => this.selectedValues[p.value] === true);
  }


  resetForm(replace = false) {

    if (!replace) {
      this.form.reset();
    } else {
      this.formResetToggle = false;

      setTimeout(() => {
        this.formResetToggle = true;
      });
    }
  }


  newRole(allPermissions: Permission[]) {
    this.editmode=false;
    this.selectedValues1={};
    this.isNewRole = true;
    this.showValidationErrors = true;

    this.editingRoleName = null;
    this.allPermissions = allPermissions;
    this.selectedValues = {};
    this.roleEdit = new Role();

    return this.roleEdit;
  }

  editRole(role: Role, allPermissions: Permission[]) {
    
    this.editmode=true;
    //alert(this.editmode)
    if (role) {
     
      this.isNewRole = false;
      this.showValidationErrors = true;

      this.editingRoleName = role.name;
      this.allPermissions = allPermissions;
      this.selectedValues = {};
      role.permissions.forEach(p => this.selectedValues[p.value] = true);
      this.roleEdit = new Role();
      Object.assign(this.roleEdit, role);

      return this.roleEdit;
    } else {
      return this.newRole(allPermissions);
    }
  }



  get canManageRoles() {
    return this.accountService.userHasPermission(Permission.manageRolesPermission);
  }
}
