describe("Smoke tests", () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:2000/todos")
      .its("body")
      .each(todo =>
        cy.request("DELETE", `http://localhost:2000/todos/${todo._id}/delete`)
      );
  });

  context("With no todos", () => {
    it("Saves new todos", () => {
      const items = [
        { text: "Buy milk", expectedLength: 1 },
        { text: "Buy eggs", expectedLength: 2 },
        { text: "Buy bread", expectedLength: 3 }
      ];
      cy.visit("/");
      cy.server();
      cy.route("POST", "http://localhost:2000/todos/create/").as("create");

      cy.wrap(items).each(todo => {
        cy.focused()
          .type(todo.text)
          .type("{enter}");

        cy.wait("@create");

        cy.get(".todoItem").should("have.length", todo.expectedLength);
      });
    });
  });

  context("With active todos", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("#newItem")
        .type("Todo item 1 {enter}")
        .type("Todo item 2 {enter}")
        .type("Todo item 3 {enter}");
    });

    it("Loads existing data from the DB", () => {
      cy.get(".todoItem").should("have.length", 3);
    });

    it("Deletes todos", () => {
      cy.server();
      cy.route("DELETE", "http://localhost:2000/todos/*/delete").as("delete");

      cy.get(".todoItem")
        .each($el => {
          cy.wrap($el)
            .find(".removeButton")
            .invoke("show")
            .click({ force: true });

          cy.wait("@delete");
        })
        .should("not.exist");
    });

    it("Toggles todos", () => {
      const clickAndWait = $el => {
        cy.wrap($el)
          .as("item")
          .find(".cbx")
          .click();

        cy.wait("@update");
      };
      cy.server();
      cy.route("PUT", "http://localhost:2000/todos/*/update").as("update");

      cy.get(".todoItem")
        .each($el => {
          clickAndWait($el);
          cy.get("@item")
            .find(".itemText")
            .should("have.class", "completed");
        })
        .each($el => {
          clickAndWait($el);
          cy.get("@item")
            .find(".itemText")
            .should("not.have.class", "completed");
        });
    });

    it("Edits todo", () => {
      cy.server();
      cy.route("PUT", "http://localhost:2000/todos/*/update").as("update");

      cy.get(".todoItemEditing").should("not.exist");
      cy.get(".todoItem")
        .eq(0)
        .find(".itemText")
        .dblclick();
      cy.get(".todoItemEditing").should("be.visible");
      cy.get(".todoItemEditing").type("editing {enter}");
      cy.wait("@update");
      cy.get(".todoItem")
        .eq(0)
        .find(".itemText")
        .should("contain", "editing");
      cy.get(".todoItem")
        .eq(0)
        .find(".itemText")
        .dblclick();
      cy.get(".todoItemEditing")
        .find("input")
        .clear()
        .type(" {enter}");
      cy.get(".Toastify__toast--warning").should("be.visible");
    });

    it("Hides footer if no items", function() {
      cy.server();
      cy.route("PUT", "http://localhost:2000/todos/updateMany").as("update");
      cy.route("DELETE", "http://localhost:2000/todos/deleteCompleted/").as(
        "clear"
      );

      cy.get(".footer").should("be.visible");
      cy.get(".toggleAll").click();
      cy.wait("@update");
      cy.get(".clearButton")
        .should("be.visible")
        .click();
      cy.wait("@clear");
      cy.get(".todoItem").should("not.exist");
      cy.get(".footer").should("not.exist");
    });

    it('Hides "Clear Completed" button if no completed items', function() {
      cy.server();
      cy.route("PUT", "http://localhost:2000/todos/*/update").as("update");
      cy.route("PUT", "http://localhost:2000/todos/updateMany").as(
        "updateMany"
      );
      cy.route("DELETE", "http://localhost:2000/todos/deleteCompleted/").as(
        "clear"
      );

      cy.get(".todoItem")
        .eq(1)
        .find(".cbx")
        .click();
      cy.wait("@update");
      cy.get(".clearButton")
        .should("be.visible")
        .click();
      cy.wait("@clear");
      cy.get(".clearButton").should("not.exist");
      cy.get(".toggleAll").click();
      cy.wait("@updateMany");
      cy.get(".clearButton")
        .should("be.visible")
        .click();
    });

  });
});
