import React, { useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import '../ComponentStyle.css';
import axios_instance from '../axios_instance.js';
import getUserPlatformInfo from './PlatformHelper.js';

const ModuleDecision=({username, isSignedIn, isEdit})=>{
    let { platform, module } = useParams();
	const history = useHistory();

	useEffect(
        ()=>{
			if (!platform|| !module)
				return;
			let calls = [];
			calls.push(getUserPlatformInfo(username, isSignedIn, platform));
			calls.push(
				axios_instance({
					method: 'get',
					url: "page/" + platform + "/" + module,
				})
			);
			calls.push(
				axios_instance({
					method: 'get',
					url: "platform/" + platform,
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
					if (!(cur_module._id === module))
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
					history.goBack();
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
					history.goBack();
				}
				else
				{
					history.replace("/play/"+platform+"/"+module+"/"+pages[choice]._id)
					//history.replace("/play/"+platform+"/"+module+"/"+ encodeURIComponent(pages[choice].name))
				}
			})
			.catch(err=>{
				console.log(err);
				history.goBack();
			});
        },[username, platform, module, isSignedIn]
    );

	return(
		<div className="">Routing...</div>
	);
}

export default ModuleDecision;
