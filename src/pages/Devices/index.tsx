import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import DataTable from "../../entities/TableData";
import { FilterDevices } from "../../features";
import { IDevice } from "../../processes/devices/device.interface";
import {
    fetchDevicesData,
    getDevices
} from "../../processes/devices/devicesReducer";

const DevicesPage: FC = () => {
    const dispatch = useAppDispatch();
    const devices = useAppSelector(getDevices());
    const hasDataFetch = useRef(false);
    const [filteredDevices, setFilteredDevices] = useState<IDevice[] | null>(
        null
    );

    useEffect(() => {
        if (!hasDataFetch.current) {
            dispatch(fetchDevicesData());
            hasDataFetch.current = true;
        }
        setFilteredDevices(devices);
    }, [dispatch, devices]);

    return (
        <>
            <FilterDevices data={devices} setData={setFilteredDevices} />
            <DataTable data={filteredDevices} />
        </>
    );
};

export default DevicesPage;
