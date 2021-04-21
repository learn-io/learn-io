import React from 'react';
import './ComponentStyle.css';

import axios_instance from './axios_instance';
import ModuleView from './components/ModuleView.js'

const Switch = require("react-router-dom").Switch;
const Route = require("react-router-dom").Route;

const PlatformController=()=>{
    return (
        <Switch>
            <Route path="/:platform/:module/:page">
                <ModuleView/>
            </Route>
            <Route path="/:platform/:module">
                <ModuleView/>
            </Route>
            <Route path="/:platform">
                <ModuleView/>
            </Route>
        </Switch>
    );
};



export default PlatformController;