import { Box } from "@mui/material";
import { FC } from "react";

const AutoLogo: FC<{ styles: string }> = ({ styles }) => {
    return (
        <Box
            component="img"
            src="https://gps.autotracker.group/logo.svg"
            alt="AutoTracker"
            className={styles}
        />
    );
};

export default AutoLogo;
