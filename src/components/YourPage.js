import React,{Component} from 'react';
import './ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from './SearchBox';
import PlatformList from './PlatformList';
import axios from 'axios';
const search_url="http://localhost:3000/search";
class YourPage extends Component{
	constructor(props){
		super();
		this.state={
			platforms:[],
			searchfield:''
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
	render(){
		const{platforms,searchfield}=this.state;
		const filteredPlatforms=platforms.filter(platform=>{
			return platform.platformName.toLowerCase().includes(searchfield.toLowerCase());
		})
		return(
			<div className='yourPageStyle'>
				<h1>Your Page</h1>
				<SearchBox searchChange={this.onSearchChange}/>
			    {/*<SearchBox searchChange={this.onSearchChange}/>*/}
			    <PlatformList platforms={filteredPlatforms}/>
			</div>
		);
	}
}

export default YourPage;