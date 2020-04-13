describe("Input form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("focuses input on load", () => {
    cy.focused().should("have.id", "newItem");
  });

  it("accepts input", () => {
    const typedText = "Todo item";

    cy.get("#newItem")
      .type(typedText)
      .should("have.value", typedText);
  });

  it("Shows a warning message on a invalid data entering", function() {
    cy.get("#newItem")
      .type("{enter}")
      .type("         {enter}");
    cy.get(".todoItem").should("not.exist");
    cy.get(".Toastify__toast--warning").should("have.length", 2);
    cy.get(".Toastify__close-button").click({ multiple: true });
    cy.get(".Toastify__toast--warning").should("not.exist");
  });

  context("Form submission", () => {
    beforeEach(() => {
      cy.server();
    });

    it("Adds a new todo on submit", () => {
      const itemText = "Another one";
      cy.route("POST", "http://localhost:2000/todos/create/", {
        text: itemText,
        isComplete: false
      });

      cy.get("#newItem")
        .type(itemText)
        .type("{enter}")
        .should("have.value", "");

      cy.get(".todoItem")
        .should("have.length", 1)
        .and("contain", itemText);
    });

    it("Shows an error message on a failed submission", () => {
      cy.route({
        url: "http://localhost:2000/todos/create/",
        method: "POST",
        status: 500,
        response: {}
      });

      cy.get("#newItem").type("test{enter}");

      cy.get(".todoItem").should("not.exist");

      cy.get(".Toastify__toast--error").should("be.visible");
    });
  });
});
