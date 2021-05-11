import axios_instance from './axios_instance.js';
import React, { useEffect, useState } from 'react';
import './ComponentStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import plusIcon from './images/plus.png';
import {Dropdown} from 'react-bootstrap';
import PreviousButton from './components/PreviousButton';
import NextButton from './components/NextButton';
import SearchBox from './components/SearchBox';
import ConfirmBox from './components/ConfirmBox';
import DeletePlatformList from './components/DeletePlatformList';
import DeleteConfirmBox from './components/DeleteConfirmBox';

import {useHistory} from 'react-router-dom';

const Route = require("react-router-dom").Route;
const Redirect = require("react-router-dom").Redirect;
const Switch = require("react-router-dom").Switch;
const {Button, Table} = require("react-bootstrap");

const AdminController = (props) =>{
	return (
		<Switch>
			<Route path="/admin/users">
				<AdminUserController isSignedIn={props.isSignedIn} isAdmin={props.isAdmin}/>
			</Route>
			<Route path="/admin/platforms">
				<AdminPlatformController isSignedIn={props.isSignedIn} isAdmin={props.isAdmin}/>
			</Route>
			<Route path="/">
				<Redirect to="/admin/platforms" />
			</Route>
		</Switch>
	)
}


const AdminUserController = (props) =>{
	const [users, setUsers] = useState([]);
	const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [nextUser, setNextUser] = useState(false);
    const [save,setSave]=useState(0);

	const history = useHistory();

    useEffect(
        ()=>{
        	let queryText = text
            if (text.length < 2)
				queryText = ' '
			if (limit < 1)
                return;
            axios_instance({
                method: 'get',
                url: "search/users/"+queryText+"/"+skip+"/"+(limit+1)
            }).then(function(response){
            	if(response.data.length===(limit+1)){
            		response.data.pop();
            		setNextUser(true);
            	}else{
            		setNextUser(false);
            	}
                setUsers(response.data);
            }).catch(function(err){
                console.log(err);
            });
        },[text, skip, limit,save]
    );

	const onSearch=(value)=>{
    	setText(value);
    	setSkip(0);
    }
	const onDeleteUser=(username)=>{
		axios_instance({
            method: 'post',
            url: "admin/users/delete",
            data: {
                username: username
            }
        })
        .then((res)=>{
        	setSave(save+1);
	    })
	    .catch(err=>console.log(err));
	}

	const onChangeLimit=(value)=>{
    	setLimit(value);
		setSkip(0);
    }

	if(props.isSignedIn){
		return (
		    <div className='appStyle'>
		    	<div style={{display:'flex',justifyContent: 'space-between',paddingTop:'1rem'}}>
			    	<h1>All Users</h1>
			    	<button className='deleteButton'><img src={plusIcon} height='50px' width='50px' alt="plus"/></button>
		    	</div>
		        <SearchBox onSearchPlatform={onSearch}/> 
				<div>
					<Button className="adminItem" onClick={()=>{history.push("/admin/platforms");}}> Switch To Platforms </Button>
					{' '}
					<Dropdown className="adminItem">
						<Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
							Users per page: {limit}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={()=>{onChangeLimit(10)}}>10</Dropdown.Item>
							<Dropdown.Item onClick={()=>{onChangeLimit(15)}}>15</Dropdown.Item>
							<Dropdown.Item onClick={()=>{onChangeLimit(20)}}>20</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
		        <DeleteUserList users={users} onDeleteUser={onDeleteUser}/>
		        <PreviousButton limit={limit} skip={skip} setSkip={setSkip} />
	        	<NextButton limit={limit} nextPlatforms={nextUser} skip={skip} setSkip={setSkip}/>
		    </div>
	    )
	}else{
		return (<h1>You must log in first!!!</h1>);
	}
    
}


const AdminPlatformController = (props) =>{
	const [platforms, setPlatforms] = useState([]);
	const [text, setText] = useState("");
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [deletePlatform, setDeletePlatform]=useState("");
    const [nextPlatforms, setNextPlatforms] = useState(false);
    const [selectPlatform, setSelectPlatform] = useState("");
    const [save,setSave]=useState(0);

	const history = useHistory();

    useEffect(
        ()=>{
        	let queryText = text
            if (text.length < 2)
				queryText = ' '
			if (limit < 1)
                return;
            axios_instance({
                method: 'get',
                url: "search/platforms/all/"+queryText+"/"+skip+"/"+(limit+1)
            }).then(function(response){
            	if(response.data.length===(limit+1)){
            		response.data.pop();
            		setNextPlatforms(true);
            	}else{
            		setNextPlatforms(false);
            	}
                setPlatforms(response.data);
            }).catch(function(err){
                console.log(err);
            });
        },[text, skip, limit,save,props.username]
    );

	const onSearchPlatform=(value)=>{
    	setText(value);
    	setSkip(0);
    }
	const onDeletePlatform=(platform)=>{
		axios_instance({
            method: 'post',
            url: "platform/deletePlatform",
            data: {
                _id: platform._id
            }
        })
        .then((res)=>{
        	let filter = platforms.filter(item => item !== platform)
        	setPlatforms(filter);
        	setDeletePlatform('');
        	setSave(save+1);
	    })
	    .catch(err=>console.log(err));
	}

	const onChangeLimit=(value)=>{
    	setLimit(value);
    	setSkip(0);
    }

	if(props.isSignedIn){
		return (
		    <div className='appStyle'>
		    	<div style={{display:'flex',justifyContent: 'space-between',paddingTop:'1rem'}}>
			    	<h1>All Pages</h1>
			    	<button className='deleteButton'><img src={plusIcon} height='50px' width='50px' alt="plus"/></button>
		    	</div>
				<SearchBox onSearchPlatform={onSearchPlatform} /> 
				<div>
					<Button className="adminItem" onClick={()=>{history.push("/admin/users");}}> Switch To Users </Button>
					{' '}
					<Dropdown className="adminItem">
						<Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
							Platforms per page: {limit}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={()=>{onChangeLimit(10)}}>10</Dropdown.Item>
							<Dropdown.Item onClick={()=>{onChangeLimit(15)}}>15</Dropdown.Item>
							<Dropdown.Item onClick={()=>{onChangeLimit(20)}}>20</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
		        <DeletePlatformList platforms={platforms} setDeletePlatform={setDeletePlatform} setSelectPlatform={setSelectPlatform}/>
		        <DeleteConfirmBox deletePlatform={deletePlatform} onDeletePlatform={onDeletePlatform} setDeletePlatform={setDeletePlatform}/>
		        <ConfirmBox username={props.username} selectPlatform={selectPlatform} setSelectPlatform={setSelectPlatform} setSave={setSave} save={save}/>
		        <PreviousButton limit={limit} skip={skip} setSkip={setSkip} />
	        	<NextButton limit={limit} nextPlatforms={nextPlatforms} skip={skip} setSkip={setSkip}/>
		    </div>
	    )
	}else{
		return (<h1>You must log in first!!!</h1>);
	}
    
}

const DeleteUserList = ({users, onDeleteUser}) =>
{
	const [select, setSelect] = useState('');
	let confirmBox;
	if(select !== '')
	{
		confirmBox = <DeleteUserConfirmBox username={select} onDeleteUser={onDeleteUser} setSelect={setSelect}/>
	}
	else
	{
		confirmBox = ""
	}
	return(
		<>
		<br/>
		<Table striped bordered hover variant="dark">
			<thead>
				<tr>
					<th>Username</th>
					<th>Email</th>
					<th>Birthdate</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>	
			{
				users.map((x,i) => {
					return (
						<UserLine key={i} user={x} onDeleteUser={onDeleteUser} setSelect={setSelect} />
					);
				})
			}
			</tbody>
		</Table>
		{confirmBox}
		</>
	);
}

const UserLine = ({user, setSelect}) =>
{
	const history = useHistory();
	return (
	<tr>
		<td>{user.username}</td>
		<td>{user.email}</td>
		<td>{user.dateOfBirth}</td>
		<td>
			<Button variant="primary" onClick={()=>{history.push("/profile/"+user.username);}}> View </Button>
			{' '}
			<Button variant="danger" onClick={()=>{setSelect(user.username);}}> Delete </Button>
		</td>
	</tr>);
}

const DeleteUserConfirmBox = ( {username, onDeleteUser, setSelect} ) =>
{
	return (
		<section id="overlay">
		<div className='overlayStyle'>
			<div className='deleteConfirm'>
				<h2>Are you sure you want to delete</h2>
				<h2>"{username}"?</h2>
				<button className='deleteButtonStyle' onClick={()=>{onDeleteUser(username);setSelect('');}}>Yes</button>
				<button className='deleteButtonStyle' onClick={()=>setSelect('')}>No</button>
			</div>
		</div>
		</section>
	);
}


export default AdminController;