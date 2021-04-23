import React from 'react';
import '../ComponentStyle.css';

const NextButton=(props)=>{
	let but;
	if(props.nextPlatforms===false){
		but=<button disabled style={{color:'grey'}} className='paginationButtons'>Next</button>
	}else{
			but=<button className='paginationButtons' onClick={()=>{props.setSkip(props.skip+props.limit)}}>Next</button>
	}
	return but;
}

export default NextButton;