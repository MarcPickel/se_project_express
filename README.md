# WTWR (What to Wear?): The Back-End - Sprint 13 from TripleTen

This is the thirteenth project in the Software Engineer Bootcamp offered by TripleTen. The project shows the first steps in creating a server for the WTWR application that was created with React in project eleven. The eventual goal is to create a full-fledged server with an API and User authorization.

The present state of the server can handle the various requests that a User might make on the WTWR application, such as getting the current User's data, clothing item data, the addition of both and the deletion, liking, and disliking of those clothing items, and respond appropriately. It can also handle the various errors that might occur, be it the cause of the User or the server.

Additionally, the project now features a signing in and signing up feature, along with security measures implemented with JSON Web Tokens (JWTs) and authentication middleware.

This server was created using JavaScript, thanks to Node.js and Express.js. MongoDB serves as the server's database.

## Technologies

The technologies implemented to create this server were: Node.js; Express.js; MongoDB; MongoDB Compass; Mongoose; Postman; and GitHub.

Through the creation process, Postman and GitHub were used to test the requests and responses coded in the server.

## Techniques

The server is well organized and structured purposely according to appropriately named folders, such as: models; controllers; routes; etc.

Schemas were made using Mongoose for Users and clothing items and are located in the models folder.

All error handling is done in the controllers folder. The files therein import from the utils folder the various error codes (400-500) stored in variables.

Middleware was also implemented, one to handle a temporary hard-coded authorization located in the app.js file, and another to handle all errors caused by the User that pertain to trying to access the wrong route, located in the index.js file.

### Project on GitHub

Here is the link to the project on GitHub:

https://github.com/MarcPickel/se_project_express.git

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/167dWsEiCsNusjA_ZYv0uMl00x9b2KIjf/view?usp=drive_link), where I describe my
thirteenth project and some challenges I faced while building it.
