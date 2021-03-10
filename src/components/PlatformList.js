import React from 'react';
import Platform from './Platform.js';
const PlatformList=({platforms})=>{
	return(
		// loop for all platforms
		<div>
  			{
  				platforms.map((user,i)=>{
					return (
						<Platform 
						key={i}
						name={platforms[i].name}/>
					);
				})
			}
  		</div>
	);
}
export default PlatformList;