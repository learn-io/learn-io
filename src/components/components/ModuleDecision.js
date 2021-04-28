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
			Promise.all(calls).then((values)=>
			{
				let info = values[0].data;
				let pages = values[1].data;
				
				let choice = -1;
				let count = 1;
				pages.forEach( (item, index)=> 
				{

					if (item.entry === false)
						return;
					if (info.completeId.includes(item._id))
						return;

					if (item.rank === pages[choice].rank)
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
					history.push("/play/platform/"+platform);
				}
				else
				{
					//history.push("/play/"+platform+"/"+module+"/"+pages[choice]._id)
					history.push("/play/"+platform+"/"+module+"/"+ encodeURIComponent(pages[choice].pageName))
				}
			})
			.catch(err=>{
				console.log(err);
				history.push("/play/platform/"+platform);
			});
        },[username, platform, module, isSignedIn]
    );

	return(
		<div className="">Routing...</div>
	);
}

export default ModuleDecision;
