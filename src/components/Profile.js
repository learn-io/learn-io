import React, { useEffect, useState } from 'react';
// import React from "react";
// import useState from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import Form from 'react-bootstrap/Form';

import axios_instance from './axios_instance.js';

import './ComponentStyle.css';

const Profile=()=>{
    const[key, setKey] = useState('progress');
    const[skip, setSkip] = useState(0);
    const[count, setCount] = useState(10);
    const [platforms, setPlatforms] = useState([]);

    useEffect(
        ()=>{
            axios_instance({
                method: 'get',
                url: "profile/stats/"+skip+"/"+count
            }).then(function(response){
                // console.log("The response data is ");
                // console.log(response.data.resp);
                setPlatforms(response.data.resp);
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
            <Form className="form-inline w-100">
                <Form.Group controlId="skipBy" >
                    <Form.Label className="profileFormGroupLabel">Skip By:</Form.Label>
                    <Form.Control type="number" onBlur={(e)=>{e.preventDefault(); setSkip(e.target.value);}}></Form.Control>
                </Form.Group>
                <Form.Group controlId="countBy" >
                    <Form.Label className="profileFormGroupLabel">Platforms per page:</Form.Label>
                    <Form.Control as="select">
                        <option onClick={(e)=>{e.preventDefault(); setCount(10);}}>10</option>
                        <option onClick={(e)=>{e.preventDefault(); setCount(25)}}>25</option>
                        <option onClick={(e)=>{e.preventDefault(); setCount(50)}}>50</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            
            <h1>Skip: {JSON.stringify(skip)}</h1>
            <h1>Count: {JSON.stringify(count)}</h1>
            
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
    // console.log("Called Progress");
    if(userPlatformInfo.length===0){
        return (
            <div className="userPlatformInfoPadding">
                <h2>No progress to display at this time.</h2>
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
    // console.log("Called Badges");
    if(userPlatformInfo.length===0){
        return (
            <div className="userPlatformInfoPadding">
                <h1>No badges to display at this time.</h1>
            </div>
        )
    } else {
        return (
            <div >
    
    
            </div>
        )
    }
}

const Stats=({userPlatformInfo})=>{
    // console.log("Called Stats");
    if(userPlatformInfo.length===0){
        return (
            <div className="userPlatformInfoPadding">
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
export {Badges, Stats, Progress};