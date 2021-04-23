import React, { useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import '../ComponentStyle.css';
import ModuleList from './ModuleList.js'
import axios_instance from '../axios_instance.js';
import ModuleConfirmBox from './ModuleConfirmBox.js';

const ModuleView=({username})=>{
	const [platform,setPlatform]=useState("");
    let { platformId } = useParams();
	const [selectedModule, setSelectedModule] = useState("");
	const [save, setSave]= useState(0);
	const [userPlatformInfo,setUserPlatformInfo]=useState("");
	useEffect(
        ()=>{
        	axios_instance({
		        method: 'get',
		        url: "platform/"+platformId
		    }).then(function(response){
		    	setPlatform(response.data);
		    }).catch(function(err){
		        console.log(err);
		    });
        },[platformId, save,username]
    );
	
	useEffect(
        ()=>{
			if(username!==null){
				axios_instance({
					method: 'post',
					url: "profile/play",
					data: {
						username:username,
						platformId: platformId,
					}
				})
				.then((res)=>{
					setUserPlatformInfo(res.data);
				})
				.catch(err=>console.log(err));
			}
        },[username,platformId]
    );

	// console.log("platform ModuleView");
	// console.log(userPlatformInfo);
	// console.log(platform);
    if(platform===''){
        return (<h2 style={{color:'white'}}>{platform.platformName}</h2>);
    }else{
        return(
            <>
				<h2 style={{color:'white'}}>{platform.platformName}</h2>
				<ModuleList platform={platform} modules={platform.modules} setSelectedModule={setSelectedModule} userPlatformInfo={userPlatformInfo}/>
				<ModuleConfirmBox username={username} platform={platform} selectedModule={selectedModule} setSelectedModule={setSelectedModule} save={save} setSave={setSave}/>
            </>
	    );
    }
}

export default ModuleView;
