import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { setTimeout } from 'timers';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
scripts:string;
  constructor() { }
 
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    //let row=this;
    // //$('body').after(this.scripts)
    
     
      this.loadscript();

  }
  ngAfterContentInit(){
//setTimeout(()=>{this.loadscript();},5000)
  
    //setTimeout(this.loadscript(),5000)
      
      }
       removeJS(filename){
 var tags = document.getElementsByTagName('script');
 for (var i = tags.length; i >= 0; i--){ //search backwards within nodelist for matching elements to remove
  if (tags[i] && tags[i].getAttribute('src') != null && tags[i].getAttribute('src').indexOf(filename) != -1)
   tags[i].parentNode.removeChild(tags[i]); //remove element by calling parentNode.removeChild()
 }
}

      loadscript(){
         const dynamicScripts1 = [
           './assets/pages/waves/css/waves.min.css',
          
         ]

         const dynamicScripts = [
          // 'https://code.jquery.com/jquery-3.1.0.js'.
          './assets/js/jquery/jquery.min.js',
        './assets/js/jquery-ui/jquery-ui.min.js',
         
         './assets/js/bootstrap/js/bootstrap.min.js',
         './assets/js/popper.js/popper.min.js',
        './assets/pages/widget/excanvas.js',
          './assets/pages/waves/js/waves.min.js',
         './assets/js/jquery-slimscroll/jquery.slimscroll.js',
         './assets/js/modernizr/modernizr.js',
         './assets/js/SmoothScroll.js',
        './assets/js/jquery.mCustomScrollbar.concat.min.js ',
          './assets/js/pcoded.min.js',
           './assets/js/vertical-layout.min.js',
          // './assets/pages/dashboard/custom-dashboard.js',
        './assets/js/script.js'

        
          
          
        ];

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < dynamicScripts1.length; i++) {
          this.removeJS(dynamicScripts1[i])
          const node = document.createElement('link');
          node.href = dynamicScripts1[i];
          node.type = 'text/css';
          node.rel="stylesheet";
         
          //  document.getElementsByClassName('pcoded-container')[0].appendChild(node);
         document.getElementsByTagName('head')[0].appendChild(node);
        }
         
        
            for (let i = 0; i < dynamicScripts.length; i++) {
          this.removeJS(dynamicScripts[i])
          const node = document.createElement('script');
          node.src = dynamicScripts[i];
          node.type = 'text/javascript';
          node.async = false;
          node.charset = 'utf-8'; 
          //  document.getElementsByClassName('pcoded-container')[0].appendChild(node);
         document.getElementsByTagName('body')[0].appendChild(node);
        }
        
         
       
      }

}
