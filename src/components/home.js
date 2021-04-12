import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ComponentStyle.css';

const target_url="https://learn-io-api.herokuapp.com/search/platforms"
// const target_url="http://localhost:3000/search/platforms"

const HomeController = () =>{
    const [platforms, setPlatforms] = useState([])
    const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(
        ()=>{
            if (text.length < 1){
                axios({
	                method: 'get',
	                url: target_url+"/all/ /"+skip+"/"+limit
	            }).then(function(response){
	                setPlatforms(response.data);
	            }).catch(function(err){
	                console.log(err);
	            });
            }else{
            	if (limit < 1)
	                return;
	            axios({
	                method: 'get',
	                url: target_url+"/all/"+text+"/"+skip+"/"+limit
	            }).then(function(response){
	                setPlatforms(response.data);
	            }).catch(function(err){
	                console.log(err);
	            });
            }
        },[text, skip, limit]
    );

    return (
    <div className='appStyle'>
        <SearchBox setText={setText}/>
        <PlatformList platforms={platforms}/>
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

const SearchBox =({text, setText})=>{
	return (
		<div className='pa'>
			<input 
				className='searchBoxStyle'
				type='search'
                value={text}
				placeholder='Search platform'
				onChange={(e)=>{setText(e.target.value)}}
			/>
		</div>
	);
}

export default HomeController;