import React from 'react';
import './ComponentStyle.css';
import menusIcon from './images/menus.png';
const menus=({onRouteChange, route, menusClick, isSignedIn,isAdmin})=>{
		if(menusClick&&(route==='signin'||route==='register')){
			return(
				<div className='menusStyle'>
					<a href="#home" className='homeButton'>Learn-io</a>
					<div className='dropdown'>
						<button onClick={()=>onRouteChange('menus')} className='disableButton'><img src={menusIcon} height='30px' width='30px' alt="menus"/></button>
					</div>
				</div>
			);
		}else if(isAdmin){
			return(
				<div className='menusStyle'>
					<a href="#home" className='homeButton'>Learn-io</a>
					<div className='dropdown'>
						<button className='dropbtn'><img src={menusIcon} height='30px' width='30px' alt="menus"/></button>
						<div className='dropdown-content'>
							<a href="#2">Admin</a>
						    <a href="#2">My Profile</a>
						    <a href="#2">Setting</a>
						    <a href="#3">Your Page</a>
						    <a href="#3">Sign Out</a>
						</div>
					</div>
				</div>
			);
		}else if(isSignedIn){
			return(
				<div className='menusStyle'>
					<a href="#home" className='homeButton'>Learn-io</a>
					<div className='dropdown'>
						<button className='dropbtn'><img src={menusIcon} height='30px' width='30px' alt="menus"/></button>
						<div className='dropdown-content'>
						    <a href="#2">My Profile</a>
						    <a href="#2">Setting</a>
						    <a href="#3">Your Page</a>
						    <a href="#3">Sign Out</a>
						</div>
					</div>
				</div>
			);
		}else{
			return(
				<div className='menusStyle'>
					<a href="#home" className='homeButton'>Learn-io</a>
					<div className='dropdown'>
						<button className='dropbtn'><img src={menusIcon} height='30px' width='30px' alt="menus"/></button>
						<div className='dropdown-content'>
							<a href="#signin" onClick={()=>onRouteChange('signin')}>Sign In</a>
						</div>
					</div>
				</div>
			);
		}
		
}

export default menus;