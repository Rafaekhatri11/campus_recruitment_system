import React ,{Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
import  './jobcss.css';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Navbar from './navigation';
import Dialog from 'material-ui/Dialog';


 
export default class Jobs extends Component{
        constructor(){
            super();
            this.state={
                companyUid: '',
                job : [],
                open : false,
                AppliedStudents : [],
                temparray: []
            }
        }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({companyUid: user.uid})
                console.log(this.state.companyUid);
                let alljob = [];
                let array = [];
                firebase.database().ref('Jobs').child(this.state.companyUid).on('value', snap =>{
                    let data = snap.val();
                    for(var key in data){
                        alljob.push(data[key]);
                        console.log(this.state.job);
                        this.setState({job: alljob});

                        if(data[key].Applied){
                            let applystudent = data[key].Applied;
                          //  let title = data[key].Title;
                            for(var key in applystudent){
                                array.push(
                                    { uid: key,
                                      Name: applystudent[key].name ,
                                      address:applystudent[key].address,
                                      contact: applystudent[key].contact,
                                      Gender :applystudent[key].Gender, 
                                      experience :applystudent[key].experience,
                                      qualification:applystudent[key].qualification});
                                this.setState({AppliedStudents: array})
                             
                            
                            }
                            
                        }
                        // else{
                        //     document.getElementById('app').innerHTML = 'No Student Applied';  
                        // }
                    }
                   
                })
            }
           
        })
   
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
        this.props.history.push('/applied');
    }

    handleClose(){
        this.setState({open : false})
    }
    handleOpen(){
        this.setState({open : true})
    }

    studentdetial(info){
     //   console.log(info);
        firebase.database().ref().child('Jobs').once('child_added', snap => {
            let data = snap.val();
            for (var key in data){
                if(data[key].Applied){
                    let newdata = data[key].Applied;
                    for(var key in newdata){
                        if(key === info){
                            let array = [];
                            array.push({
                                 name :newdata[key].name,
                                 address:newdata[key].address ,
                                 contact: newdata[key].contact ,
                                 experience: newdata[key].experience,
                                 qualification: newdata[key].qualification
                            })
                            console.log(array);
                            this.setState({temparray: array})
                        }
                    }
                }
                //console.log(data[key]);

            }
        })
    }
    render(){
       // console.log(this.state.AppliedStudents)
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={() => this.handleClose()}
            />,
           
          ];
           
          
      
        return(
            <div>
               

                 <Navbar applied={() => this.applied()} historyofjob={() => this.historyofjob()}
                  logout= {() => this.logOut()} postjob={()=> this.postofjobs()} />
                 <div>
                     <h1 id='empty'> My Jobs </h1>
                     {this.state.job.map((text, index)  => {
                        //  if(this.state.AppliedStudents.length > 0)
                        //  {
                        //      document.getElementById('app1').innerHTML = 'Applied Student';

                        //  }
                        //  else {
                        //     document.getElementById('app1').innerHTML = 'No Applied Student';
                        //  }
                         return(
                          
                                <div key={index} style={{ marginTop: 10}}>
                                <Card style={{width: '100%'}} >
                                    <CardHeader   title={text.Title}
                                        subtitle="Job"
                                        actAsExpander={true}
                                        showExpandableButton={true}

                                        /> 
                                    
                                    <CardText expandable={true} style={{width:'90%',border: '1px solid black',marginLeft:50}}>
                                        <CardText style={{width:'100%'}}>
                                        <div style={{display: 'inline-flex' , width:'100%'}}>
                                            <h3 style={{paddingLeft:20}}>Requirement</h3>
                                            <p  style={{paddingLeft:20}}>{text.Requirement}</p>
                                        </div>
                                        <div  style={{display: 'inline-flex' , width:'100%'}}>
                                          
                                            <h3  style={{paddingLeft:20}}>Experience</h3>
                                            <p  style={{paddingLeft:20}}>{text.Experience}</p>
                                        </div>
                                        <div style={{display: 'inline-flex' , width:'100%'}}>
                                            <h3  style={{paddingLeft:20}}>Department</h3>
                                            <p  style={{paddingLeft:20}}>{text.Department}</p>
                                        </div>
                                        <div  style={{display: 'inline-flex' , width:'100%'}}>
                                            <h3  style={{paddingLeft:20}}>Salary</h3>
                                            <p  style={{paddingLeft:20}}>{text.Timing}</p>
                                        </div>
                                        </CardText>
                                       <Card>
                                            <CardHeader title="Student Applied for Job"
                                             subtitle={this.state.AppliedStudents.length + ' have applied'}
                                             actAsExpander={true}
                                             showExpandableButton={true} />
                                             <CardText expandable={true}>
                                             {this.state.AppliedStudents.map((text,index) =>{
                                                return(
                                      <div key={index} style={{display: 'block'}}>
                                        <div style={{display: 'inline-flex' , width : '100%'}}>
                                         <h3 > {text.Name}</h3>
                                         <FlatButton label='View Detials' onClick={() => {this.handleOpen() , this.studentdetial(text.uid)}} />
                                         <Dialog
                                            title="Detail of Student"
                                            actions={actions}
                                            modal={true}
                                            open={this.state.open}
                                            >
                                            {this.state.temparray.map((text,index)=>{
                                                return(
                                            <div key={index}>
                                             <h3>Name</h3>
                                            <p> {text.name}</p>
                                            <h3>Address</h3>
                                            <p> {text.address}</p>
                                            <h3>Contact</h3>
                                            <p> {text.contact}</p>
                                            <h3>Experience</h3>
                                            <p> {text.experience}</p>
                                            <h3>Qualification</h3>
                                            <p> {text.qualification}</p>
                                            </div>
                                                )
                                            })}
                                            
                                            </Dialog>
                                            </div>
                                           
                                            </div>
                                            
                                                )
                                            })}
                                            
                                             </CardText>
                                        </Card>
                                        {/* <CardText>
                                        <p id='app'>Applied Students</p>
                                            {this.state.AppliedStudents.map((text,index) =>{
                                                return(
                                                    <div key={index} style={{display: 'inline-flex'}}>
                                                    <h3 > {text.Name}</h3>
                                                
                                            <div>
                                                    
                                            <h4>Adddress</h4>
                                            <p > {text.address}</p>
                                            <h4>Type</h4>
                                            <p > {text.Gender}</p>
                                            <h4>Experience</h4>
                                            <p > {text.experience}</p>
                                            <h4>Qualification</h4>
                                            <p > {text.qualification}</p>
                                        
                                            </div>
                                                    
                                            </div>
                                                )
                                            })}
                                            </CardText> */}
                                    </CardText>   
                                                           
                                </Card>
                                </div> 
                              
                         
                         )
                     })}
                 </div>
            </div>
        );
    }
}