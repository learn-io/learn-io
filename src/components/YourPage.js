import React,{Component} from 'react';
import './ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from './SearchBox';
import DeleteConfirmBox from './DeleteConfirmBox';
import DeletePlatformList from './DeletePlatformList';
import axios from 'axios';
const search_url="http://localhost:3000/search";
const deleteplat_url = "http://localhost:3000/admin/platforms/delete"
class YourPage extends Component{
	constructor(props){
		super();
		this.state={
			platforms:[],
			searchfield:'',
			deleteConfirm:false,
			deletePlatform:''
		}
	}
	onSearchChange=(event)=>{
		this.setState({searchfield :event.target.value});
	}
	componentDidMount(){
		// loading platforms value from database
		axios.get(search_url+"/platforms/test")
	        .then((res)=>{
	        	this.setState({platforms:res.data});
	    	})
	    	.catch(err=>console.log(err));
		// fetch(search_url+"/platforms/test",{
	 //        method:'get'
	 //      })
	 //      .then(response=>response.json())
	 //      .then(response=> {
	 //        this.setState({platforms:response});
	 //      })
	 //      .catch(err=>console.log(err));

	}

	onChangeDelete=(platform,state)=>{
		if(state){
			this.setState({deleteConfirm:state});
			this.setState({deletePlatform:platform});
		}else{
			this.setState({deleteConfirm:state});
			this.setState({deletePlatform:''});
		}
		
	}
	onDeletePlatform=(platform)=>{
		axios({
            method: 'post',
            url: deleteplat_url,
            data: {
                _id: platform._id
            }
        })
        .then((res)=>{
        	let filter = this.state.platforms.filter(item => item !== platform)
   			this.setState({platforms: filter});
	        this.setState({deleteConfirm:false});
			this.setState({deletePlatform:''});
	    })
	    .catch(err=>console.log(err));
	}
	render(){
		const{platforms,searchfield,deleteConfirm,deletePlatform}=this.state;
		const filteredPlatforms=platforms.filter(platform=>{
			return platform.platformName.toLowerCase().includes(searchfield.toLowerCase());
		})
		if(deleteConfirm){
			return(
				<div className='yourPageStyle'>
					<h1>Your Page</h1>
					<SearchBox searchChange={this.onSearchChange}/>
				    <DeletePlatformList platforms={filteredPlatforms} onChangeDelete={this.onChangeDelete}/>
				    <DeleteConfirmBox deletePlatform={deletePlatform} onDeletePlatform={this.onDeletePlatform} onChangeDelete={this.onChangeDelete}/>
				</div>
			);
		}else{
			return(
				<div className='yourPageStyle'>
					<h1>Your Page</h1>
					<SearchBox searchChange={this.onSearchChange}/>
				    <DeletePlatformList platforms={filteredPlatforms} onChangeDelete={this.onChangeDelete}/>
				</div>
			);
		}
		
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

const DeleteConfirmBox=({deletePlatform,onDeletePlatform,onChangeDelete})=>{
	return (
		<section id="overlay">
			<div className='overlayStyle'>
				<div className='deleteConfirm'>
					<h2>Are you sure you want to delete</h2>
					<h2>"{deletePlatform.platformName}"?</h2>
					<button className='deleteButtonStyle' onClick={()=>onDeletePlatform(deletePlatform)}>Yes</button>
					<button className='deleteButtonStyle' onClick={()=>onChangeDelete('',false)}>No</button>
				</div>
			</div>
		</section>
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
							<button onClick={()=>onChangeDelete(platforms[i],true)} className='deleteButton'><img src={deleteIcon} height='40px' width='40px' alt="delete"/></button>
						</div>
					);
				})
			}
  		</div>
	);
}

export default YourPage;