import { Component, OnInit } from '@angular/core';
import { activeusermou, mouModel } from 'src/app/model/mou.model';
import { Bdoservice } from '../../services/bdo.service';
import { AccountService } from '../../services/account.service';
import { Permission } from 'src/app/model/permission.model';


@Component({
  selector: 'app-nttsa-dashboard',
  templateUrl: './nttsa-dashboard.component.html',
  styleUrls: ['./nttsa-dashboard.component.scss']
})
export class NttsaDashboardComponent implements OnInit {
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
  isLUF: boolean;
  isSuperAdmin:boolean;
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

  clientListFilter() {
    return this.mouModel?.filter(x => x.app_Status == 'S144' || x.app_Status == 'S145' || x.app_Status == 'S136').length;
  }

  get canview_TS_entered_by_luf_permission() {
    return this.accountService.userHasPermission(Permission.view_TS_entered_by_luf_permission);
  }
  get canview_TS_change_request_by_admin_permission() {
    return this.accountService.userHasPermission(Permission.view_TS_change_request_by_admin_permission);
  }
  get canview_TS_approved_by_admin_permission() {
    return this.accountService.userHasPermission(Permission.view_TS_approved_by_admin_permission);
  }
  get canview_TS_change_request_by_client_permission() {
    return this.accountService.userHasPermission(Permission.view_TS_change_request_by_client_permission);
  }
  get canview_TS_approved_by_client_permission() {
    return this.accountService.userHasPermission(Permission.view_TS_approved_by_client_permission);
  }
  get canview_TS_shared_by_company_permission() {
    return this.accountService.userHasPermission(Permission.view_TS_shared_by_company_permission);
  }
  get canview_TS_change_requesy_by_company_permission() {
    return this.accountService.userHasPermission(Permission.view_TS_change_requesy_by_company_permission);
  }
  get canview_TS_approved_by_company_permission() {
    return this.accountService.userHasPermission(Permission.view_TS_approved_by_company_permission);
  }
}
