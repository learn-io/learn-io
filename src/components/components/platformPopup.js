import axios_instance from '../axios_instance.js';
import React, { useEffect, useState } from 'react';
import './ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmBox from './ConfirmBox';


const Popup = (props) =>{

    const [header,setHeader]=useState("");
    const [changeHeader,setChangeHeader]=useState(false);
    const [description,setDescription]=useState("");
    const [changeD,setChangeD]=useState(false);
    const onUploadImage=()=>{
    	console.log('upload');
    }

    const onEditHeader=(value)=>{
    	if(changeHeader===false){
    		setChangeHeader(true);
    	}else{
    		setChangeHeader(false);
    		if(value!==""){
    			setHeader(value);
    		}
    		
    	}
    }
	
    const onEditDescription=(value)=>{
    	if(changeD===false){
    		setChangeD(true);
    	}else{
    		setChangeD(false);
    		if(value!==""){
    			setDescription(value);
    		}
    	}
    }

	const onSavePlatformInfo=(platform)=>{
    	axios_instance({
            method: 'post',
            url: "platform/about",
            data: {
                _id: platform._id,
                platformName:header,
                image:"",
                description:description
            }
        })
        .then((res)=>{
        	setSave(save+1);
	    })
	    .catch(err=>console.log(err));
    }

	return (
	<ConfirmBox
	       		header={header}
		        description={description}
	       		selectPlatform={props.selectPlatform}
	       		onSelectPlatform={onSelectPlatform}
	       		onSavePlatformInfo={onSavePlatformInfo}
	        	onUploadImage={onUploadImage}
	        	onEditHeader={onEditHeader}
	        	onEditDescription={onEditDescription}
	        	changeHeader={changeHeader}
	        	changeD={changeD}
	       	/>
	)
}

export default Popup;