describe("End2End test of publisher app", function () {
  it("Publisher app", function () {
    cy.visit("/gift-publisher");

    const filename = "sample.csv";

    cy.get(".choose-btn").first().click();
    cy.waitUntil(() => cy.get(".upload-area__drop__input").attachFile({ filePath: 'sample.csv', fileName: 'sample.csv' }));

    cy.get('table').contains('th', 'LOCATION');
    cy.get('.btn').click();
    cy.contains('Describe your dataset')

  });
});
