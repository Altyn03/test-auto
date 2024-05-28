import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import devicesService from "../../shared/services/devices.service";
import { IDevice, IDevicesState } from "./device.interface";

const initialState: IDevicesState = {
    data: null,
    isLoading: false,
    error: undefined
};

export const devicesSlice = createSlice({
    name: "devices",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevicesData.pending, (state: IDevicesState) => {
                state.data = null;
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchDevicesData.fulfilled,
                (state: IDevicesState, action: PayloadAction<IDevice[]>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchDevicesData.rejected,
                (
                    state: IDevicesState,
                    action: PayloadAction<string | undefined>
                ) => {
                    state.isLoading = false;
                    state.error = action.payload ?? "Ошибка!!!";
                }
            );
    }
});

const { reducer: devicesReducer } = devicesSlice;

export const fetchDevicesData = createAsyncThunk<
    IDevice[],
    void,
    { rejectValue: string }
>("devices/fetchDevicesData", async (_, { rejectWithValue }) => {
    try {
        const content = await devicesService.getDevices();
        return content;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw rejectWithValue(error?.response?.data);
    }
});

export const getDevices = () => (state: RootState) => state.devices.data;
export const getIsLoading = () => (state: RootState) => state.devices.isLoading;
export const getErrors = () => (state: RootState) => state.devices.error;

export default devicesReducer;
