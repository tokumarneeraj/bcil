import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService, DialogType } from 'src/app/services/alert.service';
import { ActivityComponent } from '../activity/activity.component';
import { AdditionFileComponent } from '../addition-file/addition-file.component';
import { Bdoservice } from 'src/app/services/bdo.service';

@Component({
  selector: 'app-patent-init',
  templateUrl: './patent-init.component.html',
  styleUrls: ['./patent-init.component.scss']
})
export class PatentInitComponent implements OnInit {

  showpage:boolean;
  patentdata:any;
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
  patentModel:any[];
  viewtab:any;
  managetab:any;
  viewhistory:any;
  viewremark:any;
  viewadditionalfileright:boolean;
  stage:string="";
  datapermission:any;
  constructor(private route: ActivatedRoute,private alertService: AlertService,private accountService: AccountService,private Bdoservice:Bdoservice,private router:Router


  ) {
    this.userRoles = this.accountService.currentUser.roles;


  }
  viewadditionalfile(data:any){
    this.AdditionFile.showviewmodel(data,true,"patent");
  }
  remarksview(data:any){
    this.alertService.showDialog(data,DialogType.alert);

  }
  ngAfterViewInit() {

    this.activity.changesSavedCallback = () => {
      //this.addNewRoleToList();
      this.ngOnInit();
    };
  
    // this.roleEditor.changesCancelledCallback = () => {
    //   this.editedRole = null;
    //   this.sourceRole = null;
    //   this.editorModal.hide();
    // };
  }
  onmodalclick(e: string,value:any, data: any) {
let yy="";
this.datapermission?.patent?.forEach(element => {
  if(yy==undefined ||yy==""){
  yy=element?.subchild?.find(x=>x.value==value)?.tablename;
   if(yy!=undefined) 
      return true;
  }
  

})
    console.log("patent:"+value+yy)
    //(r=>r.substage==this.stage)?.subchild))//?.subchild?.filter(x=>x.value==value)) //?.filter(y=>y.subchild?.filter(t=>t.value==value)));
    data={...data,message:this.array?.tablename+' To '+yy}
    this.activity.showviewmodel('patent',value,data);
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
          this.datapermission=data;
         // this.patentdata=data?.patent?.filter(x=>this.viewtab.find(y=>y==x.value));
          //this.moudata=data?.mou?.filter(x=>this.managetab.find(y=>y==x.value));
          this.route.queryParams.subscribe((params) => {
            this.stage=params.stage;
            let yy=["patentdraft","patentfinalfiling","patentforeignfiling","patentrequiredforexamination","patentfirstexamreport","ertoacceptancepatent"]

            if(yy.includes(params.stage)){
      
              this.patentdata=data?.patent?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));
      
            }
            else{
            this.patentdata=data?.patent?.filter(x=>this.viewtab.find(y=>y==x.value));
            }
               this.array=this.patentdata.find(x => x.type == params.type);
             this.managetab.some(x=>x==this.array.value)?null:this.array={...this.array,button:[]};//this.array?.find(x=>this.managetab?.find(y=>y==x.value)); 
           
         
      
          })
      
      
          
    
        })
    
   
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetPatentModel().subscribe(data => {
      if(this.isSuperAdmin){
        this.patentModel = data.filter(x => x.app_Status == this.array?.value);
      }
  

    else {
       this.patentModel= data.filter(x=>x.app_Status== this.array?.value && this.activeusermou?.some(t=>t.appref==x.refid));
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



