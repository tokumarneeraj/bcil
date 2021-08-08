export class mouModel {
  public refid: string;
  public int_Uni_Name: string;
  public dept_Name: string;

  public address: string;

  public phoneNo: string;
  public email: string;
  public gstNo: string;
  public dir_Head_Name: string;

  public dir_Phone_No: string;
  public dir_Mobile_No: string;
  public dir_Email: string;
  public nodal_Name: string;
  public nodal_Phone_No: string;

  public nodal_Mobile_No: string;
  public nodal_Email: string;
  public nodal_Designation: string;
  public dir_Designation: string;

  public int_Uni_Drop: string;
  public dir_Designation_Drop: string;
  public nodal_Designation_Drop: string;

  public app_Status: string;
  public assignto: string;
  public assigntoadmin: string;
  public createdBy:string;

  public createdOn:Date;
} 

export class StatusMaster{

  public status_name:string;
  public status_code:string;
  public stage:string;
  public stagetype:string;
  public id:string;

}
export class Reminder{

  public stage:string;
  public stagetype:string;
  public typereminder:string;

  public mouref:string;
  public deadlineinputtime:string;
  public deadlinetimetype:string;
  public owner:string;
  public lapselowreminputtime:string;
  public lapselowremtypetime:string;
  public lapsemedreminputtime:string;
  public lapsemedremtypetime:string;
  public lapsehighreminputtime:string;
  public lapsehighremtypetime:string;
  public deadlinelowreminputtime:string;
  public deadlinelowremtypetime:string;
  public deadlinemedreminputtime:string;

  public deadlinemedremtypetime:string;
  public deadlinehighreminputtime:string;
  public deadlinehighremtypetime:string;

  public repeatreminputtime:string;
  public repeatremtypetime:string;
  public id:string;
  public createdBy:string;
  public status:boolean;

}
