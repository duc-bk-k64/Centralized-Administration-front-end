import { HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Table} from "primeng/table/table";
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { SecureStorageService } from '../storage/secure-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService  {
    public loginUrl = getServerApiUrl() + '/auth/login';
    public logoutUrl = getServerApiUrl() + '/auth/logout';

    constructor(
        protected httpClient: HttpClient,
        protected router: Router,
        private secureStorageService: SecureStorageService,
        public jwtHelper: JwtHelperService
    ) {
       
    }

    public isAuthenticated(): boolean {
        try {
            let token = this.secureStorageService.getItem(storageKey.TOKEN) //localStorage.getItem(storageKey.TOKEN);
            // console.log(token);
            if (token === undefined) {
                token = '';
                return false;
            }
            // console.log(this.jwtHelper.decodeToken(token));
            return !this.jwtHelper.isTokenExpired(token);

        } catch (e) {
            return false;
        }
    }
    public isAuthorized(): boolean {
        try{
            let token = this.secureStorageService.getItem(storageKey.TOKEN)
            let username= this.jwtHelper.decodeToken(token).sub;
            if(username.includes('admin')) {
                return true;
            }
            // console.log(username);
            return false;
         
        }catch (ex){
            return false;
        }
    }
    public getUsername(): string {
        try{
            let token = this.secureStorageService.getItem(storageKey.TOKEN)
            let username= this.jwtHelper.decodeToken(token).sub;
            return username;
         
        }catch (ex){
            return "";
        }

    }

    

    getToken(): string {
        return this.secureStorageService.getItem(storageKey.TOKEN);
    }


   
    setToken(token: string) {
        this.secureStorageService.setItem(storageKey.TOKEN,token);
    }
    getRedirectUrl(): string {
        return this.secureStorageService.getItem(storageKey.REFERER);
    }

    setRedirectUrl(url: string) {
        // url = url === "/" ? "" : url;
        this.secureStorageService.setItem(storageKey.REFERER, url);
    }
    

}
