
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { commondata } from 'src/app/model/common';
import { activeusermou } from 'src/app/model/mou.model';
import { AccountService } from 'src/app/services/account.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { ActivityComponent } from '../activity/activity.component';
@Component({
  selector: 'app-plant-varity',
  templateUrl: './plant-varity.component.html',
  styleUrls: ['./plant-varity.component.scss']
})
export class PlantVarityComponent implements OnInit {
  plantdata:any;
  viewtab:any;
  commondata=new commondata();
  @ViewChild(ActivityComponent)
  activity: ActivityComponent;
  activeusermou:activeusermou[];
  plantModel:any[];
  showpage:boolean=false;
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
  array={"tablename":"Create Activity","organization":true,"getscientist":true,"assignlabel":"Assign Scientist","assignarray":['Scientist']}
  
  constructor(private Bdoservice:Bdoservice,private router:Router, private accountService: AccountService,) {
    this.UserId = this.accountService.currentUser.id;
    this.userRoles = this.accountService.currentUser.roles;

    this.isLM = this.userRoles.includes('LM');
    this.isAdmin = this.userRoles.includes('Admin');
   
    this.isIPM = this.userRoles.includes('IPM');
  this.isSuperAdmin=this.userRoles.includes('Super Admin');
   }

  ngOnInit(): void {

   
   
    this.viewtab=this.commondata.getotherpermissiondata('view').map((item)=>(item.split('-')[1]));
    this.Bdoservice.getdatapermission().subscribe(data=>{
      console.log(data);
      this.plantdata=data?.plant_variety?.filter(x=>this.viewtab.find(y=>y==x.value));

    })
    this.Bdoservice.GetActiveUserMoubyuserid().subscribe(data1=>{
      this.activeusermou=data1;
    this.Bdoservice.GetPlantvarietyModel().subscribe(data => {
      console.log(data)
      this.plantModel = data;
      this.showpage = true;
    })
  });
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
  plantlistfilter(data) {
   
    if(this.isSuperAdmin){
      return this.plantModel?.filter(x=>x.app_Status==data).length;
    }
   
    else{
      return this.plantModel?.filter(x=>(x.app_Status==data )&& this.activeusermou?.some(t=>t.appref==x.refid)).length;
    }
   
}

  createactivity(){
    
this.activity.showviewmodel('','S792');
  }

  queryparam(data:any){
    this.router.navigate(['./bcil/bcil-patent-table'], { queryParams: { type: data} });
  // return  '{type:'+data+'}'
  }

}
