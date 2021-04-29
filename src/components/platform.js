import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import './ComponentStyle.css';
// import axios_instance from './axios_instance';
import ModuleView from './components/ModuleView.js'
import ModuleDecision from './components/ModuleDecision.js'
import GamePlay from './components/GamePlay.js'

const PlatformController=({username, isSignedIn})=>{

    const [action, setAction] = useState({});

    const [platformName, setPlatformName] = useState("");
    const [moduleName, setModuleName] = useState("");
    const [pageName, setPageName] = useState("");

    let { platformId } = useParams();
    const [moduleId, setModuleId] = useState("");
    const [pageId, setPageId] = useState("");

	const [userPlatformInfo, setUserPlatformInfo]=useState({});

    const history = useHistory();
    useEffect(
        ()=>{
			console.log(action);
            if (action.actionType === undefined || action.actionType===null)
                return;
            if (action.actionType === "P")
            {
               setPageId(action.target);
            }
            else if (action.actionType === "S")
            {

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
            userPlatformInfo={userPlatformInfo} setUserPlatformInfo={setUserPlatformInfo}
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
                setPageName={setPageName} setPageId={setPageId}/>
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