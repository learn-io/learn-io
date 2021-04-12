import React, { useState } from 'react';
import './ComponentStyle.css';
import menusIcon from './images/menus.png';


const Dropdown = require("react-bootstrap").Dropdown;
const Link = require("react-router-dom").Link;
const MenuController = (props) =>{

	const [isReg, setIsReg] = useState(false);
    let dropdown;

	if (props.isSignedIn)
	{
		dropdown = <MenuDropdown isAdmin={props.isAdmin}/>;
	}
	else
	{
		if (isReg)
			dropdown = <LoginDropdown setIsSignedIn={props.setIsSignedIn} setIsAdmin={props.setIsAdmin} setIsReg={setIsReg}/>
		else
			dropdown = <RegisterDropdown setIsSignedIn={props.setIsSignedIn} setIsAdmin={props.setIsAdmin} setIsReg={setIsReg}/>
	}
	return (
	<div className='menusStyle'>
		<Link to="/home" className='homeButton'> Learn-io </Link>
		{dropdown}
	</div>
    )
}

const MenuDropdown = (props) =>{

	let admin;
	if(props.isAdmin)
	{
		admin = <Dropdown.Item href="/admin"><div className="dropdown-content">Admin</div></Dropdown.Item>;
	}

	return (
		<Dropdown>
			<Dropdown.Toggle id="dropdown-basic" className="dropbtn" menuAlign="right">
				<img src={menusIcon} height='40px' width='40px' alt="menus"/>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{admin}
				<Dropdown.Item className="dropdown" href="/yourpages"><div className="dropdown-content">Your Platforms</div></Dropdown.Item>
				<Dropdown.Item className="dropdown" href="/profile"><div className="dropdown-content">Profile</div></Dropdown.Item>
				<Dropdown.Item className="dropdown" href="/setting"><div className="dropdown-content">Settings</div></Dropdown.Item>
				<Dropdown.Item className="dropdown" href="/logout"><div className="dropdown-content">Sign Out</div></Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

const LoginDropdown = (props) =>{
	
	return (
		<Dropdown>
			<Dropdown.Toggle id="dropdown-basic" className="dropbtn" menuAlign="right">
				<img src={menusIcon} height='40px' width='40px' alt="menus"/>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item className="dropdown"><div className="dropdown-content">Please Log In</div></Dropdown.Item>			
			</Dropdown.Menu>
		</Dropdown>
	)
}

const RegisterDropdown = (props) =>{
	
	return (
		<Dropdown>
			<Dropdown.Toggle id="dropdown-basic" className="dropbtn" menuAlign="right">
				<img src={menusIcon} height='40px' width='40px' alt="menus"/>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item className="dropdown"><div className="dropdown-content">Please Register</div></Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default MenuController;