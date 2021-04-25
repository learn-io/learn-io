import React from 'react';
import './ComponentStyle.css';
// import axios_instance from './axios_instance';
import ModuleView from './components/ModuleView.js'
import GamePlay from './components/GamePlay.js'

const Switch = require("react-router-dom").Switch;
const Route = require("react-router-dom").Route;
const Redirect = require("react-router-dom").Redirect;

const PlatformController=({username})=>{

    return (
        <Switch>
            <Route path="/play/platform/:platformId">
                <ModuleView username={username}/>
            </Route>
            <Route path="/play/:platform/:module">
                <GamePlay username={username}/>
            </Route>
            <Route path="/play/:platform/:module/:page">
                <ModuleView username={username}/>
            </Route>
            <Route path="/">
				<Redirect to="/home" />
			</Route>
        </Switch>
    );
};



export default PlatformController;