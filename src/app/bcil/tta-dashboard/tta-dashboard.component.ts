import { Component, OnInit, ViewChild } from '@angular/core';
import { activeusermou, mouModel } from 'src/app/model/mou.model';
import { Bdoservice } from '../../services/bdo.service';
import { AccountService } from '../../services/account.service';
import { Permission } from 'src/app/model/permission.model';
import { commondata } from 'src/app/model/common';
import { Role } from 'src/app/model/role.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'app-tta-dashboard',
  templateUrl: './tta-dashboard.component.html',
  styleUrls: ['./tta-dashboard.component.css']
})
export class TtaDashboardComponent implements OnInit {
  mouModel: mouModel[];
  ttaModel:any[];
  showpage = false;
  UserEmail: string;
  userRoles: string[];
  isNodal: boolean;
  isLM: boolean;
  isAdmin: boolean;
  isBDM: boolean;
  isIPM: boolean;
  isSuperAdmin:boolean;
  UserId: string;
  icon:any[]=[];
  UserName: string;
  permission:string[];
  userperttaall:any[];
  userpertlpall:any[];
  userpernttsall:any[];
  userpertstlall:any[];
  userpertta:any[];
  userpertlp:any[];
  userperntts:any[];
  userpertstl:any[];
  oneAtATime=true;
  open: boolean = true;
   disabled: boolean = true;
   showaccordion:boolean=false;
  commondata=new commondata();
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  ttaper:any[];
  tlpstatus = ['S130', 'S132', 'S133', 'S134', 'S135', 'S136', 'S137', 'S138', 'S139', 'S140', 'S141', 'S142', 'S143', 'S144', 'S145'];
  nttsastatus = ['S146', 'S147', 'S148', 'S149', 'S150', 'S151', 'S152', 'S153'];
  tstlstatus = ['S154', 'S155', 'S156', 'S157', 'S158', 'S159', 'S160', 'S161', 'S162', 'S163', 'S164'];
  activeusermou:activeusermou[];
  roles:Role[];
  viewtab:any;
  ttadata:any;
  showactivity:boolean=true;
  isNodel:boolean=false;
  isScientist:boolean=false;
  stagevalue='S113';
  array:any;//{"tablename":"Upload Assignment/Tech. disclosure form","organization":true,"getscientist":true,}
  constructor(private route: ActivatedRoute,private Bdoservice: Bdoservice, private accountService: AccountService,private router:Router) {
    this.UserEmail = this.accountService.currentUser.email;
    this.userRoles = this.accountService.currentUser.roles;
    this.UserId = this.accountService.currentUser.id;
this.UserName=this.accountService.currentUser.userName;
    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
    this.isBDM = this.userRoles.includes('BDM');
    this.isIPM = this.userRoles.includes('IPM');
 this.isNodal=this.userRoles.includes('Nodal');
 this.isScientist=this.userRoles.includes('Scientist');
    this.isSuperAdmin = this.userRoles.includes('Super Admin');
    this.permission=JSON.parse(localStorage.getItem('user_permissions'));
    debugger;
    this.userperttaall=this.commondata.ttaarray()?.filter(x=>x.stage=="tta");
    this.userpertlpall=this.commondata.ttaarray()?.filter(x=>x.stage=="tlp");
    this.userpernttsall=this.commondata.ttaarray()?.filter(x=>x.stage=="ntts");
    this.userpertstlall=this.commondata.ttaarray()?.filter(x=>x.stage=="tstl");
    this.userpertlp=this.commondata.ttaarray()?.filter(x=>x.stage=="tlp").filter(r=>this.permission?.includes(r.permission));
    this.userperntts=this.commondata.ttaarray()?.filter(x=>x.stage=="ntts").filter(r=>this.permission?.includes(r.permission));
    this.userpertstl=this.commondata.ttaarray()?.filter(x=>x.stage=="tstl").filter(r=>this.permission?.includes(r.permission));
  }
  rolesclick(roledata){
    console.log(roledata);
    this.Bdoservice.getdatapermission().subscribe(datapermission=>{
    this.accountService.getOtherpermissionbyrolename(roledata?.name).subscribe(data=>{

      this.viewtab=data.map((ss)=>(ss.permission)).filter(s => s.includes("view")).map((item)=>(item.split('-')[1]));
      this.route.queryParams.subscribe((params) => {
        let yy=["tlp","tstl","nttsa"]
        if(yy.includes(params?.stage)){
          
          this.ttadata=datapermission?.tta?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));
        
        }
        else{
                this.ttadata=datapermission?.tta?.filter(x=>this.viewtab.find(y=>y==x.value)|| x?.subchild?.some(t=>this.viewtab.find(y=>y==t.value)));
        }
        console.log(this.ttadata,'uu')
              });
             
        
          
      console.log(this.viewtab)
    this.Bdoservice.GetTtaModel(roledata?.id).subscribe(ttodata => {
      console.log(ttodata)
      this.ttaModel = ttodata;
      });
    });
    })
  }
  checkdiv(i,data){
    debugger;
return this.roles.find(e=>e.id==i.id).permissions.some(p=>p.value==data);
  }
  cardname(data){
    return this.commondata.ttaarray().find(x=>x.value==data)?.tablename;
      }
      
      get canviewTta_upload_assign_tech_disclosure_formPermission() {
        return this.accountService.userHasPermission(Permission.viewTta_upload_assign_tech_disclosure_formPermission);
      }
      get canviewTta_Additional_info_neededPermission() {
        return this.accountService.userHasPermission(Permission.viewTta_Additional_info_neededPermission);
      }
  get canviewTta_initPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_initPermission);
  }
  get canviewTta_evaluation_assignedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_assignedPermission);
  }
  get canviewTta_evaluation_upload_by_bdmPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_upload_by_bdmPermission);
  }
  get canviewTta_evaluation_closure_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_closure_by_adminPermission);
  }
  get canviewTta_evaluation_approved_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_approved_by_adminPermission);
  }
  get canviewTta_evaluation_change_request_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_change_request_by_adminPermission);
  }
  get canviewTta_Closure_request_by_bdmPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_Closure_request_by_bdmPermission);
  }
  get canviewTta_closePermission() {
    return this.accountService.userHasPermission(Permission.viewTta_closePermission);
  }
  get canviewTta_evaluation_change_request_by_clientPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_change_request_by_clientPermission);
  }
  get canviewTta_evaluation_accepted_by_clientPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_evaluation_accepted_by_clientPermission);
  }

  
  get canviewTta_strategy_assignedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_strategy_assignedPermission);
  }
  get canviewTta_strategy_uploaded_by_bdmPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_strategy_uploaded_by_bdmPermission);
  }
  get canviewTta_strategy_approvedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_strategy_approvedPermission);
  }
  get canviewTta_techb_flyer_uploadedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_techb_flyer_uploadedPermission);
  }


  get canviewtta_strategy_change_request_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewtta_strategy_change_request_by_adminPermission);
  }
  get canviewTta_techb_and_flier_change_req_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_techb_and_flier_change_req_by_adminPermission);
  }
  get canviewTta_techb_and_flier_approved_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_techb_and_flier_approved_by_adminPermission);
  }
  get canviewTta_techb_and_flier_approved_by_scientistPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_techb_and_flier_approved_by_scientistPermission);
  }
  get canviewTta_chnage_req_by_scientistPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_change_req_by_scientistPermission);
  }
  get canviewstartegy_implementedPermission() {
    return this.accountService.userHasPermission(Permission.viewstartegy_implementedPermission);
  }
  get canviewTta_interest_receivedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_interest_receivedPermission);
  }
  get canviewTta_no_interest_receivedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_no_interest_receivedPermission);
  }

  get canviewTta_strategy_update_request_by_adminPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_strategy_update_request_by_adminPermission);
  }
  get canviewTta_strategy_update_uploadedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_strategy_update_uploadedPermission);
  }

  get canviewTta_strategy_update_approvedPermission() {
    return this.accountService.userHasPermission(Permission.viewTta_strategy_update_approvedPermission);
  }

  
  
  get canViewTlp() {
    return this.accountService.userHasPermission(Permission.viewTechnologyLeadPermission);
  }
  

  tlplist() {
    console.log(this.userpertlp);
    return this.mouModel?.filter(x =>this.userpertlp?.find(r=>r.value==x.app_Status) &&  this.activeusermou?.find(t=>t.appref==x.refid) ).length;
  }

  nttsalist() {
    console.log(this.mouModel?.filter(x => !this.nttsastatus.includes(x.app_Status)).length)
    return this.mouModel?.filter(x => this.userperntts?.find(r=>r.value==x.app_Status) && this.activeusermou?.find(t=>t.appref==x.refid)).length;
  }
  tstllist() {
    return this.mouModel?.filter(x => this.userpertstl?.find(r=>r.value==x.app_Status) && this.activeusermou?.find(t=>t.appref==x.refid)).length;

  }
  fitertta(data,row){
    return data.filter(x=>this.roles.find(e=>e.id==row.id).permissions.find(t=>t.value==x.permission))
  }
  fitertlp(data,row){
    return data.filter(x=>this.roles.find(e=>e.id==row.id).permissions.find(t=>t.value==x.permission)).length;
  }

  fiterntts(data,row){
    return data.filter(x=>this.roles.find(e=>e.id==row.id).permissions.find(t=>t.value==x.permission)).length;
  }
  fitertstl(data,row){
    return data.filter(x=>this.roles.find(e=>e.id==row.id).permissions.find(t=>t.value==x.permission)).length;
  }
  queryparam(data){
    // let navigationExtras:NavigationExtras={
    //   queryParams: {'type':data}
    // }
    this.router.navigate(data?.subchild?.length>0?['/bcil/tta-dashboard']:['/bcil/bcil-tta-table'],  { queryParams: {stage:data?.subchild?.length>0?data.substage:data.stage, type: data.type}});
   // this.router.navigate(['/bcil/bcil-tta-table'],navigationExtras)
   // return data;
  }
  log(row:Role){
    debugger;
    for(let t=0;t<this.icon.length;t++){
  this.icon[t].value=false;
  }   
   // return this.userperttaall.filter(x=>this.roles.find(e=>e.id==row.id).permissions.includes(x.permission));
 }
 stringhref(data){
   return  '#'+data;
 }
  ngOnInit(): void {
    this.viewtab=this.commondata.getotherpermissiondata('view').map((item)=>(item.split('-')[1]));
   
    this.Bdoservice.getdatapermission().subscribe(data=>{
      console.log(data);
      this.array=data?.tabheading?.find(y=>y.stage=="tta")
      this.route.queryParams.subscribe((params) => {
let yy=["tlp","tstl","nttsa"]
if(yy.includes(params?.stage)){
  
  this.ttadata=data?.tta?.find(r=>r.substage==params?.stage)?.subchild?.filter(x=>this.viewtab.find(y=>y==x.value));

}
else{
        this.ttadata=data?.tta?.filter(x=>this.viewtab.find(y=>y==x.value)|| x?.subchild?.some(t=>this.viewtab.find(y=>y==t.value)));
}
console.log(this.ttadata,'uu')
      });
     

    })
    this.accountService.getRolesAndPermissions()
    .subscribe(results => {

   
    
      this.roles= results[0];
      if(this.roles.length>0){
      for(let r=0;r<=this.roles.length-1;r++){

      
   this.icon.push({name:this.roles[r]?.name,value:false})
      }
    }
      console.log(this.icon,'icon')
      this.showaccordion=true;
//this.roles[0].permissions=results[1];
      
      const permissions = results[1];
    });

    this.isNodal=this.userRoles.includes('Nodal');
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
      this.Bdoservice.GetMou().subscribe(moudata => {
        this.mouModel=moudata;
      });
    this.Bdoservice.GetTtaModel().subscribe(data => {
      console.log(data)
      this.ttaModel = data;
      this.showpage = true;
    })
  });
  }

  ngAfterViewInit() {

    this.activity.changesSavedCallback = () => {
      //this.addNewRoleToList();
      this.ngOnInit();
    };
  }
  createactivity(){
    this.activity.showviewmodel('',this.stagevalue);
      }

  
  ttaListFilter(data) {
   let yy=["tlp","nstta","tstl"]
    if(this.isSuperAdmin){
      return this.ttaModel?.filter(x=>(yy.includes(data)?this.ttadata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_Status):x.app_Status==data) ).length;
    }
    
    else{
      return this.ttaModel?.filter(x=>(yy.includes(data)?this.ttadata?.find(t=>t.substage==data)?.subchild?.filter(r=>this.viewtab.includes(r.value)).some(e=>e.value==x.app_Status):x.app_Status==data) && this.activeusermou?.some(t=>t.appref==x.refid) ).length;
    }
    // if (this.isNodal == true) {
    //   return this.mouModel?.filter(x => x.nodal_Name == this.UserName && x.app_Status == data).length;
    // }
    // else if (this.isAdmin) {


    //   return this.mouModel?.filter(x => x.app_Status == data && x.assigntoadmin == this.UserId).length;


    // }
    //  else if(this.isBDM ||this.isIPM){
    //    return this.mouModel?.filter(x => x.app_Status == data &&  x.createdBy==this.UserId).length;

    //  }
    // else {
    //   return this.mouModel?.filter(x => x.app_Status == data).length;
    // }
  }
 
  

}
