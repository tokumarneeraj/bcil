import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bdoservice } from 'src/app/services/bdo.service';

@Component({
  selector: 'app-mis-init',
  templateUrl: './mis-init.component.html',
  styleUrls: ['./mis-init.component.scss']
})
export class MisInitComponent implements OnInit {
  showpage:boolean;
  misdata:any;
  type:string;

  array:any;
  constructor(private route: ActivatedRoute,private bdoservice:Bdoservice,private router:Router


  ) { this.showpage=true;}

  ngOnInit(): void {

    this.bdoservice.getdatapermission().subscribe(data=>{
      console.log(data);
      this.misdata=data?.mis;

      this.route.queryParams.subscribe((params) => {

        
        this.type = this.misdata.find(x => x.type == params.type).value;
        this.array=this.misdata.find(x => x.type == params.type);
      });

    })


  }

}
