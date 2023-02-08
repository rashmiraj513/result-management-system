require('dotenv/config');
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

// dotenv constants
const password = process.env.PASSWORD;
const db = process.env.DATABASE;
const user = process.env.USER;
const clusterURL = process.env.URL;

// database connection url...
/* 
 * To use database connection url, You have to create a file name `.env`
 * and you have to have a MongoDB Atlas cluster and the credentials of the MongoDB cluster
 * will be stored in .env file like:
 * USER=user_name
 * 
 * If you don't want to go in the complexity of creating the MongoDB Atlas cluster, then you can use
 * this application in MongoDB Localhost. For this, you'll have to have MongoDB installed in your machine.
*/

// const uri = "mongodb+srv://" + user + ":" + password + "@" + clusterURL + db +"?retryWrites=true&w=majority";

// localhost connection url...
const uri = "mongodb://localhost:27017/" + db;

// connecting to the database...
mongoose.connect(uri, {
  useUnifiedTopology: true, 
  useNewUrlParser: true
  }, console.log('Database connection established!')
);

export const dbConnection = mongoose.connection;