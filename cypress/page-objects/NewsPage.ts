/// <reference types="cypress" />

class NewsPage {
  private readonly failedToLoadErrorDiv: string = "#news_failed";

  async checkIfLoadErrorIsVisible() {
    cy.get(this.failedToLoadErrorDiv)
      .children("p")
      .should("be.visible")
      .should('contain.text', "Failed to load news");
  }

}
export default new NewsPage();
