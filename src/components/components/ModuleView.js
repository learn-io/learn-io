import React, { useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import '../ComponentStyle.css';
import ModuleList from './ModuleList.js'
import axios_instance from '../axios_instance.js';
import ModuleConfirmBox from './ModuleConfirmBox.js';
import getUserPlatformInfo from './PlatformHelper.js';

const ModuleView=({username, isSignedIn, isEdit, userPlatformInfo, setUserPlatformInfo, platformId, platformName, setPlatformName, 
	setModuleName, setModuleId})=>{

	const [platform,setPlatform]=useState();
	const [selectedModule, setSelectedModule] = useState("");
	const [save, setSave]= useState(0);
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
        },[platformId, save,username]
    );
	
	useEffect(
        ()=>{
			getUserPlatformInfo(username, isSignedIn, platformId)
			.then((res)=>{
				setUserPlatformInfo(res.data);
			})
			.catch(err=>console.log(err));
        },[username, isSignedIn, platformId]
    );

	// console.log("platform ModuleView");
	// console.log(userPlatformInfo);
	// console.log(platform);
    if(platform===undefined){
        return (<h2 style={{color:'white'}}>{platformName}</h2>);
    }else{
        return(
            <>
				<h2 style={{color:'white'}}>{platformName}</h2>
				<ModuleList platform={platform} modules={platform.modules} setSelectedModule={setSelectedModule} userPlatformInfo={userPlatformInfo}/>
				<ModuleConfirmBox username={username} platform={platform} selectedModule={selectedModule} setSelectedModule={setSelectedModule} 
				save={save} setSave={setSave} setModuleName={setModuleName} setModuleId={setModuleId}/>
            </>
	    );
    }
}

export default ModuleView;
