import React from 'react';
import '../ComponentStyle.css';

const DeleteConfirmBox=({deletePlatform,onDeletePlatform,setDeletePlatform})=>{
	if(deletePlatform==='') return null
	return (
		<section id="overlay">
			<div className='overlayStyle'>
				<div className='deleteConfirm'>
					<h2>Are you sure you want to delete</h2>
					<h2>"{deletePlatform.platformName}"?</h2>
					<button className='deleteButtonStyle' onClick={()=>onDeletePlatform(deletePlatform)}>Yes</button>
					<button className='deleteButtonStyle' onClick={()=>setDeletePlatform('')}>No</button>
				</div>
			</div>
		</section>
	);
}

export default DeleteConfirmBox;