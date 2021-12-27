import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {activeusermou, addusertomou, booleanvalue, copyrightModel, designModel, LufInvoiceModel, misModel, mouModel, patentModel, plantvarietyModel, Reminder, StatusMaster, trademarkModel, ttaModel} from '../model/mou.model';
import {UploadFileViewModel} from '../model/uploadFile.model';
import {clientInvoiceModel} from '../model/mou.model'
import {environment} from '../../environments/environment'
import { filehistoryModel } from '../model/filehistory';
import { AccountService } from './account.service';
import { notificationmodel } from '../model/notification.model';
import { EndpointBase } from './endpoint-base.service';
import { AuthService } from './auth.service';
import { result } from '../model/login-response.model';
@Injectable()
export class Bdoservice  extends EndpointBase
{
    get addmouurl() { return  environment.baseUrl+'/api/bdo/addmou'; }

get getdashboardata(){return  environment.baseUrl+'/api/bdo/getdashboarddata'}
    get notificationseenurl(){return  environment.baseUrl+'/api/bdo/notificationseen';}
    get addreminderurl() { return  environment.baseUrl+'/api/bdo/addreminder'; }
    get editreminderurl() { return  environment.baseUrl+'/api/bdo/editreminder'; }
    get getallnotificationurl() { return  environment.baseUrl+'/api/bdo/getallnotification'; }
    get assignscientisturl(){return environment.baseUrl+'/api/bdo/assignscientist'}
get getscientistbynodalurl(){return environment.baseUrl+'/api/bdo/getscibyno'}
get getscientistbynodalorgurl(){return environment.baseUrl+'/api/bdo/scibyorg'}

    get getactiveusermouuseridurl() { return  environment.baseUrl+'/api/bdo/getactivebyuserid'; }
    get getmouuser() { return  environment.baseUrl+'/api/bdo/getmouuser'; }
    get getallactivity() { return  environment.baseUrl+'/api/bdo/getallactivity'; }
    get getallinvoicetrigger() { return  environment.baseUrl+'/api/bdo/getinvtrg'; }
    get deleteinvoicetrigger() { return  environment.baseUrl+'/api/bdo/deletetrigger'; }
    
    get getactiveusermouurl() { return  environment.baseUrl+'/api/bdo/getallactiveusermou'; }
    get getreminderurl() { return  environment.baseUrl+'/api/bdo/getallreminder'; }

    get getcustomreminderbystage(){ return  environment.baseUrl+'/api/bdo/getcustomreminder';}
    get getmouurl() { return environment.baseUrl+'/api/bdo/getmou'; }
    get getorganization() { return environment.baseUrl+'/api/bdo/getorg'; }
    get getcountry() { return environment.baseUrl+'/api/bdo/getcountry'; }
    get getorganizationuserid() { return environment.baseUrl+'/api/bdo/getorganizationbyuserid'; }
    get getallorganization() { return environment.baseUrl+'/api/bdo/getallorganization'; }
    get getmisurl() { return environment.baseUrl+'/api/bdo/getotherservice'; }
    get getpatenturl() { return environment.baseUrl+'/api/bdo/getpatentservice'; }
    get getcheckforiegnurl() { return environment.baseUrl+'/api/bdo/checkforiegnfiling'; }

    
    get getttaurl() { return environment.baseUrl+'/api/bdo/getttaservice'; }

    
    get getcopyrighturl() { return environment.baseUrl+'/api/bdo/getcopyright'; }
    get gettrademarkurl() { return environment.baseUrl+'/api/bdo/gettrademark'; }
    get getdesignurl() { return environment.baseUrl+'/api/bdo/getdesign'; }
    get getallmilestoneurl(){return environment.baseUrl+'/api/bdo/getallmilestone';}
    get getmilestoneurl() { return environment.baseUrl+'/api/bdo/getmilestone'; }
    get getplantvarietyurl() { return environment.baseUrl+'/api/bdo/getplantvariety'; }
    get getstatusmasterurl() { return environment.baseUrl+'/api/bdo/getstatusmaster'; }
    
    get getadditionalfile() { return environment.baseUrl + '/api/FileUploads/getaddifile'; }
    get removeadditionalfile() { return environment.baseUrl + '/api/FileUploads/removeaddifile'; }
    get additionalfileuploadurl() { return environment.baseUrl + '/api/FileUploads/AddAdditionFile'; }
    get fileuploadurl() { return environment.baseUrl + '/api/FileUploads/AddFile'; }
    get clientinvoiceurl() { return environment.baseUrl + '/api/bdo/clientinvoice'; }
    get updateclientinvoiceurl(){ return environment.baseUrl + '/api/bdo/updateinvoice';}
    get lufinvoiceurl() { return environment.baseUrl + '/api/bdo/lufinvoice'; }
    get updatelufinvoiceurl() { return environment.baseUrl + '/api/bdo/updatelufinvoice'; }

    get getlufinvoiceurl() { return environment.baseUrl + '/api/bdo/getlufinvoice'; }
    get getclientinvoiceurl() { return environment.baseUrl + '/api/bdo/getclientinvoice'; }
    get filehistory() { return environment.baseUrl + '/api/bdo/getfile'; }
 get getboolvalueurl(){ return environment.baseUrl + '/api/bdo/getboolvalues';}
 get updateboolvalueurl(){ return environment.baseUrl + '/api/bdo/updatebooleanvalue';}
    get datapermission(){return environment.baseUrl + '../../';}

    get rejectappurl(){return environment.baseUrl + '/api/bdo/rejectapp';}
    UserId:string;
    constructor(http: HttpClient ,private accountService: AccountService, authService: AuthService){
     super(http, authService);
    
      this.UserId = this.accountService.currentUser.id;
    }

   
    public getdatapermission(){

      let datapermission= of(require("../../assets/locale/datapermission.json"))
      return datapermission;
      
    }
    public getremarksmou(refid:any){
      return this.http.get<result>(this.removeadditionalfile+"/"+refid,this.requestHeaders);
      
    }
    public  RemoveAdditionalfile<T>(refid:string): Observable<result> {
        
      return this.http.get<result>(this.removeadditionalfile+"/"+refid,this.requestHeaders);
    //   .pipe<mouModel>(
    //     catchError(error => {
    //       return this.handleError(error, () =>{});
    //     }));
    }
    public  GetAdditionalfile<T>(refid:string): Observable<filehistoryModel[]> {
        
      return this.http.get<filehistoryModel[]>(this.getadditionalfile+"/"+refid,this.requestHeaders);
    //   .pipe<mouModel>(
    //     catchError(error => {
    //       return this.handleError(error, () =>{});
    //     }));
    }
    public Addadditionalfile<T>(upload:UploadFileViewModel):Observable<result>{
    
    return this.http.post(this.additionalfileuploadurl, JSON.stringify(upload), this.requestHeaders).pipe<result>(
      catchError(error => {
        return this.handleError(error, () => this.uploadfile(upload));
      }));
  //   .pipe<mouModel>(
   }
   //update bool value


   public updatebooleanvalue<T>(upload:booleanvalue):Observable<result>{
    // const headers = new HttpHeaders({
            
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json, text/plain, */*'
    // });

   // return this.http.post<UploadFileViewModel>(this.fileuploadurl, JSON.stringify(upload),{headers:headers});
    return this.http.post(this.updateboolvalueurl, JSON.stringify(upload), this.requestHeaders).pipe<result>(
      catchError(error => {
        return this.handleError(error, () => this.updatebooleanvalue(upload));
      }));
  //   .pipe<mouModel>(
   }
   public uploadfile<T>(upload:UploadFileViewModel):Observable<result>{
    // const headers = new HttpHeaders({
            
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json, text/plain, */*'
    // });

   // return this.http.post<UploadFileViewModel>(this.fileuploadurl, JSON.stringify(upload),{headers:headers});
    return this.http.post(this.fileuploadurl, JSON.stringify(upload), this.requestHeaders).pipe<result>(
      catchError(error => {
        return this.handleError(error, () => this.uploadfile(upload));
      }));
  //   .pipe<mouModel>(
   }
   public updatelufinvoice<T>(upload:LufInvoiceModel):Observable<result>{
    // const headers = new HttpHeaders({
            
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json, text/plain, */*'
    // });

   // return this.http.post<UploadFileViewModel>(this.fileuploadurl, JSON.stringify(upload),{headers:headers});
    return this.http.post(this.updatelufinvoiceurl, JSON.stringify(upload), this.requestHeaders).pipe<result>(
      catchError(error => {
        return this.handleError(error, () => this.updatelufinvoice(upload));
      }));
  //   .pipe<mouModel>(
   }
   
   public updateclientinvoice<T>(upload:clientInvoiceModel):Observable<result>{
    // const headers = new HttpHeaders({
            
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json, text/plain, */*'
    // });

   // return this.http.post<UploadFileViewModel>(this.fileuploadurl, JSON.stringify(upload),{headers:headers});
    return this.http.post(this.updateclientinvoiceurl, JSON.stringify(upload), this.requestHeaders).pipe<result>(
      catchError(error => {
        return this.handleError(error, () => this.updateclientinvoice(upload));
      }));
  //   .pipe<mouModel>(
   }
   public clientinvoice<T>(upload:clientInvoiceModel):Observable<result>{
    // const headers = new HttpHeaders({
            
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json, text/plain, */*'
    // });

   // return this.http.post<UploadFileViewModel>(this.fileuploadurl, JSON.stringify(upload),{headers:headers});
    return this.http.post(this.clientinvoiceurl, JSON.stringify(upload), this.requestHeaders).pipe<result>(
      catchError(error => {
        return this.handleError(error, () => this.clientinvoice(upload));
      }));
  //   .pipe<mouModel>(
   }
   public lufinvoice<T>(upload:LufInvoiceModel):Observable<result>{
    // const headers = new HttpHeaders({
            
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json, text/plain, */*'
    // });

   // return this.http.post<UploadFileViewModel>(this.fileuploadurl, JSON.stringify(upload),{headers:headers});
    return this.http.post(this.lufinvoiceurl, JSON.stringify(upload), this.requestHeaders).pipe<result>(
      catchError(error => {
        return this.handleError(error, () => this.clientinvoice(upload));
      }));
  //   .pipe<mouModel>(
   }



    public  AddMou<T>(mou:mouModel): Observable<result> {
      mou.createdBy=this.UserId;
        mou.int_Uni_Code=mou.int_Uni_Code.toUpperCase();
          return this.http.post(this.addmouurl, JSON.stringify(mou), this.requestHeaders).pipe<result>(
            catchError(error => {
              return this.handleError(error, () => this.AddMou(mou));
            }));


        }

        public  AddScientist<T>(mou:addusertomou): Observable<result> {
         
            
              return this.http.post(this.assignscientisturl, JSON.stringify(mou), this.requestHeaders).pipe<result>(
                catchError(error => {
                  return this.handleError(error, () => this.AddScientist(mou));
                }));
    
    
            }
        public  GetScientistbynodal<T>(): Observable<activeusermou[]> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         return this.http.get<T>(this.getscientistbynodalurl, this.requestHeaders).pipe<activeusermou[]>(
           catchError(error => {
             return this.handleError(error, () => this.GetScientistbynodal());
           }));
         }
         public  GetAllMilestone<T>(): Observable<any[]> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         const endpointUrl = `${this.getallmilestoneurl}`;
         return this.http.get<any[]>(endpointUrl,this.requestHeaders);
         }
         public  GetDashboardData<T>(): Observable<any[]> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         const endpointUrl = `${this.getdashboardata}`;
         return this.http.get<any[]>(endpointUrl,this.requestHeaders);
         }
         public  GetAllActitvity<T>(refid:string): Observable<any[]> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         const endpointUrl = `${this.getallactivity}`;
         return this.http.get<any[]>(endpointUrl,this.requestHeaders);
         }
         public  GetBoolvalues<T>(refid:string): Observable<any[]> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         const endpointUrl = `${this.getboolvalueurl}/${refid}`;
         return this.http.get<any[]>(endpointUrl,this.requestHeaders);
         }
          public  GetAllInvoiceTrigger<T>(refid:string): Observable<any[]> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         const endpointUrl = `${this.getallinvoicetrigger}/${refid}`;
         return this.http.get<any[]>(endpointUrl,this.requestHeaders);
         }
         public  RejectApp<T>(refid:string): Observable<string> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         const endpointUrl = `${this.rejectappurl}/${refid}`;
         return this.http.get<string>(endpointUrl,this.requestHeaders);
         }
         public  GetLufInvoice<T>(refid:string): Observable<any[]> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         const endpointUrl = `${this.getlufinvoiceurl}/${refid}`;
         return this.http.get<any[]>(endpointUrl,this.requestHeaders);
         }
         public  GetClientInvoice<T>(refid:string): Observable<any[]> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         const endpointUrl = `${this.getclientinvoiceurl}/${refid}`;
         return this.http.get<any[]>(endpointUrl,this.requestHeaders);
         }
         public  GetMilestone<T>(refid:string): Observable<any[]> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         const endpointUrl = `${this.getmilestoneurl}/${refid}`;
         return this.http.get<any[]>(endpointUrl,this.requestHeaders);
         }
         public  GetScientistbynodal_org<T>(refid:string): Observable<any[]> {
        
          // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
         //   .pipe<mouModel>(
         //     catchError(error => {
         //       return this.handleError(error, () =>{});
         //     }));
         const endpointUrl = `${this.getscientistbynodalorgurl}/${refid}`;
         return this.http.get<any[]>(endpointUrl,this.requestHeaders);
         }
         
          
        public  GetActiveUserMoubyuserid<T>(): Observable<activeusermou[]> {
        
         // return this.http.get<activeusermou[]>(this.getactiveusermouuseridurl);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        return this.http.get<T>(this.getactiveusermouuseridurl, this.requestHeaders).pipe<activeusermou[]>(
          catchError(error => {
            return this.handleError(error, () => this.GetActiveUserMoubyuserid());
          }));
        }
        public  GetActiveUserMoubyrefid<T>( id:string): Observable<activeusermou[]> {
          const endpointUrl = `${this.getmouuser}/${id}`;
          return this.http.get<activeusermou[]>(endpointUrl);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  GetActiveUserMou<T>(): Observable<activeusermou[]> {
        
          return this.http.get<activeusermou[]>(this.getactiveusermouurl);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  Getcountry<T>(): Observable<any[]> {
          const endpointUrl = `${this.getcountry}`;
          return this.http.get<any[]>(endpointUrl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        

        public  Getorganization<T>(refid:string): Observable<any[]> {
          const endpointUrl = `${this.getorganization}/${refid}`;
          return this.http.get<any[]>(endpointUrl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }

        public  DeleteTrigger<T>(refid:string): Observable<string> {
          const endpointUrl = `${this.deleteinvoicetrigger}/${refid}`;
          return this.http.get<string>(endpointUrl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        
        public  Getorganizationbyuserid<T>(): Observable<any[]> {
          const endpointUrl = `${this.getorganizationuserid}`;
          return this.http.get<any[]>(endpointUrl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  Getallorganization<T>(refid:string): Observable<any[]> {
          const endpointUrl = `${this.getallorganization}/${refid}`;
          return this.http.get<any[]>(endpointUrl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
         public  GetMou<T>(): Observable<mouModel[]> {
        
          return this.http.get<mouModel[]>(this.getmouurl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  GetMis<T>(): Observable<misModel[]> {
        
          return this.http.get<misModel[]>(this.getmisurl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  GetPatentModel<T>(): Observable<patentModel[]> {
        
          return this.http.get<patentModel[]>(this.getpatenturl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  GetForignFilingModel<T>(): Observable<patentModel[]> {
        
          return this.http.get<patentModel[]>(this.getcheckforiegnurl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  GetTtaModel<T>(role?:any): Observable<ttaModel[]> {
          
          const endpointUrl = `${this.getttaurl}/${role}`;
          return this.http.get<ttaModel[]>(endpointUrl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  GetTrademarkModel<T>(): Observable<trademarkModel[]> {
        
          return this.http.get<trademarkModel[]>(this.gettrademarkurl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  GetCopyrightModel<T>(): Observable<copyrightModel[]> {
        
          return this.http.get<copyrightModel[]>(this.getcopyrighturl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  GetDesignModel<T>(): Observable<designModel[]> {
        
          return this.http.get<designModel[]>(this.getdesignurl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }
        public  GetPlantvarietyModel<T>(): Observable<plantvarietyModel[]> {
        
          return this.http.get<plantvarietyModel[]>(this.getplantvarietyurl,this.requestHeaders);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }

        public  AddReminder<T>(reminder:Reminder,mouref:string): Observable<any> {
          reminder.createdBy=this.UserId;
          reminder.mouref=mouref;
            const headers = new HttpHeaders({
                
                'Content-Type': 'application/json',
                Accept: 'application/json, text/plain, */*'
              });
          
              return this.http.post<any>(this.addreminderurl, JSON.stringify(reminder),{headers:headers});
            //   .pipe<mouModel>(
            //     catchError(error => {
            //       return this.handleError(error, () =>{});
            //     }));
            }

            public  EditReminder<T>(reminder:Reminder,mouref:string): Observable<any> {
              reminder.createdBy=this.UserId;
              reminder.mouref=mouref;
                const headers = new HttpHeaders({
                    
                    'Content-Type': 'application/json',
                    Accept: 'application/json, text/plain, */*'
                  });
              
                  return this.http.post<any>(this.editreminderurl, JSON.stringify(reminder),{headers:headers});
                //   .pipe<mouModel>(
                //     catchError(error => {
                //       return this.handleError(error, () =>{});
                //     }));
                }
    

            public  GetReminder<T>(): Observable<Reminder[]> {
        
              return this.http.get<Reminder[]>(this.getreminderurl);
            //   .pipe<mouModel>(
            //     catchError(error => {
            //       return this.handleError(error, () =>{});
            //     }));
            }

            public GetCustomremiderbystage<T>(mouref:string): Observable<Reminder[]> {
        
              const endpointUrl = `${this.getcustomreminderbystage}/${mouref}`;
              return this.http.get<Reminder[]>(endpointUrl);
            //   .pipe<mouModel>(
            //     catchError(error => {
            //       return this.handleError(error, () =>{});
            //     }));
            }

            public  GetNotification<T>(): Observable<notificationmodel[]> {
        
              const endpointUrl = `${this.getallnotificationurl}/${this.UserId}`;
              return this.http.get<notificationmodel[]>(endpointUrl);
            //   .pipe<mouModel>(
            //     catchError(error => {
            //       return this.handleError(error, () =>{});
            //     }));
            }

            public  Notificationseen<T>(data:string): Observable<notificationmodel[]> {
        
              const endpointUrl = `${this.notificationseenurl}/${data}`;
              return this.http.get<notificationmodel[]>(endpointUrl);
            //   .pipe<mouModel>(
            //     catchError(error => {
            //       return this.handleError(error, () =>{});
            //     }));
            }

        public  GetStatusMaster<T>(): Observable<StatusMaster[]> {
        
          return this.http.get<StatusMaster[]>(this.getstatusmasterurl);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }

        public  Getfile<T>(refid:string): Observable<filehistoryModel[]> {
        
          return this.http.get<filehistoryModel[]>(this.filehistory+"/"+refid);
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }

       

}