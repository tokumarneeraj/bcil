import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {mouModel} from '../model/mou.model';
import {UploadFileViewModel} from '../model/uploadFile.model';
import {environment} from '../../environments/environment'
@Injectable()
export class Bdoservice
{
    get addmouurl() { return environment.baseUrl + '/api/bdo/addmou'; }
    get getmouurl() { return environment.baseUrl + '/api/bdo/getmou'; }

    get fileuploadurl() { return environment.baseUrl + '/api/FileUploads/AddFile'; }
    constructor(private http: HttpClient ){

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

       

}