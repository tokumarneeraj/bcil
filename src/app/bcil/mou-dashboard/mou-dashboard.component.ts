import { Component, OnInit } from '@angular/core';
import { mouModel } from 'src/app/model/mou.model';
import {Bdoservice} from '../../services/bdo.service'

@Component({
  selector: 'app-mou-dashboard',
  templateUrl: './mou-dashboard.component.html',
  styleUrls: ['./mou-dashboard.component.css']
})
export class MouDashboardComponent implements OnInit {

  mouModel:mouModel[];
  showpage=false;
  // usertype:string;
  // UserName:string;
  constructor(private Bdoservice:Bdoservice) {
    // this.usertype=this._cookieService.get("UserType");
    // this.UserName=this._cookieService.get("UserName");
   }

  ngOnInit(): void {
    debugger;

    this.Bdoservice.GetMou().subscribe(data=>{console.log(data)
    this.mouModel=data;
    this.showpage=true;
    })
  }

moulistfilter(data){
  console.log(this.mouModel?.filter(x=>x.app_Status==data).length)
 return this.mouModel?.filter(x=>x.app_Status==data).length;
}

}
