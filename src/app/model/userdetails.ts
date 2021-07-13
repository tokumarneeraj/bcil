export class userdetails {
  public id: string;
  public referenceNumber: string;
  public category: string;

  public transactionType: string;
  public chequeNumber: string;
  public transactionNumber: string;


  public micrAccntNumber: string;

  public purpose: string;

  public name: string;

  public address: string;

  public district: string;
  public panNumber: string;

  public mobileNumber: string;

  public emailID: string;

  public amount: string;
  //[Required]
  public transactionCharges: string;


  public totalAmount: string;
  //[Required]
  public totalAmountWords: string;
  public remarks: string;
  public dob?: Date;
  public generatedby: string;
  public transaction_date: Date;
  public invoiceNumber: string;
  public generatedOn?: Date;
  public trustee_bank_name: string;
  public trustee_bank_accnt_nmbr: string;
  public index_id: string;
  public upload: string;
  public cashApproved: string;
  public cashApprovedBy: string;
  public cashApprovedOn: Date;
  public receiptRequestId : number;

  //public  IsGenerated :boolean;
}
