import { Component, OnInit } from '@angular/core';
import { mouModel } from 'src/app/model/mou.model';
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
  constructor(private Bdoservice: Bdoservice, private accountService: AccountService,) {
    this.UserEmail = this.accountService.currentUser.email;
    this.userRoles = this.accountService.currentUser.roles;
  }

  ngOnInit(): void {
    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      this.mouModel = data;
      this.showpage = true;
    })
  }

  clientMouListFilter(data) {

    if (this.isNodal == true) {
      return this.mouModel?.filter(x => x.nodal_Email == this.UserEmail && x.app_Status == data).length;
    }
    else {
      return this.mouModel?.filter(x => x.app_Status == data).length;
    }
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
