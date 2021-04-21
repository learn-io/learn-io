import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import '../ComponentStyle.css';
import uploadIcon from '../images/upload.png';
import editIcon from '../images/edit.png';
import saveIcon from '../images/save.png';
import axios_instance from '../axios_instance.js';
import ModuleView from './ModuleView.js'
import {useHistory} from 'react-router-dom';


const ConfirmBox=({username,selectPlatform,setSelectPlatform,setSave,save})=>{
	const [header,setHeader]=useState('');
    const [changeHeader,setChangeHeader]=useState(false);
    const [description,setDescription]=useState('');
    const [changeD,setChangeD]=useState(false);
    const [play,setPlay]=useState(false);

	const history = useHistory();

    useEffect(
        ()=>{
        	if(header===undefined||header===''){
        		setHeader(selectPlatform.platformName);
        	}
        	if(description===undefined||description===''){
        		setDescription(selectPlatform.description);
        	}
        },[header,changeHeader,description,changeD,selectPlatform]
    );
    const onSavePlatformInfo=(platform)=>{
    	axios_instance({
            method: 'post',
            url: "platform/about",
            data: {
                _id: selectPlatform._id,
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

    const onClosePlatform=()=>{
		setSelectPlatform('');
		setHeader('');
		setDescription('');
		setChangeHeader(false);
		setChangeD(false);
	}

	let closehdr;
	let titlehdr;
	let centerpart;
	if(username!==selectPlatform.owner){
		closehdr=<button className='closeButton' onClick={()=>{onClosePlatform('')}}>X</button>
		titlehdr=<h2>{header}</h2>
		centerpart=<div style={{justifyContent:'center',display:'flex'}}>
 						<img alt='platformImage' src={`https://robohash.org/${selectPlatform.platformName}?200x200`}/>
 						<p className='paragraph'>{description}</p>
	 				</div>
	}else{
		closehdr=<div style={{justifyContent:'space-between',display:'flex'}}>
					<button className='deleteButton' onClick={()=>{onSavePlatformInfo(selectPlatform)}}><img src={saveIcon} height='50px' width='50px' alt="save"/></button>
					<button className='closeButton' onClick={()=>{onClosePlatform('')}}>X</button>
				</div>
		let hdr;
		let hdrButton;
		if(changeHeader){
			hdr=<input style={{width:'50%'}} type="text" id="header" name="header"/>
			hdrButton=<button className='deleteButton' onClick={()=>{onEditHeader(document.getElementById("header").value)}}><img src={editIcon} height='50px' width='50px' alt="edit"/></button>
		}
		else{
			hdr=<h2>{header}</h2>
			hdrButton=<button className='deleteButton' onClick={()=>{onEditHeader()}}><img src={editIcon} height='50px' width='50px' alt="edit"/></button>
		}
		let desc;
		let descButton;
		if(changeD){
			desc=<input style={{width:'40%'}} type="text" id="desc" name="desc"/>
			descButton=<button className='deleteButton' onClick={()=>{onEditDescription(document.getElementById("desc").value)}}><img src={editIcon} height='50px' width='50px' alt="edit"/></button>
		}
		else{
			desc=<p className='paragraph'>{description}</p>
			descButton=<button className='deleteButton' onClick={()=>{onEditDescription()}}><img src={editIcon} height='50px' width='50px' alt="edit"/></button>
		}
		titlehdr=<div style={{justifyContent:'center',display:'flex'}}>
	 				{hdr}
 					{hdrButton}
				</div>
		centerpart=<>	<div style={{justifyContent:'space-between',display:'flex'}}>
							<button className='deleteButton' onClick={()=>{onUploadImage()}}><img src={uploadIcon} height='50px' width='50px' alt="upload"/></button>
							{descButton}
						</div>
						<div style={{justifyContent:'center',display:'flex'}}>
							<img alt='platformImage' src={`https://robohash.org/${selectPlatform.platformName}?200x200`}/>
							{desc}
						</div>
					</>
	}
	if(selectPlatform===''){
		return null
	}else if(play===true){
		history.push('/play/'+selectPlatform._id);
		return null;
	}else{
		return (
			<section id="overlay">
				<div className='overlayStyle'>
					<div className='selectConfirm'>
						{closehdr}
						{titlehdr}
						{centerpart}
						<div className='clearfix'>
							<Button onClick={()=>{setPlay(true)}} className='playButton'>Play</Button>
						</div>
					</div>
				</div>
			</section>
		);
	}
	
}

export default ConfirmBox;