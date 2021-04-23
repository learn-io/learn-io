import React from 'react';
import '../ComponentStyle.css';

const PreviousButton=(props)=>{
	let but;
	if(props.skip===0){
		but=<button disabled style={{color:'grey'}} className='paginationButtons'>Previous</button>
	}else{
		but=<button className='paginationButtons' onClick={()=>{props.setSkip(props.skip-props.limit)}}>Previous</button>
	}
	return but;
}

export default PreviousButton;