export class UploadFileViewModel {

  public fileType: string;
  public uploadType: string;
  public subject: string;
  public file64: any;
  public fileFullName: string;
  public remarks: string;
  public app_Status: string;
  public createdBy: string;
  public app_ref_id: string;
  public type: string;
  public assignto: string;
  public nodalofficer: string;
  public assigntoadmin: string;
  public assigntoluf: string;
  public assigntocompany: string;
  public assigntoscientist: string;
  public assigntoadmin:string;
  public  remindertype:string;
  public createdon: string; 
  public nodal:nodalOfficer;
}


export class nodalOfficer{

  public nodal_name:string;
  public nodal_email:string;
  public nodal_mobile:string;
}
