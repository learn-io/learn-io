import React from 'react';
import './ComponentStyle.css';

const Register=({onRouteChange})=>{
	return (
		<div className='signinStyle'>
			<div className='pa2'>
				<label className='signinLabel'>Username</label>
				<input  className='signinInput' type="text" placeholder='Username' name="username"  id="username"/>
			</div>
		    <div className='pa2'>
		    	<label className='signinLabel'>Email</label>
		    	<input className='signinInput' type="email" placeholder='Email' name="email-address"  id="email-address"/>
		    </div>
		    <div className='pa2'>
		    	<label className='signinLabel'>Password</label>
		    	<input className='signinInput' type="password" placeholder='Password' name="password"  id="password"/>
		    </div>
		    <div className='pa2'>
		    	<div>
		    		<label className='signinLabel'>Confirm Password</label>
		    	</div>
		    	<input className='signinInput' type="password" placeholder='Confirm Password' name="confirmPassword"  id="confirmPassword"/>
		    </div>
		    <div className='pa2'>
		    	<label className='signinLabel'>Date of Birth</label>
		    	<input className='signinInput' type="date" placeholder='MM-DD-YYYY' name="DOB"  id="DOB"/>
		    </div>
		    <div>
		      <input onClick={()=>onRouteChange('signin')} className='buttonStyle' style={{marginRight: '10px'}} type="button" value="Back"/>
		      <input className='buttonStyle' type="button" value="Register"/>
		    </div>
		</div>
	);
}
export default Register;