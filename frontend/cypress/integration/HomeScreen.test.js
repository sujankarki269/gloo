before(() => {
  cy.viewport(1280, 720)
  cy.visit("https://gloo-dev.herokuapp.com")
})

export function HomeScreenTest() {
  describe("HomeScreen loads correctly with title and sign in button", () => {
    it("Organisation name loads", () => {
      cy.contains("Gloo")
    })

    it("Sign in button loads", () => {
      cy.contains("Sign In")
    })

    it("Title loads", () => {
      cy.contains("Latest Products")
    })
  })
}

HomeScreenTest()
