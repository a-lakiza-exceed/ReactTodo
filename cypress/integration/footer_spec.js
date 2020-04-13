describe("Footer", () => {
  context("with a single todo", () => {
    it("displays a singular todo in count", () => {
      cy.visit("/");
      cy.get("#newItem")
        .type("Todo item 1 {enter}")
        .type("Todo item 2 {enter}")
        .type("Todo item 3 {enter}")
        .type("Todo item 4 {enter}");
      cy.get(".todoItem")
        .eq(0)
        .find(".cbx")
        .click();
    });
  });

  context("with multiple todos", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("displays plural todos in count", () => {
      cy.get(".activeItemsCount").should("contain", "3 items left");
    });

    it("Handles filter links", () => {
      const filters = [
        { link: "Active", expectedLength: 3 },
        { link: "Completed", expectedLength: 1 },
        { link: "All", expectedLength: 4 }
      ];
      cy.wrap(filters).each(filter => {
        cy.contains(filter.link).click();

        cy.get(".todoItem:visible").should("have.length", filter.expectedLength);
      });
    });
  });
});
