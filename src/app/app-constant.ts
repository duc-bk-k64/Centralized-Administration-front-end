import { AuthService } from './app-management/service/auth.service';
import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const getServerApiUrl = (): string => {
    return environment.backendApiUrl;
};
// export const header =  (): HttpHeaders => {
//     return AuthService
// }
export const storageKey: any = {
    USER: 'user',
    TOKEN: 'token',
    LANGUAGES: 'languages',
    AUTHORIZATION: 'Authorization',
    USER_INFO: 'userInfo',
    REFERER: 'redirect'
};
export const name: any = {
    App: 'APPLICATION',
    Group: 'GROUP',
    User: 'USER'
}