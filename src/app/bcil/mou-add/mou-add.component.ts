import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Bdoservice} from '../../services/bdo.service'
@Component({
  selector: 'app-mou-add',
  templateUrl: './mou-add.component.html',
  styleUrls: ['./mou-add.component.css']
})
export class MouAddComponent implements OnInit {
  AddMouForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(private formbuilder: FormBuilder, private router: Router,private Bdoservice:Bdoservice) { }
  get f() { return this.AddMouForm.controls; }
  ngOnInit(): void {
    this.AddMouForm = this.formbuilder.group({
          
      int_Uni_Name: ['', Validators.required],
      dept_Name:['', Validators.required],
      address:['', Validators.required],
      phoneNo:['', Validators.required],
      email:['', Validators.required],
      gstNo:['', Validators.required],
      dir_Head_Name:['', Validators.required],
dir_Phone_No:['', Validators.required],
dir_Mobile_No:['', Validators.required],
dir_Email:['', Validators.required],
nodal_Name:['', Validators.required],
nodal_Phone_No:['', Validators.required],
nodal_Mobile_No:['', Validators.required],
nodal_Email:['', Validators.required],
nodal_Designation:['', Validators.required]


    });


  }

  onSubmit() {
    this.submitted = true;

  if (this.AddMouForm.invalid) {
        return;
    }
    this.Bdoservice.AddMou(this.AddMouForm.value).subscribe(data=>{
      alert("data save Successfully");
      this.router.navigateByUrl("bcil/bcil-dashboard");
      console.log(data)
    })
  }

}
