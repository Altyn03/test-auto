import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../widgets";

const Layout: FC = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-1 px-[20%] py-[4%]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
