import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IDevice } from "../../processes/devices/device.interface";
import DataTable from "./";

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

describe("DataTable component", () => {
    it("renders data table correctly with data", () => {
        render(<DataTable data={mockData} />);

        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Unique ID")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Last Update")).toBeInTheDocument();

        expect(screen.getByText("Device 1")).toBeInTheDocument();
        expect(screen.getByText("abc123")).toBeInTheDocument();
        expect(screen.getByText("online")).toBeInTheDocument();

        expect(screen.getByText("Device 2")).toBeInTheDocument();
        expect(screen.getByText("def456")).toBeInTheDocument();
        expect(screen.getByText("offline")).toBeInTheDocument();
    });

    it("renders loader when data is null", () => {
        render(<DataTable data={null} />);

        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });
});
