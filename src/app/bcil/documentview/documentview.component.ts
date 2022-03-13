import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from 'src/app/services/account.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { AlertService } from 'src/app/services/alert.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { activeusermou, addusertomou } from 'src/app/model/mou.model';
import { environment } from 'src/environments/environment';
import { filehistoryModel } from 'src/app/model/filehistory';
import { User } from 'src/app/model/user.model';
import { commondata } from 'src/app/model/common';
@Component({
  selector: 'app-documentview',
  templateUrl: './documentview.component.html',
  styleUrls: ['./documentview.component.scss']
})
export class DocumentviewComponent implements OnInit {
  refid: string;
  stage:string;
  perm:any[]=[];
  fileshistory:filehistoryModel[];
  showpage= false;
  rows: User[] = [];
  commondata=new commondata();
  DocumentForm:FormGroup;
  submitted = false;
  loading=false;
  @ViewChild('editorModal2', { static: true })
  editorModal2: ModalDirective;
  activeusermiu:activeusermou;
  addusertomou=new addusertomou();
  organizations:any[];
  rowssci:any[];
  UserId:any;
  getbaseurl=environment.baseUrl;
  userRoles: string[];
    isBDM: boolean;
  constructor(private route:ActivatedRoute,private Bdoservice:Bdoservice, private accountService: AccountService,private alertService: AlertService) { 
    this.userRoles = this.accountService.currentUser.roles;
    this.isBDM = this.userRoles.includes('BDM');
  }

  ngOnInit(): void {
   
    // this.Form=this.formbuilder.group({
    //   scientist:['',Validators.required]
    // });
  }
 // get f1() { return this.AssignScientistForm.controls; }

  onmodalshow(data:any,stage:any){
    //  this.addusertomou.mouref=data?.refid;
    // this.accountService.getAllUser(0,0).subscribe(data=>{
    //   this.rowssci=data.filter((x)=>x.createdBy==this.UserId && x.roles.includes('Scientist'));
    //   console.log(this.rowssci)
      // this.organizations=this.organizations.filter(y=>y.value==data1[0]?.value);
      // this.accountService.getAllUser(0,0).subscribe(data=>{
        
      // });
      this.editorModal2.show();
      this.refid=data?.refid;
      this.stage=stage;
      // this.route.queryParams.subscribe((params)=>{
     
      //   this.refid=params.refid;
      //   this.stage=params.stage;
      //   })
        this.accountService.getAllUser(0,0).subscribe(data =>{
          this.rows=data;
            
          this.Bdoservice.getdatapermission().subscribe(data1=>{
            console.log(data1);
            this.Bdoservice.GetMilestone(this.refid).subscribe(milestone=>{
              console.log(milestone)
            
        this.Bdoservice.Getfile(this.refid).subscribe(data=>{console.log(data)
          data.map((x,i)=>{
  x.createdby=this.rows.find(y=>y.id==x.createdby)?.userName+"("+this.rows.find(y=>y.id==x.createdby)?.roles+")",
  x.jsondata=x.jsondata!=null?JSON.parse(x.jsondata):undefined,
  x.milestone=x.status=='S172' || x.status=='S794'? milestone:[]
          })
         
          console.log(data)
  
        //  data= this.stage=="mou"?data.filter(x=>this.moustatus.includes(x.status)):
        //   data.filter(x=>this.ttostatus.includes(x.status));
        //   debugger
  //      this.perm=;
  // this.perm=getotherpermissiondata;
          this.fileshistory=data.filter(x=>this.commondata.getotherpermissiondata('history').find(y=>y?.split('-')[1]==x.status))
        this.showpage=true;
          })
          })
          })
          console.log(data)
        })
    }
    //})
    
  

 
 // get f() { return this.AssignScientistForm.controls; }

}
