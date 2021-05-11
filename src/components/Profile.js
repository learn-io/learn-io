import React, { useEffect, useState} from 'react';
import {Tabs, Tab, Form, Col, Dropdown, ProgressBar} from 'react-bootstrap';

import axios_instance from './axios_instance.js';
import { Redirect, useParams, useHistory } from 'react-router';

import './ComponentStyle.css';

import badge0 from './images/25.png';
import badge1 from './images/50.png';
import badge2 from './images/75.png';
import badge3 from './images/100.png';

const localBadges = [badge0,badge1,badge2,badge3];

const Switch = require("react-router-dom").Switch;
const Route = require("react-router-dom").Route;

const ProfileController = ({isSignedIn, username}) =>
{
    if (!isSignedIn)
    {
        return (
            <Redirect to="/home"/>
        )
    }
    return (
    <Switch>
        <Route path="/profile/:username">
            <Profile/>
        </Route>
        
        <Route path="/profile">
            <Redirect to={"/profile/"+username} />
        </Route>

    </Switch>
    );
}

const Profile=()=>{
    const[key, setKey] = useState('progress');
    const[skip, setSkip] = useState(0);
    const[count, setCount] = useState(10);
    const [platforms, setPlatforms] = useState([]);
    // const [platformInfo,setplatformInfo] = useState([]);
    const [allInfo, setAllInfo] = useState([]);

    let { username } = useParams();
    const history = useHistory();
    useEffect(
        ()=>{
            axios_instance({
                method: 'get',
                url: "profile/stats/"+username+"/"+skip+"/"+count
            }).then(function(response){
                // console.log("The response data is ");
                // console.log(response.data.resp);
                setPlatforms(response.data.resp);
                // console.log(platforms);
            }).catch(function(err){
                history.push("/home");
                console.log(err);
            });
        },[skip,count,history,username] 
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
                // setplatformInfo(tempArr);

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
            <div className="container">
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
            </div>            
            <Tabs className="profileTabHeader" fill justify id="profileTabs" activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey="progress" title="Progress" >
                        {/* Progress */}
                        <Progress allInfo={allInfo}></Progress>
                    </Tab>
                    <Tab eventKey="badges" title="Badges">
                        {/* Badges */}
                        <Badges allInfo={allInfo}></Badges>
                    </Tab>
                    <Tab eventKey="stats" title="Stats">
                        {/* Stats */}
                        <Stats allInfo={allInfo} ></Stats>
                    </Tab>
            </Tabs>
        </div>
    )
}

const Progress=({allInfo})=>{
    // console.log("Called Progress");

    // console.log("platforms");
    // console.log(platforms[0]);
    // console.log("platformInfo");
    // console.log(platformInfo[0]);
    
    
    //const [allInfo, setAllInfo] = useState({platforms,platformInfo});
    // console.log("All Info");
    // console.log(allInfo);
   
    if(typeof allInfo==='undefined' || allInfo===[]){
        return (
            <div className="userPlatformInfoPadding container">
                <h2>No progress to display at this time.</h2>
            </div>
        )
    } else {
        // console.log("allInfo");
        // console.log(allInfo);
        return (
            <div className="container">
                {allInfo.map((pI)=>{
                    return(
                        <div key={pI.platformInfo.platformName} className="userPlatformInfoPadding">
                            <div style={{display:'flex', justifyContent:'space-between'}}> 
                                <h2 style={{float:'left', display:'inline'}}>{pI.platformInfo.platformName}</h2>
                                <h2 style={{float:'right', display:'inline'}}>{`${Math.floor((pI.platforms.modulesCompleted/pI.platformInfo.modules.length)*100)}%`}</h2>
                            </div>
                            <br/>
                            <div className="container" style={{padding:"10px"}}>
                                <ProgressBar animated now={pI.platforms.modulesCompleted} max={pI.platformInfo.modules.length}/>
                            </div>
                        </div>
                    );
                })}                
            </div>
        )
    }
}

const Badges=({allInfo})=>{
    // console.log("Called Badges");

    // console.log("allInfo");
    // console.log(allInfo);

    if(typeof allInfo==='undefined'){ //typeof allInfo==='undefined'
        return (
            <div className="userPlatformInfoPadding container">
                <h1 style={{paddingTop:"10px"}}>No badges to display at this time.</h1>
            </div>
        )
    } else {
        return (
            <div className="container userPlatformInfoPaddingBottom">
                {allInfo.map((pI)=>{
                    let temp = pI.platforms.badges;
                    if(!temp[0] && !temp[1] && !temp[2] && !temp[3]){
                        return (
                            <div key={pI.platformInfo.platformName} className="userPlatformInfoPadding">
                                <h2 className="text-left ml-4">{pI.platformInfo.platformName}</h2>
                                <p style={{padding:'20px'}}> No badges to display at this time. </p>
                            </div>
                        );
                    }
                    return(
                        <div key={pI.platformInfo.platformName} className="userPlatformInfoPadding">
                            <h2 className="text-left ml-4">{pI.platformInfo.platformName}</h2>
                            <div className="container badgeContainer">
                                {pI.platforms.badges.map((val, index)=>{
                                    // console.log("val")
                                    // console.log(val)
                                    // console.log("index")
                                    // console.log(index)
                                    if(val === true){
                                        return (
                                            <img key={''+index} height="250px" width="250px" src={localBadges[index]} alt="No badges to display at this time."></img>
                                        );
                                        
                                    } else {
                                        return <></>
                                    }
                                })}
                                {/* <img height="250px" width="250px" src={badge0} alt="No badges to display at this time."></img>
                                <img height="250px" width="250px" src={badge1} alt="No badges to display at this time."></img>
                                <img height="250px" width="250px" src={badge2} alt="No badges to display at this time."></img>
                                <img height="250px" width="250px" src={badge3} alt="No badges to display at this time."></img> */}
                            </div>
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
            <div className="userPlatformInfoPadding container">
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

export default ProfileController;
export {Badges, Stats, Progress};