import React, { useEffect} from 'react';
import '../ComponentStyle.css';
import axios_instance from '../axios_instance.js';
import getUserPlatformInfo from './PlatformHelper.js';

const ModuleDecision=({username, isSignedIn, isEdit, userPlatformInfo, platformName, 
	setModuleId, moduleName, platformId, moduleId,
	setPageName, setPageId, setPageEntry})=>{

	useEffect(
        ()=>{
			let calls = [];
			calls.push(
				axios_instance({
					method: 'get',
					url: "page/" + platformId + "/" + moduleId,
				})
			);
			Promise.all(calls).then((values)=>
			{
				let info = userPlatformInfo
				let pages = values[0].data;

				//now we select a page
				let choice = -1;
				let count = 1;
				let module_record = info.completeId.find(e => e.moduleId === moduleId);
				let entrypoints = module_record? module_record.entryPoints : undefined;
				pages.forEach( (item, index)=> 
				{
					//console.log(item);
					//only entry points can be server
					if (item.entry === false)
						return;
					//and only if we haven't completed them
					if (entrypoints && entrypoints.find(e => e.score > 0 && e.pageId === item._id))
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
