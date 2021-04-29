import React, { useEffect,useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import '../ComponentStyle.css';
import '../GridStyle.css';
import axios_instance from '../axios_instance.js';
import Widget from './widgets/Widget.js';

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const GamePlay=({username, isSignedIn, isEdit, setAction, setPageName,
    platformName, moduleName, pageName, 
    platformId, moduleId, pageId})=>{

    const [layout, setLayout] = useState();
    const [curPage, setCurPage] = useState();
    
    useEffect(
        ()=>{
			axios_instance({
                method: 'get',
                url: "page/"+platformId+"/"+moduleId+"/"+pageId
            })
            .then((res)=>{
                setCurPage(res.data);
                setPageName(res.data.pageName)
            })
            .catch(err=>console.log(err));
        },[platformId,moduleId,pageId]   
	);

    useEffect( () => {
        if (curPage === undefined)
            return;
        setLayout(curPage.widgets.map((val,key) => {
            return {i: ''+key, x: val.x, y: val.y, w: val.width, h: val.height, static: !isEdit}
        }));
    }, [curPage] 
    );

    if (curPage === undefined)
        return <div/>;
        //build layout
    return(
    <div className="page">
        <h2 style={{color:'white'}}>{platformName}</h2>
        <h3 style={{color:'white'}}>{moduleName} : {pageName}</h3>
        <ReactGridLayout 
        className="grid" 
        compactType={null} 
        layout={layout}
        onLayoutChange={()=>{}}
        items={curPage.widgets.length}
        cols={8}
        >
        { 
            curPage.widgets.map((val,key) => {
                return (
                    <div key={''+key} className="widget">
                        <Widget internals={val.internals} setAction={setAction}/>
                    </div>
                );
            })
        }
        </ReactGridLayout>
    </div>
    );
}
/*

*/

export default GamePlay;
