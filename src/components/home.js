import axios_instance from './axios_instance.js';
import React, { useEffect, useState } from 'react';
import './ComponentStyle.css';

const HomeController = (props) =>{
    const [platforms, setPlatforms] = useState([])
    const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [nextPlatforms, setNextPlatforms] = useState([])

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
    const onSearchPlatform=(value)=>{
    	setText(value);
    	setSkip(0);
    }
    return (
    <div className='appStyle'>
        <SearchBox onSearchPlatform={onSearchPlatform} />
        <PlatformList platforms={platforms}/>
       	<PreviousButton skip={skip} setSkip={setSkip} />
        <NextButton nextPlatforms={nextPlatforms} skip={skip} setSkip={setSkip}/>
    </div>
    )
}

const Platform =({name})=>{
	return(
		<div className='platformStyle grow'>
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

const PlatformList=({platforms})=>{
	return(
		// loop for all platforms
		<div>
  			{
  				platforms.map((x,i) => {
					return (
						<Platform 
						key={i}
						desc={x.description}
						img={x.imageData}
						name={x.platformName}/>
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