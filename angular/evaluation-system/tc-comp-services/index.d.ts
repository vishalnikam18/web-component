export interface IConfigData {
    env: string;
    tokens?: ITokens;
    appStorageName?: string;
    defaultExpiryTime?: number;
    platform?: string;
}
export interface ITokens {
    [tokenType: string]: string;
}
export interface IRequestOptions {
    monitorRequest?: boolean;
    tokenType?: string;
    appendContentType?: boolean;
}
export declare enum TOKEN_TYPES_ENUM {
    OAuth = "oAuthToken",
    Jwt = "jwtToken",
    Gms = "gmsToken"
}
export interface IValidationResult {
    success: boolean;
    errorCode?: string;
    errorMessage?: string;
}
export interface ILocalStorage {
    [featureName: string]: any;
}
export interface IStorageParam {
    type?: string;
    key: string;
    expiryTime?: number;
    value?: any;
}
