export class StorageHelper{

    private static readonly tokenKey = "tokenKey";
    private static readonly rememberEmail: string = "rememberEmail";
    private static readonly registerTokenKey="registerTokenKey";
    private static readonly passwordToken: string ="passwordTokenKey";


    public static getToken(){
        return window.localStorage[this.tokenKey];
    }

    public static setToken(token:string){
        window.localStorage[this.tokenKey] = token;
    }

    public static getRegisterToken(){
        return window.localStorage[this.registerTokenKey];
    }

    public static setRegisterToken(token:string){
        window.localStorage[this.registerTokenKey] = token;
    }

    public static getPasswordToken(){
        return window.localStorage[this.passwordToken];
    }

    public static setPasswordToken(token:string){
        window.localStorage[this.passwordToken] = token;
    }
    public static getRememberEmail(){
        return window.localStorage[this.rememberEmail];
    }

    public static setRememberEmail(token:string){
        window.localStorage[this.rememberEmail] = token;
    }

  
}