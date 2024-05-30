import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import LoginForm from "./";

const mockStore = configureStore([]);
let store = {};

describe("LoginForm", () => {
    beforeEach(() => {
        store = mockStore({
            user: {
                isLoggedIn: false,
                error: null
            }
        });
    });

    test("renders login form correctly", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /вход/i })
        ).toBeInTheDocument();
    });

    test("shows validation errors for invalid email and password", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "invalid-email" }
        });
        fireEvent.input(screen.getByLabelText(/пароль/i), {
            target: { value: "123" }
        });

        fireEvent.submit(screen.getByRole("button", { name: /вход/i }));

        await waitFor(() => {
            expect(
                screen.getByText(/введите корректный email/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/минимальное количество символов - 6/i)
            ).toBeInTheDocument();
        });
    });
});
