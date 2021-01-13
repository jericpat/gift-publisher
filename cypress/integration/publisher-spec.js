describe("End2End test of publisher app", function () {
  it("Publisher app", function () {
    cy.visit("/gift-publisher");

    const filename = "sample.csv";

    cy.get(".choose-btn").first().click();
    cy.fixture(filename).then(function (fileContent) {
      cy.get(".upload-area__drop__input").attachFile(
        { fileContent, fileName: "sample.csv" },
        {
          subjectType: "drag-n-drop",
        }
      );
    });
    cy.contains("next");
  });
});
