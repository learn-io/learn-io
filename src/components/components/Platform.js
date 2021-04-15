import React from 'react';
import '../ComponentStyle.css';

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

export default Platform;