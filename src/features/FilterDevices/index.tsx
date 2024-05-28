import { Grid, TextField } from "@mui/material";
import { FC, useState } from "react";
import { IDevice } from "../../processes/devices/device.interface";

interface SearchProps {
    data: IDevice[] | null;
    setData: React.Dispatch<React.SetStateAction<IDevice[] | null>>;
}
const FilterDevices: FC<SearchProps> = ({ data, setData }) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
        if (data) {
            setData(
                data.filter((device) =>
                    device.id.toString().includes(event.target.value)
                )
            );
        }
    };

    return (
        <Grid container alignItems="center" sx={{ padding: "5% 0" }}>
            <Grid item md={3}>
                <TextField
                    fullWidth
                    label="Поиск по ID"
                    variant="outlined"
                    color="warning"
                    size="small"
                    value={value}
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    );
};

export default FilterDevices;
