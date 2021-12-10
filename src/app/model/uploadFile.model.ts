export class UploadFileViewModel {
  public fileaccess: string;
  public fileused:string;
  public fileType: string;
  public uploadType: string;
  public subject: string;
  public stage: string;
  public organization:string;
  public booleancheck:boolean;
  public jsontwo:string;
  public file64: any;
 public arraytype:any[];
  public fileFullName: string;
  public remarks: string;
  public app_Status: string;
  public createdBy: string;
  public app_ref_id: string;
  public app_no: string;
  public type: string;
  public assignto: string;
  public nodalofficer: string;
  public assigntoadmin: string;
  public assigntoluf: string;
  public assigntocompany: string;
  public assigntoscientist: string;
 public assigntobdo:string;
 public assigntolm:string;
  public  remindertype:string;
  public createdon: string; 
  public milestones:milestones[];
  public nodal:nodalOfficer;
  public emailsend:emailsend;
  public jsondata:any;
  
}

export class milestones{
  public id:string;
  public misref:string;
  public refid:string;
  public appno:string;
  public app_status:string;
  public milestone:string;
  public timeline:Date;
  public paymentterm:string;
  public paymenttype:string;
}
export class nodalOfficer{

  public nodal_name:string;
  public nodal_email:string;
  public nodal_mobile:string;
}
export class emailsend{
  public email:any;
  public emailcheck: boolean;
  public emailtemplate: any;
}