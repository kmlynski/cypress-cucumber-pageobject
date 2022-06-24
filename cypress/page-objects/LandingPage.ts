/// <reference types="cypress" />

class LandingPage {
  private readonly usernameInput: string = "#username";
  private readonly passwordInput: string = "#password";
  private readonly signInButton: string = "#login_button";
  private readonly usernameErrorParagraph = "#username-helper-text";
  private readonly passwordErrorParagraph = "#password-helper-text";

  enterUsername(username: string) {
    cy.get(this.usernameInput).clear().type(username);
  }

  enterPassword(password: string) {
    cy.get(this.passwordInput).clear().type(password);
  }

  clickSignInButton() {
    cy.get(this.signInButton).click();
  }

  async checkIfUsernameInputIsDisplayed() {
    cy.get(this.usernameInput).should("be.visible");
  }

  async checkIfPasswordInputIsDisplayed() {
    cy.get(this.passwordInput).should("be.visible");
  }

  async checkIfSignInButtonIsDisplayed() {
    cy.get(this.signInButton).should("be.visible");
  }

  async checkIfUsernameErrorIsDisplayed(errorMessage: string) {
    cy.get(this.usernameErrorParagraph)
      .should("be.visible")
      .should("have.text", errorMessage);
  }

  async checkIfPasswordErrorIsDisplayed(errorMessage: string) {
    cy.get(this.passwordErrorParagraph)
      .should("be.visible")
      .should("have.text", errorMessage);
  }

  async loginWithSavingSession(username: string, password: string) {
    cy.session([username, password], () => {
      cy.visit("/");
      this.login(username, password);
    });
  }

  public login(username: string, password: string) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickSignInButton();
  }
}
export default new LandingPage();
