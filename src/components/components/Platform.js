import React , { useEffect, useState } from 'react';
import axios_instance from '../axios_instance.js';
import '../ComponentStyle.css';

const Platform =({name,platform,setSelectPlatform})=>{
	const [imageData,setImageData]=useState('');
	useEffect(
        ()=>{
			if(platform===''||platform===undefined)
				return;

			if(platform.image===undefined||platform.image===''){
        		setImageData(`https://robohash.org/${platform.platformName}?200x200`);
        	}else{
				axios_instance({
					method: 'get',
					url: "media/"+encodeURIComponent(platform.image),
				}).then((res)=>{
					setImageData(res.data.data);
				}).catch((err)=>{
					console.log(err);
				});
			}
        },[platform]
    );
	let showImg=<img alt='platformImage' src={imageData} height={300} width={300}/>;
	
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