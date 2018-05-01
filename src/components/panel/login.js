import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {cyan900, white} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import MdVpnKey from 'react-icons/lib/ti/key-outline';
import * as firebase from 'firebase';
import Loader from './loginloader';

const paperstyle = {
    underlinestyle :{
     border: cyan900
    } ,
    pstyle:{
        height: 450,
        width: 300,
        marginLeft: 300,
        marginTop: 100,
        textAlign: 'center',
        display: 'inline-block',
        border: '5px solid lightgrey',
        
    }  ,
    circle:{
        height: 80,
        width: 80,
        marginLeft: 20,
        marginTop:10,
        textAlign: 'center',
        display: 'inline-block',
    }
  };

export default class Login extends Component{

    constructor(){
        super();
            this.state ={
                loader : false,
                username: '',
                password : '',
                currentType: ''
              
            }
        
    }
    loaderuserLogin(para){

        this.setState({loader: true});
        para.preventDefault();
        let email = this.state.username;
        let pass = this.state.password;
        let fireAuth= firebase.auth();
        fireAuth.signInWithEmailAndPassword(email,pass)
        .then((user) => {
            this.setState({
                username: '',
                password : '',
            })
            let uid = user.uid
            if(email==='admin@gmail.com' && pass === '123456'){
                this.props.history.push('/adminjob');
            }
            else if(user){
                firebase.database().ref('Users').child(uid).once('value')
                .then((data) =>{
                   // console.log(data.val().type);
                  if(data.val() !== null){
                    if(data.val().type === 'Student'){
                        this.props.history.push('/student');
                    }
                    else if(data.val().type === 'Company'){
                        this.props.history.push('/company');
                    }
                }
                else{
                    user.delete();
                    alert('user is deleted by admin');
                    this.setState({loader: false})
                }
                    
                })
              
             
            }

            
        })
        .catch((error ) =>{
                this.setState({loader: false})
                alert(error)
            })
       
        
    }

    userLogin(){
        console.log('successfull')
      
    }
    render(){
        return(
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td style={{width: 500 , paddingLeft: 100}}>
                             <h1 style={{color:'grey'}}>Campus Recruitment System</h1>
                                <p>
                              
                                A college campus recruitment system that consists of a student login, company login and an 
                                admin login. The project is beneficial for college students, various companies visiting the
                                 campus for recruitment and even the college placement officer. The software system allows the
                                  students to create their profiles and upload all their details including their marks onto
                                   the system. The admin can check each student details and can remove faulty accounts. 
                                   The system also consists of a company login where various companies visiting the college 
                                   can view a list of students in that college and also their respective resumes. The software
                                    system allows students to view a list of companies who have posted for vacancy. The admin
                                     has overall rights over the system and can moderate and delete any details not pertaining 
                                     to college placement rules. The system handles student as well as company data and
                                      efficiently displays all this data to respective sides.
                                </p>
                        </td>
                        <td>
                                <Paper style={paperstyle.pstyle} zDepth={5} >
                                <MdVpnKey style={{height:100, width:100 , color:cyan900}} />
                                    
                                <form style={{marginTop:5}} onSubmit={(para) => this.loaderuserLogin(para)}>
                                <TextField
                                      hintText="Username"
                                      underlineFocusStyle={{borderColor:cyan900}}
                                      onChange={(para) => this.setState({username:para.target.value})}
                                     value={this.state.username}
                                  />
                                  <br /> <br />
                                   <TextField
                                      hintText="Password"
                                      underlineFocusStyle={{borderColor:cyan900}}
                                      onChange={(para) => this.setState({password:para.target.value})}
                                      id='passfield'
                                      type='password'
                                  />
                                  { this.state.loader === false 
                                    ? 
                                    <RaisedButton label="Log In" labelColor={white} style={{marginTop:50}}
                                    backgroundColor={cyan900} type='submit'/>
 
                                     :
                                        <Loader />
                                      
                                  }
                                
                                <p> Don't have an account? <Link to='./signup'>Sign Up</Link> </p>
                                </form>
                                 </Paper>
                                 
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}