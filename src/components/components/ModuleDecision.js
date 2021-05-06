import React, { useState, useEffect} from 'react';
import '../ComponentStyle.css';
import axios_instance from '../axios_instance.js';
import {Row, Col} from 'react-bootstrap';
import deleteIcon from '../images/delete.png';
import saveIcon from '../images/save.png';
import RGL, { WidthProvider } from "react-grid-layout";
import Page from './Page.js';

const ReactGridLayout = WidthProvider(RGL);

const ModuleDecision=({username, isSignedIn, isEdit, userPlatformInfo, platformName, 
	setModuleId, moduleName, platformId, moduleId,
	setPageName, setPageId, setPageEntry})=>{

	const [layout, setLayout] = useState([]);
	const [pages, setPages] = useState([]);

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
				console.log("pages")
				console.log(pages)

				if(isEdit){
					setPages(pages);
				} else {
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
				}
			})
			.catch(err=>{
				console.log(err);
				setModuleId("");
			});
        },[username, platformId, moduleId, isSignedIn, setModuleId, setPageEntry, setPageId, setPageName, userPlatformInfo]
    );
	if(isEdit){
		return (	
			<div className="platformContainer">
				<div className="leftbar"/>

				<div className="content">
					<ReactGridLayout
					className="grid" 
					compactType={null} 
					layout={layout} 
					onLayoutChange={()=>{}} //FOR SAVING LAYOUT CHANGES
					cols={8}
					>
					{
						// pages.map((val, key) => {
						// 	// console.log(val);
						// 	return (
						// 		<div key={''+key} className="page" onClick={()=>{ /*selectedPage(key) */}}>
						// 			<Page pageInfo={val}/>
						// 		</div>
						// 	)
						// })
						
					}
					</ReactGridLayout>
				</div>

				<div className="rightbar"/>
			</div>
		);

	} else {
		return(
			<div className="">Routing...</div>
		);
	}
}

export default ModuleDecision;
