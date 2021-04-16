import React, { useEffect, useState } from 'react';
// import React from "react";
// import useState from "react";
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab'
// import Form from 'react-bootstrap/Form';
import {Tabs, Tab, Form, Col} from 'react-bootstrap';

import axios_instance from './axios_instance.js';

import './ComponentStyle.css';
import { Dropdown, ProgressBar } from 'react-bootstrap';

const Profile=()=>{
    const[key, setKey] = useState('progress');
    const[skip, setSkip] = useState(0);
    const[count, setCount] = useState(10);
    const [platforms, setPlatforms] = useState([]);
    const [platformInfo,setplatformInfo] = useState([]);
    const [allInfo, setAllInfo] = useState([]);

    useEffect(
        ()=>{
            axios_instance({
                method: 'get',
                url: "profile/stats/"+skip+"/"+count
            }).then(function(response){
                // console.log("The response data is ");
                // console.log(response.data.resp);
                setPlatforms(response.data.resp);
                // console.log(platforms);
            }).catch(function(err){
                console.log(err);
            });
        },[skip,count] 
    );

    useEffect(
        ()=>{
            if(platforms === undefined || platforms === []){
                return;
            }
            let i=0;
            let url_path = "" ;
            
            let promises = [];

            for(i;i<platforms.length;i++){
                url_path = platforms[i].platformId;
                // console.log(platforms[i].platformId);
                promises.push(axios_instance({
                    method: 'get',
                    url: "platform/"+url_path
                }));
            }

            Promise.all(promises).then((values) => {
                // console.log(values);
                var tempArr = [];
                for(var j=0; j<values.length; j++){
                    // console.log(values[j].data)
                    tempArr.push(values[j].data);
                }
                setplatformInfo(tempArr);

                var tempArr2 = []
                for(var k=0;k<platforms.length;k++){
                    var together = {platforms:platforms[k], platformInfo:tempArr[k]};
                    tempArr2.push(together);
                }

                // console.log("tempArr2");
                // console.log(tempArr2);

                setAllInfo(tempArr2);
                // console.log("All Info");
                // console.log(allInfo);
            });
        },[platforms]
    );

    return (
        <div>
            <div style={{display:'flex', justifyContent:"left", padding:"2rem"}}>
                <h1>Profile</h1>
            </div>
            <Form.Group controlId="skipBy" >
                <Form.Label className="profileFormGroupLabel">Skip By:</Form.Label>
                <Form.Control type="number" onBlur={(e)=>{e.preventDefault(); setSkip(e.target.value);}}></Form.Control>
            </Form.Group>
            
            <Form.Group controlId="countBy" >
                <Form.Label className="profileFormGroupLabel">Platforms per page:</Form.Label>
                <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                        {count}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e)=>{e.preventDefault(); setCount(5)}}>5</Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>{e.preventDefault(); setCount(10)}}>10</Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>{e.preventDefault(); setCount(15)}}>15</Dropdown.Item>
                        <Dropdown.Item onClick={(e)=>{e.preventDefault(); setCount(20)}}>20</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Form.Group>
            
            <Tabs className="profileTabHeader" fill justify id="profileTabs" activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey="progress" title="Progress" >
                        {/* Progress */}
                        <Progress platformInfo={platformInfo} platforms={platforms}></Progress>
                    </Tab>
                    <Tab eventKey="badges" title="Badges">
                        {/* Badges */}
                        <Badges platformInfo={platformInfo}></Badges>
                    </Tab>
                    <Tab eventKey="stats" title="Stats">
                        {/* Stats */}
                        <Stats allInfo={allInfo} ></Stats>
                    </Tab>
            </Tabs>
        </div>
    )
}

const Progress=({platforms, platformInfo})=>{
    // console.log("Called Progress");

    // console.log("platforms");
    // console.log(platforms[0]);
    // console.log("platformInfo");
    // console.log(platformInfo[0]);
    
    
    //const [allInfo, setAllInfo] = useState({platforms,platformInfo});
    // console.log("All Info");
    // console.log(allInfo);
   
    if(typeof platformInfo==='undefined' || typeof platforms==='undefined'){
        return (
            <div className="userPlatformInfoPadding">
                <h2>No progress to display at this time.</h2>
            </div>
        )
    } else {
        return (
            <div className="boundaryBox">
                {platformInfo.map((pI)=>{
                    return(
                        <div key={pI.platformName} className="userPlatformInfoPadding">
                            <h2 className="text-left ml-4">{pI.platformName}</h2>
                            <div className="container">
                                <ProgressBar animated now={50}/>
                            </div>
                        </div>
                    );
                })}                
            </div>
        )
    }
}

const Badges=({platformInfo})=>{
    // console.log("Called Badges");

    // console.log("platformInfo");
    // console.log(platformInfo);

    if(typeof platformInfo==='undefined'){
        return (
            <div className="userPlatformInfoPadding">
                <h1>No badges to display at this time.</h1>
            </div>
        )
    } else {
        return (
            <div className="container userPlatformInfoPaddingBottom">
                {platformInfo.map((pI)=>{
                    return(
                        <div key={pI.platformName} className="userPlatformInfoPadding">
                            <h2 className="text-left ml-4">{pI.platformName}</h2>
                            <div>No badges to display at this time.</div>
                        </div>
                    );
                })}                
            </div>
        )
    }
}

const Stats=({allInfo})=>{
    // console.log("Called Stats");

    // const [allInfo, setAllInfo] = useState({platforms,platformInfo});
    // console.log("All Info");
    // console.log(allInfo);

    if(typeof allInfo==='undefined'){
        return (
            <div className="userPlatformInfoPadding">
                <h1>No stats to display at this time.</h1>
            </div>
        )
    } else {
        return (
            <div className="container userPlatformInfoPaddingBottom">
                {allInfo.map((pI, index)=>{
                    // console.log("pI");
                    // console.log(pI);
                    return(
                        <div key={index} className="userPlatformInfoPadding">
                            <h2 className="text-left ml-4">{pI.platformInfo.platformName}</h2>
                            <Form.Row>
                                <Col>
                                    <p>Badges:</p>
                                </Col>
                                <Col>
                                    <p>No badges to display at this time.</p>
                                    {pI.platforms.badges.map((b)=>{
                                        return (<image key={b.hash} src=""></image>);
                                    })}
                                </Col>
                            </Form.Row>
                            <Form.Row >
                                <Col>
                                    <p>Modules Completed:</p>
                                </Col>
                                <Col>
                                    <p>{pI.platforms.modulesCompleted}</p>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <p>Pages Visited:</p>
                                </Col>
                                <Col>
                                    <p>{pI.platforms.pageVisited}</p>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <p>Time Spent:</p>
                                </Col>
                                <Col>
                                    <p>{pI.platforms.timeSpend}</p>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <p>Widgets Clicked:</p>
                                </Col>
                                <Col>
                                    <p>{pI.platforms.widgetsClicked}</p>
                                </Col>
                            </Form.Row>
                        </div>
                    );
                })}                
            </div>
        )
    }
}

// const getPlatformInfo = (platforms) =>{
//     let toReturn = [];
//     console.log("PLATFORMS");
//     console.log(platforms);
//     // console.log(toReturn);
//     let i=0;
//     let url_path = "" ;
    
//     for(i;i<platforms.length;i++){
//         url_path = platforms[i].platformId;
//         console.log(platforms[i].platformId);
//         axios_instance({
//             method: 'get',
//             url: "platform/"+url_path
//         }).then(function(response){
//     //         console.log("Helper Debug");
//     //         console.log(i);
//     //         console.log(platforms[i].platformId);
//     //         // console.log("The response data is ");
//     //         // console.log(response.data);
//     //         var platformName = response.data.platformName;
//     //         // console.log(platformName);
//     //         var totalModules = response.data.modules.length;
//     //         var thePlatformId = platforms[i].platformId;
//     //         // console.log(thePlatformId);
//     //         toReturn.push({platformId:thePlatformId, platformName:platformName, totalModules:totalModules});
//     //         // console.log(toReturn);
//         }).catch(function(err){
//             console.log(err);
//         });
//     }
//     console.log("To Return ");
//     console.log(toReturn)

// }

export default Profile;
export {Badges, Stats, Progress};