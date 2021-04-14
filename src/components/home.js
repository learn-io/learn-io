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
    const [nextPlatforms, setNextPlatforms] = useState([]);
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
                url: "search/platforms/all/"+queryText+"/"+skip+"/"+limit
            }).then(function(response){
                setPlatforms(response.data);
            }).catch(function(err){
                console.log(err);
            });
            axios_instance({
                method: 'get',
                url: "search/platforms/all/"+queryText+"/"+(skip+10)+"/"+limit
            }).then(function(response){
                setNextPlatforms(response.data);
            }).catch(function(err){
                console.log(err);
            });
        },[text, skip, limit]
    );

    // const onPreviousPlatform=()=>{
    // 	console.log('Previous');
    // 	// onClick={()=>{props.setSkip(props.skip-10)}
    // }
    // const onNextPlatform=()=>{
    // 	setSkip(skip+10);
    // }
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
    }
    return (
    <div className='appStyle'>
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
        <PlatformList platforms={platforms} onSelectPlatform={onSelectPlatform}/>
       	<PreviousButton skip={skip} setSkip={setSkip} />
       	<ConfirmBox selectPlatform={selectPlatform} onSelectPlatform={onSelectPlatform}/>
        <NextButton nextPlatforms={nextPlatforms} skip={skip} setSkip={setSkip}/>
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
						<p className='paragraph'>Geckos are a group of usually small, usually nocturnal lizards. They are found on every continent except Australia.</p>
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
	if(props.skip===0){
		return(
			<button disabled style={{color:'grey'}} className='homeButton'>Previous</button>
		);
	}else{
		return(
			<button className='homeButton' onClick={()=>{props.setSkip(props.skip-10)}}>Previous</button>
		);
	}
	
}

const NextButton=(props)=>{
	if(props.nextPlatforms.length===0){
		return(
			<button disabled style={{color:'grey'}} className='homeButton'>Next</button>
		);
	}else{
		return(
			<button className='homeButton' onClick={()=>{props.setSkip(props.skip+10)}}>Next</button>
		);
	}
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