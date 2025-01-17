before(() => {
  cy.viewport(1280, 720)
  cy.visit("https://gloo-dev.herokuapp.com")
})

describe("Login feature works as expected", () => {
  it("Sign in button can be clicked", () => {
    cy.contains("Sign In").click()
  })

  it("Redirected to Sign In page", () => {
    cy.url().should("include", "/login")
  })

  it("Able to login with correct email and password", () => {
    cy.reload()
    cy.get("[type='email']").type("john@example.com")
    cy.get("[type='password']").type("123456")
    cy.get("Button").contains("Sign In").click()
    cy.contains("Invalid Email or Password").should("not.exist")
    cy.contains("John Doe").should("exist").click()
    cy.contains("Logout").should("exist")
  })
})

describe("View Cardilac Plumbing Services", () => {
  it("Click on Cardilac Plumbing Services", () => {
    cy.contains("Cardilac Plumbing Services").click()
  })
  it("Redirected to product page url", () => {
    cy.url().should("include", "/product")
    cy.contains("Cardilac Plumbing Services").should("exist")
  })
  it("Image should load", () => {
    cy.get("div[class='col-md-6']")
      .find("img")
      .should("have.attr", "alt", "Cardilac Plumbing Services")
      .should("be.visible")
  })

  it("Conditional Rendering of Add To Cart works", () => {
    cy.get("[data-testid=chat-btn]").should("exist")
  })
})
