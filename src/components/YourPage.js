import React,{useEffect, useState} from 'react';
import './ComponentStyle.css';
import plusIcon from './images/plus.png';
import axios_instance from './axios_instance.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
import PreviousButton from './components/PreviousButton';
import NextButton from './components/NextButton';
import SearchBox from './components/SearchBox';
import ConfirmBox from './components/ConfirmBox';
import DeletePlatformList from './components/DeletePlatformList';
import DeleteConfirmBox from './components/DeleteConfirmBox';
import CreatePlatform from './components/CreatePlatform';
// import {Link} from 'react-router-dom';


const YourPagesController = (props) =>{
	const [platforms, setPlatforms] = useState([]);
	const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [deletePlatform, setDeletePlatform]=useState("");
    const [nextPlatforms, setNextPlatforms] = useState(false);
    const [selectPlatform, setSelectPlatform] = useState("");
    const [save,setSave]=useState(0);
	const [create,setCreate]=useState(false);
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
    	setSkip(0);
    }

	if(props.isSignedIn){
		return (
		    <div className='appStyle'>
		    	<div style={{display:'flex',justifyContent: 'space-between',padding:'2rem'}}>
			    	<h1>Your Pages</h1>
			    	<button className='deleteButton' onClick={()=>{setCreate(true)}}><img src={plusIcon} height='50px' width='50px' alt="plus"/></button>
					{/* <Link className='deleteButton' to={''}> <img src={plusIcon} height='50px' width='50px' alt="plus"/></Link> */}
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
		        <DeletePlatformList platforms={platforms} setDeletePlatform={setDeletePlatform} setSelectPlatform={setSelectPlatform}/>
		        <DeleteConfirmBox deletePlatform={deletePlatform} onDeletePlatform={onDeletePlatform} setDeletePlatform={setDeletePlatform}/>
				<CreatePlatform create={create} setCreate={setCreate} save={save} setSave={setSave}/>
		        <ConfirmBox username={props.username} selectPlatform={selectPlatform} setSelectPlatform={setSelectPlatform} setSave={setSave} save={save}/>
		        <PreviousButton limit={limit} skip={skip} setSkip={setSkip} />
	        	<NextButton limit={limit} nextPlatforms={nextPlatforms} skip={skip} setSkip={setSkip}/>
		    </div>
	    )
	}else{
		return (<h1>You must log in first!!!</h1>);
	}
    
}

export default YourPagesController;