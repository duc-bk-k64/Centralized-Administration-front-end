import {Injectable} from '@angular/core';
import {Table} from "primeng/table/table";
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
// import { SecureStorageService } from '../storage/secure-storage.service';
// import { JwtHelperService } from '@auth0/angular-jwt/lib/jwthelper.service.d';
@Injectable({
    providedIn: 'root'
})
export class AuthService  {
    public loginUrl = getServerApiUrl() + '/auth/login';
    public logoutUrl = getServerApiUrl() + '/auth/logout';

    constructor(
        protected httpClient: HttpClient,
        protected router: Router,
        // private secureStorageService: SecureStorageService,
        // public jwtHelper: JwtHelperService
    ) {
       
    }

    public isAuthenticated(): boolean {
        try {
            let token = 'd' //localStorage.getItem(storageKey.TOKEN);

            if (token === undefined) {
                token = '';
                return false;
            }
            return true

            // return !this.jwtHelper.isTokenExpired(token||'');

        } catch (e) {
            return false;
        }
    }
    // public isAuthorized(uri): boolean {
    //     try{
    //         if (uri === '' || uri === '/' ) {
    //             return true;
    //         }
    //         if (uri.includes("?")){
    //             uri = uri.split("?")[0];
    //         }
    //         const authorization = JSON.parse(localStorage.getItem("authorization"));
    //         const arrAuth = Object.keys(authorization);
    //         if (arrAuth.indexOf(uri) >= 0 ){
    //             return true;
    //         }else{
    //             return false;
    //         }
    //     }catch (ex){
    //         return false;
    //     }
    // }

    

    // getToken(): string {
    //     return this.secureStorageService.getItem(storageKey.TOKEN);
    // }


   
    // setToken(token: string) {
    //     this.secureStorageService.setItem(storageKey.TOKEN,token);
    // }
    // getRedirectUrl(): string {
    //     return this.secureStorageService.getItem(storageKey.REFERER);
    // }

    // setRedirectUrl(url: string) {
    //     url = url === "/" ? "" : url;
    //     this.secureStorageService.setItem(storageKey.REFERER, url);
    // }

}
