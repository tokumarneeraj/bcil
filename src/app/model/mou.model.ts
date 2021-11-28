export class mouModel {
  public refid: string;
  public mou_no:string;
  public tto_no:string;
  public int_Uni_Name: string;
  public int_Uni_Others:string;
  public int_Uni_Code:string;
  public dept_Name: string;

  public address: string;
public remarks:string;
public additionalfilecount:string;
public tto_approved:string;
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
public assigntocompany:string;
public assigntoscientist:string;
public assigntoluf:string;
  public createdOn:Date;
} 

export class misModel{
  public refid:string;
  public subject:string;
  public mouref:string;
  public remark:string;
  public appno:string;
  public institude_code:string;
  public app_Status:string;
}
export class patentModel{
  public refid:string;
  public subject:string;
  public mouref:string;
  public remark:string;
  public appno:string;
  public institude_code:string;
  public app_Status:string;
}
export class ttaModel{
  public refid:string;
  public subject:string;
  public mouref:string;
  public remark:string;
  public appno:string;
  public institude_code:string;
  public app_Status:string;
}
export class trademarkModel{
  public refid:string;
  public subject:string;
  public mouref:string;
  public remark:string;
  public appno:string;
  public institude_code:string;
  public app_Status:string;
}
export class designModel{
  public refid:string;
  public subject:string;
  public mouref:string;
  public remark:string;
  public appno:string;
  public institude_code:string;
  public app_Status:string;
}
export class copyrightModel{
  public refid:string;
  public subject:string;
  public mouref:string;
  public remark:string;
  public appno:string;
  public institude_code:string;
  public app_Status:string;
}
export class plantvarietyModel{
  public refid:string;
  public subject:string;
  public mouref:string;
  public remark:string;
  public appno:string;
  public institude_code:string;
  public app_Status:string;
}

export class StatusMaster {

  public status_name:string;
  public status_code:string;
  public stage:string;
  public stagetype:string;
  public id:string;

}
export class activeusermou{
  public userid:string;
  public username:string;
  public appref:string;
  public userrole:string;
  public active:boolean;
}

export class addusertomou{
  public mouref:string;
  public userid:string;
  public userrole:string;
  
}

//invoice
export class clientInvoiceModel{
  public refid:string;
  public appno:string;
  public organization:string;
  public app_status:string;
  public invoiceno:string;
  public invoicedate:Date;
  public url:string;
  public filename:string;

  public applicationno:string;
  public  activity:any[];
}
export class LufInvoiceModel{
  public refid:string;
  public appno:string;
  public organization:string;
  public app_status:string;
  public invoiceno:string;
  public invoicedate:Date;
  public url:string;
  public filename:string;

  public applicationno:string;
  public  activity:any[];
  public  luffeeinvoice:any;
}
export class LuffeeInvoiceModel{
  public refid:string;
  public lufref:string;
  public date:Date;
  public description:string;
  public price:string;
  
}

export class booleanvalue{
  public refid:string;
  public stagevalue:string;
  public name:string;
  public stageboolvalue:boolean;
  public boolvalue?:boolean;
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

  public deadlinemedremtypetime: string;
  public deadlinehighreminputtime: string;
  public deadlinehighremtypetime: string;

  public repeatreminputtime: string;
  public repeatremtypetime: string;
  public id: string;
  public createdBy: string;
  public status: boolean;

}
