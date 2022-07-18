/// <reference types="cypress" />

import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import LandingPage from "../../page-objects/LandingPage";
import NewsPage from "../../page-objects/NewsPage";
import ConfigFile from "../../../config";
import ConnectionUtils from "../utils/ConnectionUtils";

When("user opens the app",()=>{
    cy.visit('/')
})

Given("the user opens web site next time when previously logged in", () => {
  cy.visit("/");
  LandingPage.loginWithSavingSession(ConfigFile.username, ConfigFile.password);
});

Then("user is taken straight to the news page", () => {
  cy.visit("/");
  const expectedUrl = `${Cypress.config().baseUrl}` + "news";
  cy.url().should("eq", expectedUrl);
});

Given("there is internet connection", () => {
  cy.visit("/");
  ConnectionUtils.goOnline()
});

When("the user successfully signs in to the app", () => {
  LandingPage.login(ConfigFile.username, ConfigFile.password);
});

Then(
  "news cards are displayed in rows and each card contains an image, text and a view button",
  () => {
    cy.xpath("*//img[contains(@id,'article_image')]", { timeout: 10000 }).each(
      ($el) => {
        cy.get($el).should("be.visible");
        cy.get($el.parent("div").parent("div"))
          .should("have.attr", "style")
          .and("contains", "flex-direction: row");
      }
    );

    //There is a need to add the id attribute in line 113 in Articles.js file in the app repository
    cy.xpath("*//p[contains(@id,'typography')]").each(($el) => {
      cy.get($el).should("be.visible");
    });

    cy.xpath("*//a[contains(@id,'article_link')]").each(($el) => {
      cy.get($el).should("be.visible");
    });
  }
);

Given("there is no internet connection", () => {
  cy.visit("/");
  ConnectionUtils.goOffline();
});

Then(
  "failed to load news error message and a Retry button are displayed",
  () => {
    NewsPage.checkIfLoadErrorIsVisible();
    ConnectionUtils.goOnline();
  }
);

When("the user clicks on the view button of the card", () => {
  cy.xpath("*//a[contains(@id,'article_link')]", { timeout: 10000 })
    .first()
    .click()
    
});

Then("user is navigated to the image of the card",() =>{
    cy.url().should('include','cdn2.thecatapi.com')
})

