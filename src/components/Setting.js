import React, { useEffect, useState } from 'react';
import './ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Button} from 'react-bootstrap';
import axios_instance from './axios_instance';
const Setting=()=>{
	const[settings,setSettings]=useState([]);
	const[email,setEmail]=useState("");
	const[dob,setDob]=useState("");
	const[oldPass,setOldPass]=useState("");
	const[newPass,setNewPass]=useState("");
	const[mute,setMute]=useState(false);

	useEffect(
		()=>{
			// axios_instance({
			// 	method: 'post',
			// 	url:"setting/",
			// 	data:{
			// 		email:"akshay.karve@stonybrook.edu",
			// 		dateOfBirth:"5/5/1998",
			// 	}
			// }).then(function(response){
			// 	console.log(response.data);
			// }).catch(function(err){
			// 	console.log(err);
			// })
			axios_instance({
				method: 'get',
				url:"setting/"
			}).then(function(response){
				console.log(response.data);
			}).catch(function(err){
				console.log(err);
			})
		}
	)

	return (
		<div className='settingStyle'>
			<h1>Setting</h1>
			{/* <Form className="form-inline"> */}
		    <Form.Row>
				<Form.Label column="lg" lg={3}>
					Email
				</Form.Label>
				<Col>
					<Form.Control size="lg" type="text" name="email" placeholder="Email" />
				</Col>
			</Form.Row>
			
			<Form.Row>
				<Form.Label column="lg" lg={3}>
					Date of Birth
				</Form.Label>
				<Col>
					<Form.Control size="lg" type="date" placeholder="MM-DD-YYYY" name="dateOfBirth"  id="newDOB"/>
				</Col>
			</Form.Row>
			
			<Form.Row>
				<Form.Label column="lg" lg={3}>
					Password Reset
				</Form.Label>
				<Col>
					<Form.Control size="lg" type="text" placeholder="Old Password" name="oldPassword" />
				</Col>
				<Col>
					<Form.Control size="lg" type="text" placeholder="New Password" name="newPassword"/>
				</Col>
			</Form.Row>
			
			<Form.Row>
				<Form.Label column="lg" lg={3}>
					Toggle Mute
				</Form.Label>
				<input className='largeCheckbox' onClick={(e)=>{console.log(e.target)}} type="checkbox" name="mute" id="checkbox"/><br/>
			</Form.Row>
			{/* </Form> */}
			<Form.Row>
				<Col>
					{/* <input type="button" className="btn">Cancel Changes</input> */}
					<Button size="lg" varient="danger">Cancel Changes</Button>
				</Col>
				<Col>
					{/* <input type="button" className="btn">Submit Changes</input> */}
					<Button size="lg" varient="primary">Submit Changes</Button>
				</Col>
			</Form.Row>
		</div>
	);
}
export default Setting;