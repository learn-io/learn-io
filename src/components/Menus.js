import React, { useState } from 'react';
import './ComponentStyle.css';
import menusIcon from './images/menus.png';


const {Dropdown, Form, Button} = require("react-bootstrap");
const Link = require("react-router-dom").Link;
const MenuController = (props) =>{

	const [isReg, setIsReg] = useState(true);
    let dropdown;

	if (props.isSignedIn)
	{
		dropdown = <MenuDropdown isAdmin={props.isAdmin}/>;
	}
	else
	{
		if (!isReg)
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
		admin = <Dropdown.Item className="dropdown" href="/admin">Admin</Dropdown.Item>;
	}

	return (
		<Dropdown>
			<Dropdown.Toggle id="dropdown-basic" className="dropbtn" menuAlign="right">
				<img src={menusIcon} height='40px' width='40px' alt="menus"/>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{admin}
				<Dropdown.Item className="dropdown" href="/yourpages">Your Platforms</Dropdown.Item>
				<Dropdown.Item className="dropdown" href="/profile">Profile</Dropdown.Item>
				<Dropdown.Item className="dropdown" href="/setting">Settings</Dropdown.Item>
				<Dropdown.Item className="dropdown" href="/logout">Sign Out</Dropdown.Item>
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

			<Dropdown.Menu className="dropdown-login">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control type="username" placeholder="Enter username" />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Enter Password" />
					</Form.Group>
					<div className="dropdown-content">
						<Button variant="primary" type="submit">
							Back To Register
						</Button>
						<Button variant="primary" type="submit">
							Login
						</Button>
					</div>
				</Form>					
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

			<Dropdown.Menu className="dropdown-login">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control type="username" placeholder="Enter username" />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Enter Password" />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Enter Password" />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Enter Password" />
					</Form.Group>

					<div className="dropdown-content">
						<Button variant="primary" type="submit">
							Back To Login
						</Button>
						<Button variant="primary" type="submit">
							Register
						</Button>
					</div>
				</Form>					
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default MenuController;