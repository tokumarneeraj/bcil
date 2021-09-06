// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { PermissionValues } from './permission.model';


export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}


export interface AccessToken {
    nbf: number;
    exp: number;
    iss: string;
    aud: string | string[];
    client_id: string;
    sub: string;
    auth_time: number;
    idp: string;
    role: string | string[];
    department: string;
    isLastPasswordChanged: string;
    isApproved: string;
    permission: PermissionValues | PermissionValues[];
    name: string;
    email: string;
    phone_number: string;
    fullname: string;
    jobtitle: string;
    configuration: string;
    scope: string | string[];
    amr: string[];
}


export class result
{
    status:string;
    message:string;
    reason:string;
    data:any;
}

export class remarks{
    remark:string;

    additionalfile:string;
    refid:string;
}