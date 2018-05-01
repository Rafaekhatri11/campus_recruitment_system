import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import { cyan900 } from 'material-ui/styles/colors';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';

import * as firebase from 'firebase';


const mystyle = {
    buttonstyle: {
        fontWeight: 'bold',
        color: 'white'
    },
    paperstyle: {
        height: 600,
        width: 500,
        margin: 'auto auto',
        marginTop: '5%',
        paddingTop: 10
    }
}
export default class Displayjobs extends Component {

    constructor() {
        super();
        this.state = {
            alljobs: [],
            cuurentJob: [],
            appliedstudent: [],
            jobapplied: false,
            key: ''
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ key: user.uid.toString() })
            }
        })
        let fireData = firebase.database().ref('Jobs');
        let array = this.state.alljobs;
        fireData.on('child_added', snap => {
            let data = snap.val();
            let datakey = snap.key;

            for (var key in data) {

                let alldata = data[key];
                array.push({ key, alldata, datakey });
                this.setState({ alljobs: array })
            }

        })


    }



    appliedForJob(para) {

        //  let specificjob = this.state.cuurentJob;
       // let fireData = firebase.database().ref('Jobs');
        let fireAuth = firebase.auth();
        let array = [];

        firebase.database().ref('Profiles').once('value', snap => {
            let data = snap.val();

            for (var key in data) {
                if (key === fireAuth.currentUser.uid) {
                    array.push({
                        name: data[key].Name,
                        address: data[key].Addres,
                        experience: data[key].experience,
                        Gender: data[key].gender,
                        qualification: data[key].qualification,
                        contact: data[key].Contact

                    })
                    this.setState({ appliedstudent: array });
                 
                }
            }

            array.map((text, index) => {
               // let alreadyapply = this.state.key
                // console.log(fireData.child(para.datakey).child(para.key).child('Applied').child(fireAuth.currentUser.uid));
               console.log(fireAuth.currentUser.uid)
                 firebase.database().ref(`/Jobs/${para.datakey}/${para.key}`).once('value')
                    .then((data) => {
                        let dbdata = data.val();
                        if (dbdata.Applied) {

                           firebase.database().ref(`/Jobs/${para.datakey}/${para.key}/Applied/`).once('value')
                                .then((detail) => {
                                    let data = detail.val();
                                    let apply = false;
                                    console.log(data);
                                    for (var key in data) {
                                        if (key === fireAuth.currentUser.uid) {
                                            apply = true;
                                            break;
                                        }
                                    }
                                    if (apply === true) {
                                        alert('already applied');
                                    }
                                    else {
                                        firebase.database().ref(`/Jobs/${para.datakey}/${para.key}/Applied/${fireAuth.currentUser.uid}/`)
                                            .set({
                                                name: text.name,
                                                address: text.address,
                                                experience: text.experience,
                                                Gender: text.Gender,
                                                qualification: text.qualification,
                                                contact: text.contact
                                            })
                                        alert('Successfully applied');
                                    }
                                })
                        }

                        else {
                        firebase.database().ref(`/Jobs/${para.datakey}/${para.key}/Applied/${fireAuth.currentUser.uid}/`)
                        .set({
                            name: text.name,
                            address: text.address,
                            experience: text.experience,
                            Gender: text.Gender,
                            qualification: text.qualification,
                            contact: text.contact
                        })
                        alert('Successfull applied');
                    }
                    })
             
            })

        });


    }















    userProfile() {
        this.props.history.push('/student')
    }
    logOut() {
        firebase.auth().signOut();
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <AppBar zDepth={2} title={<span style={{ color: 'white', fontWeight: 'bold' }}>Student</span>} showMenuIconButton={false}
                    style={{ background: cyan900 }} iconElementRight={
                        <div style={{ paddingTop: 7 }}>
                            <FlatButton label="Profile" labelStyle={mystyle.buttonstyle} onClick={() => this.userProfile()} />
                            <FlatButton label="Log out" onClick={() => this.logOut()} labelStyle={mystyle.buttonstyle} />
                        </div>
                    } />

                {
                    this.state.alljobs.map((text, index) => {

                        return (
                            <div key={index} style={{ marginTop: 10 }}>
                                <Card style={{ width: '100%' }} >
                                    <CardHeader title={text.alldata.Title}
                                        subtitle="Job"
                                        actAsExpander={true}
                                        showExpandableButton={true}

                                    />

                                    <CardActions>
                                        <div>
                                            <FlatButton label="Apply" fullWidth={true} disabled={text.alldata.applied}
                                                onClick={((para) => this.appliedForJob(text))} hoverColor="green" />
                                        </div>
                                    </CardActions>

                                    <CardText expandable={true} style={{ display: 'inline-flex', width: '90%', border: '1px solid black', marginLeft: 50 }}>
                                        <CardText style={{ width: '50%' }}><h3>Requirement</h3>
                                            <p>{text.alldata.Requirement}</p>
                                        </CardText>
                                        <CardText style={{ width: '50%', borderLeft: '1px solid black' }}><h3>Timing</h3>
                                            <p>{text.alldata.Timing}</p>
                                            <h3>Experience</h3>
                                            <p>{text.alldata.Experience}</p>
                                            <h3>Department</h3>
                                            <p>{text.alldata.Department}</p>
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