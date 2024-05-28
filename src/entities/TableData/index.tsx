import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";
import { IDevice } from "../../processes/devices/device.interface";
import { changeDate } from "../../shared/lib/ChangeDate";
import { Loader } from "../../shared/ui";
import { IDataTableCol } from "./dataTable.interface";

const DataTable: FC<{ data: IDevice[] | null }> = ({ data }) => {
    const columns: IDataTableCol[] = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "name", headerName: "Name", flex: 2 },
        { field: "uniqueId", headerName: "Unique ID", flex: 1 },
        { field: "status", headerName: "Status", flex: 1, sortable: false },
        {
            field: "lastUpdate",
            headerName: "Last Update",
            flex: 2,
            sortable: false
        }
    ];

    const rows = data
        ? data.map(({ id, name, uniqueId, status, lastUpdate }) => ({
              id,
              name,
              uniqueId,
              status,
              lastUpdate: changeDate(lastUpdate)
          }))
        : [];

    return data ? (
        <div className="h-auto min-h-96 w-full">
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 }
                    }
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableColumnMenu
            />
        </div>
    ) : (
        <Loader />
    );
};

export default DataTable;
