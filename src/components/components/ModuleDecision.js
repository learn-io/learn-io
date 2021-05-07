import React, { useState, useEffect} from 'react';
import '../ComponentStyle.css';
import {Row, Col} from 'react-bootstrap';
import deleteIcon from '../images/delete.png';
import saveIcon from '../images/save.png';
import RGL, { WidthProvider } from "react-grid-layout";
import Page from './Page.js';
import RightBar from './RightBar.js';
import axios_instance from '../axios_instance';

const ReactGridLayout = WidthProvider(RGL);

const ModuleDecision=({username, isSignedIn, isEdit, userPlatformInfo, platformName, 
	setModuleId, moduleName, platformId, moduleId,
	setPageName, setPageId, setPageEntry, pages,
	setPageIndex, update})=>{

	// const [layout, setLayout] = useState([]);
	// const [pages, setPages] = useState([]);
	// const [selectedPage, setSelectedPage] = useState({});
	const [add,setAdd]= useState(0);
	const [layout,setLayout] = useState();
	// const [selectType, setSelectType] = useState("");
	useEffect(
		()=>{
			setLayout(pages.map((val, key) => {
				return (
					<div key={''+key} className="page" onClick={()=>{ selectPage(key) }} > 
						<Page pageInfo={val} name={''+key}/>
					</div>
				)
			}))	
		},[update,pages]
	)

	useEffect(
        ()=>{
				if(isEdit)
					return;
				let info = userPlatformInfo
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
        },[pages, username, platformId, moduleId, isSignedIn, setModuleId, setPageEntry, setPageId, setPageName, userPlatformInfo, update]
    );

	const selectPage = (key) =>{
		console.log("key")
		console.log(key)

		console.log(pages[key]);
		// setSelectType("Page");
		// setSelectedPage(pages[key]);
		setPageIndex(key);
	}

	const deselectPage = (e) => {
		// console.log(e.target.className);
		if(e.target.className === "react-grid-layout grid"){
			console.log("deselectPage");
			// setSelectType("");
			// setSelectedPage({});
			setPageIndex();
		}

	}

	// const onDragStart=(event,text)=> {
    //     // console.log(text);
    //     event.dataTransfer.setData("Text", text);
    // }

	const onDragOver=(event)=>{
        event.preventDefault();
    }

	const onDrop=(event)=>{
		event.preventDefault();
		let data = event.dataTransfer.getData("Text");
		// let newPage = {
		// 	pageName:"New Page",
		// 	entry: false,
		// 	moduleId:moduleId,
		// 	platformId:platformId,
		// 	rank:0,
		// 	widgets:[]
		// }
		// pages.push(newPage);
		// setAdd(add+1)
		let newPageId;
		axios_instance({
			method:'post',
			url: "page/",
			data:{
				platformId:platformId,
				moduleId:moduleId,
				pageName:"New Page",
				widgets:[],
				rank:0,
				entry:false
			}
		}).then((res)=>{
			newPageId = res.data.pageId;
			//Not sure if we need to do this or if it will get 
			//the pages again when we add a new one
			axios_instance({
				method:'get',
				url: "page/"+platformId+"/"+moduleId+"/"+newPageId,
			}).then((res)=>{
				// console.log(res.data);
				pages.push(res.data);
				setAdd(add+1)
			})
		});
	}

	if(isEdit){
		return (	
			// <div className="platformContainer">
				//@TODO CHANGE CSS TO 100% with new class
				<div id="pageGrid" className="content pageLayoutHelper" onDragOver={(e)=>{onDragOver(e)}} onDrop={(e)=>{onDrop(e)}} onClick={(e)=>{deselectPage(e)}}>  {/*deselectPage() */}
					{/* <ReactGridLayout
					className="grid" 
					compactType={null} 
					layout={layout} 
					onLayoutChange={()=>{}} //FOR SAVING LAYOUT CHANGES
					cols={8}
					> */}
					{
						pages.map((val, key) => {
							// console.log(val);

							//
							return (
								<div key={''+key} className="page" onClick={()=>{ selectPage(key) }} > 
									<Page pageInfo={val} name={''+key}/>
								</div>
							)
						})	
					}
					{/* </ReactGridLayout> */}
				</div>
				
				// {/* <RightBar selectType={selectType} selected={selectedPage} setSelectedPage={setSelectedPage} onDragStart={onDragStart} add={add} setAdd={setAdd}/> */}
				// {/* <div className="rightbar"> 
					
				// </div> */}
			// </div>
		);

	} else {
		return(
			<div className="">Routing...</div>
		);
	}
}

export default ModuleDecision;
