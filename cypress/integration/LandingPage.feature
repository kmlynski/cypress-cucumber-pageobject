Feature: LandingPage

    As a user I want to log in to the web site

    Scenario: User access the web site for first time
        Given the user opens web site for the first time
        Then login screen with user name and password entries and login button is displayed

    Scenario: User login failed - incorrect username
        Given the user provides wrong username
        When sign in button is clicked
        Then error markers are displayed by username

    Scenario: User login failed - incorrect password
        Given the user provides wrong password
        When sign in button is clicked
        Then error markers are displayed by password

    Scenario: User login failed - incorrect username and password
        Given the user provides wrong user name and password
        When sign in button is clicked
        Then error markers are displayed by username and password

    Scenario: User login succeed
        Given the user provided right user name and password
        When sign in button is clicked
        Then user is taken to the news page