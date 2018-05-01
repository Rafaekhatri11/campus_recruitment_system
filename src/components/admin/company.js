import React ,{Component} from 'react';
import Adminnavbar from './navbar';
import FlatButton from 'material-ui/FlatButton'
import * as firebase from 'firebase';
import {Card, CardHeader, CardText,CardActions} from 'material-ui/Card';


export default class Admincompany extends Component{
    constructor(){
        super();
        this.state={
            companylist: [],
        }
    }
    componentDidMount(){
        firebase.database().ref('Users').on('value', snap =>{
        let data = snap.val();
      
        let company=[];
        for(var key in data){
           
            if(data[key].type === 'Company'){
                let newdata = data[key];
                company.push({key, newdata});
               
            }
        }
        this.setState({companylist: company})

    })

    // firebase.database().ref('Users').on('child_changed', snap => {
    //     let data = snap.val();
       
    //     let company= [];
    //     for(var key in data){
           
    //         if(data[key].type === 'Company'){
    //             let newdata = data[key];
    //             company.push({key, newdata});
    //             this.setState({companylist: company});
    //         }
    //     }
    // })
}
delete(para){
    firebase.database().ref(`/Users/${para.key}`).remove();
   
    firebase.database().ref(`/Jobs/${para.key}`).remove();
    
}
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
            <div>
                <Adminnavbar adminstudent={() => this.adminstudent()}
                    admincompany={()=> this.admincompany()}
                    adminjob={()=> this.adminjob()}
                    logout={()=> this.logout()}
                 />
                <h1>Company Admin</h1>
                {
                     this.state.companylist.map((text,index) => {
                        return(
                           <div key={index} style={{ marginTop: 10}}>
                           <Card style={{width: '100%'}} >
                                <CardHeader   title={text.newdata.Name}
                                   //subtitle="Job"
                                   actAsExpander={true}
                                   showExpandableButton={true}

                                   />  

                                   <CardActions>
                                     <div>
                                       <FlatButton label="Delete" fullWidth={true} hoverColor='red'
                                       onClick={(para) => this.delete(text)}/>
                                     </div>
                                       </CardActions>   
                               
                               <CardText expandable={true} style={{display:'inline-flex',width:'90%',border: '1px solid black',marginLeft:50}}>
                                   <CardText style={{width:'50%'}}><h3>Name</h3>
                                       <p>{text.newdata.Name}</p>
                                   </CardText>
                                   <CardText  style={{width:'50%' , borderLeft: '1px solid black'}}>
                                      
                                       <h3>Username</h3>
                                       <p>{text.newdata.username}</p>
                                       <h3>Type</h3>
                                       <p>{text.newdata.type}</p>
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