import LogoutIcon from "@mui/icons-material/Logout";
import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import ERoutes from "../../pages/ERoutes";
import { getCurrentUser, logOut } from "../../processes/user/userReducer";
import { AutoLogo } from "../../shared/ui/";
import styles from "./AppBar.module.scss";

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getCurrentUser());
    const handleLogout = () => {
        dispatch(logOut());
    };

    return (
        <AppBar
            position="static"
            sx={{ background: "white", color: "black", px: 12, py: 0.5 }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
                <AutoLogo styles="h-10 mx-4" />
                <Box
                    sx={{
                        pl: 4,
                        display: "flex",
                        gap: 6
                    }}
                >
                    <NavLink
                        to={ERoutes.layout}
                        className={({ isActive }) =>
                            isActive ? styles.active : styles.base
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={ERoutes.devices}
                        className={({ isActive }) =>
                            isActive ? styles.active : styles.base
                        }
                    >
                        Devices
                    </NavLink>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar alt="User Avatar" src="" />
                    <Typography
                        variant="body1"
                        sx={{
                            marginLeft: 2,
                            marginRight: 2,
                            borderRadius: "4px",
                            borderBottom: "4px solid #ed6c02"
                        }}
                    >
                        {userData?.email}
                    </Typography>
                    <IconButton
                        sx={{ color: "#ED6C02" }}
                        onClick={handleLogout}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
