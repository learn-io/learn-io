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
		admin = <Dropdown.Item className="dropdown-content"><Link to="/admin"> Admin </Link></Dropdown.Item>;
	}

	return (
		<Dropdown>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				<img src={menusIcon} height='40px' width='40px' alt="menus"/>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{admin}
				<Dropdown.Item className="dropdown-content"><Link to="/yourpages"> Your Platforms </Link></Dropdown.Item>
				<Dropdown.Item className="dropdown-content"><Link to="/profile"> Profile </Link></Dropdown.Item>
				<Dropdown.Item className="dropdown-content"><Link to="/setting"> Settings </Link></Dropdown.Item>
				<Dropdown.Item className="dropdown-content"><Link to="/logout"> Sign Out </Link></Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

const LoginDropdown = (props) =>{
	
	return (
		<Dropdown>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				<img src={menusIcon} height='40px' width='40px' alt="menus"/>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item className="dropdown-content">Please Log In</Dropdown.Item>
				
			</Dropdown.Menu>
		</Dropdown>
	)
}

const RegisterDropdown = (props) =>{
	
	return (
		<Dropdown>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				<img src={menusIcon} height='40px' width='40px' alt="menus"/>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item className="dropdown-content">Please Register</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default MenuController;