import axios_instance from './axios_instance.js';
import React, { useEffect, useState } from 'react';
import './ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
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
			    	Platforms per page: {limit}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item onClick={()=>{onChangeLimit(3)}}>3</Dropdown.Item>
			    	<Dropdown.Item onClick={()=>{onChangeLimit(10)}}>10</Dropdown.Item>
			    	<Dropdown.Item onClick={()=>{onChangeLimit(15)}}>15</Dropdown.Item>
			    	<Dropdown.Item onClick={()=>{onChangeLimit(20)}}>20</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
	        <PlatformList platforms={platforms} setSelectPlatform={setSelectPlatform}/>
	       	<PreviousButton limit={limit} skip={skip} setSkip={setSkip} />
	       	<ConfirmBox username={props.username} selectPlatform={selectPlatform} setSelectPlatform={setSelectPlatform} setSave={setSave} save={save}/>
	        <NextButton limit={limit} nextPlatforms={nextPlatforms} skip={skip} setSkip={setSkip}/>
	    </div>
    )
}

export default HomeController;