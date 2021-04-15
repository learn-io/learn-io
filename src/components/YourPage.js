import React,{useEffect, useState} from 'react';
import './ComponentStyle.css';
// import axios from 'axios';
import deleteIcon from './images/delete.png';
import plusIcon from './images/plus.png';
import axios_instance from './axios_instance.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
import uploadIcon from './images/upload.png';
import editIcon from './images/edit.png';
import saveIcon from './images/save.png';
// const deleteplat_url = "http://localhost:3000/platform/deletePlatform";
// const target_url="http://localhost:3000/search/platforms";


const YourPagesController = (props) =>{
	const [platforms, setPlatforms] = useState([]);
	const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
	// limit is the maximum number of platforms to be returned
	// less are only returned if there are no more in the databse
    const [deletePlatform, setDeletePlatform]=useState("");
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
                url: "search/platforms/"+props.username+"/"+queryText+"/"+skip+"/"+(limit+1)
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
        },[text, skip, limit,save,props.username]
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

    const onChangeDelete=(platform)=>{
		if(platform!==''){
			setDeletePlatform(platform);
		}else{
			setDeletePlatform('');
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
	const onDeletePlatform=(platform)=>{
		axios_instance({
            method: 'post',
            url: "platform/deletePlatform",
            data: {
                _id: platform._id
            }
        })
        .then((res)=>{
        	let filter = platforms.filter(item => item !== platform)
        	setPlatforms(filter);
        	setDeletePlatform('');
        	setSave(save+1);
	    })
	    .catch(err=>console.log(err));
	}

	const onChangeLimit=(value)=>{
    	setLimit(value);
    }

	if(props.isSignedIn){
		return (
		    <div className='appStyle'>
		    	<div style={{display:'flex',justifyContent: 'space-between',paddingTop:'1rem'}}>
			    	<h1>Your Pages</h1>
			    	<button className='deleteButton'><img src={plusIcon} height='50px' width='50px' alt="plus"/></button>
		    	</div>
		        <SearchBox onSearchPlatform={onSearchPlatform} />
		        <Dropdown>
					<Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
				    	Platfroms per page: {limit}
					</Dropdown.Toggle>
					<Dropdown.Menu>
				    	<Dropdown.Item onClick={()=>{onChangeLimit(10)}}>10</Dropdown.Item>
				    	<Dropdown.Item onClick={()=>{onChangeLimit(15)}}>15</Dropdown.Item>
				    	<Dropdown.Item onClick={()=>{onChangeLimit(20)}}>20</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
		        <DeletePlatformList platforms={platforms} onChangeDelete={onChangeDelete} onSelectPlatform={onSelectPlatform}/>
		        <DeleteConfirmBox deletePlatform={deletePlatform} onDeletePlatform={onDeletePlatform} onChangeDelete={onChangeDelete}/>
		        <ConfirmBox 
		        	selectPlatform={selectPlatform}
		        	header={header}
		        	description={description}
		        	onSelectPlatform={onSelectPlatform}
		        	onSavePlatformInfo={onSavePlatformInfo}
		        	onUploadImage={onUploadImage}
		        	onEditHeader={onEditHeader}
		        	onEditDescription={onEditDescription}
		        	changeHeader={changeHeader}
		        	changeD={changeD}
		        />
		        <PreviousButton skip={skip} setSkip={setSkip} />
	        	<NextButton nextPlatforms={nextPlatforms} skip={skip} setSkip={setSkip}/>
		    </div>
	    )
	}else{
		return (<h1>You must log in first!!!</h1>);
	}
    
}

const ConfirmBox=({selectPlatform,header,description,onSelectPlatform,onSavePlatformInfo,onUploadImage,onEditHeader,onEditDescription,changeHeader,changeD})=>{
	if(selectPlatform==='') return null
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
	return (
		<section id="overlay">
			<div className='overlayStyle'>
				<div className='selectConfirm'>
					<div style={{justifyContent:'space-between',display:'flex'}}>
						<button className='deleteButton' onClick={()=>{onSavePlatformInfo(selectPlatform)}}><img src={saveIcon} height='50px' width='50px' alt="save"/></button>
						<button className='closeButton' onClick={()=>{onSelectPlatform('')}}>X</button>
					</div>
					<div style={{justifyContent:'center',display:'flex'}}>
						{hdr}
						{hdrButton}
					</div>
					<div style={{justifyContent:'space-between',display:'flex'}}>
						<button className='deleteButton' onClick={()=>{onUploadImage()}}><img src={uploadIcon} height='50px' width='50px' alt="upload"/></button>
						{descButton}
					</div>
					<div style={{justifyContent:'center',display:'flex'}}>
						<img alt='platformImage' src={`https://robohash.org/${selectPlatform.platformName}?200x200`}/>
						{desc}
					</div>
					<div className='clearfix'>
						<button className='playButton'>Play</button>
					</div>
				</div>
			</div>
		</section>
	);
}


const SearchBox =({text, onSearchPlatform})=>{
	return (
		<div className='pa'>
			<input 
				className='searchBoxStyle'
				type='search'
                value={text}
				placeholder='Search platform'
				onChange={(e)=>{onSearchPlatform(e.target.value)}}
			/>
		</div>
	);
}

const PreviousButton=(props)=>{
	let but;
	if(props.skip===0){
		but=<button disabled style={{color:'grey'}} className='homeButton'>Previous</button>
	}else{
		but=<button className='homeButton' onClick={()=>{props.setSkip(props.skip-10)}}>Previous</button>
	}
	return but;
}

const NextButton=(props)=>{
	let but;
	if(props.nextPlatforms===false){
		but=<button disabled style={{color:'grey'}} className='homeButton'>Next</button>
	}else{
			but=<button className='homeButton' onClick={()=>{props.setSkip(props.skip+10)}}>Next</button>
	}
	return but;
}

const Platform =({name,platform,onSelectPlatform})=>{
	return(
		<div className='platformStyle grow' onClick={()=>{onSelectPlatform(platform)}}>
			<img alt='platformImage' src={`https://robohash.org/${name}?200x200`}/>
			<div>
				<h4>{name}</h4>
			</div>
		</div>
	);
}

const DeletePlatformList=({platforms, onChangeDelete,onSelectPlatform})=>{
	return(
		// loop for all platforms
		<div >
  			{
  				platforms.map((user,i)=>{
					return (
						<div className='deleteList' key={i} >
							<Platform name={platforms[i].platformName} platform={platforms[i]} onSelectPlatform={onSelectPlatform}/>
							<button onClick={()=>onChangeDelete(platforms[i])} className='deleteButton'><img src={deleteIcon} height='40px' width='40px' alt="delete"/></button>
						</div>
					);
				})
			}
  		</div>
	);
}

const DeleteConfirmBox=({deletePlatform,onDeletePlatform,onChangeDelete})=>{
	if(deletePlatform==='') return null
	return (
		<section id="overlay">
			<div className='overlayStyle'>
				<div className='deleteConfirm'>
					<h2>Are you sure you want to delete</h2>
					<h2>"{deletePlatform.platformName}"?</h2>
					<button className='deleteButtonStyle' onClick={()=>onDeletePlatform(deletePlatform)}>Yes</button>
					<button className='deleteButtonStyle' onClick={()=>onChangeDelete('')}>No</button>
				</div>
			</div>
		</section>
	);
}

export default YourPagesController;