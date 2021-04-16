import React from 'react';
import '../ComponentStyle.css';
import Platform from './Platform';

const PlatformList=({platforms,setSelectPlatform})=>{
	return(
		// loop for all platforms
		<>
			{/*<Popup username={props.username}/>*/}
			<div>
				{
					platforms.map((x,i) => {
						return (
							<Platform 
							key={i}
							platform={x}
							name={x.platformName}
							setSelectPlatform={setSelectPlatform}
							/>
						);
					})
				}
			</div>
		</>
	);
}

export default PlatformList;