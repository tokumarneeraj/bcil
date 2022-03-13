import {AfterViewInit, Component, HostBinding, Input, OnInit} from '@angular/core';
import {NavItem} from '../../model/nav-item';
import {NavigationEnd, Router} from '@angular/router';
import {NavService} from '../../services/nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      )
    ])
  ]
})
export class MenuListItemComponent implements OnInit,AfterViewInit {
  expanded: boolean=false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;
icon="fa fa-plus";

  constructor(public navService: NavService,
              public router: Router) {
              //  this.expanded=false;
              router.events.subscribe((val) => {
               setTimeout(()=>{
                this.expanded=false;
                this.icon="fa fa-plus";
                this.navService.closeNav();
               },1000) //alert();
               
                // see also 
               // console.log(val instanceof NavigationEnd) 
            });
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
    
      this.expanded=false;
      this.icon="fa fa-plus";
      this.navService.closeNav();
     },3000)
  }
 
  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item?.children || !item?.children.length) {
      this.router.navigateByUrl(item?.route);
      this.navService.closeNav();
    }
    if (item?.children && item?.children.length) {
      this.expanded = !this.expanded;
      this.icon=this.expanded==true?"fa fa-minus":"fa fa-plus";
    }
  }
}
