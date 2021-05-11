import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './ComponentStyle.css';
import axios_instance from './axios_instance';
import ModuleView from './components/ModuleView.js'
import ModuleDecision from './components/ModuleDecision.js'
import GamePlay from './components/GamePlay.js'
import LeftBar from './components/LeftBar'
import RightBar from './components/RightBar'

import getUserPlatformInfo from './components/PlatformHelper.js';

const PlatformController=({username, isSignedIn, isEdit})=>{

    const [platformName, setPlatformName] = useState("");
    const [moduleName, setModuleName] = useState("");
    const [pageName, setPageName] = useState("");

    let { platformId } = useParams();
    const [moduleId, setModuleId] = useState("");
    const [pageId, setPageId] = useState("");
    const [pageEntry, setPageEntry] = useState("");

	const [userPlatformInfo, setUserPlatformInfo]=useState(
    {
        completeId:[],
        ownPlatform:false,
        score: 0,
        modulesCompleted: 0,
        badges: [false, false, false, false],
    });
    const [platform, setPlatform] = useState({})
    const [allPages, setAllPages] = useState({});
    const [pages, setPages] = useState([]);
    const [curPage, setCurPage] = useState({});

    const [pageIndex, setPageIndex] = useState();
    const [widgetIndex, setWidgetIndex] = useState();

    const [dragging, setDragging] = useState(false);

    const [add,setAdd] = useState(0);
    const [editMode, setEditMode] = useState(-1); //-1 => enter, 0 => drag, 1=> connect


	useEffect(
        ()=>{
			getUserPlatformInfo(isSignedIn, platformId)
			.then((res)=>{
				setUserPlatformInfo(res.data);
			})
			.catch(err=>console.log(err));
        },[username, isSignedIn, platformId]
    );

    useEffect( 
        ()=>{
            if(moduleId === "")
            {
                setCurPage({});
                setPages([]);
                return;
            }
            if (pageId === "")
            {
                setCurPage({});
            }
            if (allPages[moduleId])
            {
                setPages(allPages[moduleId]);
                if (pageId !== "")
                {
                    let thepage = allPages[moduleId].find(x => x._id === pageId);
                    setCurPage(thepage);
                }
            }
            else
            {
                axios_instance({
                    method: 'get',
                    url: "page/" + platformId + "/" + moduleId,
                }).then((res)=>
                    {
                        setPages(res.data);
                        allPages[moduleId] = res.data;
                        platform.modules.forEach( (x)=>{if (x._id === moduleId) setModuleName(x.moduleName);});
                        if (pageId !== "")
                        {
                            let thepage = allPages[moduleId].find(x => x._id === pageId);
                            setCurPage(thepage);
                        }
                    }
                )	
            }
        },[platformId,moduleId, pageId]   
	);

    const setAction = (action) =>
    {
        if (action.actionType === undefined || action.actionType===null)
            return;
        if (isEdit)
            return;
        if (action.actionType === "P")
        {
            setPageId(action.target);
        }
        else if (action.actionType === "S")
        {
            //by changing the object, we allow for rerenders
            let newUPinfo = { ...userPlatformInfo };

            //now let's find this module's progress
            let element = newUPinfo.completeId.find(e => e.moduleId === moduleId);
            if (element === undefined)
            {
                element = {
                    completed: false,
                    moduleId: moduleId,
                    moduleScore: 0,
                    entryPoints: []
                };
                newUPinfo.completeId.push(element);
            }

            //and this entry point's progress
            let entryPoint = element.entryPoints.find(e => e.pageId === pageEntry);
            if (entryPoint === undefined)
            {
                entryPoint = {
                    pageId: pageEntry,
                    score: 0
                };
                element.entryPoints.push(entryPoint);
            }

            //calculate and assign score delta
            let oldScore = entryPoint.score;
            let newScore = parseInt(action.target);

            let delta = newScore-oldScore;
            delta = delta < 0? 0 : delta;

            entryPoint.score += delta;
            element.moduleScore += delta;
            newUPinfo.score += delta;

            //now housekeep badges

            let milestones = Math.floor((newUPinfo.modulesCompleted / platform.modules.length) * 4);
            for (let i = 0; i < milestones; i++)
            {
                newUPinfo.badges[i] = true;
            }
            //now housekeep modulesCompleted

            let cur_module = platform.modules.find(e => e._id === moduleId);
            if (element.completed === false && element.moduleScore >= cur_module.completionScore)
            {
                element.completed = true;
                newUPinfo.modulesCompleted += 1;
            }   

            console.log(newUPinfo);
            if (isSignedIn)
            {
                axios_instance({
                    method: 'post',
                    url: "profile/update",
                    data: newUPinfo
                }).catch(err=>console.log(err));
            }
            setUserPlatformInfo(newUPinfo);
            setPageId("");
        }
        else
        {
            console.log(action);
            alert("Invalid Action Type");
        }
    };

    const onDragStart=(event,text)=> {
        // console.log(text);
        event.dataTransfer.setData("Text", text);
    }

    const saveAll=()=>{
        // {platform} {pages}
        let promises=[];
        //console.log("allPages")
        //console.log(allPages)

        //console.log("platform")
        //console.log(platform)

        // return;
        
        for(var i=0;i<platform.modules.length;i++){
            let data = {
                _id:platformId,
                moduleId:platform.modules[i]._id,
                newModuleName:platform.modules[i].moduleName, 
                moduleDescription:platform.modules[i].moduleDescription,
                completionScore:platform.modules[i].completionScore,
                image:platform.modules[i].image,
                lockedby:platform.modules[i].lockedby,
                unlocks:platform.modules[i].unlocks,
                x:platform.modules[i].x,
                y:platform.modules[i].y,
                height:platform.modules[i].height,
                width:platform.modules[i].width
            }

            promises.push(axios_instance({
                method:'post',
                url:'/platform/update',
                data:data
            }));
        }

        // for (const moduleId in allPages){
        //     for(var i=0;i<allPages[moduleId].length;i++){
        //         console.log(allPages[moduleId][i])
        //         // promises.push(axios_instance({
        //         //     method:'post',
        //         //     url:'/page/update',
        //         //     data:allPages[moduleId][i]
        //         // }));
        //     }
        // }

        for (const moduleId in allPages){
            for(i=0;i<allPages[moduleId].length; i++){
                let data = {
                    platformId:allPages[moduleId][i].platformId,
                    moduleId:allPages[moduleId][i].moduleId,
                    pageId:allPages[moduleId][i]._id,
                    pageName:allPages[moduleId][i].pageName,
                    widgets:allPages[moduleId][i].widgets,
                    rank:allPages[moduleId][i].rank,
                    entry:allPages[moduleId][i].entry
                }

                promises.push(axios_instance({
                    method:'post',
                    url:'/page/update',
                    data:data
                }));
            }
        }
        Promise.all(promises);
    }

    if (moduleId === "")
    {
        return (
        <div className="platformContainer">
            <LeftBar len={platform.modules? platform.modules.len : -1} isEdit={isEdit} saveAll={saveAll} platform={platform} pages={pages} setPageId={setPageId} setModuleId={setModuleId}/>  
            <ModuleView username={username} isSignedIn={isSignedIn} isEdit={isEdit} 
            platformId={platformId} platform={platform} setPlatform={setPlatform}
            userPlatformInfo={userPlatformInfo}
            platformName={platformName} setPlatformName = {setPlatformName}
            setModuleName={setModuleName} setModuleId={setModuleId}
            dragging={dragging} setDragging={setDragging}
            editMode={editMode} setEditMode={setEditMode}/>
            <RightBar isEdit={isEdit} selectType="Module" onDragStart={()=>setDragging(true)} add={editMode} setAdd={setEditMode}/>
        </div>
        );
    }
    else if (pageId === "")
    {
        console.log("Curpage")
        console.log(curPage);
        return (
            <div className="platformContainer">
                <LeftBar len={platform.modules? platform.modules.len : -1} isEdit={isEdit} saveAll={saveAll} platform={platform} pages={pages} setPageId={setPageId} setModuleId={setModuleId}/>
                <ModuleDecision username={username} isSignedIn={isSignedIn} isEdit={isEdit} 
                    userPlatformInfo={userPlatformInfo} setModuleId={setModuleId}
                    platformName={platformName} moduleName = {moduleName}
                    platformId={platformId} moduleId = {moduleId}
                    setPageName={setPageName} setPageId={setPageId}
                    setPageEntry={setPageEntry}
                    pages={pages} update={add}
                    setPageIndex={setPageIndex}/>
                <RightBar isEdit={isEdit} selectType={"Page"} selected={pages[pageIndex]} onDragStart={onDragStart} add={add} setAdd={setAdd}/>
            </div>
        );
    }
    else
    {   
        // console.log("curPage")
        // console.log(curPage)

        // console.log("pages[pageIndex]")
        // console.log(pages[pageIndex])

        // let thepage = allPages[moduleId].find(x => x._id === pageId);
        //                 setCurPage(thepage);
        // console.log(pages);
        return (
            <div className="platformContainer">
                <LeftBar len={platform.modules? platform.modules.len : -1} isEdit={isEdit} saveAll={saveAll} platform={platform} pages={pages} setPageId={setPageId} setModuleId={setModuleId}/>
                
                <GamePlay username={username} isSignedIn={isSignedIn} isEdit={isEdit} 
                setAction={setAction} setPageName={setPageName}
                platformName={platformName} moduleName={moduleName} pageName={pageName}
                platformId={platformId} moduleId={moduleId} pageId={pageId} curPage={curPage}
                setWidgetIndex={setWidgetIndex} update={add}/>

                <RightBar isEdit={isEdit} selectType={"Widget"} curPage={curPage} selected={widgetIndex} onDragStart={onDragStart} add={add} setAdd={setAdd} pages={pages}/>
            </div>
        );
    }

};



export default PlatformController;