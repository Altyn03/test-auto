import { FC, ReactNode, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import ERoutes from "../../pages/ERoutes";
import {
    getAuthErrors,
    getIsLoggedIn,
    getUserData
} from "../../processes/user/userReducer";
import { getTokenId, removeTokenId } from "../services/token.service";
import { Loader } from "../ui";

const ProtectedRoute: FC<{ element: ReactNode }> = ({ element }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(getIsLoggedIn());
    const error = useAppSelector(getAuthErrors());
    const hasDataFetch = useRef<boolean>(false);

    useEffect(() => {
        if (!hasDataFetch.current && getTokenId() && !isLoggedIn) {
            dispatch(getUserData());
            hasDataFetch.current = true;
        }
    }, [dispatch, isLoggedIn]);

    if (error) {
        removeTokenId();
        navigate(ERoutes.login);
    }

    return getTokenId() ? (
        isLoggedIn ? (
            element
        ) : (
            <Loader />
        )
    ) : (
        <Navigate to={ERoutes.login} replace />
    );
};

export default ProtectedRoute;
