import { Component, OnInit } from '@angular/core';

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
  ngAfterContentInit(){


    //$('body').after(this.scripts)
        this.loadscript();
      }
      loadscript(){
        const dynamicScripts = [
          './assets/js/jquery/jquery.min.js',
          './assets/js/jquery-ui/jquery-ui.min.js',
          './assets/js/popper.js/popper.min.js',
          './assets/js/bootstrap/js/bootstrap.min.js',
          './assets/pages/widget/excanvas.js',
          './assets/pages/waves/js/waves.min.js',
          './assets/js/jquery-slimscroll/jquery.slimscroll.js',
          './assets/js/modernizr/modernizr.js',
          './assets/js/SmoothScroll.js',
          './assets/js/jquery.mCustomScrollbar.concat.min.js ',
          './assets/js/pcoded.min.js',
          './assets/js/vertical-layout.min.js',
          './assets/pages/dashboard/custom-dashboard.js',
        './assets/js/script.js'

        
          
          
        ];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < dynamicScripts.length; i++) {
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
