import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {mouModel, Reminder, StatusMaster} from '../model/mou.model';
import {UploadFileViewModel} from '../model/uploadFile.model';
import {environment} from '../../environments/environment'
import { filehistoryModel } from '../model/filehistory';
import { AccountService } from './account.service';
import { notificationmodel } from '../model/notification.model';
@Injectable()
export class Bdoservice
{
    get addmouurl() { return  environment.baseUrl+'/api/bdo/addmou'; }


    get notificationseenurl(){return  environment.baseUrl+'/api/bdo/notificationseen';}
    get addreminderurl() { return  environment.baseUrl+'/api/bdo/addreminder'; }
    get editreminderurl() { return  environment.baseUrl+'/api/bdo/editreminder'; }
    get getallnotificationurl() { return  environment.baseUrl+'/api/bdo/getallnotification'; }
    get getreminderurl() { return  environment.baseUrl+'/api/bdo/getallreminder'; }

    get getcustomreminderbystage(){ return  environment.baseUrl+'/api/bdo/getcustomreminder';}
    get getmouurl() { return environment.baseUrl+'/api/bdo/getmou'; }
    get getstatusmasterurl() { return environment.baseUrl+'/api/bdo/getstatusmaster'; }

    get fileuploadurl() { return environment.baseUrl + '/api/FileUploads/AddFile'; }
    get filehistory() { return environment.baseUrl + '/api/bdo/getfile'; }
    UserId:string;
    constructor(private http: HttpClient ,private accountService: AccountService,){
      this.UserId = this.accountService.currentUser.id;
    }
   public uploadfile<T>(upload:UploadFileViewModel):Observable<UploadFileViewModel>{
    const headers = new HttpHeaders({
            
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    });

    return this.http.post<UploadFileViewModel>(this.fileuploadurl, JSON.stringify(upload),{headers:headers});
  //   .pipe<mouModel>(
   }

    public  AddMou<T>(mou:mouModel): Observable<mouModel> {
      mou.createdBy=this.UserId;
        const headers = new HttpHeaders({
            
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
          });
      
          return this.http.post<mouModel>(this.addmouurl, JSON.stringify(mou),{headers:headers});
        //   .pipe<mouModel>(
        //     catchError(error => {
        //       return this.handleError(error, () =>{});
        //     }));
        }

         public  GetMou<T>(): Observable<mouModel[]> {
        
          return this.http.get<mouModel[]>(this.getmouurl);
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