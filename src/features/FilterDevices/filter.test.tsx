import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { IDevice } from "../../processes/devices/device.interface";
import FilterDevices from "./";

describe("FilterDevices", () => {
    const mockData: IDevice[] = [
        {
            id: 1,
            attributes: {},
            groupId: 10,
            calendarId: 10,
            protocol: null,
            name: "Device 1",
            uniqueId: "abc123",
            status: "online",
            lastUpdate: "2023-01-02T00:00:00Z",
            positionId: 10,
            phone: null,
            model: null,
            contact: null,
            category: null,
            disabled: false,
            expirationTime: null
        },
        {
            id: 2,
            attributes: {},
            groupId: 10,
            calendarId: 10,
            protocol: null,
            name: "Device 2",
            uniqueId: "def456",
            status: "offline",
            lastUpdate: "2024-01-02T00:00:00Z",
            positionId: 10,
            phone: null,
            model: null,
            contact: null,
            category: null,
            disabled: false,
            expirationTime: null
        }
    ];

    test("renders correctly", () => {
        render(<FilterDevices data={mockData} setData={() => {}} />);
        expect(screen.getByLabelText("Поиск по ID")).toBeInTheDocument();
    });

    test("filters data correctly by ID", () => {
        const setDataMock = vi.fn();
        render(<FilterDevices data={mockData} setData={setDataMock} />);
        const input = screen.getByLabelText("Поиск по ID");
        fireEvent.change(input, { target: { value: "1" } });
        expect(setDataMock).toHaveBeenCalledWith([mockData[0]]);
    });

    test("does not filter data if input is empty", () => {
        const setDataMock = vi.fn();
        render(<FilterDevices data={mockData} setData={setDataMock} />);
        const input = screen.getByLabelText("Поиск по ID");
        fireEvent.change(input, { target: { value: "" } });
        expect(setDataMock).not.toHaveBeenCalled();
    });
});
