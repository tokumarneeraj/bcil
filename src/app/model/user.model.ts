export class User {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(id?: string, userName?: string, fullName?: string, email?: string, jobTitle?: string, phoneNumber?: string, roles?: string[], isapproved?: string, department?: string,imgUrl?: string,img?: string,  isLastPasswordChanged?: string,title?: string) {

    this.id = id;
    this.userName = userName;
    
    this.fullName = fullName;
    this.email = email;
    this.jobTitle = jobTitle;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
    this.img=img;
    this.imgUrl=imgUrl;
    this.isapproved = isapproved;
    this.department = department;
    this.isLastPasswordChanged = isLastPasswordChanged;
    this.title = title;
  }


  get friendlyName(): string {
    let name = this.fullName || this.userName;

    if (this.jobTitle) {
      name = this.jobTitle + ' ' + name;
    }

    return name;
  }


  public id: string;
  public department: string;
  public isapproved: string;
  public userName: string;
  public fullName: string;
  public title: string;
  public img:string;
  public imgUrl:string;
  public email: string;
  public jobTitle: string;
  public phoneNumber: string;
  public isEnabled: boolean;
  public isLockedOut: boolean;
  public roles: string[];
  public isLastPasswordChanged: string;
  public createdBy: string;
}
