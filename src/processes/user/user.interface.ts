export interface IUser {
    id: number;
    attributes: object;
    name: string;
    login: null | string;
    email: string;
    phone: null | string;
    readonly: boolean;
    administrator: boolean;
    map: null | string;
    latitude: number;
    longitude: number;
    zoom: number;
    twelveHourFormat: boolean;
    coordinateFormat: null | string;
    disabled: boolean;
    expirationTime: null | string;
    deviceLimit: number;
    userLimit: number;
    deviceReadonly: boolean;
    limitCommands: boolean;
    disableReports: boolean;
    fixedEmail: boolean;
    poiLayer: null | string;
    totpKey: null | string;
    temporary: boolean;
    password: null | string;
}

export interface IUserState {
    data: IUser | null;
    isLoading: boolean;
    error: string | undefined;
    isLoggedIn: boolean;
}
