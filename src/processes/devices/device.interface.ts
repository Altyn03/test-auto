export interface IDevice {
    id: number;
    attributes: object;
    groupId: number;
    calendarId: number;
    protocol: null | string;
    name: string;
    uniqueId: string;
    status: string;
    lastUpdate: string;
    positionId: number;
    phone: null | string;
    model: null | string;
    contact: null | string;
    category: null | string;
    disabled: boolean;
    expirationTime: null | string;
}

export interface IDevicesState {
    data: IDevice[] | null;
    isLoading: boolean;
    error: string | undefined;
}
