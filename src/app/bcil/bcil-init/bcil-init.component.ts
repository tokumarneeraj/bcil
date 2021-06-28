import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {mouModel} from '../../model/mou.model';
import {Bdoservice} from '../../services/bdo.service'

@Component({
  selector: 'app-bcil-init',
  templateUrl: './bcil-init.component.html',
  styleUrls: ['./bcil-init.component.css']
})
export class BcilInitComponent implements OnInit {
mouModel:mouModel[];
showpage=false;
type:string;
closeResult = '';

  constructor(private route:ActivatedRoute,private Bdoservice:Bdoservice) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params)=>{
this.type=params.type;
    })
    this.Bdoservice.GetMou().subscribe(data=>{console.log(data)
      this.mouModel=data.filter(x=>x.app_status=='S101');
      this.showpage=true;
      })
  }

}
