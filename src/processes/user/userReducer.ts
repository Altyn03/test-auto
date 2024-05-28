import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { ILoginData } from "../../entities/LoginForm";
import { removeTokenId } from "../../shared/services/token.service";
import userService from "../../shared/services/user.service";
import { IUser, IUserState } from "./user.interface";

const initialState: IUserState = {
    data: null,
    isLoading: false,
    error: undefined,
    isLoggedIn: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogOut: (state) => {
            state.data = null;
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state: IUserState) => {
                state.data = null;
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                logIn.fulfilled,
                (state: IUserState, action: PayloadAction<IUser>) => {
                    state.isLoggedIn = true;
                    state.isLoading = false;
                    state.data = action.payload;
                }
            )
            .addCase(
                logIn.rejected,
                (
                    state: IUserState,
                    action: PayloadAction<string | undefined>
                ) => {
                    state.isLoggedIn = false;
                    state.isLoading = false;
                    state.error = action.payload ?? "Ошибка!!!";
                }
            )
            .addCase(getUserData.pending, (state: IUserState) => {
                state.data = null;
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                getUserData.fulfilled,
                (state: IUserState, action: PayloadAction<IUser>) => {
                    state.isLoggedIn = true;
                    state.isLoading = false;
                    state.data = action.payload;
                }
            )
            .addCase(
                getUserData.rejected,
                (
                    state: IUserState,
                    action: PayloadAction<string | undefined>
                ) => {
                    state.isLoggedIn = false;
                    state.isLoading = false;
                    state.error = action.payload ?? "Ошибка!!!";
                }
            );
    }
});

const { reducer: userReducer, actions } = userSlice;
const { userLogOut } = actions;

export const logIn = createAsyncThunk<
    IUser,
    ILoginData,
    { rejectValue: string }
>("user/logIn", async (userData, { rejectWithValue }) => {
    try {
        const data = await userService.logIn(userData);
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
});

export const logOut =
    () =>
    (dispatch: AppDispatch): void => {
        dispatch(userLogOut());
        removeTokenId();
    };

export const getUserData = createAsyncThunk<
    IUser,
    void,
    { rejectValue: string }
>("user/getData", async (_, { rejectWithValue }) => {
    try {
        const content = await userService.getCurrentUser();
        return content;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw rejectWithValue(error?.response?.data);
    }
});

export const getCurrentUser = () => (state: RootState) => state.user.data;
export const getIsLoggedIn = () => (state: RootState) => state.user.isLoggedIn;
export const getAuthErrors = () => (state: RootState) => state.user.error;

export default userReducer;
