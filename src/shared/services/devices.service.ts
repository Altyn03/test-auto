import axios from "axios";
import { IDevice } from "../../processes/devices/device.interface";

const httpDevices = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
    baseURL: "api/",
    withCredentials: true
});

const devicesService = {
    getDevices: async (): Promise<IDevice[]> => {
        const content = await httpDevices.get<IDevice[]>(`devices/`);
        return content.data;
    }
};

export default devicesService;
