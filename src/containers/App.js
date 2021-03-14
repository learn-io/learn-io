import React,{Component} from 'react';
import PlatformList from '../components/PlatformList';
import SearchBox from '../components/SearchBox';
import {platforms} from '../platforms';
import Menus from '../components/Menus';
import './App.css'


class App extends Component{
	constructor(){
		super();
		this.state={
			platforms:[],
			searchfield:''
		}
	}
	componentDidMount(){
		// loading platforms value from database
		this.setState({platforms:platforms});
	}
	onSearchChange=(event)=>{
		this.setState({searchfield :event.target.value});
	}
	render(){
		const{platforms,searchfield}=this.state;
		const filteredPlatforms=platforms.filter(platform=>{
			return platform.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return !platforms.length ?
			<h1 className='splashStyle'>Loading</h1> :
			<div className='appStyle'>
				<Menus/>
				<SearchBox searchChange={this.onSearchChange}/>
	  			<PlatformList platforms={filteredPlatforms}/>
	  		</div>
	}
	
}
export default App;