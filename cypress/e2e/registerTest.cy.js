import { errorsMassage } from "../../src/components/Register";

beforeEach(() => {
  cy.visit("/");
});

describe("Register Page", () => {
  describe("Error Page", () => {
    it("name input throws error for 2 character", () => {
      //Arrage
      //cy.visit("http://localhost:5173/");
      //Act
      cy.get('[data-cy="adSoyad-input" ]').type("na");
      //Assert
      cy.contains(errorsMassage.adSoyad);
    });
    it("email input throws error for nazmi@wit.", () => {
      //Arrage
      //cy.visit("http://localhost:5173/");
      //Act
      cy.get('[data-cy="email-input" ]').type("nazmi@wit.");
      //Assert
      cy.contains(errorsMassage.email);
    });
    it("password input throws error for 1234", () => {
      //Arrage
      //cy.visit("http://localhost:5173/");
      //Act
      cy.get('[data-cy="password-input" ]').type("1234");
      //Assert
      cy.contains(errorsMassage.password);
    });
    it("button is disabled for unvalided input.", () => {
      //Arrage
      //cy.visit("http://localhost:5173/");
      //Act
      cy.get('[data-cy="password-input" ]').type("1234");
      //Assert
      cy.get('[data-cy="submit-input" ]').should("be.disabled");
    });
  });
  describe("Form input Validated", () => {
    it("button enabled for validated inputs", () => {
      //Arrage
      //cy.visit("http://localhost:5173/");
      //Act
      cy.get('[data-cy="adSoyad-input" ]').type("nazmi");
      cy.get('[data-cy="email-input" ]').type("nazmi@wit.com");
      cy.get('[data-cy="password-input" ]').type("nazmi%P96");
      //Assert
      cy.get('[data-cy="submit-input" ]').should("be.enabled");
    });
    it("submit from on validated inputs", () => {
      //Arrage
      //cy.visit("http://localhost:5173/");
      //Act
      cy.get('[data-cy="adSoyad-input" ]').type("nazmi");
      cy.get('[data-cy="email-input" ]').type("nazmi@wit.com");
      cy.get('[data-cy="password-input" ]').type("nazmi%P96");
      cy.get('[data-cy="submit-input" ]').click();
      //Assert
      cy.get('[data-cy="id-varmi" ]').should("be.visible");
    });
  });
});
