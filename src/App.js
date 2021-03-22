import React,{Component} from 'react';
import PlatformList from './components/PlatformList';
import SearchBox from './components/SearchBox';
import {platforms} from './platforms';
import Menus from './components/Menus';
// import Signin from './components/Signin';
// import Register from './components/Register';
import './App.css'


class App extends Component{
	constructor(){
		super();
		this.state={
			platforms:[],
			searchfield:'',
			isSignedIn:false,
			isAdmin:false
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
		const{platforms,searchfield,isSignedIn,isAdmin}=this.state;
		const filteredPlatforms=platforms.filter(platform=>{
			return platform.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return !platforms.length ?
			<h1 className='splashStyle'>Loading</h1> :
			<div className='appStyle'>
				{/*<Signin/>*/}
				{/*<Register />*/}
				<Menus isSignedIn={isSignedIn} isAdmin={isAdmin}/>
				<SearchBox searchChange={this.onSearchChange}/>
	  			<PlatformList platforms={filteredPlatforms}/>
	  		</div>
	}
	
}
export default App;