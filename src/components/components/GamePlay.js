import React, { useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import '../ComponentStyle.css';
import '../GridStyle.css';
import axios_instance from '../axios_instance.js';
import Widget from './widgets/Widget.js';

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const GamePlay=({username, isSignedIn, isEdit, setAction})=>{
    let { platform,module,page } = useParams();
    const [layout, setLayout] = useState();
    const [curPage, setCurPage] = useState();
    useEffect(
        ()=>{
			axios_instance({
                method: 'get',
                url: "page/"+platform+"/"+module+"/"+page
            })
            .then((res)=>{
                setCurPage(res.data);
            })
            .catch(err=>console.log(err));
        },[platform,module,page]   
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
        /*
            platformId:{type:String,required:true},
            moduleId:{type:String,required:true},
            pageName:{type:String,required:true},
            rank:{type:Number,default:0},
            entry:{type:Boolean,default:false},
            widgets:[]
        */
       //id, name, x, y, height, width, internals

        //build layout
    return(
    <div className="page">
        <h2 style={{color:'white'}}>platformName</h2>
        <h3 style={{color:'white'}}>moduleName : {page.name}</h3>
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
