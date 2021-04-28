import React from 'react';
import './ComponentStyle.css';
// import axios_instance from './axios_instance';
import ModuleView from './components/ModuleView.js'
import ModuleDecision from './components/ModuleDecision.js'
import GamePlay from './components/GamePlay.js'

const Switch = require("react-router-dom").Switch;
const Route = require("react-router-dom").Route;
const Redirect = require("react-router-dom").Redirect;

const PlatformController=({username, isSignedIn})=>{

    return (
        <Switch>
            <Route path="/play/platform/:platformId">
                <ModuleView username={username} isSignedIn={isSignedIn} isEdit={false}/>
            </Route>
            <Route path="/play/:platform/:module/:page">
                <GamePlay username={username} isSignedIn={isSignedIn} isEdit={false}/>
            </Route>
            <Route path="/play/:platform/:module">
                <ModuleDecision username={username} isSignedIn={isSignedIn} isEdit={false}/>
            </Route>
            <Route path="/">
				<Redirect to="/home" />
			</Route>
        </Switch>
    );
};



export default PlatformController;