import { Button, TextField, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import ERoutes from "../../pages/ERoutes";
import {
    getAuthErrors,
    getIsLoggedIn,
    logIn
} from "../../processes/user/userReducer";
import { AutoLogo } from "../../shared/ui/";

export interface ILoginData {
    email: string;
    password: string;
}

const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(getIsLoggedIn());
    const fetchErrors = useAppSelector(getAuthErrors());
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        reset
    } = useForm<ILoginData>({
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<ILoginData> = (data) => {
        dispatch(logIn(data));
        reset();
    };

    useEffect(() => {
        switch (fetchErrors) {
            case "User": {
                setError("email", {
                    type: "incorrect email",
                    message: "Пользователя с таким Email не существует"
                });
                break;
            }
            case "Password": {
                setError("password", {
                    type: "incorrect password",
                    message: "Введен неверный пароль"
                });
                break;
            }
        }
    }, [fetchErrors, setError]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate(ERoutes.layout, { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="p-10 w-full max-w-[416px]">
            <AutoLogo styles="w-auto h-auto max-w-60 max-h-28 m-auto mb-8 md:hidden" />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <Typography component="h1" variant="h5" sx={{ m: "10px auto" }}>
                    Вход в личный кабинет
                </Typography>
                <TextField
                    {...register("email", {
                        required: 'Поле "Email" обязательно для заполнения',
                        pattern: {
                            value: EMAIL_REGEXP,
                            message: "Введите корректный Email"
                        }
                    })}
                    error={!!errors.email}
                    id="outlined-required-error-helper-text"
                    label="Email"
                    color="warning"
                    autoComplete="email"
                    helperText={errors.email?.message || " "}
                />
                <TextField
                    {...register("password", {
                        required: 'Поле "Пароль" обязательно для заполнения',
                        minLength: {
                            value: 6,
                            message: "Минимальное количество символов - 6"
                        }
                    })}
                    error={!!errors.password}
                    id="outlined-required-password-input"
                    label="Пароль"
                    color="warning"
                    type="password"
                    autoComplete="current-password"
                    helperText={errors.password?.message || " "}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    disabled={!isValid}
                >
                    Вход
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
