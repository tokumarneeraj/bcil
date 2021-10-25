import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { activeusermou, mouModel } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { AdditionFileComponent } from '../addition-file/addition-file.component';

@Component({
  selector: 'app-mou-application',
  templateUrl: './mou-application.component.html',
  styleUrls: ['./mou-application.component.scss']
})
export class MouApplicationComponent implements OnInit {
  activeusermou:activeusermou[];
  mouModel:mouModel[]=[];
  showpage:boolean=false;
  isSuperAdmin:boolean=false;
  userRoles:string[];
  stage:string;
  @ViewChild(AdditionFileComponent)
  AdditionFile: AdditionFileComponent;
  constructor(private route: ActivatedRoute, private Bdoservice: Bdoservice,private accountService:AccountService, private formbuilder: FormBuilder) { 
    this.userRoles = this.accountService.currentUser.roles;

    this.isSuperAdmin=this.userRoles.includes('Super Admin');
    this.route.queryParams.subscribe((params) => {
this.stage=params.stage;
    });
  }
  additionfile(data:mouModel){
    
    this.AdditionFile.showmodel(data,this.stage);
  }
  ngOnInit(): void {
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetMou().subscribe(data => {
      if(this.isSuperAdmin){
        this.mouModel = data;
        }
        else{
      this.mouModel = data.filter(x=>this.activeusermou?.find(t=>t.appref==x.refid))
      }
      this.showpage=true;
  });
});
  }

}
