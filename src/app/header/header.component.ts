import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //this.loadscript()
  }
  loadscript(){
    const dynamicScripts = [
      // './assets/js/jquery/jquery.min.js',
      // './assets/js/SmoothScroll.js',
      // './assets/js/jquery.mCustomScrollbar.concat.min.js ',
      // './assets/js/pcoded.min.js',
      // './assets/js/vertical-layout.min.js',
      // './assets/pages/dashboard/custom-dashboard.js',
    //'./assets/js/script.js'
    
      
      
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
