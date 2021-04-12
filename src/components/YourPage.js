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

export default YourPage;