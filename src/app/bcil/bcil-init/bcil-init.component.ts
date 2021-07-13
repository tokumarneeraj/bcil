import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { mouModel } from '../../model/mou.model';
import { Bdoservice } from '../../services/bdo.service'
import { Utilities } from '../../services/utilities';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UploadFileViewModel } from '../../model/uploadFile.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-bcil-init',
  templateUrl: './bcil-init.component.html',
  styleUrls: ['./bcil-init.component.css']
})
export class BcilInitComponent implements OnInit {
  mouModel: mouModel[];
  showpage = false;
  type: string;
  closeResult = '';
  ForwardForm: FormGroup;
  submitted = false;
  createdBy = "";
  UploadFileViewModel = new UploadFileViewModel();
  @ViewChild('editorModal1', { static: true })
  editorModal1: ModalDirective;
  usertype: string;
  UserName: string;
  showClientPage = false;
  @ViewChild('editorModal2', { static: true })
  editorModal2: ModalDirective;

  array = [{ name: 'init', value: 'S101', createdBy: "Test1", forward: "S102", forwardCheck: true, forwardText: 'Forword', back: false },
  { name: 'mou_pending', value: 'S102', createdBy: "Tes2", forward: "S104", forwardCheck: true, forwardText: 'Forword', back: false },
  { name: 'mou_change_by_admin', value: 'S103', createdBy: "Tes3", forward: "S104", forwardCheck: true, forwardText: 'Forword', back: true },
  { name: 'mou_porposed_by_lm', value: 'S104', createdBy: "Tes4", forward: "S110", forwardCheck: true, forwardText: 'Forword', back: true, backStatus: "S103", backbuttonText: 'Change Req' },
  { name: 'agreementsigned', value: 'S105', createdBy: "Tes5", forward: "S107", forwardCheck: true, forwardText: 'Forword', back: false, type: true },
  { name: 'mou_accepted_by_client', value: 'S106', createdBy: "Tes6", forward: "S105", forwardCheck: true, forwardText: 'Forword', back: false },
  { name: 'bodassigned', value: 'S107', createdBy: "Tes4", forward: "S108", forwardCheck: true, forwardText: 'Forword', back: false },
  { name: 'tto_req_approved', value: 'S108', createdBy: "Tes5", forward: "S109", forwardCheck: true, forwardText: 'Forword', back: false },
  { name: 'ipm_assigned', value: 'S109', createdBy: "Tes6", forward: "S110", forwardCheck: true, forwardText: 'Forword', back: false },
  { name: 'mou_proposed_by_admin', value: 'S110', createdBy: "Tes6", forward: "S111", forwardCheck: true, forwardText: 'Client request Change', approvedvalue: 'S112', approved: true, approvedText: "Approved", back: false, backStatus: "S112", backbuttonText: 'Mou Change By Client' },
  { name: 'mou_change_by_client', value: 'S111', createdBy: "Tes3", forward: "S103", forwardCheck: true, forwardText: 'Forword', back: false },
    { name: 'mou_approved_by_admin', value: 'S112', createdBy: "Tes3", forward: "S106", forwardCheck: true, forwardText: 'Forword', back: false },
    { name: 'tta_init', value: 'S113', createdBy: "Tes3", forward: "S106", forwardCheck: true, forwardText: 'Forword', back: false },
  ]
  activearray = this.array[0];

  constructor(private route: ActivatedRoute, private Bdoservice: Bdoservice, private formbuilder: FormBuilder, private _cookieService: CookieService)
  {
    this.usertype = this._cookieService.get("UserType");
    this.UserName = this._cookieService.get("UserName");
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      if (params.type == "ViewMouAll") {
        this.type = "ViewMouAll";
        this.createdBy = this.UserName;
      }
      else if(params.type == "tta_init"){
        this.type = "tta_init";
        this.createdBy = this.UserName;
      }
      else {
      this.type = this.array.find(x => x.name == params.type).value;
      this.activearray = this.array.find(x => x.name == params.type);
      this.createdBy = this.array.find(x => x.name == params.type).createdBy;
      }

    })
    this.Bdoservice.GetMou().subscribe(data => {
      console.log(data)
      debugger
      if (this.type == "ViewMouAll") {
        this.mouModel = data.filter(x => x.nodal_Name == this.UserName);
        this.showClientPage = true;
      }

      else if (this.type == "tta_init") {
        this.mouModel = data.filter(x => x.nodal_Name == this.UserName && x.app_Status=="S113");
        this.showClientPage = true;
      }
      else {
        this.mouModel = data.filter(x => x.app_Status == this.type);
        this.showpage = true;
      }
      

    })
    this.ForwardForm = this.formbuilder.group({

      subject: ['', Validators.required],
      remarks: [''],
      type: ['']
    });
  }
  get f() { return this.ForwardForm.controls; }
  fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      const fileUpload = event.target.files[0];
      const filee = fileUpload.files;
      this.UploadFileViewModel.fileFullName = fileUpload.name;

      const sFileExtension = fileUpload.name
        .split('.')
      [fileUpload.name.split('.').length - 1].toLowerCase();
      Utilities.getBase64(event.target.files[0]).then((data) => {
        console.log(data);
        this.UploadFileViewModel.fileType = '.' + sFileExtension;

        let data1: any = data;
        let contentType = data1?.split(',')[1];

        this.UploadFileViewModel.file64 = contentType;
      });
    }
  }
  uploadFile() {

    this.submitted = true;
    this.UploadFileViewModel.subject = this.ForwardForm.get('subject').value;
    this.UploadFileViewModel.remarks = this.ForwardForm.get('remarks').value;
    this.UploadFileViewModel.type = this.ForwardForm.get('type').value;

    this.UploadFileViewModel.createdBy = this.createdBy;
    this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {

      alert("Application Forward Successfully")
      this.editorModal1.hide();
      this.ngOnInit();
    })


  }

  onmodalclick(e: string, data: mouModel) {
    this.UploadFileViewModel.app_Status = e == "approve" ? this.array.find(x => x.value == this.type).approvedvalue :
      "forword" ? this.array.find(x => x.value == this.type).forward : this.array.find(x => x.value == this.type).backStatus;
    this.UploadFileViewModel.app_ref_id = data.refid;
    if (e == "forword" || e == "back") {
      this.editorModal1.show();
    }
    else if ("approve") {
      this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {

        alert("Application Approved Successfully")
        //this.editorModal1.hide();
        this.ngOnInit();
      })

    }
  }

  //for client start
  onClientClick(data: mouModel) {
    this.UploadFileViewModel.app_ref_id = data.refid;
    this.UploadFileViewModel.app_Status = "S113"
    this.editorModal2.show();

  }

  ClientfileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      const fileUpload = event.target.files[0];
      const filee = fileUpload.files;
      this.UploadFileViewModel.fileFullName = fileUpload.name;

      const sFileExtension = fileUpload.name
        .split('.')
      [fileUpload.name.split('.').length - 1].toLowerCase();
      Utilities.getBase64(event.target.files[0]).then((data) => {
        console.log(data);
        this.UploadFileViewModel.fileType = '.' + sFileExtension;

        let data1: any = data;
        let contentType = data1?.split(',')[1];

        this.UploadFileViewModel.file64 = contentType;
      });
    }
  }
  uploadClientFile() {

    this.submitted = true;
    this.UploadFileViewModel.subject = this.ForwardForm.get('subject').value;
    this.UploadFileViewModel.remarks = this.ForwardForm.get('remarks').value;
    this.UploadFileViewModel.type = this.ForwardForm.get('type').value;

    this.UploadFileViewModel.createdBy = this.createdBy;
    this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {

      alert("Assignment/Tech. Disclosure form uploaded successfully")
      this.editorModal2.hide();
      this.ngOnInit();
    })
  }
  //for client end

}
