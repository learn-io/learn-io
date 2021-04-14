// import React, { useEffect, useState } from 'react';
import React from "react";
import useState from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'

import './ComponentStyle.css';

import { Form } from 'react-bootstrap';

// const target_url="https://learn-io-api.herokuapp.com/profile"

const Profile=()=>{
    const[key, setKey] = useState('progress');
    const[skip, setSkip] = useState(0);
    const[count, setCount] = useState(10);
    // const [platforms, setPlatforms] = useState([]);

    // useEffect(
    //     ()=>{
    //         axios({
    //             method: 'get',
    //             url: target_url+"/stats/"+skip+"/"+count
    //         }).then(function(response){
    //             setPlatforms(response.data);
    //         }).catch(function(err){
    //             console.log(err);
    //         })
    //     },[skip,count]
    // );

    return (
        <div className='profileStyle'>
            <div style={{display:'flex', justifyContent:"left", padding:"2rem"}}>
                <h1 className="">Profile</h1>
            </div>
            <Form>
                <Form.Group controlId="skipBy">
                    <Form.Label>Skip By:</Form.Label>
                    <Form.Control type="number" value={skip} onChange={setSkip}></Form.Control>
                </Form.Group>
                <Form.Group controlId="count">
                    <Form.Label>Platforms per page:</Form.Label>
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
            <Tabs fill justify id="profileTabs" activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey="progress" title="Progress">
                        {/* Progress */}
                        {/* <Progress userPlatformInfo={platforms}></Progress> */}
                    </Tab>
                    <Tab eventKey="badges" title="Badges">
                        {/* Badges */}
                        {/* <Badges userPlatformInfo={platforms}></Badges> */}
                    </Tab>
                    <Tab eventKey="stats" title="Stats">
                        {/* Stats */}
                        {/* <Stats userPlatformInfo={platforms}></Stats> */}
                    </Tab>
            </Tabs>
        </div>
    )
}

const Progress=({userPlatformInfo})=>{

    return (
        <div>


        </div>
    )
}

const Badges=({userPlatformInfo})=>{

    return (
        <div></div>
    )
}

const Stats=({userPlatformInfo})=>{

    return (
        <div></div>
    )
}

export default Profile;