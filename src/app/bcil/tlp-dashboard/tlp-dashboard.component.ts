import { Component, OnInit } from '@angular/core';
import { activeusermou, mouModel } from 'src/app/model/mou.model';
import { Bdoservice } from '../../services/bdo.service';
import { AccountService } from '../../services/account.service';
import { Permission } from 'src/app/model/permission.model';

@Component({
  selector: 'app-tlp-dashboard',
  templateUrl: './tlp-dashboard.component.html',
  styleUrls: ['./tlp-dashboard.component.scss']
})
export class TlpDashboardComponent implements OnInit {
  mouModel: mouModel[];
  showpage = false;
  UserEmail: string;
  userRoles: string[];
  isNodal: boolean;
  isLM: boolean;
  isAdmin: boolean;
  isBDM: boolean;
  isIPM: boolean;
  UserId: string;
  isScientist: boolean;
  isSuperAdmin:boolean;
  isLUF: boolean;
  isCompany: boolean;
  activeusermou:activeusermou[];
  constructor(private Bdoservice: Bdoservice, private accountService: AccountService,) {
    this.UserEmail = this.accountService.currentUser.email;
    this.userRoles = this.accountService.currentUser.roles;
    this.UserId = this.accountService.currentUser.id;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBDM = this.userRoles.includes('BDM');
    this.isIPM = this.userRoles.includes('IPM');
    this.isNodal = this.userRoles.includes('Nodal');
    this.isLUF = this.userRoles.includes('LUF');
    this.isScientist = this.userRoles.includes('Scientist');
    this.isCompany = this.userRoles.includes('Company');
    this.isSuperAdmin=this.userRoles.includes('Super Admin');
  }

  ngOnInit(): void {
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      this.mouModel = data;
      this.showpage = true;
    })
  });
  }

  clientMouListFilter(data) {
    if(this.isSuperAdmin){
      return this.mouModel?.filter(x=>x.app_Status==data).length;
    }
    
    else{
      return this.mouModel?.filter(x=>x.app_Status==data && this.activeusermou?.find(t=>t.mouref==x.refid)).length;
    }
    // if (this.isNodal == true) {
    //   return this.mouModel?.filter(x => x.nodal_Email == this.UserEmail && x.app_Status == data).length;
    // }
    // else if (this.isAdmin) {


    //   return this.mouModel?.filter(x => x.app_Status == data && x.assigntoadmin == this.UserId).length;


    // }
    // else if (this.isBDM || this.isIPM) {
    //   return this.mouModel?.filter(x => x.app_Status == data && x.createdBy == this.UserId).length;

    // }
    // else if (this.isLUF == true) {
    //   return this.mouModel?.filter(x => x.app_Status == data && x.assigntoluf == this.UserId).length;
    // }
    // else if (this.isCompany == true) {
    //   return this.mouModel?.filter(x => x.app_Status == data && x.assigntocompany == this.UserId).length;
    // }

    // else if (this.isScientist == true) {
    //   return this.mouModel?.filter(x => x.app_Status == data && x.assigntoscientist == this.UserId).length;
    // }
    // else {
    //   return this.mouModel?.filter(x => x.app_Status == data).length;
    // }

  }
  get canViewEnterLead() {
    return this.accountService.userHasPermission(Permission.viewTLP_EnterLead);
  }

  get canViewLead_Entered_by_bdm() {
    return this.accountService.userHasPermission(Permission.viewTLP_Lead_Entered_by_bdm);
  }
  get canView_due_deligence_done() {
    return this.accountService.userHasPermission(Permission.viewTLP_due_deligence_done);
  }

  get canView_due_deligence_change_req_by_admin() {
    return this.accountService.userHasPermission(Permission.viewTLP_due_deligence_change_req_by_admin);
  }

  get canView_lead_approved_by_admin() {
    return this.accountService.userHasPermission(Permission.viewTLP_lead_approved_by_admin);
  }

  get canView_ncp_shared() {
    return this.accountService.userHasPermission(Permission.viewTLP_ncp_shared);
  }

  get canView_nda_req_by_luf() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_req_by_luf);
  }

  get canView_nda_change_req_by_Admin() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_change_req_by_Admin);
  }

  get canView_nda_approved_by_Admin() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_approved_by_Admin);
  }

  get canView_nda_change_req_by_no() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_change_req_by_no);
  }

  get canView_nda_approved_by_no() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_approved_by_no);
  }
  get canView_nda_approved_by_company() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_approved_by_company);
  }

  get canView_nda_executed() {
    return this.accountService.userHasPermission(Permission.viewTLP_nda_executed);
  }

  get canView_ncp_cip_shared() {
    return this.accountService.userHasPermission(Permission.viewTLP_ncp_cip_shared);
  }

  get canView_cip_shared() {
    return this.accountService.userHasPermission(Permission.viewTLP_cip_shared);
  }

}
