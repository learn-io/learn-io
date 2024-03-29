import React, { useEffect, useState } from 'react';
import '../ComponentStyle.css';
import uploadIcon from '../images/upload.png';
import editIcon from '../images/edit.png';
import saveIcon from '../images/save.png';
import closeIcon from '../images/close.png';
import axios_instance from '../axios_instance.js';
import {Button} from 'react-bootstrap';

const ModuleConfirmBox=({platform, username,selectedModule,setSelectedModule,updatePlatform,setModuleName,setModuleId,selectedDisable, isEdit})=>{
	const [header,setHeader]=useState('');
    const [changeHeader,setChangeHeader]=useState(false);
    const [description,setDescription]=useState('');
    const [changeD,setChangeD]=useState(false);
    
    const [imageData,setImageData]=useState('');
    const [imageHash, setImageHash] = useState('');
    const hiddenFileInput = React.useRef(null);

    // console.log("platform")
    // console.log(platform)

    // console.log("selectedModule")
    // console.log(selectedModule)

    useEffect(
        ()=>{
			if(selectedModule === '' || selectedModule === undefined)
				return;

			setHeader(selectedModule.moduleName);
			setDescription(selectedModule.moduleDescription);

			if (selectedModule.image === '' ||  selectedModule.image === undefined)
			{
				setImageData(`https://robohash.org/${selectedModule.moduleName}?200x200`);
			}
			else
			{
				setImageHash(selectedModule.image);
			}
        },[selectedModule]   
		);

    useEffect(
        ()=>{      
            if(imageHash===undefined||imageHash==='')     {
                return;
            }
            axios_instance({
                method: 'get',
                url: "media/"+encodeURIComponent(imageHash),
            }).then((res)=>{
                setImageData(res.data.data);
            }).catch((err)=>{
				console.log(err);
				console.log(imageHash);
				console.log(encodeURIComponent(imageHash));
			});
        },[imageHash]
    )

    const onSaveModuleInfo=()=>{
		console.log(selectedModule);
		selectedModule.moduleName = header;
		selectedModule.moduleDescription=description;
		selectedModule.image=imageHash;
		updatePlatform();
	}
    const handleClick = event => {
		hiddenFileInput.current.click();
    };
    const onUploadImage=(event)=>{
    	console.log('upload');
        console.log("FILE")
        console.log(event.target.files[0]);
        if (event.target.files && event.target.files[0]) {
            let imageFile = event.target.files[0];
            let imageExtension = event.target.files[0].type;
                
			let reader = new FileReader();
			reader.onload = (e) => {
				let oldData = ImageData;
				setImageData(e.target.result);
				let form = new FormData();
				form.append('file', e.target.result);
				form.append('extension', imageExtension);
				axios_instance({
					method: 'post',
					url: "media/",
					data: form,
					headers: {
						'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
					},
				}).then((res)=>{
					setImageHash(res.data.hash);
				}).catch((e)=>{
					setImageData(oldData);
				})
			};
			reader.readAsDataURL(imageFile);
		}
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

    const onCloseModule=()=>{
		setSelectedModule('');
		setHeader('');
		setDescription('');
		setChangeHeader(false);
		setChangeD(false);
        setImageData('');
        setImageHash('');
	}

	let closehdr;
	let titlehdr;
	let centerpart;
    // console.log("platform")
    // console.log(platform);
	if(username!==platform.owner){
		closehdr=<button className='closeButton' onClick={()=>{onCloseModule('')}}><img src={closeIcon} height='40px' width='40px' alt="close"/></button>
		titlehdr=<h2>{header}</h2>
		centerpart=<div style={{justifyContent:'center',display:'flex'}}>
					<img alt='moduleImage' src={imageData} height={200} width={200}/>
					<p className='paragraph'>{description}</p>
				</div>
		// centerpart=<div style={{justifyContent:'center',display:'flex'}}>
 		// 				<img alt='platformImage' src={`https://robohash.org/${selectedModule.platformName}?200x200`}/>
 		// 				<p className='paragraph'>{description}</p>
	 	// 			</div>
	}else{
		closehdr=<div style={{justifyContent:'space-between',display:'flex'}}>
					<button className='deleteButton' onClick={()=>{onSaveModuleInfo()}}><img src={saveIcon} height='50px' width='50px' alt="save"/></button>
					<button className='closeButton' onClick={()=>{onCloseModule('')}}><img src={closeIcon} height='50px' width='50px' alt="close"/></button>
				</div>
		let hdr;
		let hdrButton;
		if(changeHeader){
			hdr=<input defaultValue={header} style={{width:'50%'}} type="text" id="header" name="header"/>
			hdrButton=<button className='deleteButton' onClick={()=>{onEditHeader(document.getElementById("header").value)}}><img src={editIcon} height='50px' width='50px' alt="edit"/></button>
		}
		else{
			hdr=<h2>{header}</h2>
			hdrButton=<button className='deleteButton' onClick={()=>{onEditHeader()}}><img src={editIcon} height='50px' width='50px' alt="edit"/></button>
		}
		let desc;
		let descButton;
		if(changeD){
			desc=<input defaultValue={description} style={{width:'40%'}} type="text" id="desc" name="desc"/>
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
        let showImg =<img alt='platformImage' src={imageData} height={200} width={200}/>
		centerpart=<>	<div style={{justifyContent:'space-between',display:'flex'}}>
							<button className='deleteButton' onClick={handleClick}><img src={uploadIcon} height='50px' width='50px' alt="upload"/></button>
							<input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={onUploadImage} />
							{descButton}
						</div>
						<div style={{justifyContent:'center',display:'flex'}}>
							{showImg}
							{desc}
						</div>
					</>   
	}
	if(selectedModule==='' || imageData === ''){
		return null
	}else{
		let bt;
		if (isEdit){
			bt=<Button className='playButton' onClick={()=>{setModuleName(selectedModule.moduleName); setModuleId(selectedModule._id)}}> Edit</Button>;
		}
		else if(selectedDisable){
			bt=<Button className='disableButton' disabled> Play</Button>;
		}else{
			bt=<Button className='playButton' onClick={()=>{setModuleName(selectedModule.moduleName); setModuleId(selectedModule._id)}}> Play</Button>;
		}
		return (
			<section id="overlay">
				<div className='overlayStyle'>
					<div className='selectConfirm'>
						{closehdr}
						{titlehdr}
						{centerpart}
						<div style={{marginTop: '1%'}} className='clearfix'>
                            {/* <Link style={{color:'white'}} to={'/play/platform/'+selectedModule._id}> Play</Link> */}
							{bt}
						</div>
					</div>
				</div>
			</section>
		);
	}
	
}

export default ModuleConfirmBox;