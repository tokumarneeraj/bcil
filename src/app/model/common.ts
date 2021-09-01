import { StaticSymbolCache } from "@angular/compiler";
import { ReflectiveInjector } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { getHeapStatistics } from "v8";
import { AccountEndpoint } from "../services/account-endpoint.service";
import { AccountService } from "../services/account.service";
import { AlertService } from "../services/alert.service";
import { AuthService } from "../services/auth.service";
import { DBkeys } from "../services/db-keys";
import { LocalStoreManager } from "../services/local-store-manager.service";
import { Permission, PermissionValues } from "./permission.model";
import { otherpermission } from "./role.model";


  export class commondata{
    
    public  accountService:AccountService;
     localStorage=new LocalStoreManager();
    // constructor( private _accountService: AccountService){
    //   this.accountService=_accountService
    // }
    // private authService: AuthService,
    // private accountEndpoint: AccountEndpoint
    // AuthService() {
    //   return new AuthService();
    // }
    // AccountEndpoint() {
    //   return new AccountEndpoint();
    // }
    //moubutton
     getotherpermissiondata(data:any):otherpermission[]{
     let permi= JSON.parse(localStorage.getItem('user_otherpermissions'));
     return permi.filter(s => s.includes(data));
    }
    
    userHasPermission(permissionValue: PermissionValues): boolean {
      return this.permissions?.some(p => p === permissionValue);
    }
    get permissions(): PermissionValues[] {
      return this.localStorage.getDataObject<PermissionValues[]>(DBkeys.USER_PERMISSIONS) || [];//JSON.parse(localStorage.getItem('user_permissions'));
    }
    get Canviewagreement_not_needed_forword_buttonPermission() {
      debugger;
      return this.userHasPermission(Permission.viewagreement_not_needed_forword_buttonPermission);
    }
    
    
  get CanviewMou_init_forword_button_Permission() {
    debugger;
    return this.userHasPermission(Permission.viewMou_init_forword_button_Permission);
  }
  get CanviewMou_pending_forword_buttonPermission() {
    return this.userHasPermission(Permission.viewMou_pending_forword_buttonPermission);
  }
  
  get CanviewMou_proposed_by_admin_client_request_changePermissionPermission() {
    return this.userHasPermission(Permission.viewMou_proposed_by_admin_client_request_changePermission);
  }
  
  get CanviewMou_proposed_by_admin_client_approvedPermission() {
    return this.userHasPermission(Permission.viewMou_proposed_by_admin_client_approvedPermission);
  }
  
  get CanviewMou_change_by_admin_forword_buttonPermission() {
    return this.userHasPermission(Permission.viewMou_change_by_admin_forword_buttonPermission);
  }
  
  get CanviewMou_proposed_by_lm_forword_buttonPermission() {
    return this.userHasPermission(Permission.viewMou_proposed_by_lm_forword_buttonPermission);
  }
  get CanviewMou_proposed_by_lm_change_required_buttonPermission() {
    return this.userHasPermission(Permission.viewMou_proposed_by_lm_change_required_buttonPermission);
  }
  get CanviewMou_accepted_by_client_forword_buttonPermission() {
    return this.userHasPermission(Permission.viewMou_accepted_by_client_forword_buttonPermission);
  }
  get CanviewAgreementsigned_forwprd_buttonPermission() {
    return this.userHasPermission(Permission.viewAgreementsigned_forword_buttonPermission);
  }
  get Canviewbdoassigned_forword_buttonPermission() {
    return this.userHasPermission(Permission.viewbdoassigned_forword_buttonPermission);
  }
  get Canviewtto_req_approved_forword_buttonPermission() {
    return this.userHasPermission(Permission.viewtto_req_approved_forword_buttonPermission);
  }
  get Canviewip_manager_assigned_forword_buttonPermission() {
    return this.userHasPermission(Permission.viewip_manager_assigned_forword_buttonPermission);
  }
  
//tlp button
get CanviewTLP_EnterLead_forwordbutton_permission() {
  return this.userHasPermission(Permission.viewTLP_EnterLead_forwordbutton_permission);
}

get CanviewTLP_Lead_Entered_by_bdm_forwordbutton_permission() {
  return this.userHasPermission(Permission.viewTLP_Lead_Entered_by_bdm_forwordbutton_permission);
}

get CanviewTLP_due_deligence_done_change_req_button_permission() {
  return this.userHasPermission(Permission.viewTLP_due_deligence_done_change_req_button_permission);
}

get CanviewTLP_due_deligence_done_approve_button_permission() {
  return this.userHasPermission(Permission.viewTLP_due_deligence_done_approve_button_permission);
}

get CanviewTLP_due_deligence_change_req_by_admin_forwordbutton_permission() {
  return this.userHasPermission(Permission.viewTLP_due_deligence_change_req_by_admin_forwordbutton_permission);
}

get CanviewTLP_lead_approved_by_admin_forwordbutton_permission() {
  return this.userHasPermission(Permission.viewTLP_lead_approved_by_admin_forwordbutton_permission);
}

get CanviewTLP_lead_approved_by_admin_forword2button_permission() {
  return this.userHasPermission(Permission.viewTLP_lead_approved_by_admin_forword2button_permission);
}

get CanviewTLP_nda_req_by_luf_approve_button_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_req_by_luf_approve_button_permission);
}

get CanviewTLP_nda_req_by_luf_change_req_button_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_req_by_luf_change_req_button_permission);
}

get CanviewTLP_nda_change_req_by_Admin_forwordbutton_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_change_req_by_Admin_forwordbutton_permission);
}

get CanviewTLP_nda_approved_by_Admin_approve_button_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_approved_by_Admin_approve_button_permission);
}

get CanviewTLP_nda_approved_by_Admin_change_req_button_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_approved_by_Admin_change_req_button_permission);
}

get CanviewTLP_nda_change_req_by_no_change_req_button_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_change_req_by_no_change_req_button_permission);
}

get CanviewTLP_nda_approved_by_no_approve_button_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_approved_by_no_approve_button_permission);
}

get CanviewTLP_nda_approved_by_no_change_req_button_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_approved_by_no_change_req_button_permission);
}

get CanviewTLP_nda_approved_by_company_forwordbutton_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_approved_by_company_forwordbutton_permission);
}
get CanviewTLP_nda_executed_forwordbutton_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_executed_forwordbutton_permission);
}
get CanviewTLP_nda_executed_forword2button_permission() {
  return this.userHasPermission(Permission.viewTLP_nda_executed_forword2button_permission);
}

 public moustatus() {
   return [{tabelname:"Initiation of Assignment",permission:'mou_init.view', name: 'init', value: 'S101', createdBy: "Test1",forwordtitle:"Forward to LM", forward: "S102", forwardCheck: true, type: true,forwardText: 'Forward', back: true,backbuttonText: 'Agreement not needed',backStatus: "S107",permissionbutton1:new commondata().Canviewagreement_not_needed_forword_buttonPermission,permissionforword:new commondata().CanviewMou_init_forword_button_Permission },
{tabelname:"MOU Pending",permission:"mou_pending.view", name: 'mou_pending', value: 'S102', createdBy: "Tes2", forward: "S104",forwordtitle:"Forward to Admin", forwardCheck: true, forwardText: 'Forward', back: false,permissionforword:new commondata().CanviewMou_pending_forword_buttonPermission },
{tabelname:"MOU Change Required By Admin",permission:'mou_change_req_by_admin.view', name: 'mou_change_by_admin', value: 'S103', createdBy: "Tes3", forward: "S104", forwardCheck: true, forwardText: 'Forward', back: true,permissionforword:new commondata().CanviewMou_change_by_admin_forword_buttonPermission },
{tabelname:"MOU Proposed By Legal Manager",permission:"mou_proposed_by_lm.view", name: 'mou_porposed_by_lm', value: 'S104', createdBy: "Tes4",forwordtitle:"Forward to BDM/IPM",backtitle:"Forward to LM", forward: "S110", forwardCheck: false, forwardText: 'Forward', back: true, backStatus: "S103",approvetitle:"Forward to BdM/IPM", approvedvalue: 'S110', approved: true, approvedText: "Approved", backbuttonText: 'Change Req',permissionforword:new commondata().CanviewMou_proposed_by_lm_forword_buttonPermission ,permissionbutton1:new commondata().CanviewMou_proposed_by_lm_change_required_buttonPermission},
{ tabelname:"Agreement Signed",permission:"agreementsigned.view",name: 'agreementsigned', value: 'S105', createdBy: "Tes5", forward: "S107", forwardCheck: true, forwardText: 'Forward', back: false, permissionforword:new commondata().CanviewAgreementsigned_forwprd_buttonPermission },
{ tabelname:"MOU Accepted by Client",permission:"mou_accepted_by_client.view",name: 'mou_accepted_by_client', value: 'S106', createdBy: "Tes6", forward: "S105", forwardCheck: true, forwardText: 'Forward', back: false ,permissionforword:new commondata().CanviewMou_accepted_by_client_forword_buttonPermission},
{ tabelname:"Business Development Manager Assigned",permission:"bdoassigned.view",name: 'bodassigned', value: 'S107', createdBy: "Tes4", forward: "S108", forwardCheck: true, forwardText: 'Forward', back: false ,permissionforword:new commondata().Canviewbdoassigned_forword_buttonPermission},
{ tabelname:"TTO Request Approved",permission:"tto_req_approved.view",name: 'tto_req_approved', value: 'S108', createdBy: "Tes5", forward: "S109", forwardCheck: true, forwardText: 'Forward', back: false ,permissionforword:new commondata().Canviewtto_req_approved_forword_buttonPermission},
{ tabelname:"IP Manager Assigned",permission:"ip_manager_assigned.view",name: 'ipm_assigned', value: 'S109', createdBy: "Tes6", forward: "S108", forwardCheck: true, forwardText: 'Forward', back: false,permissionforword:new commondata().Canviewip_manager_assigned_forword_buttonPermission },
{ tabelname:"MOU Proposed by Admin",permission:"mou_proposed_by_admin_client.view",name: 'mou_proposed_by_admin', value: 'S110', createdBy: "Tes6", forward: "S106",forwordtitle:"Forward to LM", forwardCheck: true, forwardText: 'Forward', back: true,backtitle:'Forward to Admin', backStatus: "S112", backbuttonText: 'Mou Change By Client',permissionforword:new commondata().CanviewMou_accepted_by_client_forword_buttonPermission,permissionbutton1:new commondata().CanviewMou_proposed_by_admin_client_request_changePermissionPermission },
{ tabelname:"MOU Change By Client",permission:"mou_change_by_client.view",name: 'mou_change_by_client', value: 'S111', createdBy: "Tes3", forward: "S103", forwardCheck: true, forwardText: 'Forward', back: false,permissionforword:new commondata().Canviewbdoassigned_forword_buttonPermission },
//{ name: 'mou_approved_by_admin', value: 'S112', createdBy: "Tes3", forward: "S106", forwardCheck: true, forwardText: 'Forword', back: false },
//{tabelname:"init",permission:"tto_req_approved.view", name: 'tta_init', value: 'S113', createdBy: "Tes3", forward: "S106", forwardCheck: true, forwardText: 'Forward', back: false ,permissionforword:new commondata().Canviewbdoassigned_forword_buttonPermission},
]
 }

 public ttaarray(){ return [
  {stage:'tta', tablename:'Upload Assignment/Tech. disclosure form', name: 'ViewMouAll', value: 'S108', formHeader: 'Assignment and Tech. Disclosure Form',permission:"tta_upload_assign_tech_disclosure_form.view" },
  {stage:'tta', tablename:'TTA Initiation',name: 'tta_init', value: 'S113', formHeader: 'Assign to BDM',permission:"tta_init.view" },
  {stage:'tta', tablename:'TTA Evaluation Assigned',name: 'tta_evaluation_assigned', value: 'S114', formHeader: 'Upload Evaluation Report',permission:"tta_evaluation_assigned.view" },
  {stage:'tta', tablename:'TTA Evaluation Uploaded by BDM',name: 'tta_evaluation_uploaded_by_bdm', value: 'S115', formHeader: 'Application Forward',permission:"tta_evaluation_upload_by_bdm.view" },
  {stage:'tta', tablename:'TTA Evaluation Closure by Admin',name: 'tta_evaluation_closure_by_admin', value: 'S116', formHeader: 'Close TTA',permission:"tta_evaluation_closure_by_admin.view" },
  {stage:'tta', tablename:'TTA Evaluation Approved by Admin',name: 'tta_evaluation_approved_by_admin', value: 'S117', formHeader: 'Application Forward' ,permission:"tta_evaluation_approved_by_admin.view"},
  {stage:'tta', tablename:'TTA Evaluation Change Request by Admin',name: 'tta_evaluation_change_req_by_admin', value: 'S118', formHeader: 'Upload Evaluation Report ',permission:"tta_evaluation_change_request_by_admin.view" },
  {stage:'tta', tablename:'TTA Closure Requested by BDM',name: 'tta_closure_requested_by_bdm', value: 'S119', formHeader: 'Closure Request' ,permission:"tta_closure_request_by_bdm.view"},
  {stage:'tta', tablename:'TTA Closed',name: 'tta_closed', value: 'S120', formHeader: 'Close TTA ',permission:"tta_close.view" },
  {stage:'tta', tablename:'TTA Evaluation Change Request by Client',name: 'tta_evaluation_change_req_by_client', value: 'S121', formHeader: 'Application Forward' ,permission:"tta_evaluation_change_request_by_client.view"},
  {stage:'tta', tablename:'TTA Evaluation Accepted by Client',name: 'tta_evaluation_accepted_by_client', value: 'S122', formHeader: 'Application Forward' ,permission:"tta_evaluation_accepted_by_client.view"},
  {stage:'tta', tablename:'TTA Strategy Assigned',name: 'tta_strategy_assigned', value: 'S123', formHeader: 'Application Forward',permission:"tta_strategy_assigned.view" },
  {stage:'tta', tablename:'TTA Strategy Uploaded by BDM',name: 'tta_strategy_uploaded_by_bdm', value: 'S124', formHeader: 'Application Forward',permission:"tta_strategy_uploaded_by_bdm.view" },
  {stage:'tta', tablename:'TTA Strategy Change Request by Admin',name: 'tta_strategy_change_req_by_admin', value: 'S125', formHeader: 'Update Strategy',permission:"tta_strategy_change_request_by_admin.view" },
  {stage:'tta', tablename:'TTA Tech Brief And Flyer Approved by Admin',name: 'tta_techb_and_flier_approved_by_admin', value: 'S126', formHeader: 'Application Forward',permission:"tta_techb_and_flier_approved_by_admin.view" },
  {stage:'tta', tablename:'TTA Tech Brief And Flyer Approved by Scientist',name: 'tta_techb_and_flier_approved_by_scientist', value: 'S127', formHeader: 'Application Forward',permission:"tta_techb_and_flier_approved_by_scientist.view" },
  {stage:'tta', tablename:'TTA Change Request by Scientist',name: 'tta_change_req_by_scientist', value: 'S128', formHeader: 'Application Forward',permission:"tta_change_req_by_scientist.view" },
  {stage:'tta', tablename:'Strategy Implemented',name: 'strategy_implemented', value: 'S129', formHeader: 'Application Forward',permission:"strategy_implemented.view" },
  {stage:'tta', tablename:'TTA Interest Received',name: 'tta_interest_received', value: 'S130', formHeader: 'Application Forward',permission:"tta_interest_received.view" },
  {stage:'tta', tablename:'No Interest Received',name: 'tta_no_interest_received', value: 'S131', formHeader: 'Application Forward',permission:"" },


//{stage:'tlp',tabelname: "Enter Lead", name: 'enter_lead', value: 'S130', forwordtitle: "Enter Lead", forward: "S132", forwardCheck: true, type: false, forwardText: 'Enter Lead', approvedvalue: '', backStatus: '', permissionforword: new commondata().CanviewTLP_EnterLead_forwordbutton_permission},

{stage:'tlp',tabelname: "Lead Entered by BDM",permission:"lead_entered_by_bdm.view", name: 'lead_entered_by_bdm', value: 'S130', forwordtitle: "Enter Company Profile ", forward: "S133", forwardCheck: true, type: false, forwardText: 'Enter Company Profile ', approvedvalue: '', backStatus: '', permissionforword: new commondata().CanviewTLP_Lead_Entered_by_bdm_forwordbutton_permission},
{stage:'tlp',tabelname: "Due Deligence Done",permission:"due_deligence_done.view", name: 'due_deligence_done', value: 'S133', backtitle: "Forward to BDM", forwardCheck: true, back: true, backStatus: "S134", forwordtitle: "Forward to LUF", forward: 'S135', approved: false, forwardText: "Approved", backbuttonText: 'Change Req', permissionback: new commondata().CanviewTLP_due_deligence_done_change_req_button_permission, permissionforword: new commondata().CanviewTLP_due_deligence_done_approve_button_permission},
{stage:'tlp',tabelname: "Due Deligence Change Request by Admin",permission:"due_deligence_change_req_by_admin.view", name: 'due_deligence_change_req_by_admin', value: 'S134', forwordtitle: "Update", forward: "S133", forwardCheck: true, type: false, forwardText: 'Update Due Deligence', approvedvalue: '', backStatus: '', permissionforword: new commondata().CanviewTLP_due_deligence_change_req_by_admin_forwordbutton_permission},

{stage:'tlp',tabelname: "Lead Approved by Admin",permission:"lead_approved_by_admin.view", name: 'lead_approved_by_admin', value: 'S135', forwordtitle: "Draft for NDA/PEA/MTA", forward: "S137", forwardCheck: true, forwardText: 'Draft for NDA/PEA/MTA', back: true, backStatus: "S136", backbuttonText: 'Share NCP', backtitle: "Share NCP", permissionforword: new commondata().CanviewTLP_lead_approved_by_admin_forwordbutton_permission, permissionback: new commondata().CanviewTLP_lead_approved_by_admin_forword2button_permission },
{stage:'tlp',tabelname: "NCP Shared",permission:"ncp_shared.view", name: 'ncp_shared', value: 'S136', forwardCheck: true, type: false, forward: "S146", forwordtitle: "Enter Termsheet", forwardText: "Draft Termsheet", permissionforword: true},

{stage:'tlp',tabelname: "NDA Request by LUF",permission:"nda_req_by_luf.view", name: 'nda_req_by_luf', value: 'S137', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S138", approvetitle: "Forward to N.O.", approvedvalue: 'S139', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: new commondata().CanviewTLP_nda_req_by_luf_change_req_button_permission, permissionapprove: new commondata().CanviewTLP_nda_req_by_luf_approve_button_permission },
{stage:'tlp',tabelname: "NDA Change Request by Admin",permission:"nda_change_req_by_Admin.view", name: 'nda_change_req_by_Admin', value: 'S138', forwordtitle: "Forward to Admin", forward: "S137", forwardCheck: true, type: false, forwardText: 'Update NDA/PEA', approvedvalue: '', backStatus: '', permissionforword: new commondata().CanviewTLP_nda_change_req_by_Admin_forwordbutton_permission },

{stage:'tlp',tabelname: "NDA Approved by Admin",permission:"nda_approved_by_Admin.view", name: 'nda_approved_by_Admin', value: 'S139', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S140", approvetitle: "Forward to N.O.", approvedvalue: 'S141', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: new commondata().CanviewTLP_nda_approved_by_Admin_change_req_button_permission, permissionapprove:new commondata().CanviewTLP_nda_approved_by_Admin_approve_button_permission },

{stage:'tlp',tabelname: "NDA Change Request by NO",permission:"nda_change_req_by_no.view", name: 'nda_change_req_by_no', value: 'S140', forwordtitle: "Change Request", forward: "S138", forwardCheck: true, type: false, forwardText: 'Change Request', approvedvalue: '', backStatus: '',permissionforword:new commondata().CanviewTLP_nda_change_req_by_no_change_req_button_permission},

{stage:'tlp',tabelname: "NDA Approved by NO",permission:"nda_approved_by_no.view", name: 'nda_approved_by_no', value: 'S141', backtitle: "Change Request", forwardCheck: false, back: true, backStatus: "S138", approvetitle: "Forward to N.O.", approvedvalue: 'S142', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: new commondata().CanviewTLP_nda_approved_by_no_change_req_button_permission, permissionapprove: new commondata().CanviewTLP_nda_approved_by_no_approve_button_permission },


{stage:'tlp',tabelname: "NDA Approved by Company",permission:"nda_approved_by_company.view", name: 'nda_approved_by_company', value: 'S142', forwordtitle: "Forward to LUF", forward: "S143", forwardCheck: true, type: false, forwardText: 'Upload Agreement', approvedvalue: '', backStatus: '', permissionforword: new commondata().CanviewTLP_nda_approved_by_company_forwordbutton_permission },

{stage:'tlp',tabelname: "NDA Executed",permission:"nda_executed.view", name: 'nda_executed', value: 'S143', forwordtitle: "Share NCP & CIP", forward: "S144", forwardCheck: true, forwardText: 'Share NCP & CIP', back: true, backStatus: "S145", backbuttonText: 'Share CIP', backtitle: "Share CIP", permissionforword: new commondata().CanviewTLP_nda_executed_forwordbutton_permission, permissionback: new commondata().CanviewTLP_nda_executed_forword2button_permission },
{stage:'tlp',tabelname: "NCP and CIP Shared",permission:"ncp_cip_shared.view", name: 'ncp_cip_shared', value: 'S144', forwardCheck: true, type: false, forward: "S146", forwordtitle: "Enter Termsheet", forwardText: "Draft Termsheet", permissionforword:true},
{stage:'tlp',tabelname: "CIP Shared",permission:"cip_shared.view", name: 'cip_shared', value: 'S145', forwardCheck: true, type: false, forward: "S146", forwordtitle: "Enter Termsheet", forwardText: "Draft Termsheet", permissionforword: true },


{stage:"ntts",tabelname: "TS Entered by LUF",permission:"tsentered_by_luf.view", name: 'ts_entered_by_luf', value: 'S146', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S147", approvetitle: "Forward to Nodal/Scientist", approvedvalue: 'S148', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },
{stage:"ntts",tabelname: "TS Change Request by Admin",permission:"tschange_request_by_admin.view", name: 'ts_change_req_by_admin', value: 'S147', forwordtitle: "Update Termsheet ", forward: "S146", forwardCheck: true, type: false, forwardText: 'Update Termsheet ', approvedvalue: '', backStatus: '', permissionforword: true },

{stage:"ntts",tabelname: "TS Approved by Admin",permission:"ts_approved_by_admin.view", name: 'ts_approved_by_admin', value: 'S148', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S149", approvetitle: "Forward to Admin", approvedvalue: 'S150', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },

{stage:"ntts",tabelname: "TS Change Request by Client",permission:"ts_change_request_by_client.view", name: 'ts_change_req_by_client', value: 'S149', forwordtitle: "Approve Change Request", forward: "S147", forwardCheck: true, type: false, forwardText: 'Approve Change Request in Termsheet ', approvedvalue: '', backStatus: '', permissionforword: true },

{stage:"ntts",tabelname: "TS Approved by Client",permission:"ts_approved_by_client.view", name: 'ts_approved_by_client', value: 'S150', forwordtitle: "Forward to Company ", forward: "S151", forwardCheck: true, type: false, forwardText: 'Forward', approvedvalue: '', backStatus: '', permissionforword: true },

{stage:"ntts",tabelname: "TS Shared By Company",permission:"ts_shared_by_company.view", name: 'ts_shared_with_company', value: 'S151', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S152", approvetitle: "Forward to Admin", approvedvalue: 'S153', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },
{stage:"ntts",tabelname: "TS Change Request by Company",permission:"ts_change_request_by_company.view", name: 'ts_change_req_by_company', value: 'S152', forwordtitle: "Approve Change Request", forward: "S147", forwardCheck: true, type: false, forwardText: 'Approve Change Request in Termsheet ', approvedvalue: '', backStatus: '', permissionforword: true },
{stage:"ntts",tabelname: "TS Approved by Company",permission:"ts_approved_by_company.view", name: 'ts_approved_by_company', value: 'S153', forwardCheck: true, type: false, forwardText: 'Upload Signed Termsheet ', forwordtitle: 'Upload Termsheet ', permissionforword: true, forward:'S154'},

{stage:"tstl",tabelname: "TS Executed",permission:"tsexecuted.view", name: 'ts_executed', value: 'S154', forwordtitle: "Draft license agreement", forward: "S155", forwardCheck: true, type: false, forwardText: 'Draft license agreement', approvedvalue: '', backStatus: '', permissionforword: true },

{stage:"tstl",tabelname: "LA Entered by LUF",permission:"la_entered_by_luf.view", name: 'la_entered_by_luf', value: 'S155', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S156", approvetitle: "Forward to Nodal/Scientist", approvedvalue: 'S157', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },

{stage:"tstl",tabelname: "LA Change Request by Admin",permission:"la_change_request_by_admin.view", name: 'la_change_req_by_admin', value: 'S156', forwordtitle: "Update license agreement", forward: "S155", forwardCheck: true, type: false, forwardText: 'Update license agreement', approvedvalue: '', backStatus: '', permissionforword: true },

{stage:"tstl",tabelname: "LA Approved by Admin",permission:"la_approved_by_admin.view", name: 'la_approved_by_admin', value: 'S157', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S158", approvetitle: "Forward to Admin", approvedvalue: 'S159', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },
{stage:"tstl",tabelname: "LA Change Request by Client",permission:"la_change_request_by_client.view", name: 'la_change_req_by_client', value: 'S158', forwordtitle: "Forword to LUF", forward: "S156", forwardCheck: true, type: false, forwardText: 'Forward Change Request', approvedvalue: '', backStatus: '', permissionforword: true },

{stage:"tstl",tabelname: "LA Approved by Client",permission:"la_approved_by_client.view", name: 'la_approved_by_client', value: 'S159', forwordtitle: "Share license agreement", forward: "S160", forwardCheck: true, type: false, forwardText: 'Share license agreement', approvedvalue: '', backStatus: '', permissionforword: true },

{stage:"tstl",tabelname: "LA shared with Company",permission:"la_shared_by_company.view", name: 'la_shared_with_company', value: 'S160', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S156", approvetitle: "Forward to BDM", approvedvalue: 'S161', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },

{stage:"tstl",tabelname: "LA Approved by Company",permission:"la_approved_by_company.view", name: 'la_approved_by_company', value: 'S161', forwordtitle: "Forward to Client", forward: "S162", forwardCheck: true, type: false, forwardText: 'Forward', approvedvalue: '', backStatus: '', permissionforword: true },

{stage:"tstl",tabelname: "LA Uploaded",permission:"la_uploaded.view", name: 'la_uploaded', value: 'S162', forwordtitle: "Forward to BDM", forward: "S163", forwardCheck: true, type: false, forwardText: 'Submit TT Docket', approvedvalue: '', backStatus: '', permissionforword: true },

{stage:"tstl",tabelname: "TT Docket by Client",permission:"tt_docket_by_client.view", name: 'tt_docket_by_client', value: 'S163', forwordtitle: "Forward to Company", forward: "S164", forwardCheck: true, type: false, forwardText: 'Share TT Docket', approvedvalue: '', backStatus: '', permissionforword: true },

{stage:"tstl",tabelname: "TT Docket shared with Company",permission:"tt_docket_shared_by_client.view", name: 'tt_docket_shared_with_company', value: 'S164',  forwardCheck: false, type: false, approvedvalue: '', backStatus: '' },



  


]
  }
}


export const moustatus1=[{status:'S101',permission:'mou_init.view'}
,{status:'S102',permission:"mou_pending.view"},{status:'S103',permission:'mou_change_req_by_admin.view'},
{status:'S104',permission:"mou_proposed_by_lm.view"},{status:'S105',permission:"agreementsigned.view"},
{status:'S106',permission:"mou_accepted_by_client.view"},{status:'S107',permission:"bdoassigned.view"},{status:'S108',permission:"tto_req_approved.view"},
{status:'S019',permission:"ip_manager_assigned.view"},{status:'S110',permission:"mou_proposed_by_admin_client.view"},
{status:'S111',permission:"mou_change_by_client.view"},{status:'S112',permission:""}];








 



 

