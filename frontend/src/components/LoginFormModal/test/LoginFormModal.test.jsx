import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { ModalProvider } from "../../../context/Modal";
import rootReducer from "../../../store";
import LoginFormModal from "../index";

const customRender = (ui, { store = createStore(rootReducer), ...options } = {}) => {
	const Wrapper = ({ children }) => (
		<Provider store={store}>
			<ModalProvider>{children}</ModalProvider>
		</Provider>
	);

	return render(ui, { wrapper: Wrapper, ...options });
};

describe("LoginFormModal", () => {
	test("renders login form and allows user input", async () => {
		customRender(<LoginFormModal />);

		const credentialInput = screen.getByLabelText(/Username or Email/i);
		const passwordInput = screen.getByLabelText(/Password/i);
		const submitButton = screen.getByRole("button", { name: /Log In/i });

		act(() => {
			fireEvent.change(credentialInput, { target: { value: "user@example.com" } });
			fireEvent.change(passwordInput, { target: { value: "password123" } });
		});

		expect(credentialInput.value).toBe("user@example.com");
		expect(passwordInput.value).toBe("password123");
		expect(submitButton).toBeEnabled;
	});
});
