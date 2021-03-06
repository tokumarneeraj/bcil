import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {activeusermou, addusertomou, mouModel, Reminder, StatusMaster} from '../model/mou.model';
import {UploadFileViewModel} from '../model/uploadFile.model';
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


    get notificationseenurl(){return  environment.baseUrl+'/api/bdo/notificationseen';}
    get addreminderurl() { return  environment.baseUrl+'/api/bdo/addreminder'; }
    get editreminderurl() { return  environment.baseUrl+'/api/bdo/editreminder'; }
    get getallnotificationurl() { return  environment.baseUrl+'/api/bdo/getallnotification'; }
    get assignscientisturl(){return environment.baseUrl+'/api/bdo/assignscientist'}
get getscientistbynodalurl(){return environment.baseUrl+'/api/bdo/getscibyno'}
    get getactiveusermouuseridurl() { return  environment.baseUrl+'/api/bdo/getactivebyuserid'; }
    get getmouuser() { return  environment.baseUrl+'/api/bdo/getmouuser'; }
    get getactiveusermouurl() { return  environment.baseUrl+'/api/bdo/getallactiveusermou'; }
    get getreminderurl() { return  environment.baseUrl+'/api/bdo/getallreminder'; }

    get getcustomreminderbystage(){ return  environment.baseUrl+'/api/bdo/getcustomreminder';}
    get getmouurl() { return environment.baseUrl+'/api/bdo/getmou'; }
    get getstatusmasterurl() { return environment.baseUrl+'/api/bdo/getstatusmaster'; }
    
    get getadditionalfile() { return environment.baseUrl + '/api/FileUploads/getaddifile'; }
    get removeadditionalfile() { return environment.baseUrl + '/api/FileUploads/removeaddifile'; }
    get additionalfileuploadurl() { return environment.baseUrl + '/api/FileUploads/AddAdditionFile'; }
    get fileuploadurl() { return environment.baseUrl + '/api/FileUploads/AddFile'; }
    get filehistory() { return environment.baseUrl + '/api/bdo/getfile'; }

    get datapermission(){return environment.baseUrl + '../../';}
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


         public  GetMou<T>(): Observable<mouModel[]> {
        
          return this.http.get<mouModel[]>(this.getmouurl,this.requestHeaders);
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