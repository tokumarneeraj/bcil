import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utilities } from '../services/utilities';

@Component({
  selector: 'image-uploader',
  template: `
    <label class="uploader" ondragover="return false;"
    [class.loaded]="loaded" 
    [style.outlineColor]="dragging ? activeColor : baseColor"
    (dragenter)="handleDragEnter()"
    (dragleave)="handleDragLeave()"
    (drop)="handleDrop($event)">
    
    <i class="icon icon-upload fa fa-upload" 
        [style.color]="dragging 
            ? ((imageSrc.length > 0) ? overlayColor : activeColor)
            : ((imageSrc.length > 0) ? overlayColor : baseColor)"></i>
    
    <img 
        [src]="imageSrc" 
        (load)="handleImageLoad()" 
        [class.loaded]="imageLoaded"/>
    
    <input type="file" name="file" accept="image/*"
        (change)="handleInputChange($event)">
</label>
  `,
  styleUrls: ['./image-uploader.component.css'],
  inputs:['activeColor','baseColor','overlayColor']
})

export class ImageUploaderComponent {
    
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    overlayColor: string = 'rgba(255,255,255,0.5)';
    @Input() photo:string;
    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    getbaseurl=environment.baseUrl;
    public imageSrc: string = 'gvv';
    @Input()imgname="";
   imagename:string="";
   imageurl:string="";
    
//    constructor(){
//        alert(this.photo)
//     this.imageSrc=this.getbaseurl +"/"+this.photo?.replace(/\//g,"/");
//    }
   ngOnInit() {
    this.imageSrc=this.photo
   }
   @Output() imagechange = new EventEmitter<any>();
  
    handleDragEnter() {
        this.dragging = true;
    }
    
    handleDragLeave() {
        this.dragging = false;
    }
    
    handleDrop(e) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }
    
    handleImageLoad() {
        this.imageLoaded = true;
    }

    handleInputChange(e) {
        debugger;
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        Utilities.getBase64(file).then((data) => {
            console.log(data);
          //  this.UploadFileViewModel.fileType = '.' + sFileExtension;
    
            let data1: any = data;
          this.imagename= file.name
           this.imageurl = data1?.split(',')[1];
    this.imagechange.emit({imagename:file.name,imageurl:this.imageurl})
   
          //  this.UploadFileViewModel.file64 = contentType;
        this.loaded = false;

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
       
        });
    }
    
    _handleReaderLoaded(e) {
        var reader = e.target;
        this.imageSrc = reader.result;
        this.loaded = true;
    }
    // fileChangeEvent(event) {
    //     if (event.target.files && event.target.files[0]) {
    //       const fileUpload = event.target.files[0];
    //       const filee = fileUpload.files;
    //       if( fileUpload.size<=30*1024*1024){
    //       this.UploadFileViewModel.fileFullName = fileUpload.name;
    
    //       const sFileExtension = fileUpload.name
    //         .split('.')
    //       [fileUpload.name.split('.').length - 1].toLowerCase();
    //       Utilities.getBase64(event.target.files[0]).then((data) => {
    //         console.log(data);
    //         this.UploadFileViewModel.fileType = '.' + sFileExtension;
    
    //         let data1: any = data;
    //         let contentType = data1?.split(',')[1];
    
    //         this.UploadFileViewModel.file64 = contentType;
    //       });
    //     }
    //     else{
    //       this.ForwardForm.get('files').setValue("");
    //       alert("File Size Should be less than 30 MB")
    //     }
    //   }
    //   }
}