import React from 'react';
import '../ComponentStyle.css';

const PreviousButton=(props)=>{
	let but;
	if(props.skip===0){
		but=<button disabled style={{color:'grey'}} className='homeButton'>Previous</button>
	}else{
		but=<button className='homeButton' onClick={()=>{props.setSkip(props.skip-props.limit)}}>Previous</button>
	}
	return but;
}

export default PreviousButton;