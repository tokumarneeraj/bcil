export type PermissionNames =
  'View Users' | 'Manage Users' |
  'View Roles' | 'Manage Roles' | 'Assign Roles' |
  'View Cash Counter';

export type PermissionValues =
  'users.view' | 'users.manage' |'users.approved'|
  'roles.view' | 'roles.manage' | 'roles.assign' |
  'department.view' | 'department.manage' |'mou.view'|
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
  public static readonly viewMouPermission: PermissionValues = 'mou.view';
  public static readonly viewPatentPermission: PermissionValues = 'patent.view';
  public static readonly viewTrademarkPermission: PermissionValues = 'trademark.view';
  
  public static readonly viewDesignPermission: PermissionValues = 'design.view';
  public static readonly viewCopyrightPermission: PermissionValues = 'copyright.view';
  public static readonly viewPlantvarityPermission: PermissionValues = 'plantvarity.view';
  
  public static readonly viewOtherservicesPermission: PermissionValues = 'otherservices.view';
  public static readonly viewReportPermission: PermissionValues = 'report.view';
  

 

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
