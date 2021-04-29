import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './ComponentStyle.css';
// import axios_instance from './axios_instance';
import ModuleView from './components/ModuleView.js'
import ModuleDecision from './components/ModuleDecision.js'
import GamePlay from './components/GamePlay.js'

import getUserPlatformInfo from './components/PlatformHelper.js';

const PlatformController=({username, isSignedIn})=>{

    const [action, setAction] = useState({});

    const [platformName, setPlatformName] = useState("");
    const [moduleName, setModuleName] = useState("");
    const [pageName, setPageName] = useState("");

    let { platformId } = useParams();
    const [moduleId, setModuleId] = useState("");
    const [pageId, setPageId] = useState("");
    const [pageEntry, setPageEntry] = useState("");

	const [userPlatformInfo, setUserPlatformInfo]=useState(
    {
        completeId:[],
        ownPlatform:false
    });

	useEffect(
        ()=>{
			getUserPlatformInfo(username, isSignedIn, platformId)
			.then((res)=>{
                console.log(res.data);
				setUserPlatformInfo(res.data);
			})
			.catch(err=>console.log(err));
        },[username, isSignedIn, platformId]
    );

    useEffect(
        ()=>{
            if (action.actionType === undefined || action.actionType===null)
                return;
            if (action.actionType === "P")
            {
               setPageId(action.target);
            }
            else if (action.actionType === "S")
            {
                let newUPinfo = { ... userPlatformInfo };

                console.log(newUPinfo);
                
                setUserPlatformInfo(newUPinfo);
            }
            else
            {
                console.log(action);
                alert("Invalid Action Type");
            }
            setAction({});
        },[action]   
	);

    if (moduleId === "")
    {
        return (
            <ModuleView username={username} isSignedIn={isSignedIn} isEdit={false} 
            platformId={platformId}
            userPlatformInfo={userPlatformInfo}
            platformName={platformName} setPlatformName = {setPlatformName}
            setModuleName={setModuleName} setModuleId={setModuleId}/>
        );
    }
    else if (pageId === "")
    {
        return (
            <ModuleDecision username={username} isSignedIn={isSignedIn} isEdit={false} 
                userPlatformInfo={userPlatformInfo} setModuleId={setModuleId}
                platformName={platformName} moduleName = {moduleName}
                platformId={platformId} moduleId = {moduleId}
                setPageName={setPageName} setPageId={setPageId}
                setPageEntry={setPageEntry}/>
        );
    }
    else
    {
        return (
            <GamePlay username={username} isSignedIn={isSignedIn} isEdit={false} 
            setAction={setAction} setPageName={setPageName}
            platformName={platformName} moduleName={moduleName} pageName={pageName}
            platformId={platformId} moduleId={moduleId} pageId={pageId} />
        );
    }
};



export default PlatformController;