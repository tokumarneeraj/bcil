import { Component, OnInit } from '@angular/core';
import { mouModel } from 'src/app/model/mou.model';
import { Bdoservice } from '../../services/bdo.service';
import { AccountService } from '../../services/account.service';

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
  constructor(private Bdoservice: Bdoservice, private accountService: AccountService,) {
    this.UserEmail = this.accountService.currentUser.email;
    this.userRoles = this.accountService.currentUser.roles;
  }

  ngOnInit(): void {

    this.isNodal=this.userRoles.includes('Nodal');

    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      this.mouModel = data;
      this.showpage = true;
    })
  }




  // for client
  clientMouListFilter(data) {

    if (this.isNodal == true) {
      return this.mouModel?.filter(x => x.nodal_Email == this.UserEmail && x.app_Status == data).length;
    }
    else {
      return this.mouModel?.filter(x => x.app_Status == data).length;
    }
  }
 
  //-------

}
