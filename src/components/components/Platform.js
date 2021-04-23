import React from 'react';
import '../ComponentStyle.css';

const Platform =({name,platform,setSelectPlatform})=>{
	let showImg;
	if(platform.image===''){
		showImg=<img alt='platformImage' src={`https://robohash.org/${name}?200x200`}/>
	}else{
		showImg=<img alt='platformImage' src={platform.image} height={300} width={300}/>
	}
	
	return(
		<div className='platformStyle grow' onClick={()=>{setSelectPlatform(platform)}}>
			{showImg}
			<div>
				<h4>{name}</h4>
			</div>
		</div>
	);
}

export default Platform;