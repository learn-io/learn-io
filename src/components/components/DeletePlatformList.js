import React from 'react';
import '../ComponentStyle.css';
import Platform from './Platform';
import deleteIcon from '../images/delete.png';

const DeletePlatformList=({platforms, onChangeDelete,onSelectPlatform})=>{
	return(
		// loop for all platforms
		<div >
  			{
  				platforms.map((user,i)=>{
					return (
						<div className='deleteList' key={i} >
							<Platform name={platforms[i].platformName} platform={platforms[i]} onSelectPlatform={onSelectPlatform}/>
							<button onClick={()=>onChangeDelete(platforms[i])} className='deleteButton'><img src={deleteIcon} height='40px' width='40px' alt="delete"/></button>
						</div>
					);
				})
			}
  		</div>
	);
}

export default DeletePlatformList;