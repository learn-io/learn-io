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
            
        }).catch(function(err){
            console.log(err);
            console.log(err.response);
        });
        props.setIsSignedIn(false);
        props.setIsAdmin(false);
        history.push('/home');
    })
	return (
        <dir>
            Logging out...
        </dir>
    )
}

export default LogoutController;