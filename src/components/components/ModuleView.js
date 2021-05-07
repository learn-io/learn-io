import React, { useEffect,useState} from 'react';
import '../ComponentStyle.css';
import ModuleList from './ModuleList.js'
import axios_instance from '../axios_instance.js';
import ModuleConfirmBox from './ModuleConfirmBox.js';

const ModuleView=({username, isSignedIn, isEdit, platform, setPlatform, userPlatformInfo, setUserPlatformInfo, platformId, platformName, setPlatformName, 
	setModuleName, setModuleId, dragging, setDragging, editMode, setEditMode})=>{

	const [selectedModule, setSelectedModule] = useState("");
	const [save, setSave]= useState(0);
	const [selectedDisable, setSelectedDisable] = useState("");
	useEffect(
        ()=>{
			//todo: savealls
        	axios_instance({
		        method: 'get',
		        url: "platform/"+platformId
		    }).then(function(response){
		    	setPlatform(response.data);
				setPlatformName(response.data.platformName)
				//console.log(response.data);
		    }).catch(function(err){
		        console.log(err);
		    });
        },[platformId, username, setPlatform, setPlatformName, save]
    );

	const moveModuleTo = (moduleId, x, y) => 
	{
		if (platform.modules[moduleId] === undefined)
			return;
		platform.modules[moduleId].x = x;
		platform.modules[moduleId].y = y;
		return;
	}

	const hasConnection = (sourceIndex, endIndex) =>
	{
		let index1 = platform.modules[sourceIndex].unlocks.indexOf(platform.modules[endIndex]._id)
		let index2 = platform.modules[endIndex].lockedby.indexOf(platform.modules[sourceIndex]._id)
		return index1 !== -1 || index2 !== -1;
	}

	const toggleConnection = (sourceIndex, endIndex) =>
	{
		//console.log("complete " + sourceIndex + " before " + endIndex);
		if (sourceIndex === -1 || endIndex === -1)
			return;

		let sourceMod = platform.modules[sourceIndex];
		let endMod = platform.modules[endIndex];
		if (hasConnection(sourceIndex, endIndex))
		{

		}
		else if (hasConnection(endIndex, sourceIndex))
		{
			endMod = platform.modules[sourceIndex];
			sourceMod = platform.modules[endIndex];
		}
		else
		{
			sourceMod.unlocks.push(endMod._id);
			endMod.lockedby.push(sourceMod._id);
			return;
		}
		
		let index = sourceMod.unlocks.indexOf(endMod._id);
		if (index !== -1)
		{
			sourceMod.unlocks.splice(index, 1);
		}
		index = endMod.lockedby.indexOf(sourceMod._id);
		if (index !== -1)
		{
			endMod.lockedby.splice(index, 1);
		}
		return;
	}

	// console.log("platform ModuleView");
	// console.log(userPlatformInfo);
	// console.log(platform);
    if(platform===undefined || platform.modules===undefined){
        return (<h2 style={{color:'white'}}>{platformName}</h2>);
    }else{
        return(
            <>
				<h2 style={{color:'white'}}>{platformName}</h2>
				<ModuleList dragging={dragging} setDragging={setDragging} platform={platform} 
				toggleConnection = {toggleConnection} isEdit={isEdit} moveModuleTo={moveModuleTo} 
				modules={platform.modules} setSelectedModule={setSelectedModule} userPlatformInfo={userPlatformInfo} 
				setSelectedDisable={setSelectedDisable} platformId={platformId} setSave={setSave}
				editMode={editMode} setEditMode={setEditMode}/>
				<ModuleConfirmBox username={username} platform={platform} selectedModule={selectedModule} setSelectedModule={setSelectedModule} 
				save={save} setSave={setSave} setModuleName={setModuleName} setModuleId={setModuleId} selectedDisable={selectedDisable}/>
            </>
	    );
    }
}

export default ModuleView;
