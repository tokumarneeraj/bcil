import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {mouModel} from '../../model/mou.model';
import {Bdoservice} from '../../services/bdo.service'
import {Utilities} from '../../services/utilities';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {UploadFileViewModel} from '../../model/uploadFile.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-bcil-init',
  templateUrl: './bcil-init.component.html',
  styleUrls: ['./bcil-init.component.css']
})
export class BcilInitComponent implements OnInit {
mouModel:mouModel[];
showpage=false;
type:string;
closeResult = '';
ForwardForm:FormGroup;
submitted=false;
createdBy="";
UploadFileViewModel = new UploadFileViewModel();
@ViewChild('editorModal1', { static: true })
  editorModal1: ModalDirective;
  isbackbutton=false;
array=[{name:'init',value:'S101',createdBy:"Test1",forward:"S102",back:false},
{name:'mou_pending',value:'S102',createdBy:"Tes2" ,forward:"S104",back:false},
{name:'mou_change_by_admin',value:'S103',createdBy:"Tes3",forward:"S104",back:false},
{name:'mou_porposed_by_lm',value:'S104',createdBy:"Tes4",forward:"S110",back:true,backStatus:"S103"},
{name:'agreementsigned',value:'S105',createdBy:"Tes5",forward:"S106",back:false},
{name:'mou_accepted_by_client',value:'S106',createdBy:"Tes6",forward:"S107",back:false},
{name:'bodassigned',value:'S107',createdBy:"Tes4",forward:"S108",back:false},
{name:'tto_req_approved',value:'S108',createdBy:"Tes5",forward:"S109",back:false},
{name:'ipm_assigned',value:'S109',createdBy:"Tes6",forward:"S110",back:false},
{name:'mou_proposed_by_admin',value:'S110',createdBy:"Tes6",forward:"S111",back:false},

]

  constructor(private route:ActivatedRoute,private Bdoservice:Bdoservice,private formbuilder: FormBuilder) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params)=>{
this.type=this.array.find(x=>x.name==params.type).value;
this.createdBy=this.array.find(x=>x.name==params.type).createdBy;
this.isbackbutton=this.array.find(x=>x.name==params.type).back;
    })
    this.Bdoservice.GetMou().subscribe(data=>{console.log(data)
      debugger
      this.mouModel=data.filter(x=>x.app_Status==this.type);
      this.showpage=true;
      })
      this.ForwardForm = this.formbuilder.group({
          
        subject: ['', Validators.required],
        remarks:[''],
      });
  }
  get f() { return this.ForwardForm.controls; }
  fileChangeEvent(event){
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

        let data1:any=data;
        let contentType = data1?.split(',')[1];
     
        this.UploadFileViewModel.file64 = contentType;
      });
    }
  }
  uploadFile(){
    
      this.submitted=true;
      this.UploadFileViewModel.subject=this.ForwardForm.get('subject').value;
      this.UploadFileViewModel.remarks=this.ForwardForm.get('remarks').value;
     
      this.UploadFileViewModel.createdBy=this.createdBy;
      this.Bdoservice.uploadfile(this.UploadFileViewModel).subscribe((event) => {

        alert("Application Forward Successfully")
        this.editorModal1.hide();
        this.ngOnInit();    
      })
    

  }
  onmodalclick(e:string,data:mouModel){
    this.UploadFileViewModel.app_Status=e=="forword"?this.array.find(x=>x.value==this.type).forward:this.array.find(x=>x.value==this.type).backStatus;
    this.UploadFileViewModel.app_ref_id=data.refid;
    this.editorModal1.show();
  }

}
