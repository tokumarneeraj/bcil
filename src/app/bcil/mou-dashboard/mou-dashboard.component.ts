import { Component, OnInit } from '@angular/core';
import { activeusermou, mouModel } from 'src/app/model/mou.model';
import { Bdoservice } from '../../services/bdo.service';
import { AccountService } from '../../services/account.service';
import { Permission } from 'src/app/model/permission.model';
import {commondata} from '../../model/common'
@Component({
  selector: 'app-mou-dashboard',
  templateUrl: './mou-dashboard.component.html',
  styleUrls: ['./mou-dashboard.component.css']
})
export class MouDashboardComponent implements OnInit {

  mouModel: mouModel[];
  showpage = false;
  isLM: boolean;
  isAdmin:boolean;
  isBDM: boolean;
  isIPM:boolean;
  isSuperAdmin:boolean;
  userRoles: string[];
  UserId: string;
commondata=new commondata();
activeusermou:activeusermou[];
  // usertype:string;
  // UserName:string;
  constructor(private Bdoservice: Bdoservice, private accountService: AccountService) {

    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBDM = this.userRoles.includes('BDM');
    this.isIPM = this.userRoles.includes('IPM');
  this.isSuperAdmin=this.userRoles.includes('Super Admin');
  }

 

  get canviewMou_initPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_initPermission);
  }
  get canviewMou_pendingPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_pendingPermission);
  }
  get canviewMou_proposed_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_proposed_by_adminPermission);
  }
  get canviewMou_change_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_change_req_by_adminPermission);
  }

  get canviewMou_change_by_clientPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_change_req_by_clientPermission);
  }
  get canviewMou_proposed_by_lmPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_proposed_by_lmPermission);
  }
  get canviewMou_accepted_by_clientPermission() {
    return this.accountService.userHasPermission(Permission.viewMou_accepted_by_clientPermission);
  }
  get canviewagreementsignedPermission() {
    return this.accountService.userHasPermission(Permission.viewagreementsignedPermission);
  }
  get canviewbdoassignedPermission() {
    return this.accountService.userHasPermission(Permission.viewbdoassignedPermission);
  }
  get canviewtto_required_aproved_Permission() {
    return this.accountService.userHasPermission(Permission.viewtto_required_aproved_Permission);
  }
  get canviewip_manager_assignedPermission() {
    return this.accountService.userHasPermission(Permission.viewip_manager_assignedPermission);
  }


  ngOnInit(): void {
    debugger;
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      this.mouModel = data;
      this.showpage = true;
    })
  });
  }
  get CanaddMouPermission() {
    return this.accountService.userHasPermission(Permission.addMouPermission);
  }

  cardname(data){
return this.commondata.moustatus().find(x=>x.value==data)?.tabelname;
  }
  moulistfilter(data) {
    if(this.isSuperAdmin){
      return this.mouModel?.filter(x=>x.app_Status==data).length;
    }
    else if(this.isAdmin){
   return this.mouModel?.filter(x=>x.app_Status==data &&(x.app_Status=='S101'|| this.activeusermou?.find(t=>t.mouref==x.refid))).length;
    }
    else{
      return this.mouModel?.filter(x=>x.app_Status==data && this.activeusermou?.find(t=>t.mouref==x.refid)).length;
    }
    // else if(this.isAdmin){
     

    //     return this.mouModel?.filter(x => x.app_Status == data &&  x.assigntoadmin==this.UserId).length;//&& x.assignto==this.UserId
  
      
// if(this.isSuperAdmin){
//   return this.mouModel?.filter(x => x.app_Status == data).length;//&& x.assignto==this.UserId
  
// }
//      else if(this.isBDM ||this.isIPM){
//       return this.mouModel?.filter(x => x.app_Status == data &&  x.createdBy==this.UserId).length;//&& x.assignto==this.UserId
  

//     }
//    else {

//       console.log(this.mouModel?.filter(x => x.app_Status == data).length)
//       return this.mouModel?.filter(x => (x.app_Status == data) && (x.createdBy==this.UserId ||  x.assigntoadmin==this.UserId||
//         x.assignto==this.UserId || x.app_Status=='S101'
//         )).length;
//     //}

//   }
}

}
