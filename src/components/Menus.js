import React, { useState } from 'react';
import axios from 'axios';
import './ComponentStyle.css';
import menusIcon from './images/menus.png';

const target_url="https://learn-io-api.herokuapp.com/"

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
		<Dropdown>
			<Dropdown.Toggle id="dropdown-basic" className="dropbtn">
				<img src={menusIcon} height='40px' width='40px' alt="menus"/>
			</Dropdown.Toggle>
			<Dropdown.Menu className="dropdown-login">
			{dropdown}
			</Dropdown.Menu>
		</Dropdown>
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
		<>
			{admin}
			<Dropdown.Item className="dropdown" href="/yourpages">Your Platforms</Dropdown.Item>
			<Dropdown.Item className="dropdown" href="/profile">Profile</Dropdown.Item>
			<Dropdown.Item className="dropdown" href="/setting">Settings</Dropdown.Item>
			<Dropdown.Item className="dropdown" href="/logout">Sign Out</Dropdown.Item>
		</>
	)
}

const login = (e, setIsAdmin, setIsSignedIn) =>{
	e.preventDefault();
	axios({
		method: 'post',
		url: target_url+"signin",
		data: {
		  username: e.target.elements.username.value,
		  password: e.target.elements.password.value
		}
	}).then(function(response){
		setIsSignedIn(response.data);
		setIsAdmin('admin' === response.data);
	}).catch(function(err){
		console.log(err);
	});
}

const LoginDropdown = (props) =>{
	return (
		<>
			<Form onSubmit={(e) => login(e,props.setIsAdmin,props.setIsSignedIn)}>
				<Form.Group controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control type="username" placeholder="Enter username" />
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Enter Password" />
				</Form.Group>

				<div className="dropdown-content">
					<Button variant="primary" onClick={()=>{props.setIsReg(true)}}>
						Back To Register
					</Button>
					<Button variant="primary" type="submit">
						Login
					</Button>
				</div>
			</Form>			
		</>
	)
}
const register = (e, setIsAdmin, setIsSignedIn) =>{
	e.preventDefault();
	axios({
		method: 'post',
		url: target_url+"register",
		data: {
		  username: e.target.elements.username.value,
		  password: e.target.elements.password.value,
		  verifyPassword: e.target.elements.verifyPassword.value,
		  email: e.target.elements.email.value,
		  dateOfBirth: e.target.elements.dateOfBirth.value
		}
	}).then(function(response){
		setIsSignedIn(response.data);
		setIsAdmin('admin' === response.data);
	}).catch(function(err){
		console.log(err);
	});
}

const RegisterDropdown = (props) =>{
	return (
		<>
			<Form onSubmit={(e) => register(e,props.setIsAdmin,props.setIsSignedIn)}>
				<Form.Group controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control type="username" placeholder="Enter username" />
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Enter Password" />
				</Form.Group>

				<Form.Group controlId="verifyPassword">
					<Form.Label>Verify Password</Form.Label>
					<Form.Control type="password" placeholder="Enter Password Again" />
				</Form.Group>

				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Enter Email" />
				</Form.Group>

				<Form.Group controlId="dateOfBirth">
					<Form.Label>Date Of Birth</Form.Label>
					<Form.Control type="dateOfBirth" placeholder="Enter Date Of Birth" />
				</Form.Group>

				<div className="dropdown-content">
					<Button variant="primary" onClick={()=>{props.setIsReg(false)}}>
						Back To Login
					</Button>
					<Button variant="primary" type="submit">
						Register
					</Button>
				</div>
			</Form>			
		</>
	)
}

export default MenuController;