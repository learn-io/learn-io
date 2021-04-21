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

	let modules=[{
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "Obscure Berries",
        "moduleDescription": "This is a berry test!!",
        "lockedby": [],
        "unlocks": [],
        "x": 0,
        "y": 0,
        "height": 130,
        "width": 130
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "What are Common Berries?",
        "moduleDescription": "Guess what is a berry test!!",
        "lockedby": [0],
        "unlocks": [2],
        "x": 100,
        "y": 50,
        "height": 130,
        "width": 130
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "What are Botany Berries?",
        "moduleDescription": "berry berry!!",
        "lockedby": [1],
        "unlocks": [3],
        "x": 120,
        "y": 430,
        "height": 130,
        "width": 130
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "Bananas?",
        "moduleDescription": "Does bananas belong to berry?!",
        "lockedby": [2],
        "unlocks": [4],
        "x": 140,
        "y": 410,
        "height": 130,
        "width": 130
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "Watermelon!",
        "moduleDescription": "How about watermelon",
        "lockedby": [3],
        "unlocks": [5],
        "x": 130,
        "y": 510,
        "height": 130,
        "width": 130
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "Lemons?",
        "moduleDescription": "Is it a berry?",
        "lockedby": [4],
        "unlocks": [6],
        "x": 380,
        "y": 808,
        "height": 300,
        "width": 300
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "Pumpkins!?",
        "moduleDescription": "How about halloween pumpkins!!",
        "lockedby": [5],
        "unlocks": [],
        "x": 77,
        "y": 100,
        "height": 130,
        "width": 130
    }];

	return(
		<div className='overlayStyle'>
			<div className='moduleView'>
				<div className='clearfix'>
					<button className='closeButton' onClick={()=>{props.setPlay(false)}}>X</button>
				</div>
				<h2>{props.selectPlatform.platformName}</h2>
				<ModuleList platform={platform} modules={modules}/>
			</div>
		</div>
	);
}

export default ModuleView;
