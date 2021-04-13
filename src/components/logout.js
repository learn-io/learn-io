import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './ComponentStyle.css';

const target_url="https://learn-io-api.herokuapp.com/"

const LogoutController = (props) =>{
    const history = useHistory();
	useEffect(()=>{
        axios({
            method: 'post',
            url: target_url+"signout",
        }).then(function(response){
            
        }).catch(function(err){
            console.log(err);
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