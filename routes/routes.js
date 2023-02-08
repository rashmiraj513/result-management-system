import { dashboard, deleteResultById, doLogout, getAddResult, getStudentResult, getTeacherLogin, getUpdateResultById, homepage, postAddResult, postStudentResult, postTeacherLogin, postUpdateResultById } from "../controllers/controller";

const routes = (app) => {
  // Main Route
  app.route('/')
  // For homepage
  .get(homepage)

  // For Student
  app.route('/student/result')
  // For Student Result
  .get(getStudentResult)
  .post(postStudentResult)

  // For Teacher
  app.route('/teacher/login')
  // For Teacher Login
  .get(getTeacherLogin)
  .post(postTeacherLogin)

  // For Add New Result
  app.route('/teacher/add-result')
  .get(getAddResult)
  .post(postAddResult)

  // For Update Result by Id
  app.route('/teacher/update-result/:studentId')
  .get(getUpdateResultById)
  .post(postUpdateResultById)

  // For Delete Result by Id
  app.route('/teacher/delete-result/:studentId')
  .get(deleteResultById)

  // For Teacher Dashboard
  app.route('/teacher/dashboard')
  .get(dashboard)

  // For Logout
  app.route('/logout')
  .get(doLogout)
}

export default routes;