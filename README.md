### College Chef
Meta-
## Team Members
Anagha Bhosale
Jonathan Chery
Pratiksha Lingashettar
Ruchit Urunkar
Application URL
https://www.collegechef.mrjonchery.com

Github Repository URL
https://github.com/jchery25/CS5610-P2/

## Deployment & Working Status
The college Chef app is deployed and is working as expected.

For each team member, what work did that person do on the project?
For the project work all the team members worked collaboratively, where as on some of the specific parts were taken up individually.

## Application-
The web project College Chef is an online web application. The web application allows college students to cook meals using the food items available in the house.

## How do users interact with your application? What can they accomplish by doing so?
We have two user roles, typically the guest user and the register user. Guest User : The guest user is any visitor of this web application, the user need not login, the user can search for receipes and get the list of receipes for the ingredients provided, but the result of the search will be from the database, which are receipes posted by registered users.

Registered User : The registered user needs to register to the web application. Once registered, user can use the username, password to login. The register user has the privilege to perform the power search along with the guest user search. The power search enables the user to get the receipes from the API which are more diverse. Along with this the registered user will be able to add, update, delete his/her receipes. The user will also be able to edit his profile.

For each project requirement above, how does your app meet that requirement?
The login, add recipes, edit recipes, edit profile, register, reciepe result components are created. The required functionality is acheieved by the below flow. The component gives call to AJAX, which results in post for the relevant path which directs it to controller which queries the database, the ajax sets the response result in to the store.

For searching the reciepes in the database and through API, we have incorporated the channels, here we pass the ingredients through the channels. The channels gets the search result using elixir through database or API . The search results then hits the store and are used to display it on the User Interface.

## Below list of requirements are fullfilled by out application.

The server side logic of your app must be built using Elixir / Phoenix.
We have performed the receipe search using the api as well as the database. The API calls have been done in Elixir thus, there occurs server to server interaction.

App must have significant serverside/backend logic
We have backend/serverside logic in elixir for getting API search results, receipes search from database, creating users, authentication, Reciepe's creation, edit, display, profile edit.

All of your app must be deployed to the VPS(es) of one or more members of your team.
We have deployed the application on one of our team members VPS.

Your application should have user accounts, and should support local password authentication (implemented securely).
The application have user accounts and supports local password authentication, it is implemented securely using argon2 password hashing.

Users should be stored in a Postgres database, along with some other non-trivial persistent state.
We have Users stored in Postgres database, along with other non trivial persistent state like receipes, ingredients.

Your application should use an external API that requires authentication of your app, your app’s user, or both.
The application College Chef uses spoonacular API that requires user to login, once the user has authenticated it uses the applications authentication details to get the search result for the Power Search.

API access for should be server <-> server. Your browser code should only make requests to your server, not remote APIs.
The College Chef application has server to server API access, The browser gets the ingredient present in the house from the User interface, this set of ingredients are passed through the channel into the backend elixir which gets the list of receipes and the hits the store to save them which are dispalyed on the user interface.

You must have at least two additional feature as listed below.
We have used JavaScript libraries such as font awesome, react strap, react tag input, react redux forms.

We have build an entirely Single Page Application with Redux and React-Router.

## What’s the complex part of your app? How did you design that component and why?
Building the application purely as an Single Page Application was a big challenge, as it required multiple component creation and determining the entire flow for each component. Besides this, completing the entire application in SPA required a lot of code work.

Searching the receipes and displaying the result on the database and API was a challenging task in ajax. Thus inorder to acheieve the results we used channels, they facilitated in easier retrieval of data on the user interface.

## What additional features did you implement?
We have used JavaScript libraries such as font awesome, react strap, react tag input, react redux forms to beautify the application.

We have build an entirely Single Page Application with Redux and React-Router.

## What interesting stuff does your app include beyond the project requirements?
We have the interesting stuff related to the user Interface such as pagination, react tags which enhances the look and feel of the application.

## What was the most significant challenge you encountered and how did you solve it?
The most significant challenge encountered during the application build was searching and displaying the receipes from database, API using AJAX. We tackled this problem by introducing channels in our application. It helped us to get the search results through the channel which hits the store through AJAX. The response is then comprehended and displayed on the User Interface.

Attribution, Licensing, and Copyright
Placeholder images are from Pexel.com which is a public domain free images site. Some Code snippet are inspired from Prof Nat Tuck's lecture notes. Users are responsible for the content they upload on this site.
