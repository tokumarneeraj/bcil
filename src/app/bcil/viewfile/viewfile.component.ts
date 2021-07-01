import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filehistoryModel } from 'src/app/model/filehistory';
import { Bdoservice } from 'src/app/services/bdo.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-viewfile',
  templateUrl: './viewfile.component.html',
  styleUrls: ['./viewfile.component.css']
})
export class ViewfileComponent implements OnInit {
  refid: string;
  fileshistory:filehistoryModel[];
  showpage= false;
  getbaseurl=environment.baseUrl;
  constructor(private route:ActivatedRoute,private Bdoservice:Bdoservice) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
     
      this.refid=params.refid;
      })


      this.Bdoservice.Getfile(this.refid).subscribe(data=>{console.log(data)
        debugger
        environment.baseUrl
        this.fileshistory=data
        this.showpage=true;
        })
  }

}
