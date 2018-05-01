import React ,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import { cyan900 } from 'material-ui/styles/colors';
import * as firebase from 'firebase';


const mystyle={
    buttonstyle:{
       fontWeight: 'bold',
       color: 'white'
    },
    paperstyle :{
        height: 600 ,
        width: 500,
        margin: 'auto auto',
        marginTop: '5%',
        paddingTop: 10
    }
}





export default class Adminnavbar extends Component{
    
    adminstudent(){
        this.props.history.push('/adminstudent');
    }

    admincompany(){
        this.props.history.push('/admincompany');

    }
    adminjob(){
        this.props.history.push('/adminjob');
    }

    logout(){
        firebase.auth().signOut();
        this.props.history.push('/');

    }
    render(){
        return(
            <AppBar zDepth={2} title={<span style={{color:'white', fontWeight: 'bold'}}>Admin</span>} showMenuIconButton={false}
            style={{background:cyan900}}   iconElementRight={ 
                <div style={{ paddingTop: 7}}>
          
            <FlatButton label="Students" labelStyle={mystyle.buttonstyle}  onClick={this.props.adminstudent}/>
            <FlatButton label="Companies" labelStyle={mystyle.buttonstyle} onClick={this.props.admincompany} />
            <FlatButton label="Jobs" labelStyle={mystyle.buttonstyle} onClick={this.props.adminjob}/>
            <FlatButton label="Log out" onClick={this.props.logout} labelStyle={mystyle.buttonstyle} />
            </div>
             }/>
        );
    }
}