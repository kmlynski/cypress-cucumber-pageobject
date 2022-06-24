Feature: NewsPage

    As a user I want to see my news

    Scenario:  User opens web site next time
        Given the user opens web site next time when previously logged in
        Then user is taken straight to the news page

    Scenario:  News cards are loaded
        Given there is internet connection
        When  the user successfully signs in to the app
        Then  news cards are displayed in rows and each card contains an image, text and a view button

    Scenario: Failed to load news
        Given there is no internet connection
        When the user successfully signs in to the app
        Then failed to load news error message and a Retry button are displayed

    Scenario: News view button is clicked
        When user opens the app
        When the user successfully signs in to the app
        When the user clicks on the view button of the card
        Then user is navigated to the image of the card