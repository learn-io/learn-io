import React, { useEffect, useState } from 'react';
import './ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col, Button} from 'react-bootstrap';
import axios_instance from './axios_instance';
const Setting=()=>{
	// const[settings,setSettings]=useState([]);
	const[email,setEmail]=useState("");
	const[dob,setDob]=useState("");
	const[oldPass,setOldPass]=useState("");
	const[newPass,setNewPass]=useState("");
	const[mute,setMute]=useState(false);

	useEffect(
		()=>{
			axios_instance({
				method: 'get',
				url:"setting/"
			}).then(function(response){
				// console.log(response.data);
				setEmail(response.data.email);
				// console.log(response.data.dateOfBirth);
				// var temp = response.data.dateOfBirth.split("/")
				// var buildingDateString = "";
				// buildingDateString = temp[2]+"-";
				// if(temp[1].length<2){
				// 	buildingDateString += "0"+temp[1]+"-";
				// } else {
				// 	buildingDateString += temp[1]+"-";
				// }
				// if(temp[0].length<2){
				// 	buildingDateString += "0"+temp[0];
				// } else {
				// 	buildingDateString += temp[0];
				// }
				// setDob(buildingDateString);
				// response.data.dateOfBirth = buildingDateString;
				setDob(response.data.dateOfBirth);
				setMute(response.data.mute);
				
				// setSettings(response.data);
			}).catch(function(err){
				console.log(err);
			});

		},[]
	)

	return (
		<div className=''>
			<div style={{display:'flex', justifyContent:"left", padding:"2rem"}}>
				<h1>Settings</h1>
			</div>
			<div className="settingStyle">
				<Form onSubmit={(e)=>{e.preventDefault(); handleFormSubmit({email,dob,oldPass,newPass,mute})}}>
					<Form.Row>
						<Form.Label column="lg" lg={3}>
							Email
						</Form.Label>
						<Col>
							<Form.Control size="lg" type="text" name="email" defaultValue={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
						</Col>
					</Form.Row>
					
					<Form.Row>
						<Form.Label column="lg" lg={3}>
							Date of Birth
						</Form.Label>
						<Col>
							<Form.Control size="lg" type="date" defaultValue={dob} placeholder="MM-DD-YYYY" name="dateOfBirth" onChange={(e)=>{
								// console.log(e.target.value);
								e.preventDefault();
								setDob(e.target.value);
							}} id="newDOB"/>
						</Col>
					</Form.Row>
				
					<Form.Row>
						<Form.Label column="lg" lg={3}>
							Password Reset
						</Form.Label>
						<Col>
							<Form.Control size="lg" type="password" placeholder="Old Password" name="oldPassword" onChange={(e)=>{setOldPass(e.target.value)}}/>
						</Col>
						<Col>
							<Form.Control size="lg" type="password" placeholder="New Password" name="newPassword" onChange={(e)=>{setNewPass(e.target.value)}}/>
						</Col>
					</Form.Row>
					
					<Form.Row>
						<Form.Label column="lg" lg={3}>
							Toggle Mute
						</Form.Label>
						<input className='largeCheckbox' type="checkbox" checked={mute} onChange={(e)=>{
							// e.preventDefault();
							console.log(e.target.checked);
							setMute(e.target.checked);
							}} name="mute" id="checkbox"/>
					</Form.Row>
					
					<Form.Row>
						<Col>
							<Button size="lg" varient="danger" onClick={()=> {window.location.reload();}}>Cancel Changes</Button>
						</Col>
						<Col>
							<Button type="submit" size="lg" varient="primary">Submit Changes</Button>
						</Col>
					</Form.Row>
				</Form>
			</div>
		</div>
	);
}

const handleFormSubmit = (formOptions)=>{
	console.log(formOptions);
	axios_instance({
		method: 'post',
		url:"setting/",
		data:{
			email:formOptions.email,
			dateOfBirth:formOptions.dob,
			oldPassword:formOptions.oldPass,
			newPassword:formOptions.newPass,
			mute:formOptions.mute
		}
	}).then(function(response){
		console.log("Updated Successfully");
		if(!alert("Updated Successfully")){
			window.location.reload();
		}
	}).catch(function(error){
		// console.log(error);
		if(!alert("Error please enter the correct old password")){
			window.location.reload();
		}
	});
}


export default Setting;