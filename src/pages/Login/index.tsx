import { FC } from "react";
import { LoginForm } from "../../entities/";
import { AutoLogo } from "../../shared/ui/";
import styles from "./LoginPage.module.scss";

const LoginPage: FC = () => {
    return (
        <main className="h-screen flex">
            <div className={styles.ava}>
                <AutoLogo styles="w-auto h-auto max-w-60 max-h-28 m-4 self-center" />
            </div>
            <div className={styles.loginDiv}>
                <LoginForm />
            </div>
        </main>
    );
};

export default LoginPage;
