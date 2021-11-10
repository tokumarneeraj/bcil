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
  selector: 'app-add-scientist',
  templateUrl: './add-scientist.component.html',
  styleUrls: ['./add-scientist.component.scss']
})
export class AddScientistComponent implements OnInit {
  AssignScientistForm:FormGroup;
  submitted = false;
  loading=false;
  @ViewChild('editorModal2', { static: true })
  editorModal2: ModalDirective;
  activeusermiu:activeusermou;
  addusertomou=new addusertomou();
  constructor(private route: ActivatedRoute,private alertService: AlertService, private Bdoservice: Bdoservice, private formbuilder: FormBuilder, private _cookieService: CookieService, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.AssignScientistForm=this.formbuilder.group({
      scientist:['',Validators.required]
    });
  }
  get f1() { return this.AssignScientistForm.controls; }
  saveassignscien(){
    
    this.submitted=true;
    if (this.AssignScientistForm.invalid) {
      return;
    }
    this.loading=true;
    this.addusertomou.userid=this.AssignScientistForm.get("scientist").value;
  // alert(this.addusertomou.userid)
    this.Bdoservice.AddScientist(this.addusertomou).subscribe(data=>{
      if(data.message=="success"){
        this.submitted=false;
        this.editorModal2.hide();
       
alert("data save successfully")
this.loading=false;
//this.ngOnInit();
      }
     
      
    },error=>{
      this.loading=false;
    })

  }
}
