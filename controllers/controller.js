import mongoose from 'mongoose';
import { StudentSchema, TeacherSchema } from '../models/model';

const Student = mongoose.model('Student', StudentSchema);
const Teacher = mongoose.model('Teacher', TeacherSchema);

// Variables
let loggedInTeacher = false;

export const homepage = (req, res) => {
  res.render('home', { isLoggedIn: loggedInTeacher });
};

export const getStudentResult = (req, res) => {
  res.render('result', { isLoggedIn: loggedInTeacher, student: null, message: req.flash('message') });
};

export const postStudentResult = (req, res) => {
  console.log('The Entered Student is: ' + req.body.studentRoll + " " + req.body.studentDOB);
  Student.find({ rollNo: req.body.studentRoll }, (err, result) => {
    if(err) res.send(err);
    else {
      if(result.length == 0) {
        req.flash('message', `No Records found with roll number ${req.body.studentRoll}.`);
        res.redirect('/student/result');
      }
      else {
        if(result[0].dob == req.body.studentDOB) {
          console.log('The correct result is' + result);
          res.render('result', { isLoggedIn: loggedInTeacher, student: result[0], message: req.flash('message') });
        } else {
          req.flash('message', 'Invalid Roll Number or, DOB!');
          res.redirect('/student/result');
        }
      }
    }
  });
};

export const getTeacherLogin = (req, res) => {
  res.render('login', { isLoggedIn: loggedInTeacher, success: req.flash('message') });
};

export const postTeacherLogin = (req, res) => {
  const teacherMail = req.body.teacherMail;
  const teacherPassword = req.body.teacherPassword;
  if(teacherPassword.length < 6) {
    req.flash('message', 'Password must be at least 6 characters long!');
    res.redirect('/teacher/login');
  } else {
    Teacher.findOne({ email: teacherMail }, (err, foundMail) => {
      if(err) res.send(err);
      else {
        if(foundMail != null) {
          if(foundMail.password == teacherPassword) {
            loggedInTeacher = true;
            req.flash('message', 'You are now logged in!');
            res.redirect('/teacher/dashboard');
          } else {
            req.flash('message', 'Incorrect Password!');
            res.redirect('/teacher/login');
          }
        } else {
          req.flash('message', 'Invalid Email or, Password!');
          res.redirect('/teacher/login');
        }
      }
    });
  }
};

export const getAddResult = (req, res) => {
  if(loggedInTeacher == true) 
    res.render('add-result', { isLoggedIn: loggedInTeacher });
  else res.redirect('/teacher/login');
};

export const postAddResult = (req, res) => {
  if(loggedInTeacher == true) {
    let newRecord = new Student( { rollNo: req.body.studentRollNo, name: req.body.studentName, dob: req.body.studentDOB, score: req.body.studentScore });
    console.log("The New Record is: " + newRecord);
    newRecord.save((err, record) => {
      if(err) res.send(err);
      else {
        if(record != null) req.flash('message', 'Added Successfully!');
        else req.flash('message', 'Some error occured while adding the record!');
        console.log("Saved or not: " + record);
        res.redirect('/teacher/dashboard');
      } 
    });
  } else res.redirect('/teacher/login');
};

export const getUpdateResultById = (req, res) => {
  if(loggedInTeacher == true) {
    Student.findById(req.params.studentId, (err, student) => {
      if(err) res.send(err);
      else {
        console.log('The data is: ' + student);
        res.render('update-result', { result: student, isLoggedIn: loggedInTeacher });
      }
    });
  } else res.redirect('/teacher/login');
};

export const postUpdateResultById = (req, res) => {
  if(loggedInTeacher == true) {
    Student.findOneAndUpdate({_id: req.params.studentId}, req.body, (err, student) => {
      if(err) res.send(err);
      else {
        console.log(student);
        req.flash('message', `Updated record successfully with id ${req.params.studentId}.`);
        res.redirect('/teacher/dashboard');
      }
    });
  } else res.redirect('/teacher/login');
};

export const deleteResultById = (req, res) => {
  if(loggedInTeacher == true) {
    Student.deleteOne({ _id: req.params.studentId }, (err) => {
      if(err) res.send(err);
      req.flash('message', `Deleted record successfully with id ${req.params.studentId}.`);
      res.redirect('/teacher/dashboard');
    });
  } else res.redirect('/teacher/login');
};

export const dashboard = (req, res) => {
  if(loggedInTeacher == true) {
    Student.find({}, (err, allStudents) => {
      console.log('All Students found is: ' + allStudents);
      if(!err) 
        res.render('dashboard', { isLoggedIn: loggedInTeacher, students: allStudents, message: req.flash('message') });
    });
  } else res.redirect('/teacher/login');
};

export const doLogout = (req, res) => {
  loggedInTeacher = false;
  req.flash('message', 'Logged Out!');
  res.redirect('/teacher/login');
};