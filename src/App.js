import React,{Component} from 'react';
import PlatformList from './components/PlatformList';
import SearchBox from './components/SearchBox';
import {platforms} from './platforms';
import Menus from './components/Menus';
import Signin from './components/Signin';
import Register from './components/Register';
import Setting from './components/Setting';
import './App.css'

class App extends Component{
	constructor(){
		super();
		this.state={
			platforms:[],
			searchfield:'',
			route:'home',
			menusClick:false,
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
	onRouteChange=(route)=>{
		if(route==='signin'){
			this.setState({menusClick:true});
		}else if(route==='register'){
			this.setState({menusClick:true});
		}else{
			this.setState({menusClick:false});
		}
		this.setState({route:route});
	}
	render(){
		const{platforms,searchfield,isSignedIn,isAdmin,menusClick,route}=this.state;
		const filteredPlatforms=platforms.filter(platform=>{
			return platform.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		if(!platforms.length){
			return(<h1 className='splashStyle'>Loading</h1>);
		}else if(menusClick&&route==='signin'){
			return(
				<div className='appStyle'>
					<Menus onRouteChange={this.onRouteChange} route={route} menusClick={menusClick} isSignedIn={isSignedIn} isAdmin={isAdmin}/>
					<Signin onRouteChange={this.onRouteChange}/>
					<SearchBox searchChange={this.onSearchChange}/>
		  			<PlatformList platforms={filteredPlatforms}/>
		  		</div>
			);
		}else if(menusClick&&route==='register'){
			return(
				<div className='appStyle'>
					<Menus onRouteChange={this.onRouteChange} route={route} menusClick={menusClick} isSignedIn={isSignedIn} isAdmin={isAdmin}/>
					<Register onRouteChange={this.onRouteChange}/>
					<SearchBox searchChange={this.onSearchChange}/>
		  			<PlatformList platforms={filteredPlatforms}/>
		  		</div>
			);
		}else if(route==='setting'){
			return(
				<div className='appStyle'>
					<Menus onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} isAdmin={isAdmin}/>
					<Setting />
		  		</div>
			);
		}else{
			return(
				<div className='appStyle'>
					<Menus onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} isAdmin={isAdmin}/>
					<SearchBox searchChange={this.onSearchChange}/>
		  			<PlatformList platforms={filteredPlatforms}/>
		  		</div>
			);
		}
	}
	
}
export default App;