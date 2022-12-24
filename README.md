# fishery-api
A fish selling company api to provide data about the fishes and fishermen and sales

## Database Tables

Fisherfolk table, Fish table, Caught, Sold

## Fisherfolk table attributes

Field Name | Datatype | Other Information
--- | --- | ---
fisherid | AutoNumber | Primary Key
firstname | string | field size: 100, required
lastname | string | field size: 100, required
home address | string | not required
phone | string | field size: 11, not required
username | string | field size: 20, required
email | string | required
password | string | required
status | enum | required

## Fish table attributes

Field Name | Datatype | Other Information
--- | --- | ---
FishId | AutoNumber | Primary Key
FishName | String | field size 200, required

## Fish Caught table attributes (Bridge Table)

Field Name | Datatype | Other Information
--- | --- | ---
CaughtId | AutoNumber | Primary Key
FishId | Integer | Foreign Key: fishid (Fish)
FisherId | Integer | Foreign Key: fisherId (Fishfolk)
Weight | Integer | required
DateCaught | Date/Time | Date, required

## Fish Sold table attributes

Field Name | Datatype | Other Information
--- | --- | ---
SoldId | AutNumber | Primary Key
FishId | Number| Foreign Key: FishId (Fish)
FisherId | Number | Foreign Key: FisherId (Fisherfolk)
Weight | Number | standard
Price | Number | Currency
DateSold | Date/Time | Short Date

## Packages Installed

- npm install express sequelize pg pg-hstore body-parser cors jsonwebtoken bcryptjs --save

## Middleware

### VerifySignUp

- checkforDuplicateUsernameOrEmail: first finds the user by username, if a user is found then send a 400 message saying user is found and can't user the username. Second if a user is not found checks if the email provided is already used, if it is send a 400 message saying can't use duplicate emails. If no username is found or no email is found to be duplicate, create the User in the database.

- checkForRolesExisted: checks if roles provided are correct and actual roles.

### authJwt

- verifyToken: gets token, if no token is found return an error message. if token is provided verify token. This is to determine if the user is authorized for the route.

- isAdmin: determines if the user is an admin, if the user isn't returns a message saying admin role is required.

- isModerator: determines if the user is a moderator, if the user isn't returns a message saying moderator role is required.

- isModeratorOrAdmin: determines if user is a moderator or admin

## Controllers

- Auth controller: Signup and Signin functions
    - To Signup a user we need jwt for the token and bcrypt to hash the password. We need the two models User and Role because when a user signsup they should be given a role.
    - To Signup we need to hash the password then create a the user with data that is passed by the request parameters. Then we need to retrieve the roles from the request paramters. After we use the Role model to create a query to find the roles in the table. The query will assign the roles to the User object. The roles are associated to the ones passed by the request parameters.
    - A default role is set if none is provided. The default role is a 'user' role
    - To Signin a user we need to check if user is registered, if the password is accurate, assign a token to user and get roles.
- User Controller:
    - All Access function: This function provides public content for users that aren't logged in.
    - User Board function: This function provides content for a user that is registered / has an account and has the user, moderator and admin role.
    - Moderator Board function: This function provides content for a user that is registered / has an account and has the user, moderator roles.
    - Admin Board function: This function provides content for a user that is registered / has an account and has the user, admin roles.

## Routes

- Authentication Routes:
    - create a custom middleware to add relevant headers to reaponses
    - define the route for sign up and provide controller for signup and middleware for verification.
    - define the route for sign in and provide controller for sign in
- Authorization User Routes:
    - create a custom middleware to add headers to response.
    - /api/test/all: use allAccess controller to display content for anyone to view.
    - /api/test/user: use authJwt middleware to verify token for access to accounts that have a user role. use userBoard controller.
