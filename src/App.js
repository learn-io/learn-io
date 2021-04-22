import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import './App.css'
import axios_instance from './components/axios_instance.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import MenuController from "./components/Menus";
import HomeController from "./components/home";
import LogoutController from "./components/logout";
import YourPagesController from "./components/YourPage";
import AdminController from "./components/admin"; 
import PlatformController from "./components/platform"; 
import SettingsController from "./components/Setting";
import ProfileController from "./components/Profile";

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
	const [isPendingRefresh, setIsPendingRefresh] = useState(true);
	const [isSplash, setIsSplash] = useState(true);

	const [isSignedIn, setIsSignedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [username, setUsername] = useState(null);

	const [globalError, setGlobalError] = useState("");

	useEffect(
        ()=>{
			if (!isPendingRefresh)
				return;
			axios_instance({
                method: 'get',
                url: "signin/whoami"
            }).then(function(response){
				console.log(response.data);
                setIsSignedIn(response.data[0] !== null);
				setUsername(response.data[0]);
                setIsAdmin(response.data[1]);
				setIsSplash(false);
				setIsPendingRefresh(false);
			}).catch(function(err){
                console.log(err);
				setIsPendingRefresh(false);
				setGlobalError("Unable to sync state with API");
				//setIsPendingRefresh(true);
            });
        },[isPendingRefresh]
    );

	if (globalError !== "")
	{
		return (<div className="errorStyle">{globalError}</div>)
	}

	if(isSplash)
	{
		return (<div className="splashStyle">Loading...</div>)
	}

	return (
	<div className="appStyle">
		<MenuController isSignedIn={isSignedIn} isAdmin={isAdmin} setIsPendingRefresh={setIsPendingRefresh}/>
		<Switch>

			<Route path="/logout">
				<LogoutController isSignedIn={isSignedIn} isAdmin={isAdmin} setIsPendingRefresh={setIsPendingRefresh}/>
			</Route>

			<Route path="/home">
				<HomeController isSignedIn={isSignedIn} username={username} />
			</Route>

			<Route path="/yourplatforms">
				<YourPagesController isSignedIn={isSignedIn} username={username}/>
			</Route>

			<Route path="/admin">
				<AdminController isSignedIn={isSignedIn} isAdmin={isAdmin}/>
			</Route>

			<Route path="/play">
				<PlatformController isSignedIn={isSignedIn} username={username}/>
			</Route>

			<Route path="/settings">
				<SettingsController isSignedIn={isSignedIn}/>
			</Route>

			<Route path="/profile">
				<ProfileController isSignedIn={isSignedIn}/>
			</Route>
			
			<Route path="/">
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
		}else if(route==='home'){
			window.location.reload();
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