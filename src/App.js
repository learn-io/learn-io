import React, { useState } from 'react';
import { Redirect } from 'react-router';
import './App.css'

import MenuController from "./components/Menus";
import HomeController from "./components/home";
import YourPagesController from "./components/home";
import AdminController from "./components/home"; 
import PlatformController from "./components/home"; 
import SettingsController from "./components/home";
import ProfileController from "./components/home";

/*
import PlatformList from './components/PlatformList';
import SearchBox from './components/SearchBox';
import Menus from './components/Menus';
import Signin from './components/Signin';
import Register from './components/Register';
import Setting from './components/Setting';
import YourPage from './components/YourPage';
*/


const Switch = require("react-router-dom").Switch;
const Route = require("react-router-dom").Route;

function App(){
	const [isSignedIn, setIsSignedIn] = useState(true);
	const [isAdmin, setIsAdmin] = useState(true);

	return (
	<div>
		<MenuController isSignedIn={isSignedIn} isAdmin={isAdmin} setIsSignedIn={setIsSignedIn} setIsAdmin={setIsAdmin}/>
		<Switch>
			<Route path="/home">
				<HomeController isSignedIn={isSignedIn}/>
			</Route>

			<Route path="/yourpages">
				<YourPagesController isSignedIn={isSignedIn}/>
			</Route>

			<Route path="/admin">
				<AdminController isSignedIn={isSignedIn} isAdmin={isAdmin}/>
			</Route>

			<Route path="/platform">
				<PlatformController isSignedIn={isSignedIn}/>
			</Route>

			<Route path="/settings">
				<SettingsController isSignedIn={isSignedIn}/>
			</Route>

			<Route path="/profile">
				<ProfileController isSignedIn={isSignedIn}/>
			</Route>
			
			<Route exact path="/">
				<Redirect to="/home" />
			</Route>
		</Switch>
	</div>
	)
}



/*
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
        axios.get(platform_url)
	        .then((res)=>{
	        	this.setState({platforms:res.data});
	    	})
	    	.catch(err=>console.log(err));
		// fetch(platform_url,{
	 //        method:'get'
	 //      })
	 //      .then(response=>response.json())
	 //      .then(response=> {
	 //        this.setState({platforms:response});
	 //      })
	 //      .catch(err=>console.log(err));

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
			return platform.platformName.toLowerCase().includes(searchfield.toLowerCase());
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
		}else if(route==='yourpage'){
			return(
				<div className='appStyle'>
					<Menus onRouteChange={this.onRouteChange} route={route} menusClick={menusClick} isSignedIn={isSignedIn} isAdmin={isAdmin}/>
					<YourPage />
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
	
}*/
export default App;