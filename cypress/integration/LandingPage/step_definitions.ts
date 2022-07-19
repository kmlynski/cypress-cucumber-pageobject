/// <reference types="cypress" />

declare const Before, Given, When, Then;
import LandingPage from "../../page-objects/LandingPage";
import ConfigFile from "../../../config";

Before(() => {
  cy.visit("/");
  cy.reload();
});

Given("the user opens web site for the first time", () => {});

Then(
  "login screen with user name and password entries and login button is displayed",
  () => {
    cy.url().should("eq", `${Cypress.config().baseUrl}`);
    LandingPage.checkIfUsernameInputIsDisplayed();
    LandingPage.checkIfPasswordInputIsDisplayed();
    LandingPage.checkIfSignInButtonIsDisplayed();
  }
);

Given("the user provides wrong username", () => {
  const username = "incorrectUsername";
  LandingPage.enterUsername(username);
});

Given("the user provides wrong password", () => {
  const password = "incorrectPassword";
  LandingPage.enterPassword(password);
});

Given("the user provides wrong user name and password", () => {
  const username = "incorrectUsername";
  const password = "incorrectPassword";
  LandingPage.enterUsername(username);
  LandingPage.enterPassword(password);
});

When("sign in button is clicked", () => {
  LandingPage.clickSignInButton();
});

Then("error markers are displayed by username", () => {
  LandingPage.checkIfUsernameErrorIsDisplayed("Wrong username");
  LandingPage.checkIfPasswordErrorIsDisplayed("Password is required");
});

Then("error markers are displayed by password", () => {
  LandingPage.checkIfUsernameErrorIsDisplayed("Username is required");
  LandingPage.checkIfPasswordErrorIsDisplayed("Password incorrect");
});

Then("error markers are displayed by username and password", () => {
  LandingPage.checkIfUsernameErrorIsDisplayed("Wrong username");
  LandingPage.checkIfPasswordErrorIsDisplayed("Password incorrect");
});

Given("the user provided right user name and password", () => {
  LandingPage.enterUsername(ConfigFile.username);
  LandingPage.enterPassword(ConfigFile.password);
});

Then("user is taken to the news page", () => {
  const newsUrl = `${Cypress.config().baseUrl}` + "news";
  cy.url().should("eq", newsUrl);
});
