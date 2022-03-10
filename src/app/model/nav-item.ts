export interface NavItem {
  id:number;
  stage:string;
  substage:string;
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
  }
  