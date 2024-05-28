import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store";

const AllProviders: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>{children}</Provider>
        </BrowserRouter>
    );
};

export default AllProviders;
