import React,{useEffect, useState} from 'react';
import './ComponentStyle.css';
// import axios from 'axios';
import deleteIcon from './images/delete.png';
import plusIcon from './images/plus.png';
import axios_instance from './axios_instance.js';
// const deleteplat_url = "http://localhost:3000/platform/deletePlatform";
// const target_url="http://localhost:3000/search/platforms";


const YourPagesController = (props) =>{
	const [platforms, setPlatforms] = useState([]);
	const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [deletePlatform, setDeletePlatform]=useState("");
    const [nextPlatforms, setNextPlatforms] = useState([])

    useEffect(
        ()=>{
        	// props.username
        	let queryText = text
            if (text.length < 2)
				queryText = ' '
			if (limit < 1)
                return;
            axios_instance({
                method: 'get',
                url: "search/platforms/admin/"+queryText+"/"+skip+"/"+limit
            }).then(function(response){
                setPlatforms(response.data);
            }).catch(function(err){
                console.log(err);
            });
            axios_instance({
                method: 'get',
                url: "search/platforms/admin/"+queryText+"/"+(skip+10)+"/"+limit
            }).then(function(response){
                setNextPlatforms(response.data);
            }).catch(function(err){
                console.log(err);
            });
        },[text, skip, limit,platforms]
    );

    const onChangeDelete=(platform)=>{
		if(platform!==''){
			setDeletePlatform(platform);
		}else{
			setDeletePlatform('');
		}
	}

	const onDeletePlatform=(platform)=>{
		// axios_instance({
  //           method: 'post',
  //           url: "platform/deletePlatform",
  //           data: {
  //               _id: platform._id
  //           }
  //       })
  //       .then((res)=>{
  //       	let filter = platforms.filter(item => item !== platform)
  //       	setPlatforms(filter);
  //       	setDeletePlatform('');
	 //    })
	 //    .catch(err=>console.log(err));
		axios_instance({
            method: 'post',
            url: "platform/deletePlatform",
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
		    	<h1>Your Pages</h1>
		    	<button className='deleteButton'><img src={plusIcon} height='50px' width='50px' alt="plus"/></button>
	    	</div>
	        <SearchBox setText={setText}/>
	        <DeletePlatformList platforms={platforms} onChangeDelete={onChangeDelete}/>
	        <DeleteConfirmBox deletePlatform={deletePlatform} onDeletePlatform={onDeletePlatform} onChangeDelete={onChangeDelete}/>
	        <PreviousButton skip={skip} setSkip={setSkip} />
        	<NextButton nextPlatforms={nextPlatforms} skip={skip} setSkip={setSkip}/>
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

const PreviousButton=(props)=>{
	if(props.skip===0){
		return(
			<button disabled style={{color:'grey'}} className='homeButton'>Previous</button>
		);
	}else{
		return(
			<button className='homeButton' onClick={()=>{props.setSkip(props.skip-10)}}>Previous</button>
		);
	}
	
}

const NextButton=(props)=>{
	if(props.nextPlatforms.length===0){
		return(
			<button disabled style={{color:'grey'}} className='homeButton'>Next</button>
		);
	}else{
		return(
			<button className='homeButton' onClick={()=>{props.setSkip(props.skip+10)}}>Next</button>
		);
	}
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
					<h2>"{deletePlatform.platformName}"?</h2>
					<button className='deleteButtonStyle' onClick={()=>onDeletePlatform(deletePlatform)}>Yes</button>
					<button className='deleteButtonStyle' onClick={()=>onChangeDelete('')}>No</button>
				</div>
			</div>
		</section>
	);
}

export default YourPagesController;