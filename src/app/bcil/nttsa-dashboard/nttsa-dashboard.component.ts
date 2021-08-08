import { Component, OnInit } from '@angular/core';
import { mouModel } from 'src/app/model/mou.model';
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

  constructor(private Bdoservice: Bdoservice, private accountService: AccountService,) {
    this.UserEmail = this.accountService.currentUser.email;
    this.userRoles = this.accountService.currentUser.roles;
    this.UserId = this.accountService.currentUser.id;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBDM = this.userRoles.includes('BDM');
    this.isIPM = this.userRoles.includes('IPM');
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
    else if (this.isAdmin) {


      return this.mouModel?.filter(x => x.app_Status == data && x.assigntoadmin == this.UserId).length;


    }
    else if (this.isBDM || this.isIPM) {
      return this.mouModel?.filter(x => x.app_Status == data && x.createdBy == this.UserId).length;

    }
    else {
      return this.mouModel?.filter(x => x.app_Status == data).length;
    }
  }

  clientListFilter() {
    return this.mouModel?.filter(x => x.app_Status == 'S144' || x.app_Status == 'S145' || x.app_Status == 'S136').length;
  }
}
