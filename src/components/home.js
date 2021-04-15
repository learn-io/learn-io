import axios_instance from './axios_instance.js';
import React, { useEffect, useState } from 'react';
import './ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
// import uploadIcon from './images/upload.png';
// import editIcon from './images/edit.png';
// import saveIcon from './images/save.png';
// import Platform from './components/Platform';
import PreviousButton from './components/PreviousButton';
import NextButton from './components/NextButton';
import SearchBox from './components/SearchBox';
import ConfirmBox from './components/ConfirmBox';
import PlatformList from './components/PlatformList';

const HomeController = (props) =>{
    const [platforms, setPlatforms] = useState([])
    const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [nextPlatforms, setNextPlatforms] = useState(false);
    const [selectPlatform, setSelectPlatform] = useState("");
    const [header,setHeader]=useState("");
    const [changeHeader,setChangeHeader]=useState(false);
    const [description,setDescription]=useState("");
    const [changeD,setChangeD]=useState(false);
    const [save,setSave]=useState(0);

    useEffect(
        ()=>{
			let queryText = text
            if (text.length < 2)
				queryText = ' '
			if (limit < 1)
                return;
			axios_instance({
                method: 'get',
                url: "search/platforms/all/"+queryText+"/"+skip+"/"+(limit+1)
            }).then(function(response){
                if(response.data.length===(limit+1)){
            		response.data.pop();
            		setNextPlatforms(true);
            	}else{
            		setNextPlatforms(false);
            	}
                setPlatforms(response.data);
            }).catch(function(err){
                console.log(err);
            });
        },[text, skip, limit,save]
    );

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

    const onSelectPlatform=(platform)=>{
		if(platform!==''){
			setSelectPlatform(platform);
			setHeader(platform.platformName);
			setDescription(platform.description);
		}else{
			setSelectPlatform('');
			setHeader('');
			setDescription('');
			setChangeHeader(false);
			setChangeD(false);
		}
	}
    const onSearchPlatform=(value)=>{
    	setText(value);
    	setSkip(0);
    }
    const onChangeLimit=(value)=>{
    	setLimit(value);
    	setSkip(0);
    }
    return (
	    <div className='appStyle'>
	        <SearchBox onSearchPlatform={onSearchPlatform} />
	        <Dropdown>
				<Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
			    	Platfroms per page: {limit}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item onClick={()=>{onChangeLimit(3)}}>3</Dropdown.Item>
			    	<Dropdown.Item onClick={()=>{onChangeLimit(10)}}>10</Dropdown.Item>
			    	<Dropdown.Item onClick={()=>{onChangeLimit(15)}}>15</Dropdown.Item>
			    	<Dropdown.Item onClick={()=>{onChangeLimit(20)}}>20</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
	        <PlatformList platforms={platforms} onSelectPlatform={onSelectPlatform}/>
	       	<PreviousButton limit={limit} skip={skip} setSkip={setSkip} />
	       	<ConfirmBox
	       		username={props.username}
	       		header={header}
		        description={description}
	       		selectPlatform={selectPlatform}
	       		onSelectPlatform={onSelectPlatform}
	       		onSavePlatformInfo={onSavePlatformInfo}
	        	onUploadImage={onUploadImage}
	        	onEditHeader={onEditHeader}
	        	onEditDescription={onEditDescription}
	        	changeHeader={changeHeader}
	        	changeD={changeD}
	       	/>
	        <NextButton limit={limit} nextPlatforms={nextPlatforms} skip={skip} setSkip={setSkip}/>
	    </div>
    )
}

// const ConfirmBox=({username,header,description,selectPlatform,onSelectPlatform,onSavePlatformInfo,onUploadImage,onEditHeader,onEditDescription,changeHeader,changeD})=>{
// 	if(selectPlatform==='') return null
// 	let closehdr;
// 	let titlehdr;
// 	let centerpart;
// 	if(username!==selectPlatform.owner){
// 		closehdr=<button className='closeButton' onClick={()=>{onSelectPlatform('')}}>X</button>
// 		titlehdr=<h2>{header}</h2>
// 		centerpart=<div style={{justifyContent:'center',display:'flex'}}>
//  						<img alt='platformImage' src={`https://robohash.org/${selectPlatform.platformName}?200x200`}/>
//  						<p className='paragraph'>{description}</p>
// 	 				</div>
// 	}else{
// 		closehdr=<div style={{justifyContent:'space-between',display:'flex'}}>
// 			<button className='deleteButton' onClick={()=>{onSavePlatformInfo(selectPlatform)}}><img src={saveIcon} height='50px' width='50px' alt="save"/></button>
// 			<button className='closeButton' onClick={()=>{onSelectPlatform('')}}>X</button>
// 		</div>
// 		let hdr;
// 		let hdrButton;
// 		if(changeHeader){
// 			hdr=<input style={{width:'50%'}} type="text" id="header" name="header"/>
// 			hdrButton=<button className='deleteButton' onClick={()=>{onEditHeader(document.getElementById("header").value)}}><img src={editIcon} height='50px' width='50px' alt="edit"/></button>
// 		}
// 		else{
// 			hdr=<h2>{header}</h2>
// 			hdrButton=<button className='deleteButton' onClick={()=>{onEditHeader()}}><img src={editIcon} height='50px' width='50px' alt="edit"/></button>
// 		}
// 		let desc;
// 		let descButton;
// 		if(changeD){
// 			desc=<input style={{width:'40%'}} type="text" id="desc" name="desc"/>
// 			descButton=<button className='deleteButton' onClick={()=>{onEditDescription(document.getElementById("desc").value)}}><img src={editIcon} height='50px' width='50px' alt="edit"/></button>
// 		}
// 		else{
// 			desc=<p className='paragraph'>{description}</p>
// 			descButton=<button className='deleteButton' onClick={()=>{onEditDescription()}}><img src={editIcon} height='50px' width='50px' alt="edit"/></button>
// 		}
// 		titlehdr=<div style={{justifyContent:'center',display:'flex'}}>
// 	 				{hdr}
//  					{hdrButton}
// 				</div>
// 		centerpart=<>	<div style={{justifyContent:'space-between',display:'flex'}}>
// 							<button className='deleteButton' onClick={()=>{onUploadImage()}}><img src={uploadIcon} height='50px' width='50px' alt="upload"/></button>
// 							{descButton}
// 						</div>
// 						<div style={{justifyContent:'center',display:'flex'}}>
// 							<img alt='platformImage' src={`https://robohash.org/${selectPlatform.platformName}?200x200`}/>
// 							{desc}
// 						</div>
// 					</>
// 	}
// 	return (
// 		<section id="overlay">
// 			<div className='overlayStyle'>
// 				<div className='selectConfirm'>
// 					{closehdr}
// 					{titlehdr}
// 					{centerpart}
// 					<div className='clearfix'>
// 						<button className='playButton'>Play</button>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// }

// const Platform =({name,platform,onSelectPlatform})=>{
// 	return(
// 		<div className='platformStyle grow' onClick={()=>{onSelectPlatform(platform)}}>
// 			<img alt='platformImage' src={`https://robohash.org/${name}?200x200`}/>
// 			<div>
// 				<h4>{name}</h4>
// 			</div>
// 		</div>
// 	);
// }

// const PreviousButton=(props)=>{
// 	let but;
// 	if(props.skip===0){
// 		but=<button disabled style={{color:'grey'}} className='homeButton'>Previous</button>
// 	}else{
// 		but=<button className='homeButton' onClick={()=>{props.setSkip(props.skip-props.limit)}}>Previous</button>
// 	}
// 	return but;
// }

// const NextButton=(props)=>{
// 	let but;
// 	if(props.nextPlatforms){
// 		but=<button className='homeButton' onClick={()=>{props.setSkip(props.skip+props.limit)}}>Next</button>
// 	}else{
// 		but=<button disabled style={{color:'grey'}} className='homeButton'>Next</button>
// 	}
// 	return but;
// }

// const PlatformList=({platforms,onSelectPlatform})=>{
// 	return(
// 		// loop for all platforms
// 		<div>
//   			{
//   				platforms.map((x,i) => {
// 					return (
// 						<Platform 
// 						key={i}
// 						platform={x}
// 						name={x.platformName}
// 						onSelectPlatform={onSelectPlatform}
// 						/>
// 					);
// 				})
// 			}
//   		</div>
// 	);
// }

// const SearchBox =({text, onSearchPlatform})=>{
// 	return (
// 		<div className='pa'>
// 			<input 
// 				className='searchBoxStyle'
// 				type='search'
//                 value={text}
// 				placeholder='Search platform'
// 				onChange={(e)=>{onSearchPlatform(e.target.value)}}
// 			/>
// 		</div>
// 	);
// }

export default HomeController;