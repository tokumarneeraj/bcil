import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bdoservice } from '../../services/bdo.service'
@Component({
  selector: 'app-mou-add',
  templateUrl: './mou-add.component.html',
  styleUrls: ['./mou-add.component.css']
})
export class MouAddComponent implements OnInit {
  AddMouForm: FormGroup;
  submitted = false;
  loading = false;
  dir_des_Value = '';
  nodal_des_Value = '';
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  


  constructor(private formbuilder: FormBuilder, private router: Router, private Bdoservice: Bdoservice) { }
  get f() { return this.AddMouForm.controls; }
  ngOnInit(): void {
    this.AddMouForm = this.formbuilder.group({

      int_Uni_Name: ['', Validators.required],
      dept_Name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      email: ['', [Validators.required, Validators.email]],
      gstNo: ['', Validators.required],
      dir_Head_Name: ['', Validators.required],
      dir_Phone_No: [''],
      dir_Mobile_No: ['', Validators.required],
      dir_Email: ['', [Validators.required, Validators.email]],
      nodal_Name: ['', Validators.required],
      nodal_Phone_No: [''],
      nodal_Mobile_No: ['', Validators.required],
      nodal_Email: ['', [Validators.required, Validators.email]],
      nodal_Designation: [''],
      dir_Designation: [''],
      int_Uni_Drop: ['', Validators.required],
      dir_Designation_Drop: ['', Validators.required],
      nodal_Designation_Drop: ['', Validators.required]

    });


  }


  eventCheck(event) {
    if (event.checked == true) {
      this.AddMouForm.patchValue({

        nodal_Name: this.AddMouForm.value.dir_Head_Name,
        nodal_Phone_No: this.AddMouForm.value.dir_Phone_No,
        nodal_Mobile_No: this.AddMouForm.value.dir_Mobile_No,
        nodal_Email: this.AddMouForm.value.dir_Email,
        nodal_Designation_Drop: this.AddMouForm.value.dir_Designation_Drop,
        nodal_Designation: this.AddMouForm.value.dir_Designation

      });

      this.AddMouForm.controls.nodal_Name.disable();
      this.AddMouForm.controls.nodal_Phone_No.disable();
      this.AddMouForm.controls.nodal_Mobile_No.disable();
      this.AddMouForm.controls.nodal_Email.disable();
      this.AddMouForm.controls.nodal_Designation_Drop.disable();
      this.AddMouForm.controls.nodal_Designation.disable();
    }
    else {
      this.AddMouForm.patchValue({

        nodal_Name: '',
        nodal_Phone_No: '',
        nodal_Mobile_No: '',
        nodal_Email: '',
        nodal_Designation_Drop: '',
        nodal_Designation: ''

      });
      this.AddMouForm.controls.nodal_Name.enable();
      this.AddMouForm.controls.nodal_Phone_No.enable();
      this.AddMouForm.controls.nodal_Mobile_No.enable();
      this.AddMouForm.controls.nodal_Email.enable();
      this.AddMouForm.controls.nodal_Designation_Drop.enable();
      this.AddMouForm.controls.nodal_Designation.enable();

    }

  }

  onSubmit() {
    this.submitted = true;


    this.AddMouForm.controls.nodal_Name.enable();
    this.AddMouForm.controls.nodal_Phone_No.enable();
    this.AddMouForm.controls.nodal_Mobile_No.enable();
    this.AddMouForm.controls.nodal_Email.enable();
    this.AddMouForm.controls.nodal_Designation_Drop.enable();
    this.AddMouForm.controls.nodal_Designation.enable();

    if (this.AddMouForm.invalid) {
      return;
    }

    this.Bdoservice.AddMou(this.AddMouForm.value).subscribe(data => {
      alert("data save Successfully");
      this.router.navigateByUrl("bcil/bcil-dashboard");
      console.log(data)
    })
  }

}
