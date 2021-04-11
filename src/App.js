import React,{Component} from 'react';
import PlatformList from './components/PlatformList';
import SearchBox from './components/SearchBox';
import Menus from './components/Menus';
import Signin from './components/Signin';
import Register from './components/Register';
import Setting from './components/Setting';
import YourPage from './components/YourPage';
import './App.css'

const platform_url="http://localhost:3000/platform";
// const widgets_url="http://localhost:3000/widgets";
// const media_url="http://localhost:3000/media";
// const register_url="http://localhost:3000/register";
// const page_url="http://localhost:3000/page";

class App extends Component{
	constructor(){
		super();
		this.state={
			platforms:[],
			searchfield:'',
			route:'home',
			menusClick:false,
			isSignedIn:true,
			isAdmin:false
		}
	}
	componentDidMount(){
		// loading platforms value from database
		// this.setState({platforms:platforms});
		fetch(platform_url,{
	        method:'get'
	      })
	      .then(response=>response.json())
	      .then(response=> {
	        this.setState({platforms:response});
	      })
	      .catch(err=>console.log(err));

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
	
}
export default App;