import React, { useEffect,useState} from 'react';
import '../ComponentStyle.css';
import '../GridStyle.css';
import Widget from './widgets/Widget.js';
import CreateController from './create.js'

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const GamePlay=({username, isSignedIn, isEdit, setAction, setPageName,
    platformName, moduleName, pageName, 
    platformId, moduleId, pageId, curPage})=>{

    const [layout, setLayout] = useState();
    


    useEffect( () => {
        if (curPage === undefined)
            return;
        setLayout(curPage.widgets.map((val,key) => {
            return {i: ''+key, x: val.x, y: val.y, w: val.width, h: val.height, static: !isEdit}
        }));
    }, [curPage, isEdit] 
    );

    if (curPage === undefined)
        return <div/>;
        //build layout
    if(isEdit){
        return(<CreateController platformName={platformName} moduleName={moduleName} pageName={pageName} 
                currentPage={curPage} platformId={platformId} moduleId={moduleId} pageId={pageId}/>);
    }else{
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
}
/*

*/

export default GamePlay;
