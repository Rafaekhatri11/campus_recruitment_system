import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton'
import * as firebase from 'firebase';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import Adminnavbar from './navbar';




export default class Admin extends Component {

    constructor() {
        super();
        this.state = {
            jobs: [],
            empty: 'Job Admin',

            // flag : false
        }
    }
    componentDidMount() {

        firebase.database().ref('Jobs').on('value', snap => {
            let data = snap.val();
            let alljob = [];
            for (var key in data) {
                let companykey = key;
                let alldata = data[key];
                for (var key in alldata) {


                    let newdata = alldata[key];

                    // if (newdata) {
                    alljob.push({ key, newdata, companykey });
                    // }
                    // else{
                    //     alljob
                    // }
                }
            }
            this.setState({ jobs: alljob })
        })

        // firebase.database().ref('Jobs').on('child_changed', snap => {
        //     let data = snap.val();
        //     let alljob = [];

        //     for (var key in data) {
        //         let companykey = key;
        //         let alldata = data[key];
        //         for (var key in alldata) {
        //             let newdata = alldata[key];
        //             alljob.push({ key, newdata, companykey });
        //             this.setState({ jobs: alljob })
        //         }


        //     }
        // })

    }
    delete(para) {
        // console.log(para.key)

        firebase.database().ref('Jobs').child(para.companykey).child(para.key).remove();


    }


    adminstudent() {
        this.props.history.push('/adminstudent');
    }

    admincompany() {
        this.props.history.push('/admincompany');

    }
    adminjob() {
        this.props.history.push('/adminjob');
    }

    logout() {
        firebase.auth().signOut();
        this.props.history.push('/');

    }

    render() {
        console.log(this.state.jobs, "jobs", this.state.jobs.length)
        return (
            <div>
                <Adminnavbar
                    adminstudent={() => this.adminstudent()}
                    admincompany={() => this.admincompany()}
                    adminjob={() => this.adminjob()}
                    logout={() => this.logout()}
                />
                <h1>{this.state.empty}</h1>
                {



                    this.state.jobs.map((text, index) => {
                        console.log(this.state.jobs, "jobsMAP", this.state.jobs.length)
                        return (
                            <div key={index} style={{ marginTop: 10 }}>
                                <Card style={{ width: '100%' }} >
                                    <CardHeader title={text.newdata.Title}
                                        subtitle="Job"
                                        actAsExpander={true}
                                        showExpandableButton={true}

                                    />



                                    <CardActions>
                                        <div>
                                            <FlatButton label="Delete" fullWidth={true} disabled={text.newdata.applied}
                                                onClick={((para) => this.delete(text))} hoverColor="red" />
                                        </div>
                                    </CardActions>

                                    <CardText expandable={true} style={{ display: 'inline-flex', width: '90%', border: '1px solid black', marginLeft: 50 }}>
                                        <CardText style={{ width: '50%' }}><h3>Requirement</h3>
                                            <p>{text.newdata.Requirement}</p>
                                        </CardText>
                                        <CardText style={{ width: '50%', borderLeft: '1px solid black' }}><h3>Salary</h3>
                                            <p>{text.newdata.Timing}</p>
                                            <h3>Experience</h3>
                                            <p>{text.newdata.Experience}</p>
                                            <h3>Department</h3>
                                            <p>{text.newdata.Department}</p>
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