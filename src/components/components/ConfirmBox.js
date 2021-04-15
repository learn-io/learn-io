import React from 'react';
import '../ComponentStyle.css';
import uploadIcon from '../images/upload.png';
import editIcon from '../images/edit.png';
import saveIcon from '../images/save.png';

const ConfirmBox=({username,header,description,selectPlatform,onSelectPlatform,onSavePlatformInfo,onUploadImage,onEditHeader,onEditDescription,changeHeader,changeD})=>{
	if(selectPlatform==='') return null
	let closehdr;
	let titlehdr;
	let centerpart;
	if(username!==selectPlatform.owner){
		closehdr=<button className='closeButton' onClick={()=>{onSelectPlatform('')}}>X</button>
		titlehdr=<h2>{header}</h2>
		centerpart=<div style={{justifyContent:'center',display:'flex'}}>
 						<img alt='platformImage' src={`https://robohash.org/${selectPlatform.platformName}?200x200`}/>
 						<p className='paragraph'>{description}</p>
	 				</div>
	}else{
		closehdr=<div style={{justifyContent:'space-between',display:'flex'}}>
			<button className='deleteButton' onClick={()=>{onSavePlatformInfo(selectPlatform)}}><img src={saveIcon} height='50px' width='50px' alt="save"/></button>
			<button className='closeButton' onClick={()=>{onSelectPlatform('')}}>X</button>
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
	return (
		<section id="overlay">
			<div className='overlayStyle'>
				<div className='selectConfirm'>
					{closehdr}
					{titlehdr}
					{centerpart}
					<div className='clearfix'>
						<button className='playButton'>Play</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ConfirmBox;