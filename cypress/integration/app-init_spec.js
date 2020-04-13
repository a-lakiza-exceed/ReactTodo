describe("App initialization", () => {
  it("Loads todos on page load", () => {
    cy.server();
    cy.route("GET", "http://localhost:2000/todos/");
    cy.visit("/");
    cy.get(".todoItem").should("have.length", 4);
  });

  it("Displays an error on failure", () => {
    cy.server();
    cy.route({
      url: "http://localhost:2000/todos/",
      method: "GET",
      status: 500,
      response: {}
    });
    cy.visit("/");

    cy.get(".todoItem").should("not.exist");

    cy.get(".Toastify__toast--error").should("be.visible");
  });
});
