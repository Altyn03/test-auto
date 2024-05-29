import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AllProviders from "./";

const TestComponent = () => <div>Test Component</div>;

describe("AllProviders component", () => {
    test("renders child components correctly", () => {
        render(
            <AllProviders>
                <TestComponent />
            </AllProviders>
        );
        expect(screen.getByText("Test Component")).toBeInTheDocument();
    });

    test("renders multiple child components correctly", () => {
        render(
            <AllProviders>
                <div>First Child</div>
                <div>Second Child</div>
            </AllProviders>
        );
        expect(screen.getByText("First Child")).toBeInTheDocument();
        expect(screen.getByText("Second Child")).toBeInTheDocument();
    });
});
