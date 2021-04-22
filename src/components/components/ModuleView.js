import React, { useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import '../ComponentStyle.css';
import ModuleList from './ModuleList.js'
import axios_instance from '../axios_instance.js';

const ModuleView=()=>{
	const [platform,setPlatform]=useState("");
    let { platformId } = useParams();
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
        },[platformId]
    );
   
    if(platform===''){
        return (<h2 style={{color:'white'}}>{platform.platformName}</h2>);
    }else{
        return(
            <>
				<h2 style={{color:'white'}}>{platform.platformName}</h2>
				<ModuleList platform={platform} modules={platform.modules}/>
            </>
	    );
    }
}

export default ModuleView;
