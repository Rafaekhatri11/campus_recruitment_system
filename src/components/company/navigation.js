import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {cyan900 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

const mystyle={
    buttonstyle:{
       fontWeight: 'bold',
       color: 'white'
    },
   
}
export default class Navbar extends Component{
    render(){
        return(
            <div>

                 <AppBar zDepth={2} title={<span style={{color:'white', fontWeight: 'bold'}}>Company</span>} showMenuIconButton={false}
                style={{background:cyan900}}   iconElementRight={ 
                    <div style={{ paddingTop: 7}}>
                <FlatButton label="History" onClick={this.props.historyofjob} labelStyle={mystyle.buttonstyle} />
                <FlatButton label="Post Job" onClick={this.props.postjob} labelStyle={mystyle.buttonstyle} />
                <FlatButton label="Log out" onClick={this.props.logout} labelStyle={mystyle.buttonstyle} />
                </div>
                 }/>


            </div>
        );
    }
}