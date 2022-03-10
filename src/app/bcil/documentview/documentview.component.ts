import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from 'src/app/services/account.service';
import { Bdoservice } from 'src/app/services/bdo.service';
import { AlertService } from 'src/app/services/alert.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { activeusermou, addusertomou } from 'src/app/model/mou.model';
@Component({
  selector: 'app-documentview',
  templateUrl: './documentview.component.html',
  styleUrls: ['./documentview.component.scss']
})
export class DocumentviewComponent implements OnInit {

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
  constructor(private route: ActivatedRoute,private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder, private _cookieService: CookieService, private accountService: AccountService, private router: Router) {

    this.UserId = this.accountService.currentUser.id;
    

   }

  ngOnInit(): void {
   
    // this.Form=this.formbuilder.group({
    //   scientist:['',Validators.required]
    // });
  }
 // get f1() { return this.AssignScientistForm.controls; }

  onmodalshow(data:any){
    //  this.addusertomou.mouref=data?.refid;
    // this.accountService.getAllUser(0,0).subscribe(data=>{
    //   this.rowssci=data.filter((x)=>x.createdBy==this.UserId && x.roles.includes('Scientist'));
    //   console.log(this.rowssci)
      // this.organizations=this.organizations.filter(y=>y.value==data1[0]?.value);
      // this.accountService.getAllUser(0,0).subscribe(data=>{
        
      // });
      this.editorModal2.show();
    //})
    
  }
  saveassignscien(){
    
//     this.submitted=true;
//     if (this.AssignScientistForm.invalid) {
//       return;
//     }
//     this.loading=true;
//     this.addusertomou.userid=this.AssignScientistForm.get("scientist").value;
//   // alert(this.addusertomou.userid)
//     this.Bdoservice.AddScientist(this.addusertomou).subscribe(data=>{
//       if(data.message=="success"){
//         this.submitted=false;
//         this.editorModal2.hide();
       
// alert("data save successfully")
// this.loading=false;
// //this.ngOnInit();
//       }
     
      
//     },error=>{
//       this.loading=false;
//     })

  }
 // get f() { return this.AssignScientistForm.controls; }

}
