import { Component, OnInit } from '@angular/core';
import { activeusermou, mouModel } from 'src/app/model/mou.model';
import { Bdoservice } from '../../services/bdo.service';
import { AccountService } from '../../services/account.service';
import { Permission } from 'src/app/model/permission.model';


@Component({
  selector: 'app-tstl-dashboard',
  templateUrl: './tstl-dashboard.component.html',
  styleUrls: ['./tstl-dashboard.component.scss']
})
export class TstlDashboardComponent implements OnInit {

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

    this.isLUF = this.userRoles.includes('LUF');
    this.isSuperAdmin = this.userRoles.includes('Super Admin');
    this.isScientist = this.userRoles.includes('Scientist');
    this.isCompany = this.userRoles.includes('Company');
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

  clientListFilter() {
    return this.mouModel?.filter(x => x.app_Status == 'S144' || x.app_Status == 'S145' || x.app_Status == 'S136').length;
  }


  get canview_TS_executed_permission() {
    return this.accountService.userHasPermission(Permission.view_TS_executed_permission);
  }
  get can_view_LA_entered_by_luf_permission() {
    return this.accountService.userHasPermission(Permission.view_LA_entered_by_luf_permission);
  }
  get can_view_LA_change_request_by_admin_permission() {
    return this.accountService.userHasPermission(Permission.view_LA_change_request_by_admin_permission);
  }
   get canview_LA_approved_by_admin_permission() {
    return this.accountService.userHasPermission(Permission.view_LA_approved_by_admin_permission);
  }
  get canview_LA_change_request_by_client_permission() {
    return this.accountService.userHasPermission(Permission.view_LA_change_request_by_client_permission);
  }
  get canview_LA_approved_by_client_permission() {
    return this.accountService.userHasPermission(Permission.view_LA_approved_by_client_permission);
  }
  get canview_LA_shared_by_company_permission() {
    return this.accountService.userHasPermission(Permission.view_LA_shared_by_company_permission);
  }
  get canview_LA_approved_by_company_permission() {
    return this.accountService.userHasPermission(Permission.view_LA_approved_by_company_permission);
  }
  get canview_LA_uploaded_permission() {
    return this.accountService.userHasPermission(Permission.view_LA_uploaded_permission);
  }
  get canview_TT_docket_by_client_permission() {
    return this.accountService.userHasPermission(Permission.view_TT_docket_by_client_permission);
  }
  get canview_TT_docket_shared_by_client_permission() {
    return this.accountService.userHasPermission(Permission.view_TT_docket_shared_by_client_permission);
  }
  
}
