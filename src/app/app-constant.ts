import { environment } from "src/environments/environment";

export const getServerApiUrl = (): string => {
    return environment.backendApiUrl;
};
export const storageKey: any = {
    USER: 'user',
    TOKEN: 'token',
    LANGUAGES: 'languages',
    AUTHORIZATION: 'authorization',
    USER_INFO: 'userInfo',
    REFERER: 'redirect'
};