import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {mouModel, Reminder, StatusMaster} from '../model/mou.model';
import {UploadFileViewModel} from '../model/uploadFile.model';
import {environment} from '../../environments/environment'
import { filehistoryModel } from '../model/filehistory';
import { AccountService } from './account.service';
@Injectable()
export class Bdoservice
{
    get addmouurl() { return  environment.baseUrl+'/api/bdo/addmou'; }
    get addreminderurl() { return  environment.baseUrl+'/api/bdo/addreminder'; }
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

        public  AddReminder<T>(reminder:Reminder): Observable<Reminder> {
          reminder.createdBy=this.UserId;
            const headers = new HttpHeaders({
                
                'Content-Type': 'application/json',
                Accept: 'application/json, text/plain, */*'
              });
          
              return this.http.post<Reminder>(this.addreminderurl, JSON.stringify(reminder),{headers:headers});
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