import React, { useEffect} from 'react';
import '../ComponentStyle.css';
import axios_instance from '../axios_instance.js';
import getUserPlatformInfo from './PlatformHelper.js';

const ModuleDecision=({username, isSignedIn, isEdit, platformName, 
	setModuleId, moduleName, platformId, moduleId,
	setPageName, setPageId, setPageEntry})=>{

	useEffect(
        ()=>{
			let calls = [];
			calls.push(getUserPlatformInfo(username, isSignedIn, platformId));
			calls.push(
				axios_instance({
					method: 'get',
					url: "page/" + platformId + "/" + moduleId,
				})
			);
			calls.push(
				axios_instance({
					method: 'get',
					url: "platform/" + platformId,
				})
			);
			Promise.all(calls).then((values)=>
			{
				let info = values[0].data;
				let pages = values[1].data;
				let cur_platform = values[2].data;

				let good = true;
				for(let i = 0; i < cur_platform.modules.length; i++){
					let cur_module = cur_platform.modules[i];
					if (!(cur_module._id === moduleId))
						continue;
					// if without lockedby value, set it unlock
					if(cur_module.lockedby.length===0){
						break;
					}else{
						// check user whether meet unlock condition
						let checkUnlock;
						for(let j=0;j<cur_module.lockedby.length;j++){
							checkUnlock = info.completeId.includes(cur_module.lockedby[j]);
							if(!checkUnlock){
								good = false;
								break;
							}
						}
						if(!good){
							break;
						}
					}
				}

				if (!good)
				{
					alert("You've entered a locked Module!");
					setModuleId("");
					return;
				}
				
				let choice = -1;
				let count = 1;
				pages.forEach( (item, index)=> 
				{

					if (item.entry === false)
						return;
					if (info.completeId.includes(item._id))
						return;

					if (choice === -1 || item.rank === pages[choice].rank)
					{
						//let's use a streaming algorithm to decide which to pick
						if (1.0/count >= Math.random())
						{
							choice = index;
						}
						count++;
					}
					else if (item.rank < pages[choice].rank)
					{
						count = 1;
						choice = index;
					}
				} );
				if(choice === -1)
				{
					alert("Module Done!");
					setModuleId("");
				}
				else
				{;
					setPageName(pages[choice].pageName)
					setPageId(pages[choice]._id)
					setPageEntry(pages[choice]._id)
				}
			})
			.catch(err=>{
				console.log(err);
				setModuleId("");
			});
        },[username, platformId, moduleId, isSignedIn]
    );

	return(
		<div className="">Routing...</div>
	);
}

export default ModuleDecision;
