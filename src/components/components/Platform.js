import React from 'react';
import '../ComponentStyle.css';

const Platform =({name,platform,setSelectPlatform})=>{
	return(
		<div className='platformStyle grow' onClick={()=>{setSelectPlatform(platform)}}>
			<img alt='platformImage' src={`https://robohash.org/${name}?200x200`}/>
			<div>
				<h4>{name}</h4>
			</div>
		</div>
	);
}

export default Platform;