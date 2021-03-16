import React from 'react';
import './ComponentStyle.css';
const Signin=()=>{
	return (
		<div className='signinStyle'>
			<div className='pa2'>
				<label className='signinLabel'>Username</label>
				<input  className='signinInput' type="text" placeholder='Username' name="username"  id="username"/>
			</div>
		    <div className='pa2'>
		    	<label className='signinLabel'>Password</label>
		    	<input className='signinInput' type="password" placeholder='Password' name="password"  id="password"/>
		    </div>
		    <div>
		      <input className='buttonStyle' style={{marginRight: '10px'}} type="submit" value="Sign in"/>
		      <input className='buttonStyle' type="button" value="Register"/>
		    </div>
		</div>
	);
}
export default Signin;