import React from 'react';
import './ComponentStyle.css';
const Signin=()=>{
	return (
		<div className='signinStyle'>
			<div className='pa2'>
				<label>Username:</label>
				<input  type="text" placeholder='Username' name="username"  id="username"/>
			</div>
		    <div className='pa2' style={{marginLeft: '4px'}}>
		    	<label htmlFor="password">Password:</label>
		    	<input type="password" placeholder='Password' name="password"  id="password"/>
		    </div>
		    <div>
		      <input className='buttonStyle' style={{marginRight: '10px'}} type="submit" value="Sign in"/>
		      <input className='buttonStyle' type="button" value="Register"/>
		    </div>
		</div>
	);
}
export default Signin;