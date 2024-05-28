import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../shared/lib/ProtectedRoute";
import DevicesPage from "./Devices";
import ERoutes from "./ERoutes";
import HomePage from "./Home";
import Layout from "./Layout";
import LoginPage from "./Login";
import NotFoundPage from "./NotFound";

const Routing: FC = () => {
    return (
        <Routes>
            <Route path={ERoutes.login} element={<LoginPage />} />
            <Route
                path={ERoutes.layout}
                element={<ProtectedRoute element={<Layout />} />}
            >
                <Route index element={<HomePage />} />
                <Route path={ERoutes.devices} element={<DevicesPage />} />
            </Route>
            <Route path={ERoutes.notFound} element={<NotFoundPage />} />
        </Routes>
    );
};

export default Routing;
