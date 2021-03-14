import React from 'react';
import './ComponentStyle.css';
import menusIcon from './images/menus.png';
const menus=()=>{
	return (
		<div className='menusStyle'>
			<a href="#home" className='homeButton'>Learn-io</a>
			<div className='dropdown' style={{float:'right'}}>
				<button className='dropbtn'><img src={menusIcon} height='30px' width='30px' alt="menus"/></button>
				<div className='dropdown-content'>
					<a href="#1">Sign In</a>
				    <a href="#2">Link 2</a>
				    <a href="#3">Link 3</a>
				</div>
			</div>
		</div>
	);
}

export default menus;