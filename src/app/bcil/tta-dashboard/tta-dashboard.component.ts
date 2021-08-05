import { Component, OnInit } from '@angular/core';
import { mouModel } from 'src/app/model/mou.model';
import { Bdoservice } from '../../services/bdo.service';
import { AccountService } from '../../services/account.service';
import { Permission } from 'src/app/model/permission.model';

@Component({
  selector: 'app-tta-dashboard',
  templateUrl: './tta-dashboard.component.html',
  styleUrls: ['./tta-dashboard.component.css']
})
export class TtaDashboardComponent implements OnInit {
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

  tlpstatus = ['S130', 'S132', 'S133', 'S134', 'S135', 'S136', 'S137', 'S138', 'S139', 'S140', 'S141', 'S142', 'S143', 'S144', 'S145'];
  nttsastatus = ['S146', 'S147', 'S148', 'S149', 'S150', 'S151', 'S152', 'S153'];
  constructor(private Bdoservice: Bdoservice, private accountService: AccountService,) {
    this.UserEmail = this.accountService.currentUser.email;
    this.userRoles = this.accountService.currentUser.roles;
    this.UserId = this.accountService.currentUser.id;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBDM = this.userRoles.includes('BDM');
    this.isIPM = this.userRoles.includes('IPM');
  }

  get canviewTta_initPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_initPermission);
  }
  get canviewTta_evaluation_assignedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_assignedPermission);
  }
  get canviewTta_evaluation_upload_by_bdmPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_upload_by_bdmPermission);
  }
  get canviewTta_evaluation_closure_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_closure_by_adminPermission);
  }
  get canviewTta_evaluation_approved_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_approved_by_adminPermission);
  }
  get canviewTta_evaluation_change_request_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_change_request_by_adminPermission);
  }
  get canviewTta_Closure_request_by_bdmPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_Closure_request_by_bdmPermission);
  }
  get canviewTta_closePermission() {
    return this.accountService.userHasPermission(Permission.viewTta_closePermission);
  }
  get canviewTta_evaluation_change_request_by_clientPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_change_request_by_clientPermission);
  }
  get canviewTta_evaluation_accepted_by_clientPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_accepted_by_clientPermission);
  }

  
  get canviewTta_strategy_assignedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_strategy_assignedPermission);
  }
  get canviewTta_strategy_uploaded_by_bdmPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_strategy_uploaded_by_bdmPermission);
  }
  get canviewtta_strategy_change_request_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewtta_strategy_change_request_by_adminPermission);
  }
  get canviewTta_techb_and_flier_approved_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_techb_and_flier_approved_by_adminPermission);
  }
  get canviewTta_techb_and_flier_approved_by_scientistPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_techb_and_flier_approved_by_scientistPermission);
  }
  get canviewTta_chnage_req_by_scientistPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_change_req_by_scientistPermission);
  }
  get canviewstartegy_implementedPermission() {
    return this.accountService.userHasPermission(Permission.viewstartegy_implementedPermission);
  }
  get canviewTta_interest_receivedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_interest_receivedPermission);
  }
  
  get canViewTlp() {
    return this.accountService.userHasPermission(Permission.viewTechnologyLeadPermission);
  }

  tlplist() {
    console.log(this.mouModel?.filter(x => !this.tlpstatus.includes(x.app_Status)).length)
    return this.mouModel?.filter(x => this.tlpstatus.includes(x.app_Status)).length;
  }

  nttsalist() {
    console.log(this.mouModel?.filter(x => !this.nttsastatus.includes(x.app_Status)).length)
    return this.mouModel?.filter(x => this.nttsastatus.includes(x.app_Status)).length;
  }
  
  ngOnInit(): void {

    this.isNodal=this.userRoles.includes('Nodal');

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
    else if (this.isAdmin) {


      return this.mouModel?.filter(x => x.app_Status == data && x.assigntoadmin == this.UserId).length;


    }
     else if(this.isBDM ||this.isIPM){
       return this.mouModel?.filter(x => x.app_Status == data &&  x.createdBy==this.UserId).length;

     }
    else {
      return this.mouModel?.filter(x => x.app_Status == data).length;
    }
  }
 
  

}
