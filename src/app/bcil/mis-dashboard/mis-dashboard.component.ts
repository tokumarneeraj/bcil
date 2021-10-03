import { analyzeAndValidateNgModules, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { Bdoservice } from 'src/app/services/bdo.service';


@Component({
  selector: 'app-mis-dashboard',
  templateUrl: './mis-dashboard.component.html',
  styleUrls: ['./mis-dashboard.component.scss']
})
export class MisDashboardComponent implements OnInit {
  misdata:any;
  viewtab:any;
  commondata=new commondata();
  constructor(private bdoservice:Bdoservice,private router:Router) { }

  ngOnInit(): void {

   
    this.viewtab=this.commondata.getotherpermissiondata('view').map((item)=>(item.split('-')[1]));
    this.bdoservice.getdatapermission().subscribe(data=>{
      console.log(data);
      this.misdata=data?.mis?.filter(x=>this.viewtab.find(y=>y==x.value));

    })
  }

  queryparam(data:any){
    this.router.navigate(['./bcil/bcil-mis-table'], { queryParams: { type: data} });
  // return  '{type:'+data+'}'
  }

}
