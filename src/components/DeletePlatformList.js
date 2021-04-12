import React from 'react';
import Platform from './Platform.js';
import './ComponentStyle.css'
import deleteIcon from './images/delete.png'
const DeletePlatformList=({platforms, onChangeDelete})=>{
	return(
		// loop for all platforms
		<div >
  			{
  				platforms.map((user,i)=>{
					return (
						<div className='deleteList' key={i} >
							<Platform name={platforms[i].platformName}/>
							<button onClick={()=>onChangeDelete(platforms[i],true)} className='deleteButton'><img src={deleteIcon} height='40px' width='40px' alt="delete"/></button>
						</div>
					);
				})
			}
  		</div>
	);
}
export default DeletePlatformList;