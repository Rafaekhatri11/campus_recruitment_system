import React,{Component} from 'react';
import * as firebase from 'firebase';
import Navbar from './navigation';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export default class Appliedjobs extends Component{
    constructor(){
        super();
        this.state ={
            AppliedStudents:[],
            primarykey : '',
            open: false
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged( user =>{
            if(user){
                this.setState({primarykey: user.uid})
                console.log(this.state.primarykey);
                let array = [];
                firebase.database().ref('Jobs').child(this.state.primarykey).on('value', snap => {
                    let data = snap.val();
                    for(var key in data){
                        
                     //   if(data[key].Applied){
                            let applystudent = data[key].Applied;
                            let title = data[key].Title;
                            for(var key in applystudent){
                                     array.push(
                                            { Title: title,
                                              Name: applystudent[key].name ,
                                              address:applystudent[key].address,
                                              contact: applystudent[key].contact,
                                              Gender :applystudent[key].Gender, 
                                              experience :applystudent[key].experience,
                                              qualification:applystudent[key].qualification});
                                        this.setState({AppliedStudents: array})
                                       
                                    }
                          //  }
                            // else {
                            //     document.getElementById('emptyjob').innerText = 'No student applied'
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
        this.props.history.push('/applied')
    }


    render(){
       
        return(
            <div> 
             
                 <Navbar applied={() => this.applied()} historyofjob={() => this.historyofjob()}
                  logout= {() => this.logOut()} postjob={()=> this.postofjobs()} />
                    <h1 id='emptyjob'></h1>
                
                   {        
                            this.state.AppliedStudents.map((text,index)=> {
                              
                                return(

                               
                            <div key={index} style={{ marginTop: 10}}>
                            <Card style={{width: '100%'}} >
                                <CardHeader   title={text.Title}
                                    subtitle={text.Name}
                                    actAsExpander={true}
                                    showExpandableButton={true}

                                    /> />
                                
                                <CardText expandable={true} style={{display:'inline-flex',width:'90%',border: '1px solid black',marginLeft:50}}>
                                    <CardText style={{width:'50%'}}>
                                        
                                        <h3>Address</h3>
                                        <p>{text.address}</p>  
                                        <h3>Qualification</h3>
                                        <p>{text.qualification}</p>
                                        <h3>Experience </h3>
                                        <p>{text.experience}</p>
                                        <h3>Contact</h3>
                                        <p>{text.contact}</p>
                                        <h3>Gender</h3>
                                        <p>{text.Gender}</p>
                                    </CardText>
                                    <CardText  style={{width:'50%' , borderLeft: '1px solid black'}}>
                                        <h3 id='appl'>
                                        Applied Student
                                        </h3>
                                        
                                        <div style={{display: 'inline-flex', marginLeft:10}}>
                                        
                                        <h3>{text.Name}</h3> 
                                        {/* <FlatButton  label="view details" style={{marginLeft:100}}/> */}
                                        <div>
                                        <FlatButton label="View Detials"  style={{marginLeft:100}} onClick={() => this.handleOpen()}/>
                                        <Dialog
                                        title="Student infromation"
                                        actions={actions}
                                        modal={false}
                                        open={this.state.open}
                                        autoScrollBodyContent={true}
                                        onRequestClose={() => this.handleClose()}
                                        >
                                        <h3>Address</h3>
                                        <p>{text.address}</p>  
                                        <h3>Qualification</h3>
                                        <p>{text.qualification}</p>
                                        <h3>Experience </h3>
                                        <p>{text.experience}</p>
                                        <h3>Contact</h3>
                                        <p>{text.contact}</p>
                                        <h3>Gender</h3>
                                        <p>{text.Gender}</p>
                                        </Dialog>
                                        </div>
                                        </div>
                                   </CardText>
                                </CardText>   
                                                       
                            </Card>
                            </div> 
                             )
                      })
                   }   
                
            </div>
        );
    }
}