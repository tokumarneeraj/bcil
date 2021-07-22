export type PermissionNames =
  'View Users' | 'Manage Users' |
  'View Roles' | 'Manage Roles' | 'Assign Roles' |
  'View Cash Counter';

export type PermissionValues =
  'users.view' | 'users.manage' |'users.approved'|
  'roles.view' | 'roles.manage' | 'roles.assign' |
  'department.view' | 'department.manage' |'mou.view'|'mou.add'|'mou_init_forword_button.view'|
  'mou_pending_forword_button.view'|'mou_proposed_by_admin_client_request_change.view'|'mou_proposed_by_admin_client_approved.view'|
  'mou_change_by_admin_forword_button.view'|
  'mou_proposed_by_lm_forword_button.view'|'mou_accepted_by_client_forword_button.view'|'agreementsigned_forword_button.view'|
  'bdoassigned_forword_button.view'|'tto_req_approved_forword_button.view'|'ip_manager_assigned_forword_button.view'|
  'technologytransfer.view'|'patent.view'|'trademark.view'|'design.view'|'copyright.view'|'plantvarity.view'|'otherservices.view'
  |'report.view';

export class Permission {

  public static readonly viewUsersPermission: PermissionValues = 'users.view';
  public static readonly manageUsersPermission: PermissionValues = 'users.manage';
  public static readonly approvedUsersPermission: PermissionValues = 'users.approved';

  public static readonly viewDepartmentPermission: PermissionValues = 'department.view';
  public static readonly manageDepartmentPermission: PermissionValues = 'department.manage';

  public static readonly viewRolesPermission: PermissionValues = 'roles.view';
  public static readonly manageRolesPermission: PermissionValues = 'roles.manage';
  public static readonly assignRolesPermission: PermissionValues = 'roles.assign';

  public static readonly viewTechnologyTransferPermission: PermissionValues = 'technologytransfer.view';

  public static readonly viewPatentPermission: PermissionValues = 'patent.view';
  public static readonly viewTrademarkPermission: PermissionValues = 'trademark.view';
  
  public static readonly viewDesignPermission: PermissionValues = 'design.view';
  public static readonly viewCopyrightPermission: PermissionValues = 'copyright.view';
  public static readonly viewPlantvarityPermission: PermissionValues = 'plantvarity.view';
  
  public static readonly viewOtherservicesPermission: PermissionValues = 'otherservices.view';
  public static readonly viewReportPermission: PermissionValues = 'report.view';
  

 
  public static readonly viewMouPermission: PermissionValues = 'mou.view';
  public static readonly addMouPermission: PermissionValues = 'mou.add';
  public static readonly viewMou_init_forword_button_Permission: PermissionValues = 'mou_init_forword_button.view';
  public static readonly viewMou_pending_forword_buttonPermission: PermissionValues = 'mou_pending_forword_button.view';

  public static readonly viewMou_proposed_by_admin_client_request_changePermission: PermissionValues = 'mou_proposed_by_admin_client_request_change.view';
  public static readonly viewMou_proposed_by_admin_client_approvedPermission: PermissionValues = 'mou_proposed_by_admin_client_approved.view';
  public static readonly viewMou_change_by_admin_forword_buttonPermission: PermissionValues = 'mou_change_by_admin_forword_button.view';
  public static readonly viewMou_proposed_by_lm_forword_buttonPermission: PermissionValues = 'mou_proposed_by_lm_forword_button.view';

  public static readonly viewMou_accepted_by_client_forword_buttonPermission: PermissionValues = 'mou_accepted_by_client_forword_button.view';
  public static readonly viewAgreementsigned_forword_buttonPermission: PermissionValues = 'agreementsigned_forword_button.view';
  public static readonly viewbdoassigned_forword_buttonPermission: PermissionValues = 'bdoassigned_forword_button.view';
  public static readonly viewtto_req_approved_forword_buttonPermission: PermissionValues = 'tto_req_approved_forword_button.view';
  public static readonly viewip_manager_assigned_forword_buttonPermission: PermissionValues = 'ip_manager_assigned_forword_button.view';
  
  
  
  
  
  
  
  
  

  
  constructor(name?: PermissionNames, value?: PermissionValues, groupName?: string, description?: string) {
    this.name = name;
    this.value = value;
    this.groupName = groupName;
    this.description = description;
  }

  public name: PermissionNames;
  public value: PermissionValues;
  public groupName: string;
  public description: string;
}
