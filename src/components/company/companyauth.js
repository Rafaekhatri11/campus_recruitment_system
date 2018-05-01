import React ,{Component} from 'react';
import {cyan900 ,white} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from "firebase";
import Navbar from './navigation';



export default class Companydetail extends Component{
    constructor(){
        super();
        this.state={
            title: '',
            requirement: '',
            experience: '',
            department: '' ,
            timing: '',
            value: "",
            open : false
        }
    }
    postofjobs(){
        this.props.history.push('/company')
    }
    
    historyofjob(){
        this.props.history.push('/jobs')
    }
    logOut(){
        firebase.auth().signOut();
        this.props.history.push('/');
    }
    applied(){
        this.props.history.push('/applied')
    }
    publishTheJob(evt){
        evt.preventDefault();
        if(this.state.title === "" || this.state.requirement === "" || this.state.experience === "" || this.state.department === "" || this.state.timing === ""){
            alert('Please enter all fields');
        }

        else{
            let fireData = firebase.database().ref();
            let fireAuth = firebase.auth();
            fireData.child('Jobs').child(fireAuth.currentUser.uid).push().set({
                Title: this.state.title,    
                Requirement: this.state.requirement,
                Experience: this.state.experience,
                Department: this.state.department,
                Timing : this.state.timing ,
            })
            this.setState({
                title: '',
                requirement: '',
                experience: '',
                department: '' ,
                timing: '',
                date: '',
                value: ""
            });
            alert('Successfully post job')
        }
    }

    handleOpen(){
        this.setState({open: true})
    }
    handleClose(){
        this.setState({open : false})
    }
    render(){
        return(
            <div>
                
                 <Navbar  applied={() => this.applied()} historyofjob={() => this.historyofjob()}
                  logout= {() => this.logOut()} postjob={()=> this.postofjobs()}/>
              
              <div>
                  <form onSubmit={(evt) => this.publishTheJob(evt)}>
                      <p style={{fontSize:40,textAlign:'center'}}>Post Your Jobs</p>
                       <table style={{margin: 'auto auto', marginTop: 40}}>
                           <tbody>
                               <tr>
                                   <td>
                                       Title:
                                   </td>
                                   <td>
                                       <TextField underlineFocusStyle={{borderColor: cyan900}} 
                                        onChange={(evt) => this.setState({title: evt.target.value})}
                                        maxLength="20" value={this.state.title}
                                       />
                                   </td>
                               </tr>
                               <tr>
                                   <td>
                                      Requirement:
                                   </td>
                                   <td>
                                   <TextField
                                        //hintText="MultiLine with rows: 2 and rowsMax: 4"
                                        onChange={(evt) => this.setState({requirement: evt.target.value})}
                                        multiLine={true}
                                        rows={2}
                                        rowsMax={4}
                                        underlineFocusStyle={{borderColor: cyan900  }}
                                        maxLength="500"
                                        value={this.state.requirement}
                                        />
                                   </td>
                               </tr>
                               <tr>
                                   <td>
                                       Experience:
                                   </td>
                                   <td>
                                       <TextField underlineFocusStyle={{borderColor: cyan900}} 
                                       onChange={(evt) => this.setState({experience: evt.target.value})}
                                       maxLength="25" value={this.state.experience}
                                       />
                                   </td>
                               </tr>
                               <tr>
                                   <td>
                                       Department:
                                   </td>
                                   <td>
                                       <TextField underlineFocusStyle={{borderColor: cyan900}}
                                       onChange={(evt) => this.setState({department: evt.target.value})}
                                       maxLength="15" value={this.state.department}
                                       />
                                   </td>
                               </tr>
                               <tr>
                                   <td>
                                       Salary:
                                   </td>
                                   <td>
                                       <TextField underlineFocusStyle={{borderColor: cyan900}} 
                                       onChange={(evt) => this.setState({timing: evt.target.value})}
                                       maxLength="15" type="number" value={this.state.timing}
                                       />
                                   </td>
                               </tr>
                              
                           </tbody>
                       </table>
                       <RaisedButton label="Post" labelColor={white} style={{marginLeft: "47%" , marginRight: "35%" , marginTop:5}}
                                    backgroundColor={cyan900} type='submit'/>
                  </form>
              </div>
            
            </div>
        );
    }
}