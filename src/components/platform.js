import React from 'react';
import './ComponentStyle.css';
// import axios_instance from './axios_instance';
import ModuleView from './components/ModuleView.js'

const Switch = require("react-router-dom").Switch;
const Route = require("react-router-dom").Route;
const Redirect = require("react-router-dom").Redirect;

const PlatformController=()=>{

    return (
        <Switch>
            <Route path="/play/platform/:platformId">
                <ModuleView/>
            </Route>
            <Route path="/play/:platform/:module">
                <ModuleView/>
            </Route>
            <Route path="/play/:platform/:module/:page">
                <ModuleView/>
            </Route>
            <Route path="/">
				<Redirect to="/home" />
			</Route>
        </Switch>
    );
};



export default PlatformController;