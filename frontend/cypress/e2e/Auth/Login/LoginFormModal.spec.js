describe("LoginFormModal", () => {
	beforeEach(() => {
		// Replace this URL with the URL of your React application
		cy.visit("http://localhost:3000");
	});

	it("renders the login form", () => {
		// Click on the button or element that opens the LoginFormModal
		// Replace 'button' with the actual selector that triggers the modal
		cy.get("button").click();

		cy.contains("Log In").click();

		cy.get("h1").contains("Log In");
		cy.get("form").within(() => {
			cy.get("input[type='text']").should("have.attr", "required");
			cy.get("input[type='password']").should("have.attr", "required");
			cy.get("button[type='submit']").contains("Log In");
		});
	});
});
