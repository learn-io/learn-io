import React, { useEffect, useState } from 'react';
// import React from "react";
// import useState from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import Form from 'react-bootstrap/Form';

import axios_instance from './axios_instance.js';

import './ComponentStyle.css';



const target_url="https://learn-io-api.herokuapp.com/profile"

const Profile=()=>{
    const[key, setKey] = useState('progress');
    const[skip, setSkip] = useState(0);
    const[count, setCount] = useState(10);
    const [platforms, setPlatforms] = useState([]);

    useEffect(
        ()=>{
            axios_instance({
                method: 'get',
                url: target_url+"/stats/"+skip+"/"+count
            }).then(function(response){
                console.log(response.data);
                setPlatforms(response.data);
            }).catch(function(err){
                console.log(err);
            })
        },[skip,count]
    );

    return (
        <div>
            <div style={{display:'flex', justifyContent:"left", padding:"2rem"}}>
                <h1>Profile</h1>
            </div>
            <Form>
                <Form.Group controlId="skipBy" >
                    <Form.Label className="profileFormGroupLabel">Skip By:</Form.Label>
                    <Form.Control type="number" value={skip} onChange={setSkip}></Form.Control>
                </Form.Group>
                <Form.Group controlId="count" >
                    <Form.Label className="profileFormGroupLabel">Platforms per page:</Form.Label>
                    <Form.Control as="select" value={count} onChange={setCount}>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </Form.Control>
                </Form.Group>
                {/* <label>
                    Skip by:
                    <input type="text" name="skip" />
                </label>
                <label>
                    Platforms per page:
                    <input type="text" name="count" />
                </label> */}
            </Form>
            <Tabs className="profileTabHeader" fill justify id="profileTabs" activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey="progress" title="Progress" >
                        {/* Progress */}
                        <Progress userPlatformInfo={platforms}></Progress>
                    </Tab>
                    <Tab eventKey="badges" title="Badges">
                        {/* Badges */}
                        <Badges userPlatformInfo={platforms}></Badges>
                    </Tab>
                    <Tab eventKey="stats" title="Stats">
                        {/* Stats */}
                        <Stats userPlatformInfo={platforms}></Stats>
                    </Tab>
            </Tabs>
        </div>
    )
}

const Progress=({userPlatformInfo})=>{
    if(userPlatformInfo.length==0){
        return (
            <div>
                <h1>No progress to display at this time.</h1>
            </div>
        )
    } else {
        return (
            <div>
    
    
            </div>
        )
    }
}

const Badges=({userPlatformInfo})=>{
    if(userPlatformInfo.length==0){
        return (
            <div>
                <h1>No badges to display at this time.</h1>
            </div>
        )
    } else {
        return (
            <div>
    
    
            </div>
        )
    }
}

const Stats=({userPlatformInfo})=>{
    if(userPlatformInfo.length==0){
        return (
            <div>
                <h1>No stats to display at this time.</h1>
            </div>
        )
    } else {
        return (
            <div>
    
    
            </div>
        )
    }
}

export default Profile;