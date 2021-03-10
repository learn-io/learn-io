import React from 'react';
import './ComponentStyle.css';
const Platform =({name})=>{
	return(
		<div className='platformStyle grow'>
			<img alt='platformImage' src={`https://robohash.org/${name}?200x200`}/>
			<div>
				<h3>{name}</h3>
			</div>
		</div>
	);
}
export default Platform;