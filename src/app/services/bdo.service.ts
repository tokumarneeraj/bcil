import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {mouModel} from '../model/mou.model';
import {environment} from '../../environments/environment'
@Injectable()
export class Bdoservice
{
    get addmouurl() { return environment.baseUrl + '/api/bdo/addmou'; }
    get getmouurl() { return environment.baseUrl + '/api/bdo/getmou'; }
    constructor(private http: HttpClient ){

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