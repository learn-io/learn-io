import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import axios_instance from './axios_instance.js';
import './ComponentStyle.css';

const LogoutController = (props) =>{
    const history = useHistory();
	useEffect(()=>{
        axios_instance({
            method: 'post',
            url: "signout",
        }).then(function(response){
            props.setIsPendingRefresh(true);
        }).catch(function(err){
            console.log(err);
            console.log(err.response);
        });
        history.push('/home');
    })
	return (
        <dir className="splashStyle">
            Logging out...
        </dir>
    )
}

export default LogoutController;