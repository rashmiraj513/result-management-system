import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';
import dbConnection from './connection/config';
import routes from './routes/routes';

// Uncomment this part to add a teacher.
// import mongoose from 'mongoose';
// import { TeacherSchema } from './models/model';
// const Teacher = mongoose.model('Teacher', TeacherSchema);

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(morgan('short'));

app.use(session ({
  secret: 'Secret Key',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

routes(app);

/*
//  * Uncomment this part of this code to add
//  * a teacher.
//  * Adding a Teacher
const newTeacher = new Teacher({
  email: 'admin@rms.com',
  password: 'Teacher@RMS'
});

newTeacher.save((err) => {
  if(!err) console.log("Added successfully!");
  else console.log(err);
});
*/

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => 
  console.log(`Server is listening on ${PORT}.`)
); 