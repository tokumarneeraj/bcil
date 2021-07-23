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
  'mou_init.view'|'mou_pending.view'|'mou_proposed_by_admin_client.view'|'mou_change_req_by_admin.view'|'mou_change_req_by_client.view'|'mou_proposed_by_lm.view'|'mou_accepted_by_client.view'|
  'agreementsigned.view'|'bdoassigned.view'|'tto_req_approved.view'|'ip_manager_assigned.view'|
  'technologytransfer.view'|'tta_init.view'|'tta_evaluation_assigned.view'|'tta_evaluation_upload_by_bdm.view'|
  'tta_evaluation_closure_by_admin.view'|'tta_evaluation_approved_by_admin.view'|
  'tta_evaluation_change_request_by_admin.view'|'tta_closure_request_by_bdm.view'|
  'tta_close.view'|'tta_evaluation_change_request_by_client.view'|'tta_evaluation_accepted_by_client.view'|
  'tta_strategy_assigned.view'|'tta_strategy_uploaded_by_bdm.view'|'tta_strategy_change_request_by_admin.view'|
  'tta_techb_and_flier_approved_by_admin.view'|'tta_techb_and_flier_approved_by_scientist.view'|'tta_change_req_by_scientist.view'|
  'strategy_implemented.view'|'tta_interest_received.view'|
  
  'patent.view'|'trademark.view'|'design.view'|'copyright.view'|'plantvarity.view'|'otherservices.view'
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
  public static readonly viewTta_initPermission: PermissionValues = 'tta_init.view';

  public static readonly viewTta_evaluation_assignedPermission: PermissionValues = 'tta_evaluation_assigned.view';

  public static readonly viewTta_evaluation_upload_by_bdmPermission: PermissionValues = 'tta_evaluation_upload_by_bdm.view';

  public static readonly viewTta_evaluation_closure_by_adminPermission: PermissionValues = 'tta_evaluation_closure_by_admin.view';
  public static readonly viewTta_evaluation_approved_by_adminPermission: PermissionValues = 'tta_evaluation_approved_by_admin.view';

  public static readonly viewTta_evaluation_change_request_by_adminPermission: PermissionValues = 'tta_evaluation_change_request_by_admin.view';
  public static readonly viewTta_Closure_request_by_bdmPermission: PermissionValues = 'tta_closure_request_by_bdm.view';

  public static readonly viewTta_closePermission: PermissionValues = 'tta_close.view';
  public static readonly viewTta_evaluation_change_request_by_clientPermission: PermissionValues = 'tta_evaluation_change_request_by_client.view';
  public static readonly viewTta_evaluation_accepted_by_clientPermission: PermissionValues = 'tta_evaluation_accepted_by_client.view';
  public static readonly viewTta_strategy_assignedPermission: PermissionValues = 'tta_strategy_assigned.view';
   public static readonly viewTta_strategy_uploaded_by_bdmPermission: PermissionValues = 'tta_strategy_uploaded_by_bdm.view';
  public static readonly viewtta_strategy_change_request_by_adminPermission: PermissionValues = 'tta_strategy_change_request_by_admin.view';
  public static readonly viewTta_techb_and_flier_approved_by_adminPermission: PermissionValues = 'tta_techb_and_flier_approved_by_admin.view';
  public static readonly viewTta_techb_and_flier_approved_by_scientistPermission: PermissionValues = 'tta_techb_and_flier_approved_by_scientist.view';
  public static readonly viewTta_change_req_by_scientistPermission: PermissionValues = 'tta_change_req_by_scientist.view';
  public static readonly viewstartegy_implementedPermission: PermissionValues = 'strategy_implemented.view';
  public static readonly viewTta_interest_receivedPermission: PermissionValues = 'tta_interest_received.view';




  public static readonly viewPatentPermission: PermissionValues = 'patent.view';
  public static readonly viewTrademarkPermission: PermissionValues = 'trademark.view';
  
  public static readonly viewDesignPermission: PermissionValues = 'design.view';
  public static readonly viewCopyrightPermission: PermissionValues = 'copyright.view';
  public static readonly viewPlantvarityPermission: PermissionValues = 'plantvarity.view';
  
  public static readonly viewOtherservicesPermission: PermissionValues = 'otherservices.view';
  public static readonly viewReportPermission: PermissionValues = 'report.view';
  

 
  public static readonly viewMouPermission: PermissionValues = 'mou.view';

  public static readonly addMouPermission: PermissionValues = 'mou.add';
  public static readonly viewMou_initPermission: PermissionValues = 'mou_init.view';
  public static readonly viewMou_pendingPermission: PermissionValues = 'mou_pending.view';
  public static readonly viewMou_proposed_by_adminPermission: PermissionValues = 'mou_proposed_by_admin_client.view';
  public static readonly viewMou_change_req_by_adminPermission: PermissionValues = 'mou_change_req_by_admin.view';
  public static readonly viewMou_change_req_by_clientPermission: PermissionValues = 'mou_change_req_by_client.view';
  public static readonly viewMou_proposed_by_lmPermission: PermissionValues = 'mou_proposed_by_lm.view';
  public static readonly viewMou_accepted_by_clientPermission: PermissionValues = 'mou_accepted_by_client.view';
  public static readonly viewagreementsignedPermission: PermissionValues = 'agreementsigned.view';
  public static readonly viewbdoassignedPermission: PermissionValues = 'bdoassigned.view';
  public static readonly viewtto_required_aproved_Permission: PermissionValues = 'tto_req_approved.view';
  public static readonly viewip_manager_assignedPermission: PermissionValues = 'ip_manager_assigned.view';


 
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
