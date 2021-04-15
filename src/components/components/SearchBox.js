import React from 'react';
import '../ComponentStyle.css';

const SearchBox =({text, onSearchPlatform})=>{
	return (
		<div className='pa'>
			<input 
				className='searchBoxStyle'
				type='search'
                value={text}
				placeholder='Search platform'
				onChange={(e)=>{onSearchPlatform(e.target.value)}}
			/>
		</div>
	);
}

export default SearchBox;