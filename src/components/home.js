import axios_instance from './axios_instance.js';
import React, { useEffect, useState } from 'react';
import './ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';

const HomeController = (props) =>{
    const [platforms, setPlatforms] = useState([])
    const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [nextPlatforms, setNextPlatforms] = useState(false);
    const [selectPlatform, setSelectPlatform] = useState("");

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
        },[text, skip, limit]
    );

    const onSelectPlatform=(platform)=>{
		if(platform!==''){
			setSelectPlatform(platform);
		}else{
			setSelectPlatform('');
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
       	<ConfirmBox selectPlatform={selectPlatform} onSelectPlatform={onSelectPlatform}/>
        <NextButton limit={limit} nextPlatforms={nextPlatforms} skip={skip} setSkip={setSkip}/>
    </div>
    )
}

const ConfirmBox=({selectPlatform,onSelectPlatform})=>{
	if(selectPlatform==='') return null
	return (
		<section id="overlay">
			<div className='overlayStyle'>
				<div className='selectConfirm'>
					<button className='closeButton' onClick={()=>{onSelectPlatform('')}}>X</button>
					<h2>{selectPlatform.platformName}</h2>
					<div className='selectImage'>
						<img alt='platformImage' src={`https://robohash.org/${selectPlatform.platformName}?200x200`}/>
					</div>
					<div>
						<p className='paragraph'>{selectPlatform.description}</p>
					</div>
					<div className='clearfix'>
						<button className='playButton'>Play</button>
					</div>
				</div>
			</div>
		</section>
	);
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

const PreviousButton=(props)=>{
	let but;
	if(props.skip===0){
		but=<button disabled style={{color:'grey'}} className='homeButton'>Previous</button>
	}else{
		but=<button className='homeButton' onClick={()=>{props.setSkip(props.skip-props.limit)}}>Previous</button>
	}
	return but;
}

const NextButton=(props)=>{
	let but;
	if(props.nextPlatforms){
		but=<button className='homeButton' onClick={()=>{props.setSkip(props.skip+props.limit)}}>Next</button>
	}else{
		but=<button disabled style={{color:'grey'}} className='homeButton'>Next</button>
	}
	return but;
}

const PlatformList=({platforms,onSelectPlatform})=>{
	return(
		// loop for all platforms
		<div>
  			{
  				platforms.map((x,i) => {
					return (
						<Platform 
						key={i}
						platform={x}
						name={x.platformName}
						onSelectPlatform={onSelectPlatform}
						/>
					);
				})
			}
  		</div>
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

export default HomeController;