import React, { useEffect,useState} from 'react';
import '../ComponentStyle.css';
import ModuleList from './ModuleList.js'
import axios_instance from '../axios_instance.js';
import ModuleConfirmBox from './ModuleConfirmBox.js';

const ModuleView=({username, isSignedIn, isEdit, platform, setPlatform, userPlatformInfo, setUserPlatformInfo, platformId, platformName, setPlatformName, 
	setModuleName, setModuleId})=>{

	const [selectedModule, setSelectedModule] = useState("");
	const [save, setSave]= useState(0);
	const [selectedDisable, setSelectedDisable] = useState("");
	useEffect(
        ()=>{
        	axios_instance({
		        method: 'get',
		        url: "platform/"+platformId
		    }).then(function(response){
		    	setPlatform(response.data);
				setPlatformName(response.data.platformName)
		    }).catch(function(err){
		        console.log(err);
		    });
        },[platformId, save,username,setPlatform,setPlatformName]
    );

	// console.log("platform ModuleView");
	// console.log(userPlatformInfo);
	// console.log(platform);
    if(platform===undefined || platform.modules===undefined){
        return (<h2 style={{color:'white'}}>{platformName}</h2>);
    }else{
        return(
            <>
				<h2 style={{color:'white'}}>{platformName}</h2>
				<ModuleList platform={platform} modules={platform.modules} setSelectedModule={setSelectedModule} userPlatformInfo={userPlatformInfo} setSelectedDisable={setSelectedDisable}/>
				<ModuleConfirmBox username={username} platform={platform} selectedModule={selectedModule} setSelectedModule={setSelectedModule} 
				save={save} setSave={setSave} setModuleName={setModuleName} setModuleId={setModuleId} selectedDisable={selectedDisable}/>
            </>
	    );
    }
}

export default ModuleView;
