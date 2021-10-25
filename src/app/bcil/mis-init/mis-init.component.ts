import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService, DialogType } from 'src/app/services/alert.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { ActivityComponent } from '../activity/activity.component';
import { AdditionFileComponent } from '../addition-file/addition-file.component';

@Component({
  selector: 'app-mis-init',
  templateUrl: './mis-init.component.html',
  styleUrls: ['./mis-init.component.scss']
})
export class MisInitComponent implements OnInit {
  showpage:boolean;
  misdata:any;
  type:string;
  UserId: string;
  userRoles: string[];
  isAdmin: boolean;
  formHeader: string;
  isBdm: boolean;
  isScientist:boolean;
  isNodal: boolean;
  isLM: boolean;
  isSuperAdmin: boolean;
  isIPM:boolean;
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  array:any;
  activuser:activeusermou[];
  activebtn:any;
  commondata=new commondata();
  activeusermou:activeusermou[];
  @ViewChild(AdditionFileComponent)
  AdditionFile: AdditionFileComponent;
  misModel:any[];
  viewtab:any;
  managetab:any;
  viewhistory:any;
  viewremark:any;
  viewadditionalfileright:boolean;
  constructor(private route: ActivatedRoute,private alertService: AlertService,private accountService: AccountService,private Bdoservice:Bdoservice,private router:Router


  ) {
    this.userRoles = this.accountService.currentUser.roles;


  }
  viewadditionalfile(data:any){
    this.AdditionFile.showviewmodel(data,true,"mis");
  }
  remarksview(data:any){
    this.alertService.showDialog(data,DialogType.alert);

  }
  onmodalclick(e: string,value:any, data: any) {
    this.activity.showviewmodel('mis',value,data);
   this.activebtn=this.array?.button?.find(x=>x.value==value);

  
   
  }
  ngOnInit(): void {
    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBdm = this.userRoles.includes('BDM');
    this.isNodal = this.userRoles.includes('Nodal'); 
    
    this.isScientist=this.userRoles.includes('Scientist');
  this.isIPM=this.userRoles.includes('IPM');
  this.isSuperAdmin=this.userRoles.includes('Super Admin');
  
    this.viewadditionalfileright=this.commondata.CanviewadditionalfilesPermission;
    this.viewtab=this.commondata.getotherpermissiondata('view').map((item)=>(item.split('-')[1]));
        this.managetab=this.commondata.getotherpermissiondata('manage').map((item)=>(item.split('-')[1]));
        this.Bdoservice.getdatapermission().subscribe(data=>{
          console.log(data);
          this.misdata=data?.mis?.filter(x=>this.viewtab.find(y=>y==x.value));
          //this.moudata=data?.mou?.filter(x=>this.managetab.find(y=>y==x.value));
      this.route.queryParams.subscribe((params) => {

        
        //this.type=this.moudata.find(x => x.type == params.type).value;
        this.array=this.misdata?.find(x => x.type == params.type);
       this.managetab.some(x=>x==this.array?.value)?null:this.array={...this.array,button:[]};//this.array?.find(x=>this.managetab?.find(y=>y==x.value)); 
        //this.showbutton=this.array?.button
       
      });
          
    
        })
    
   
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetMis().subscribe(data => {
      if(this.isSuperAdmin){
        this.misModel = data.filter(x => x.app_Status == this.array?.value);
      }
  

    else {
       this.misModel= data.filter(x=>x.app_Status== this.array?.value && this.activeusermou?.some(t=>t.appref==x.refid));
       }
      
      
    this.viewhistory=this.commondata.getotherpermissiondata('history').some(x=>x?.split('-')[1]==this.array?.value);
       this.viewremark= this.commondata.getotherpermissiondata('remark').some(x=>x?.split('-')[1]==this.array?.value);
       //this.emailpermission=this.commondata.getotherpermissiondata('email').some(x=>x?.split('-')[1]==this.type);
     // this.viewadditionfile= this.commondata.getotherpermissiondata('addfile').some(x=>x?.split('-')[1]==this.type);
      
        this.showpage = true;


    }
    );
    });


  }

}
