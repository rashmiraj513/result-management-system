# ResultManagementSystem
This is a Result Management System that can be used to manage the result
of students where only the teachers have access to perform basic CRUD operations on the result.
Students can only see their results after entering their DOB and Name.

## Features
* Login for Teachers only
* CRUD operations for Result Management (For Teachers only)
* Students can see their results after entering DOB and Name
* User Management with different levels of access

## Dependencies
* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* NodeJS
* Express
* MongoDB

## How to run?
* After cloning, navigate through folders and open the terminal. Then install the dependencies
  by running the following command: `npm install`.
* After installing all the dependencies, Run the project by the 
  following command: `npm run test` or, `nodemon app.js --exec babel-node`.

__Note:__ The usual commands `nodemon app.js` or, `node app.js` may produce errors because here _Babel_ is used for backward compatibility.