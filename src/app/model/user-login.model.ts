export class UserLogin {
    constructor(userName?: string, password?: string, rememberMe?: boolean) {
        this.userName = userName;
        this.password = password;
        this.rememberMe = rememberMe;
    }

    userName: string;
    password: string;
    rememberMe: boolean;
}
export class ResetPassword {
    Password: string;
    ConfirmPassword: string;
    Email: string;
    Token: string;
}
export class ForgetPassword {
    constructor(Email?:string,clientUrl?:string) {
        this.Email = Email;
        this.ClientURI = clientUrl;

    }

    Email: string;
    ClientURI: string;

}
