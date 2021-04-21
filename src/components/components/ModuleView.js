import React, { useEffect,useState } from 'react';
import '../ComponentStyle.css';
import ModuleList from './ModuleList.js'
import axios_instance from '../axios_instance.js';

const ModuleView=(props)=>{
	const [platform,setPlatform]=useState("");
	useEffect(
        ()=>{
        	axios_instance({
		        method: 'get',
		        url: "platform/"+props.selectPlatform._id
		    }).then(function(response){
		    	setPlatform(response.data)
		    }).catch(function(err){
		        console.log(err);
		    });
        },[props.selectPlatform]
    );

	return(
		<div className='overlayStyle'>
			<div className='moduleView'>
				<div className='clearfix'>
					<button className='closeButton' onClick={()=>{props.setPlay(false)}}>X</button>
				</div>
				<h2>{props.selectPlatform.platformName}</h2>
				<ModuleList platform={platform}/>
			</div>
		</div>
	);
}

export default ModuleView;
