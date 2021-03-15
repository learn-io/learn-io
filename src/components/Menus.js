import React from 'react';
import './ComponentStyle.css';
import menusIcon from './images/menus.png';
const menus=()=>{
	return (
		<div className='menusStyle'>
			<a href="#home" className='homeButton'>Learn-io</a>
			<div className='dropdown'>
				<button className='dropbtn'><img src={menusIcon} height='30px' width='30px' alt="menus"/></button>
				<div className='dropdown-content'>
					<a href="#1">Sign In</a>
					<a href="#2">Admin</a>
				    <a href="#2">My Profile</a>
				    <a href="#2">Setting</a>
				    <a href="#3">Your Page</a>
				    <a href="#3">Sign Out</a>
				</div>
			</div>
		</div>
	);
}

export default menus;