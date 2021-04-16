import React from 'react';
import '../ComponentStyle.css';
import Platform from './Platform';
import deleteIcon from '../images/delete.png';

const DeletePlatformList=({platforms, setDeletePlatform,setSelectPlatform})=>{
	return(
		// loop for all platforms
		<div >
  			{
  				platforms.map((user,i)=>{
					return (
						<div className='deleteList' key={i} >
							<Platform name={platforms[i].platformName} platform={platforms[i]} setSelectPlatform={setSelectPlatform}/>
							<button onClick={()=>setDeletePlatform(platforms[i])} className='deleteButton'><img src={deleteIcon} height='40px' width='40px' alt="delete"/></button>
						</div>
					);
				})
			}
  		</div>
	);
}

export default DeletePlatformList;