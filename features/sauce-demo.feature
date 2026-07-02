Feature: SauceDemo end-to-end checkout

  Scenario: User logs in, adds a product, and completes checkout
    Given the user opens the SauceDemo login page
    When the user logs in with valid credentials
    And the user adds the first product to the cart
    And the user opens the cart and proceeds to checkout
    And the user fills in the checkout information
    Then the order should be completed successfully
