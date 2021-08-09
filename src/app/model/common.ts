export const moustatus=[{status:'S101',permission:'mou_init.view'}
,{status:'S102',permission:"mou_pending.view"},{status:'S103',permission:'mou_change_req_by_admin.view'},
{status:'S104',permission:"mou_proposed_by_lm.view"},{status:'S105',permission:"agreementsigned.view"},
{status:'S106',permission:"mou_accepted_by_client.view"},{status:'S107',permission:"bdoassigned.view"},{status:'S108',permission:"tto_req_approved.view"},
{status:'S019',permission:"ip_manager_assigned.view"},{status:'S110',permission:"mou_proposed_by_admin_client.view"},
{status:'S111',permission:"mou_change_by_client.view"},{status:'S112',permission:""}];





export const ttaarray = [
    {tablename:'', name: 'ViewMouAll', value: 'S108', formHeader: 'Assignment and Tech. Disclosure Form',permission:"tto_req_approved.view" },
    { tablename:'TTA INIT',name: 'tta_init', value: 'S113', formHeader: 'Assign to BDM',permission:"tta_init.view" },
    { tablename:'TTA Evaluation Assigned',name: 'tta_evaluation_assigned', value: 'S114', formHeader: 'Upload Evaluation Report',permission:"tta_evaluation_assigned.view" },
    { tablename:'TTA Evaluation Uploaded by BDM',name: 'tta_evaluation_uploaded_by_bdm', value: 'S115', formHeader: 'Application Forward',permission:"tta_evaluation_upload_by_bdm.view" },
    { tablename:'TTA Evaluation Closure by Admin',name: 'tta_evaluation_closure_by_admin', value: 'S116', formHeader: 'Close TTA',permission:"tta_evaluation_closure_by_admin.view" },
    { tablename:'TTA Evaluation Approved by Admin',name: 'tta_evaluation_approved_by_admin', value: 'S117', formHeader: 'Application Forward' ,permission:"tta_evaluation_approved_by_admin.view"},
    { tablename:'TTA Evaluation Change Request by Admin',name: 'tta_evaluation_change_req_by_admin', value: 'S118', formHeader: 'Upload Evaluation Report ',permission:"tta_evaluation_change_request_by_admin.view" },
    { tablename:'TTA Closure Requested by BDM',name: 'tta_closure_requested_by_bdm', value: 'S119', formHeader: 'Closure Request' ,permission:"tta_closure_request_by_bdm.view"},
    { tablename:'TTA Closed',name: 'tta_closed', value: 'S120', formHeader: 'Close TTA ',permission:"tta_close.view" },
    { tablename:'TTA Evaluation Change Request by Client',name: 'tta_evaluation_change_req_by_client', value: 'S121', formHeader: 'Application Forward' ,permission:"tta_evaluation_change_request_by_client.view"},
    { tablename:'TTA Evaluation Accepted by Client',name: 'tta_evaluation_accepted_by_client', value: 'S122', formHeader: 'Application Forward' ,permission:"tta_evaluation_accepted_by_client.view"},
    { tablename:'TTA Strategy Assigned',name: 'tta_strategy_assigned', value: 'S123', formHeader: 'Application Forward',permission:"tta_strategy_assigned.view" },
    { tablename:'TTA Strategy Uploaded by BDM',name: 'tta_strategy_uploaded_by_bdm', value: 'S124', formHeader: 'Application Forward',permission:"tta_strategy_uploaded_by_bdm.view" },
    { tablename:'TTA Strategy Change Request by Admin',name: 'tta_strategy_change_req_by_admin', value: 'S125', formHeader: 'Update Strategy',permission:"tta_strategy_change_request_by_admin.view" },
    { tablename:'TTA Techb And Flier Approved by Admin',name: 'tta_techb_and_flier_approved_by_admin', value: 'S126', formHeader: 'Application Forward',permission:"tta_techb_and_flier_approved_by_admin.view" },
    { tablename:'TTA Techb And Flier Approved by Scientist',name: 'tta_techb_and_flier_approved_by_scientist', value: 'S127', formHeader: 'Application Forward',permission:"tta_techb_and_flier_approved_by_scientist.view" },
    { tablename:'TTA Change Req by Scientist',name: 'tta_change_req_by_scientist', value: 'S128', formHeader: 'Application Forward',permission:"tta_change_req_by_scientist.view" },
    { tablename:'Strategy Implemented',name: 'strategy_implemented', value: 'S129', formHeader: 'Application Forward',permission:"strategy_implemented.view" },
    { tablename:'TTA Interest Received',name: 'tta_interest_received', value: 'S130', formHeader: 'Application Forward',permission:"tta_interest_received.view" },
    { tablename:'NO INTEREST RECEIVED',name: 'no_interest_received', value: 'S131', formHeader: 'Application Forward',permission:"" },
{value:"S132",permission:"lead_entered_by_bdm.view"}
,{value:"S133",permission:"due_deligence_done.view"}
,{value:"S134",permission:"due_deligence_change_req_by_admin.view"}
,{value:"S135",permission:"lead_approved_by_admin.view"}
,{value:"S136",permission:"ncp_shared.view"}
,{value:"S137",permission:"nda_req_by_luf.view"}
,{value:"S138",permission:"nda_change_req_by_Admin.view"}
,{value:"S139",permission:"nda_approved_by_Admin.view"}
,{value:"S140",permission:"nda_change_req_by_no.view"}
,{value:"S141",permission:"nda_approved_by_no.view"}
,{value:"S142",permission:"nda_approved_by_company.view"}
,{value:"S143",permission:"nda_executed.view"}
,{value:"S144",permission:"ncp_cip_shared.view"}
,{value:"S145",permission:"cip_shared.view"},
{ tabelname: "TS Entered by LUF",permission:"enter_lead", name: 'ts_entered_by_luf', value: 'S146', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S147", approvetitle: "Forward to Nodal/Scientist", approvedvalue: 'S148', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },
{ tabelname: "TS Change Request by Admin",permission:"cip_shared", name: 'ts_change_req_by_admin', value: 'S147', forwordtitle: "Update Termsheet ", forward: "S146", forwardCheck: true, type: false, forwardText: 'Update Termsheet ', approvedvalue: '', backStatus: '', permissionforword: true },

{ tabelname: "TS Approved by Admin",permission:"", name: 'ts_approved_by_admin', value: 'S148', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S149", approvetitle: "Forward to Admin", approvedvalue: 'S150', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },

{ tabelname: "TS Change Request by Client",permission:"", name: 'ts_change_req_by_client', value: 'S149', forwordtitle: "Approve Change Request", forward: "S147", forwardCheck: true, type: false, forwardText: 'Approve Change Request in Termsheet ', approvedvalue: '', backStatus: '', permissionforword: true },

{ tabelname: "TS Approved by Client",permission:"", name: 'ts_approved_by_client', value: 'S150', forwordtitle: "Forward to Company ", forward: "S151", forwardCheck: true, type: false, forwardText: 'Forward', approvedvalue: '', backStatus: '', permissionforword: true },

{ tabelname: "TS Entered by LUF",permission:"", name: 'ts_shared_with_company', value: 'S151', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S152", approvetitle: "Forward to Admin", approvedvalue: 'S153', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },
{ tabelname: "TS Change Request by Company",permission:"", name: 'ts_change_req_by_company', value: 'S152', forwordtitle: "Approve Change Request", forward: "S147", forwardCheck: true, type: false, forwardText: 'Approve Change Request in Termsheet ', approvedvalue: '', backStatus: '', permissionforword: true },
{ tabelname: "TS Approved by Company",permission:"", name: 'ts_approved_by_company', value: 'S153', forwardCheck: true, type: false, forwardText: 'Upload Signed Termsheet ', forwordtitle: 'Upload Termsheet ', permissionforword: true, forward:'S154'},

{ tabelname: "TS Executed",permission:"", name: 'ts_executed', value: 'S154', forwordtitle: "Draft license agreement", forward: "S155", forwardCheck: true, type: false, forwardText: 'Draft license agreement', approvedvalue: '', backStatus: '', permissionforword: true },

{ tabelname: "LA Entered by LUF",permission:"", name: 'la_entered_by_luf', value: 'S155', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S156", approvetitle: "Forward to Nodal/Scientist", approvedvalue: 'S157', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },

{ tabelname: "LA Change Request by Admin",permission:"", name: 'la_change_req_by_admin', value: 'S156', forwordtitle: "Update license agreement", forward: "S155", forwardCheck: true, type: false, forwardText: 'Update license agreement', approvedvalue: '', backStatus: '', permissionforword: true },

{ tabelname: "LA Approved by Admin",permission:"", name: 'la_approved_by_admin', value: 'S157', backtitle: "Forward to Admin", forwardCheck: false, back: true, backStatus: "S158", approvetitle: "Forward to Admin", approvedvalue: 'S159', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },
{ tabelname: "LA Change Request by Client",permission:"", name: 'la_change_req_by_client', value: 'S158', forwordtitle: "Forword to LUF", forward: "S156", forwardCheck: true, type: false, forwardText: 'Forward Change Request', approvedvalue: '', backStatus: '', permissionforword: true },

{ tabelname: "LA Approved by Client",permission:"", name: 'la_approved_by_client', value: 'S159', forwordtitle: "Share license agreement", forward: "S160", forwardCheck: true, type: false, forwardText: 'Share license agreement', approvedvalue: '', backStatus: '', permissionforword: true },

{ tabelname: "LA shared with Company",permission:"", name: 'la_shared_with_company', value: 'S160', backtitle: "Forward to LUF", forwardCheck: false, back: true, backStatus: "S156", approvetitle: "Forward to BDM", approvedvalue: 'S161', approved: true, approvedText: "Approved", backbuttonText: 'Change Req', permissionback: true, permissionapprove: true },

{ tabelname: "LA Approved by Company",permission:"", name: 'la_approved_by_company', value: 'S161', forwordtitle: "Forward to Client", forward: "S162", forwardCheck: true, type: false, forwardText: 'Forward', approvedvalue: '', backStatus: '', permissionforword: true },

{ tabelname: "LA Uploaded",permission:"", name: 'la_uploaded', value: 'S162', forwordtitle: "Forward to BDM", forward: "S163", forwardCheck: true, type: false, forwardText: 'Submit TT Docket', approvedvalue: '', backStatus: '', permissionforword: true },

{ tabelname: "TT Docket by Client",permission:"", name: 'tt_docket_by_client', value: 'S163', forwordtitle: "Forward to Company", forward: "S164", forwardCheck: true, type: false, forwardText: 'Share TT Docket', approvedvalue: '', backStatus: '', permissionforword: true },

{ tabelname: "TT Docket shared with Company",permission:"", name: 'tt_docket_shared_with_company', value: 'S164',  forwardCheck: false, type: false, approvedvalue: '', backStatus: '' },



    


  ]


