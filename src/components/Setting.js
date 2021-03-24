import React from 'react';
import './ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Col} from 'react-bootstrap';
const Setting=()=>{
	return (
		<div className='settingStyle'>
			<h1>Setting</h1>
		    <Form.Group>
				<Form.Row>
			    	<Form.Label column="lg" lg={3} >
			    		Email
			    	</Form.Label>
				    <Col>
				    	<Form.Control size="lg" type="text" placeholder="Email" />
				    </Col>
			  	</Form.Row>
				<br />
			  	<Form.Row>
			    	<Form.Label column="lg" lg={3}>
			    		Date of Birth
			    	</Form.Label>
			    	<Col>
			      		<Form.Control size="lg" type="date" placeholder="MM-DD-YYYY" name="newDOB"  id="newDOB"/>
			    	</Col>
			  	</Form.Row>
			  	<br />
			  	<Form.Row>
			    	<Form.Label column="lg" lg={3}>
			      		Password Reset
			    	</Form.Label>
			    	<Col>
			      		<Form.Control size="lg" type="text" placeholder="Old Password" />
			    	</Col>
			    	<Col>
			      		<Form.Control size="lg" type="text" placeholder="New Password" />
			    	</Col>
			  	</Form.Row>
			  	<Form.Row>
			    	<Form.Label column="lg" lg={3}>
			      		Toggle Mute
			    	</Form.Label>
			    	<Col>
			      		<input className='largeCheckbox' type="checkbox" name="checkbox"  id="checkbox"/><br/>
			    	</Col>
			  	</Form.Row>
			</Form.Group>
		</div>
	);
}
export default Setting;