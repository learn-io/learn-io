import React,{useEffect, useState} from 'react';
import './ComponentStyle.css';
import axios from 'axios';
import deleteIcon from './images/delete.png';
import plusIcon from './images/plus.png';
const deleteplat_url = "http://localhost:3000/platform/deletePlatform";
const target_url="http://localhost:3000/search/platforms";


const YourPagesController = () =>{
	const [platforms, setPlatforms] = useState([]);
	const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [deletePlatform, setDeletePlatform]=useState("");

    useEffect(
        ()=>{
	        if (text.length < 1){
	     		axios({
	                method: 'get',
	                url: target_url+"/test/ /"+skip+"/"+limit
	            }).then(function(response){
	                setPlatforms(response.data);
	            }).catch(function(err){
	                console.log(err);
	            });
	        }else{
	        	if (limit < 1)
	                return;
	            axios({
	                method: 'get',
	                url: target_url+"/test/"+text+"/"+skip+"/"+limit
	            }).then(function(response){
	                setPlatforms(response.data);
	            }).catch(function(err){
	                console.log(err);
	            });
	        }
        },[text, skip, limit]
    );

    const onChangeDelete=(platform,state)=>{
		if(platform!==''){
			setDeletePlatform(platform);
		}else{
			setDeletePlatform('');
		}
	}

	const onDeletePlatform=(platform)=>{
		axios({
            method: 'post',
            url: deleteplat_url,
            data: {
                _id: platform._id
            }
        })
        .then((res)=>{
        	let filter = platforms.filter(item => item !== platform)
        	setPlatforms(filter);
        	setDeletePlatform('');
	    })
	    .catch(err=>console.log(err));
	}

    return (
	    <div className='appStyle'>
	    	<div style={{display:'flex',justifyContent: 'space-between',paddingTop:'1rem'}}>
		    	<h1>Your Page</h1>
		    	<button className='deleteButton'><img src={plusIcon} height='50px' width='50px' alt="plus"/></button>
	    	</div>
	        <SearchBox setText={setText}/>
	        <DeletePlatformList platforms={platforms} onChangeDelete={onChangeDelete}/>
	        {<DeleteConfirmBox deletePlatform={deletePlatform} onDeletePlatform={onDeletePlatform} onChangeDelete={onChangeDelete}/>}
	    </div>
    )
}



const SearchBox =({text, setText})=>{
	return (
		<div className='pa'>
			<input 
				className='searchBoxStyle'
				type='search'
                value={text}
				placeholder='Search platform'
				onChange={(e)=>{setText(e.target.value)}}
			/>
		</div>
	);
}

const Platform =({name})=>{
	return(
		<div className='platformStyle grow'>
			<img alt='platformImage' src={`https://robohash.org/${name}?200x200`}/>
			<div>
				<h4>{name}</h4>
			</div>
		</div>
	);
}

const DeletePlatformList=({platforms, onChangeDelete})=>{
	return(
		// loop for all platforms
		<div >
  			{
  				platforms.map((user,i)=>{
					return (
						<div className='deleteList' key={i} >
							<Platform name={platforms[i].platformName}/>
							<button onClick={()=>onChangeDelete(platforms[i])} className='deleteButton'><img src={deleteIcon} height='40px' width='40px' alt="delete"/></button>
						</div>
					);
				})
			}
  		</div>
	);
}

const DeleteConfirmBox=({deletePlatform,onDeletePlatform,onChangeDelete})=>{
	if(deletePlatform==='') return null
	return (
		<section id="overlay">
			<div className='overlayStyle'>
				<div className='deleteConfirm'>
					<h2>Are you sure you want to delete</h2>
					{<h2>"{deletePlatform.platformName}"?</h2>}
					<button className='deleteButtonStyle' onClick={()=>onDeletePlatform(deletePlatform)}>Yes</button>
					<button className='deleteButtonStyle' onClick={()=>onChangeDelete('')}>No</button>
				</div>
			</div>
		</section>
	);
}

export default YourPagesController;