import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { AlertService, DialogType } from 'src/app/services/alert.service';
import { ActivityComponent } from '../activity/activity.component';
import { AdditionFileComponent } from '../addition-file/addition-file.component';
import { Bdoservice } from 'src/app/services/bdo.service';
import { DocumentviewComponent } from '../documentview/documentview.component';
@Component({
  selector: 'app-trademark-init',
  templateUrl: './trademark-init.component.html',
  styleUrls: ['./trademark-init.component.scss']
})
export class TrademarkInitComponent implements OnInit {

  showpage:boolean;
 trademarkdata:any;
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
  @ViewChild(DocumentviewComponent)
  Document: DocumentviewComponent;
  array:any;
  activuser:activeusermou[];
  activebtn:any;
  commondata=new commondata();
  activeusermou:activeusermou[];
  @ViewChild(AdditionFileComponent)
  AdditionFile: AdditionFileComponent;
  trademarkModel:any[];
  viewtab:any;
  managetab:any;
  viewhistory:any;
  viewremark:any;
  viewadditionalfileright:boolean;
  datapermission:any;
  constructor(private route: ActivatedRoute,private alertService: AlertService,private accountService: AccountService,private Bdoservice:Bdoservice,private router:Router


  ) {
    this.userRoles = this.accountService.currentUser.roles;


  }
  
 viewdocumentfile(data){
   this.route.queryParams.subscribe((params)=>{
    this.Document.onmodalshow(data,params?.stage);
    })
  }
  viewadditionalfile(data:any){
    this.AdditionFile.showviewmodel(data,true,"design");
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
    let yy="",querystring="";
this.datapermission?.trademark?.forEach(element => {
  if(yy==undefined ||yy==""){
  yy=element?.subchild?.find(x=>x.value==value)?.tablename;
  querystring="bcil/bcil-trademark-table?stage="+element?.subchild?.find(x=>x.value==value)?.stage+"&type="+element?.subchild?.find(x=>x.value==value)?.type+"";
 
   if(yy!=undefined) 
      return true;
  }
  

})
data={...data,message:this.array?.tablename+' To '+yy,querystring:querystring}
    this.activity.showviewmodel('trademark',value,data);
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
          this.trademarkdata=data?.trademark?.filter(x=>this.viewtab.find(y=>y==x.value));
          //this.moudata=data?.mou?.filter(x=>this.managetab.find(y=>y==x.value));
          this.route.queryParams.subscribe((params) => {
            let yy=["trademark_common_ip","trademark_er_er","trademark_er_accp"]
            if(yy.includes(params.stage)){
      
              this.trademarkdata=data?.trademark?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));
      
            }
            else{
            this.trademarkdata=data?.design?.filter(x=>this.viewtab.find(y=>y==x.value));
            }
               this.array=this.trademarkdata.find(x => x.type == params.type);
             this.managetab.some(x=>x==this.array.value)?null:this.array={...this.array,button:[]};//this.array?.find(x=>this.managetab?.find(y=>y==x.value)); 
           
         
      
          })
      
      
          
    
        })
    
   
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetTrademarkModel().subscribe(data => {
      if(this.isSuperAdmin){
        this.trademarkModel = data.filter(x => x.app_Status == this.array?.value);
      }
  

    else {
       this.trademarkModel= data.filter(x=>x.app_Status== this.array?.value && this.activeusermou?.some(t=>t.appref==x.refid));
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
