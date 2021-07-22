import { Component, OnInit } from '@angular/core';
import { mouModel } from 'src/app/model/mou.model';
import { Bdoservice } from '../../services/bdo.service';
import { AccountService } from '../../services/account.service';
import { Permission } from 'src/app/model/permission.model';

@Component({
  selector: 'app-mou-dashboard',
  templateUrl: './mou-dashboard.component.html',
  styleUrls: ['./mou-dashboard.component.css']
})
export class MouDashboardComponent implements OnInit {

  mouModel: mouModel[];
  showpage = false;
  isLM: boolean;
  userRoles: string[];
  UserId: string;

  // usertype:string;
  // UserName:string;
  constructor(private Bdoservice: Bdoservice, private accountService: AccountService) {

    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;

    this.isLM = this.userRoles.includes('LM');
  }

  ngOnInit(): void {
    debugger;

    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      this.mouModel = data;
      this.showpage = true;
    })
  }
  get CanaddMouPermission() {
    return this.accountService.userHasPermission(Permission.addMouPermission);
  }
  moulistfilter(data) {
    if (this.isLM) {

      return this.mouModel?.filter(x => x.app_Status == data && x.assignto==this.UserId).length;

    }
    else {
      console.log(this.mouModel?.filter(x => x.app_Status == data).length)
      return this.mouModel?.filter(x => x.app_Status == data).length;
    }

  }

}
