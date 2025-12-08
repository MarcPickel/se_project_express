# WTWR (What to Wear?): The Back-End - Sprint 15 from TripleTen

This is the fifteenth project in the Software Engineer Bootcamp offered by TripleTen. The project shows the first steps in creating a server for the WTWR application that was created with React in project eleven.

This is a fully functioning application, complete with signing in and signing out, user registration, updating the user's profile, creating clothing item cards, liking said cards, and deleting said cards. Furthermore, it is equipped with centralized error handling via a middleware. Lastly, this application has been uploaded onto Google Cloud.

The Front-end of the application was written using React.

The Back-end of the application was written using JavaScript, thanks to Node.js and Express.js. MongoDB serves as the server's database.

## Link to what.to.wear.jumpingcrab.com

Here is the link to the WTWR website:

https://what.to.wear.jumpingcrab.com/

## Technologies

The technologies implemented to create this server were: Node.js; Express.js; MongoDB; MongoDB Compass; Mongoose; Postman; and GitHub.

Through the creation process, Postman and GitHub were used to test the requests and responses coded in the server.

## Techniques

The server is well organized and structured purposely according to appropriately named folders, such as: models; controllers; routes; etc.

Schemas were made using Mongoose for Users and clothing items and are located in the models folder.

All error handling is done in the controllers folder. The files therein import from the utils folder the various error codes (400-500) stored in variables.

Middleware was also implemented, one to handle a temporary hard-coded authorization located in the app.js file, and another to handle all errors caused by the User that pertain to trying to access the wrong route, located in the index.js file.

### Project on GitHub

Here is the link to the front-end of the project on GitHub:

https://github.com/MarcPickel/se_project_react.git

Here is the link to the back-end of the project on GitHub:

https://github.com/MarcPickel/se_project_express.git

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/167dWsEiCsNusjA_ZYv0uMl00x9b2KIjf/view?usp=drive_link), where I describe my
thirteenth project and some challenges I faced while building it.
