import React ,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import { cyan900 ,white} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';
import Dialog from 'material-ui/Dialog';

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
export default class Studentdetail extends Component{
    constructor(){
        super();
        this.state={
            whichUser: '',
            YName: '',
            Yaddress: '',
            Ycontact: '',
            Yqualification: '',
            value: "",
            exp: "" ,
            open: false,
            uptName:'',
            uptAddress: '',
            uptContact: '',
            uptQualification: '',
            uptExp: '',
            uptgender:''

        }
    }
    handleOpen(evt) {
        evt.preventDefault();
        this.setState({open: true});
      };
    
      handleClose() {
       
        this.setState({open: false});
      };

    logOut(){
        firebase.auth().signOut();
        this.props.history.push('/');
    }

    companyjobs(){
        this.props.history.push('/companyjobs');
    }
    componentDidMount(){
        let fireData = firebase.database().ref('Profiles');
        let fireAuth = firebase.auth();
        fireData.on('value', snap =>{
            const data= snap.val();
            for(var key in data){
                if(key === fireAuth.currentUser.uid ){
                   
                     this.setState({
                        YName: data[key].Name,
                        Yaddress: data[key].Addres,
                        Ycontact: data[key].Contact,
                        Yqualification : data[key].qualification,
                        uptgender: data[key].gender,
                        exp : data[key].experience
                    })
                }
            }
        })      
    }

    updateProfile(){
       
        if(this.state.YName ==="" || this.state.Yaddress ==="" || this.state.Ycontact ==="" || 
        this.state.Yqualification ==="" || this.state.exp ===""  ){
            alert('Please fill all fields');

        }
        else{
           
            let fireAuth = firebase.auth()
            firebase.database().ref().child('Profiles').child(fireAuth.currentUser.uid).set({
                Name: this.state.YName,
                Addres: this.state.Yaddress,
                Contact: this.state.Ycontact,
                qualification: this.state.Yqualification,
                gender : this.state.uptgender,
                experience: this.state.exp
            })

    
        this.setState({open: false})

        }
    }
    render(){
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={() => this.handleClose()}   />,
            <FlatButton
              label="Update"
              primary={true}
              keyboardFocused={true}
              onClick={() => this.updateProfile()}
              disabled={this.state.button}
            />,
          ];
        return(
            <div>
                <AppBar zDepth={2} title={<span style={{color:'white', fontWeight: 'bold'}}>Student</span>} showMenuIconButton={false}
                style={{background:cyan900}}   iconElementRight={ 
                    <div style={{ paddingTop: 7}}>
                <FlatButton label="Jobs" labelStyle={mystyle.buttonstyle} onClick={()=> this.companyjobs()} />
                <FlatButton label="Log out" onClick={() => this.logOut()} labelStyle={mystyle.buttonstyle} />
                </div>
                 }/>
               
               <Paper style={mystyle.paperstyle} zDepth={1}>
                    
                 <div style={{marginLeft:80. , marginRight: 80 , marginTop: 20}}>
                 <form onSubmit={(evt) => this.handleOpen(evt)}>
                        <div style={{display: 'inline-flex'  }}>
                                    <p style={{width: 105}}>Name: </p>
                                
                                    <p> {this.state.YName} </p>
                        </div>
                      <br />
                        <div style={{display: 'inline-flex'}}>
                                <p style={{width: 105}} >Address:</p>
                                <p>{this.state.Yaddress}</p>
                        </div>  
                       <br />
                       <div style={{display: 'inline-flex'}}>
                              <p style={{width: 105}}>Contact:</p>
                         
                             <p>{this.state.Ycontact}</p>
                        </div>  
                       <br />
                        <div style={{display: 'inline-flex'}}>
                             <p style={{width: 105}}>Qualifications:</p>
                       
                             <p>{this.state.Yqualification}</p>
                        </div>      
                        <br />
                        <div style={{display: 'inline-flex'}}>
                            <p style={{width: 105}}>Type </p>
                        
                            <p>{this.state.uptgender}</p>
                        </div>
                        <br/>
                        <div style={{display: 'inline-flex'}}>
                        <p style={{width: 105}}>Experience: </p>
                      
                         <p>{this.state.exp}</p>
                        </div>
                       <div>
                        <RaisedButton label="Edit" labelColor={white} style={{marginTop:50 , marginLeft:100}}
                          backgroundColor={cyan900} type='submit'/>
                        </div>
                    </form>
                 </div>
               </Paper>
        
                <Dialog
                title="Update Your Profile"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
                > 
                <form>
                    
                 <TextField underlineFocusStyle={{borderColor: cyan900}} onChange={(evt) => this.setState({YName: evt.target.value})}
                  value={this.state.YName} maxLength="15" hintText="Name"/> <br/>
                 <TextField underlineFocusStyle={{borderColor: cyan900}}  onChange={(evt) => this.setState({Yaddress: evt.target.value})}
                 value={this.state.Yaddress} maxLength="35" hintText="Address"/> <br />
                 <TextField  underlineFocusStyle={{borderColor: cyan900}}  onChange={(evt) => this.setState({Ycontact: evt.target.value})}
                 value={ this.state.Ycontact} maxLength="11" type="number" hintText="Contact"/> <br/>
                 <TextField  underlineFocusStyle={{borderColor: cyan900}}  onChange={(evt) => this.setState({Yqualification: evt.target.value})}
                 value={this.state.Yqualification} maxLength="10" hintText="Qualification" /> <br />
                 <TextField  underlineFocusStyle={{borderColor: cyan900}}  onChange={(evt) => this.setState({uptgender: evt.target.value})}
                 value={this.state.uptgender} maxLength="10" hintText="Type" /> <br />

                  <TextField hintText="Experience" underlineFocusStyle={{borderColor: cyan900}}  onChange={(evt) => this.setState({exp: evt.target.value})}
                  value={this.state.exp} maxLength="15" hintText="Experience"/> <br />
                 </form>
         </Dialog>
            </div>
        );
    }
}