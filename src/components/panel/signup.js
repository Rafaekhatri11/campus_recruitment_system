import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {cyan900, white} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
 import {Link} from 'react-router-dom';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MdPerson from 'react-icons/lib/md/person';
import * as firebase from 'firebase';
import Loader from './signuploader';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import './style.css';


const paperstyle = {
    pstyle:{
        height: 450,
        width: 300,
        marginLeft: 300,
        marginTop: 100,
        textAlign: 'center',
        display: 'inline-block',
        border: '5px solid lightgrey'
    }    
  };
 
export default class Login extends Component{
    constructor(){
        super();
            this.state ={
                loader : false,
                personalName: '',
                username: '',
                personpassword: '',
                whichUser : '',
                value:'',
                currentType: ''

            }
        
    }
    
  
    signUpUser(para){
        para.preventDefault();
        if(this.state.personalName ==="" || this.state.username ==="" || this.state.personpassword ==="" || this.state.whichUser ==="" ){
            alert('Please Enter remaining fields');
            
       console.log(this.state.personalName,this.state.username,this.state.personpassword,this.state.whichUser)
    }
    else{
        console.log(this.state.personalName,this.state.username,this.state.personpassword,this.state.whichUser)
        this.setState({loader: true})
       
        let email = this.state.username;
        let pass = this.state.personpassword;
        let name = this.state.personalName;
        let mainUser = this.state.whichUser.toString();
        console.log(mainUser);
        let fireAuth = firebase.auth();
        let fireDatabase = firebase.database().ref('Users');
        fireAuth.createUserWithEmailAndPassword(email,pass)
        .then(()=>{
            fireDatabase.child(fireAuth.currentUser.uid).set({
                Name : name,
                username : email,
                password : pass,
                type : mainUser
            })
    
            this.setState({
                username : '',
                personpassword: '',
                personalName : '',
                value : ''
            })

            firebase.database().ref('Users').on('value', snap =>{
                let data = snap.val();
                for(var key in data){
                    if(key === fireAuth.currentUser.uid){
                        if(data[key].type === 'Company'){
                            this.props.history.push('./company');
                            break;
                        }
                        else if(data[key].type === 'Student'){
                            console.log(data[key].Name , data[key].type);
                            firebase.database().ref().child('Profiles').child(firebase.auth().currentUser.uid).set({
                                Name: data[key].Name,
                                Address : '',
                                Contact : '',
                                Qualifications: '',
                                gender : data[key].type,
                                Experience: ''
                            })
                            this.props.history.push('./student');
                            break;

                        }
                      
                    }
                 

                    }
                //     let user = this.state.currentType;
                    
                //     switch(user){
                //         case "Student":
                //         this.props.history.push('/student');
                //         break;

                //         case "Company":
                //         this.props.history.push('/company');
                //         break;

                //         default:
                //         alert('Something wrong')
                
                  
                // }
            })
        })
        .catch((error) =>{
            this.setState({loader: false})
            alert(error);
        })
        

        document.getElementById('passwordfield').value = '';
    }
        
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
                                Login forms are everywhere on the web. Are you using the social networks? 
                                You must go through login form of some sort. Do you have an email? Did you join any forums?
                                Did you try to leave a comment on a WordPress site? To gain access to anything on the internet, 
                                the chances are you will have to go through some sort of login process. You will probably have to register first, sign up or leave some information behind. You will have to use some sort of login form to do anything on the internet.
                                </p>
                        </td>
                        <td>
                                <Paper style={paperstyle.pstyle} zDepth={5} >
                                <MdPerson style={{height:100, width:100 , color:cyan900}} />
                               
                                <form style={{marginTop:10}} onSubmit={(para) => this.signUpUser(para)}>
                                <TextField
                                      hintText="Name"
                                      underlineFocusStyle={{borderColor:cyan900}}
                                      onChange={(evt)=> this.setState({personalName: evt.target.value})}
                                      value={this.state.personalName}
                                  /> <br/>
                                <TextField
                                      hintText="Username"
                                      underlineFocusStyle={{borderColor:cyan900}}
                                      onChange={(evt)=> this.setState({username: evt.target.value})}
                                      value={this.state.username}
                                  />
                                  <br />
                                   <TextField
                                      hintText="Password"
                                      underlineFocusStyle={{borderColor:cyan900}}
                                      onChange={(evt)=> this.setState({personpassword: evt.target.value})}
                                      type='password'
                                      value={this.state.password}
                                      id='passwordfield'
                                  />
                                  <br /> <br />
                                   <RadioButtonGroup name="notRight" labelPosition="right"
                                   style={{width: 200, display: 'inline-flex',marginRight:20}}>
                                        
                                        <RadioButton 
                                                value="Student"
                                                label="Student"
                                                className='radiobutton'
                                                onClick={(evt) => this.setState({whichUser : evt.target.value})}                                           
                                            /> 
                                            <RadioButton
                                                value="Company"
                                                label="Company"
                                                className='radiobutton'
                                                onClick={(evt) => this.setState({whichUser : evt.target.value})}
                                            />
                               
                                         </RadioButtonGroup>
                                    {
                                        this.state.loader=== false ?
                                        <RaisedButton label="Sign Up" labelColor={white} style={{marginTop:30}}
                                        backgroundColor={cyan900} type='submit' /> :
                                        <Loader style={{marginTop: 30}}/>
                                          
                                    }
                                  
                                   
                                  <br/>
                              
                                <p> Already have an account? <Link to="/" >Sign In</Link> </p>
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