import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ForgetPassword, ResetPassword } from '../model/user-login.model';
import { ConfigurationService } from './configuration.service';
import { EndpointBase } from './endpoint-base.service';
import { AuthService } from './auth.service';

// import { AuthService } from './auth.service';
// import { EndpointBase } from './endpoint-base.service';
// import { ConfigurationService } from './configuration.service';
// import { ForgetPassword, ResetPassword } from '../models/user-login.model';



@Injectable()
export class AccountEndpoint extends EndpointBase {
  get departmentUrl() { return this.configurations.baseUrl + '/api/account/department'; }
  get currentDepartmentUrl() { return this.configurations.baseUrl + '/api/account/department/me'; }
  get usersUrl() { return this.configurations.baseUrl + '/api/account/users'; }
  get allusersUrl() { return this.configurations.baseUrl + '/api/account/allusers'; }
  get userByUserNameUrl() { return this.configurations.baseUrl + '/api/account/users/username'; }
  get currentUserUrl() { return this.configurations.baseUrl + '/api/account/users/me'; }
  get currentUserPreferencesUrl() { return this.configurations.baseUrl + '/api/account/users/me/preferences'; }
  get unblockUserUrl() { return this.configurations.baseUrl + '/api/account/users/unblock'; }
  get rolesUrl() { return this.configurations.baseUrl + '/api/account/roles'; }
  get roleByRoleNameUrl() { return this.configurations.baseUrl + '/api/account/roles/name'; }
  get permissionsUrl() { return this.configurations.baseUrl + '/api/account/permissions'; }
  get getBankTransaction() { return this.configurations.baseUrl + '/api/BankTransaction/getallbanktransaction'; }
  get getBankTransactionAdvSearch() { return this.configurations.baseUrl + '/api/BankTransaction/GetAllBankTransactionsByAdvanceSearch'; }
  get getBankTransactionDate() { return this.configurations.baseUrl + '/api/BankTransaction/getallbanktransactionbydate'; }
  get getIPGTransactionByDate() { return this.configurations.baseUrl + '/api/BankTransaction/getAllIBPDetailsbydate'; }
  get inserttelcountercash() { return this.configurations.baseUrl + '/api/TellerCounter/SubmitTellerCash'; }
  get inserttelcountercheque() { return this.configurations.baseUrl + '/api/TellerCounter/SubmitTellerCheque'; }
  get inserttelcountergoods() { return this.configurations.baseUrl + '/api/TellerCounter/SubmitTellerGoods'; }
  get updatetelcountercash() { return this.configurations.baseUrl + '/api/TellerCounter/UpdateTellerCash'; }
  get updatetelcountercheque() { return this.configurations.baseUrl + '/api/TellerCounter/UpdateTellerCheque'; }
  get updatetelcountergoods() { return this.configurations.baseUrl + '/api/TellerCounter/UpdateTellerGoods'; }
  get userForgetpassword() { return this.configurations.baseUrl + '/api/account1/ForgotPassword'; }
  get resetpassword() { return this.configurations.baseUrl + '/api/account1/ResetPassword'; }
  
  get userspermissionAdduserUrl() { return this.configurations.baseUrl + '/api/account/UserpermissiontoAdduser'; }
  get getuserspermissionAdduserUrl() { return this.configurations.baseUrl + '/api/account/GetUserpermissiontoAdduser'; }

  get getuserspermissionAdduserbyroleUrl() { return this.configurations.baseUrl + '/api/account/GetUserpermissiontoAdduserbyrole'; }
  

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
    
    //this.configurations.baseUrl ='http://43.224.139.121';
  }
  // donation verification
  resetPassword<T>(resetPassword: ResetPassword): Observable<T> {
    return this.http.post(this.resetpassword, JSON.stringify(resetPassword), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUserEndpoint());
      }));
  }
  forgetPassword<T>(forgetPassword: ForgetPassword): Observable<T> {
    return this.http.post(this.userForgetpassword, JSON.stringify(forgetPassword), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUserEndpoint());
      }));
  }

  
  
  
  getUserEndpoint<T>(userId?: string): Observable<T> {
    const endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUserEndpoint(userId));
      }));
  }

  getAllUserEndpoint<T>(userId?: string): Observable<T> {
    const endpointUrl = userId ? `${this.allusersUrl}/${userId}` : this.currentUserUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getAllUserEndpoint(userId));
      }));
  }

  getUserByUserNameEndpoint<T>(userName: string): Observable<T> {
    const endpointUrl = `${this.userByUserNameUrl}/${userName}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUserByUserNameEndpoint(userName));
      }));
  }

  getDepartmentsEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    const endpointUrl = page && pageSize ? `${this.departmentUrl}/${page}/${pageSize}` : this.departmentUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDepartmentsEndpoint(page, pageSize));
      }));
  }
  getNewDepartmentEndpoint<T>(userObject: any): Observable<T> {

    return this.http.post<T>(this.departmentUrl, JSON.stringify(userObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNewDepartmentEndpoint(userObject));
      }));
  }

  getUpdateDepartmentEndpoint<T>(userObject: any, userId?: string): Observable<T> {
    const endpointUrl = userId ? `${this.departmentUrl}/${userId}` : this.currentDepartmentUrl;

    return this.http.put<T>(endpointUrl, JSON.stringify(userObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateDepartmentEndpoint(userObject, userId));
      }));
  }
  deleteDepartmentEndpoint<T>( departmentId?: string): Observable<T> {
    const endpointUrl =  `${this.departmentUrl}/${departmentId}`;

    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.deleteDepartmentEndpoint(departmentId));
      }));
  }
  getUsersEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    const endpointUrl = page && pageSize ? `${this.usersUrl}/${page}/${pageSize}` : this.usersUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUsersEndpoint(page, pageSize));
      }));
  }

  getAllUsersEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    const endpointUrl = page && pageSize ? `${this.allusersUrl}/${page}/${pageSize}` : this.allusersUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getAllUsersEndpoint(page, pageSize));
      }));
  }

  GetUserpermissiontoAdduserbyrole<T>(role: string): Observable<T> {

    const endpointUrl = `${this.getuserspermissionAdduserbyroleUrl}/${role}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNewUserEndpoint(role));
      }));
  }
  GetUserpermissiontoAdduser<T>(role: string, roletype: string): Observable<T> {

    const endpointUrl = `${this.getuserspermissionAdduserUrl}/${role}/${roletype}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNewUserEndpoint(role));
      }));
  }
  UserpermissiontoAdduser<T>(userObject: any): Observable<T> {

    return this.http.post<T>(this.userspermissionAdduserUrl, JSON.stringify(userObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNewUserEndpoint(userObject));
      }));
  }

  getNewUserEndpoint<T>(userObject: any): Observable<T> {

    return this.http.post<T>(this.usersUrl, JSON.stringify(userObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNewUserEndpoint(userObject));
      }));
  }

  getUpdateUserEndpoint<T>(userObject: any, userId?: string): Observable<T> {
    const endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;

    return this.http.put<T>(endpointUrl, JSON.stringify(userObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateUserEndpoint(userObject, userId));
      }));
  }

  getPatchUpdateUserEndpoint<T>(patch: {}, userId?: string): Observable<T>;
  getPatchUpdateUserEndpoint<T>(value: any, op: string, path: string, from?: any, userId?: string): Observable<T>;
  getPatchUpdateUserEndpoint<T>(valueOrPatch: any, opOrUserId?: string, path?: string, from?: any, userId?: string): Observable<T> {
    let endpointUrl: string;
    let patchDocument: {};

    if (path) {
      endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;
      patchDocument = from ?
        [{ value: valueOrPatch, path, op: opOrUserId, from }] :
        [{ value: valueOrPatch, path, op: opOrUserId }];
    } else {
      endpointUrl = opOrUserId ? `${this.usersUrl}/${opOrUserId}` : this.currentUserUrl;
      patchDocument = valueOrPatch;
    }

    return this.http.patch<T>(endpointUrl, JSON.stringify(patchDocument), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getPatchUpdateUserEndpoint(valueOrPatch, opOrUserId, path, from, userId));
      }));
  }


  getUserPreferencesEndpoint<T>(): Observable<T> {

    return this.http.get<T>(this.currentUserPreferencesUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUserPreferencesEndpoint());
      }));
  }

  getUpdateUserPreferencesEndpoint<T>(configuration: string): Observable<T> {
    return this.http.put<T>(this.currentUserPreferencesUrl, JSON.stringify(configuration), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateUserPreferencesEndpoint(configuration));
      }));
  }

  getUnblockUserEndpoint<T>(userId: string): Observable<T> {
    const endpointUrl = `${this.unblockUserUrl}/${userId}`;

    return this.http.put<T>(endpointUrl, null, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUnblockUserEndpoint(userId));
      }));
  }

  getDeleteUserEndpoint<T>(userId: string): Observable<T> {
    const endpointUrl = `${this.usersUrl}/${userId}`;

    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeleteUserEndpoint(userId));
      }));
  }





  getRoleEndpoint<T>(roleId: string): Observable<T> {
    const endpointUrl = `${this.rolesUrl}/${roleId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getRoleEndpoint(roleId));
      }));
  }


  getRoleByRoleNameEndpoint<T>(roleName: string): Observable<T> {
    const endpointUrl = `${this.roleByRoleNameUrl}/${roleName}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getRoleByRoleNameEndpoint(roleName));
      }));
  }



  getRolesEndpoint<T>(page?: number, pageSize?: number): Observable<T> {
    const endpointUrl = page && pageSize ? `${this.rolesUrl}/${page}/${pageSize}` : this.rolesUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getRolesEndpoint(page, pageSize));
      }));
  }

  getNewRoleEndpoint<T>(roleObject: any): Observable<T> {

    return this.http.post<T>(this.rolesUrl, JSON.stringify(roleObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNewRoleEndpoint(roleObject));
      }));
  }

  getUpdateRoleEndpoint<T>(roleObject: any, roleId: string): Observable<T> {
    const endpointUrl = `${this.rolesUrl}/${roleId}`;

    return this.http.put<T>(endpointUrl, JSON.stringify(roleObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateRoleEndpoint(roleObject, roleId));
      }));
  }

  getDeleteRoleEndpoint<T>(roleId: string): Observable<T> {
    const endpointUrl = `${this.rolesUrl}/${roleId}`;

    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeleteRoleEndpoint(roleId));
      }));
  }


  getPermissionsEndpoint<T>(): Observable<T> {

    return this.http.get<T>(this.permissionsUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getPermissionsEndpoint());
      }));
  }
}
