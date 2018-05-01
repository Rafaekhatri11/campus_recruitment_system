import React, { Component } from 'react';
import './App.css';
import Login from '../panel/login';
import {BrowserRouter , Route  } from 'react-router-dom';
import Signup from '../panel/signup';
import Studentdetail from '../student/studentauth';
import Companydetail from '../company/companyauth';
import Jobs from '../company/jobs';
import Displayjobs from '../student/displayjobs';
import Admin from '../admin/adminauth';
import Adminstudent from '../admin/student';
import Admincompany from '../admin/company';
// function PrivateRoute1({component: Component , auth, ...rest}){
//     return(
//       <Route
//           {...rest}
//           render={(props) => auth === true
//               ? <Component {...props} />
//               : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
//       />
//     )
// }

// function PrivateRoute2({component: Component , auth, ...rest}){
//     return(
//       <Route
//           {...rest}
//           render={(props) => auth === true
//               ? <Component {...props} />
//               : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
//       />
//     )
// }

// function PrivateRoute3({component: Component , auth, ...rest}){
//   return(
//     <Route
//         {...rest}
//         render={(props) => auth === true
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
//     />
//   )
// }
class App extends Component {
  constructor(){
    super();
    this.state={
      auth : false
    }
  }

 // componentWillMount() {
//     let that = this
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             that.setState({
//                 auth: true
//             })
//             let type = localStorage.getItem("type")
//             let convertype = JSON.parse(type)
//             if (convertype !== null) {
//                 history.push(convertype)
//             }
//         }
//         else {
//             console.log(user)
//             that.setState({
//                 auth: false,
//             })
//         }
//         console.log(this.state.auth)
//     });
// }
  render() {
    return (
      <BrowserRouter> 
      <div>
       <Route component={Login} path="/" exact/>
       <Route component={Signup} path="/signup" /> 
       <Route  component={Studentdetail} path="/student" /> 
      <Route  component={Companydetail} path="/company" />
      <Route component={Jobs} path="/jobs" />
      <Route component={Displayjobs} path="/companyjobs" />
      <Route  component={Admin} path="/adminjob" />
      <Route  component={Adminstudent} path="/adminstudent" />
      <Route  component={Admincompany} path="/admincompany" />

      </div>
     </ BrowserRouter>
    );
  }
} 

export default App;
