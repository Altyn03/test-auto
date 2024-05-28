import axios from "axios";
import { ILoginData } from "../../entities/LoginForm";
import { IUser } from "../../processes/user/user.interface";

const httpUser = axios.create({
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    baseURL: "api/",
    withCredentials: true
});

const userService = {
    logIn: async (data: ILoginData): Promise<IUser> => {
        const content = await httpUser.post<IUser>(
            `session/`,
            `email=${data.email}&password=${data.password}`
        );
        return content.data;
    },
    getCurrentUser: async (): Promise<IUser> => {
        const content = await httpUser.get<IUser>(`session/`);
        return content.data;
    }
};

export default userService;
