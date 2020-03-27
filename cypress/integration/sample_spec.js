describe("Todo", function() {
  beforeEach(function() {
    cy.visit("/");
    cy.get("#newItem")
      .type("Todo item 1 {enter}")
      .type("Todo item 2 {enter}")
      .type("Todo item 3 {enter}");
  });

  it("Hides footer if no items", function() {
    cy.get(".footer").should("be.visible");
    cy.get(".toggleAll").click();
    cy.get(".clearButton")
      .should("be.visible")
      .click();
    cy.get(".todoItem").should("not.exist");
    cy.get(".footer").should("not.exist");
  });

  it('Hides "Clear Completed" button if no completed items', function() {
    cy.get(".todoItem")
      .eq(1)
      .find(".cbx")
      .click();
    cy.get(".clearButton")
      .should("be.visible")
      .click();
    cy.get(".clearButton").should("not.exist");
    cy.get(".toggleAll").click();
    cy.get(".clearButton")
      .should("be.visible")
      .click();
  });

  it("Adds empty item to item list", function() {
    cy.get("#newItem")
      .type("{enter}")
      .type("         {enter}");
    cy.get(".todoItem").should("have.length", 3);
    cy.get(".Toastify__toast--warning").should("have.length", 2);
    cy.get(".Toastify__close-button").click({ multiple: true });
    cy.get(".Toastify__toast--warning").should("not.exist");
    cy.get(".toggleAll").click();
    cy.get(".clearButton")
      .should("be.visible")
      .click();
  });

  it("Adds new items to item list", function() {
    cy.get("#newItem")
      .type("Todo item 4 {enter}")
      .type("Todo item 5 {enter}");
    cy.get(".todoItem").should("have.length", 5);
    cy.get(".Toastify__toast--success").should("have.length", 5);
    cy.get(".Toastify__close-button").click({ multiple: true });
    cy.get(".toggleAll").click();
    cy.get(".clearButton")
      .should("be.visible")
      .click();
  });

  it("Changes item checkbox state", function() {
    cy.get(".todoItem")
      .eq(0)
      .within(() => {
        cy.get(".cbx").click();
        cy.get(".inp-cbx").should("be.checked");
        cy.get(".itemText").should("have.class", "completed");
        cy.get(".cbx").click();
        cy.get(".inp-cbx").should("not.be.checked");
        cy.get(".itemText").should("not.have.class", "completed");
      });
    cy.get(".toggleAll").click();
    cy.get(".clearButton")
      .should("be.visible")
      .click();
  });

  it("Removes todo", function() {
    cy.get(".todoItem")
      .eq(2)
      .find(".removeButton")
      .click({ force: true });
    cy.get(".todoItem")
      .eq(2)
      .should("not.exist");
  });

  it("Edits todo", function() {
    cy.get(".todoItemEditing").should("not.exist");
    cy.get(".todoItem")
      .eq(2)
      .find(".itemText")
      .dblclick();
    cy.get(".todoItemEditing").should("be.visible");
    cy.get(".todoItemEditing").type("editing {enter}");
    cy.get(".todoItem")
      .eq(2)
      .find(".itemText")
      .should("contain", "editing");
    cy.get(".todoItem")
      .eq(1)
      .find(".itemText")
      .dblclick();
    cy.get(".todoItemEditing")
      .find("input")
      .clear()
      .type(" {enter}");
    cy.get(".Toastify__toast--warning").should("be.visible");
  });
});
