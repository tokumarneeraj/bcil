import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filehistoryModel } from 'src/app/model/filehistory';
import { User } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-viewfile',
  templateUrl: './viewfile.component.html',
  styleUrls: ['./viewfile.component.css']
})
export class ViewfileComponent implements OnInit {
  refid: string;
  stage:string;
  fileshistory:filehistoryModel[];
  showpage= false;
  rows: User[] = [];
  moustatus=['S101','S102','S103','S104','S105','S106','S107','S108','S109','S110','S111','S112'];
  ttostatus = ['S113', 'S114', 'S115', 'S116', 'S117', 'S118', 'S119', 'S120', 'S121', 'S122', 'S123', 'S124', 'S125', 'S126', 'S127', 'S128', 'S129', 'S130', 'S131', 'S132', 'S133', 'S134', 'S135', 'S136', 'S137', 'S138', 'S139', 'S140', 'S141', 'S142', 'S143', 'S144', 'S145', 'S146', 'S147', 'S148', 'S149', 'S150', 'S151', 'S152', 'S153'];

  getbaseurl=environment.baseUrl;
  constructor(private route:ActivatedRoute,private Bdoservice:Bdoservice, private accountService: AccountService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
     
      this.refid=params.refid;
      this.stage=params.stage;
      })
      this.accountService.getAllUser(0,0).subscribe(data =>{
        this.rows=data;
          

      this.Bdoservice.Getfile(this.refid).subscribe(data=>{console.log(data)
        data.map((x,i)=>{
x.createdby=this.rows.find(y=>y.id==x.createdby)?.userName+"("+this.rows.find(y=>y.id==x.createdby)?.roles+")"
        })

       data= this.stage=="mou"?data.filter(x=>this.moustatus.includes(x.status)):
        data.filter(x=>this.ttostatus.includes(x.status));
        debugger
        environment.baseUrl
        this.fileshistory=data
        this.showpage=true;
        })
        console.log(data)
      })
  }

}
