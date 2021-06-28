import { Component, OnInit } from '@angular/core';
import {Bdoservice} from '../../services/bdo.service'
import {mouModel} from '../../model/mou.model';
@Component({
  selector: 'app-bcil-dashboard',
  templateUrl: './bcil-dashboard.component.html',
  styleUrls: ['./bcil-dashboard.component.css']
})
export class BcilDashboardComponent implements OnInit {

  mouModel:mouModel[];
  showpage=false;
  constructor(private Bdoservice:Bdoservice) { }

  ngOnInit(): void {

    this.Bdoservice.GetMou().subscribe(data=>{console.log(data)
    this.mouModel=data;
    this.showpage=true;
    })
  }

moulistfilter(data){

 return this.mouModel?.filter(x=>x.app_status==data).length;
}

}
