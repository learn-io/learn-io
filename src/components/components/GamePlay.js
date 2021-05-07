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
    const [selectedWidget,setSelectedWidget]= useState("");

    useEffect( () => {
        if (curPage === undefined)
            return;
        setLayout(curPage.widgets.map((val,key) => {
            return {i: ''+key, x: val.x, y: val.y, w: val.width, h: val.height, static: !isEdit}
        }));
        console.log(layout);
    }, [curPage, isEdit] 
    );

    if (curPage === undefined)
        return <div/>;
        //build layout
    const onDragOver=(event)=>{
        event.preventDefault();
    }
    const onDrop=(event)=>{
        event.preventDefault();
        console.log("drop");
        // let data = event.dataTransfer.getData("Text");
        // let rect=document.getElementById("reactgrid").getBoundingClientRect();
        // // console.log(((event.clientX-rect.left)/(rect.width/8)));
        // // console.log(( (event.clientY-rect.top)/160));
        // // let x=Math.floor(((event.clientX-rect.left)/(rect.width/8)));
        // // let y=Math.floor((event.clientY-rect.top)/160);
        // let game={
        //     name: "widget name",
        //     x: ((event.clientX-rect.left)/(rect.width/8)),
        //     y: ( (event.clientY-rect.top)/160),
        //     height: 1,
        //     width: 1,
        //     internals: {}
        // };
        // console.log(game);
        // switch(data)
        // {
        //     case "Flashcard":
        //         game.internals= {
        //             widgetFlavor: "Flashcard",
        //             text: [{
        //                 front: "Text",
        //                 back: "Text"
        //             }]
        //         }
        //     break;
        //     case "ImageButton":
        //         game.internals={
        //             widgetFlavor:"ImageButton",
        //             hash:"",
        //             click:{
        //                 actionType:"P",
        //                 target:""
        //             }
        //         }
        //     break;
        //     case "MultipleChoice":
        //         game.internals={
        //             widgetFlavor:"MultipleChoice",
        //             options:[
        //                 {option:"Text",isCorrect:true},
        //                 {option:"Text",isCorrect:false},
        //                 {option:"Text",isCorrect:false},
        //                 {option:"Text",isCorrect:false}                            
        //             ],
        //             buttonText:"Text",
        //             rightAnswer:{
        //                 actionType:"S",
        //                 target:""
        //             },
        //             wrongAnswer:{
        //                 actionType:"P",
        //                 target:""
        //             }
        //         }
        //     break;
        //     case "Sound":
        //         game.internals={
        //             widgetFlavor:"Sound",
        //             hash:""
        //         }
        //     break;
        //     case "Matching":
        //         game.internals={
        //             widgetFlavor:"Matching",
        //             options:[
        //                 {
        //                     left:"Text",
        //                     right:"Text"
        //                 }
        //             ],
        //             buttonText:"Text",
        //             rightAnswer:{
        //                 actionType:"S",
        //                 target:""
        //             },
        //             wrongAnswer:{
        //                 actionType:"P",
        //                 target:""
        //             }
        //         }
        //         game.height=2;
        //         game.width=2;
        //     break;
        //     case "ImageBox":
        //         game.internals={
        //             widgetFlavor:"ImageBox",
        //             hash:""
        //         }
        //     break;
        //     case "QuickTimeChoice":
        //         game.internals={
        //             widgetFlavor:"QuickTimeChoice",
        //             options:[
        //                 {text:"Text",actionType:"P",target:""},
        //                 {text:"Text",actionType:"P",target:""},
        //                 {text:"Text",actionType:"P",target:""},
        //                 {text:"Text",actionType:"P",target:""}
        //             ],
        //             timeout:{
        //                 actionType:"P",
        //                 target:"",
        //                 seconds:3
        //             },
        //             startText:"Start Text",
        //             question:"Question Text"
        //         }
        //     break;
        //     case "TextBox":
        //         game.internals={widgetFlavor:"TextBox",text:"Text Box"}
        //     break;
        //     case "TextButton":
        //         game.internals={widgetFlavor:"TextButton",text:"Text Button",click:{actionType:"",target:""}}
        //         // let inside=widgets[8];
        //         // game={name:"Text Button",x:(event.clientX/100),y:(event.clientY/100),height:1,width:1,internals:{inside}}
        //     break;
        //     case "Snacksnake":
        //         game.internals={
        //             widgetFlavor:"Snacksnake",
        //             options:[{
        //                 rightImage:"",
        //                 wrongImage:""
        //             }],
        //             rightAnswer:{
        //                 actionType:"S",
        //                 target:""
        //             }
        //         }
        //         game.height=4;
        //         game.width=6;
        //     break;
        //     default:
        //         game=<div>No Widget!</div>
        // } 
        // // console.log(game);
        // curPage.push(game);
        // console.log(curPage);
        // setAdd(add+1);
    }
    const selectWidget=(key)=>{
        // console.log(curPage[key]);
        setSelectedWidget(curPage[key]);
        // console.log(1);
    }
    const onLayoutChanged=(newLayout)=>{
        console.log(1);
        setLayout(newLayout);
        for(let i=0;i<newLayout.length;i++){
            curPage.widgets[i].x=newLayout[i].x;
            curPage.widgets[i].y=newLayout[i].y;
            curPage.widgets[i].h=newLayout[i].h;
            curPage.widgets[i].w=newLayout[i].w;
        }
        // setAdd(add+1);
    }
    if(isEdit){
        console.log(layout);
        return(
            <div className="page">
                <h2 style={{color:'white'}}>{platformName}</h2>
                <h3 style={{color:'white'}}>{moduleName} : {pageName}</h3>
                <div id="reactgrid" onDragOver={(e)=>{onDragOver(e)}} onDrop={(e)=>{onDrop(e)}}>
                    <ReactGridLayout 
                    className="grid" 
                    compactType={null}
                    layout={layout}
                    onLayoutChange={(newLayout)=>{onLayoutChanged(newLayout)}}
                    cols={8}
                    >
                    { 
                        curPage.widgets.map((val,key) => {
                            return (
                                <div key={''+key} className="widget" onClick={()=>{selectWidget(key)}}>
                                    <Widget internals={val.internals} setAction={setAction}/>
                                </div>
                            );
                        })
                    }
                    </ReactGridLayout>
                </div>
            </div>
        
            );
    }else{
        return (
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
    
/********************************************************************/
    // if(isEdit){
    //     return(<CreateController platformName={platformName} moduleName={moduleName} pageName={pageName} 
    //             currentPage={curPage} platformId={platformId} moduleId={moduleId} pageId={pageId}/>);
    // }else{
    //     return(
    //         <div className="page">
    //             <h2 style={{color:'white'}}>{platformName}</h2>
    //             <h3 style={{color:'white'}}>{moduleName} : {pageName}</h3>
    //             <ReactGridLayout 
    //             className="grid" 
    //             compactType={null} 
    //             layout={layout}
    //             onLayoutChange={()=>{}}
    //             items={curPage.widgets.length}
    //             cols={8}
    //             >
    //             { 
    //                 curPage.widgets.map((val,key) => {
    //                     return (
    //                         <div key={''+key} className="widget">
    //                             <Widget internals={val.internals} setAction={setAction}/>
    //                         </div>
    //                     );
    //                 })
    //             }
    //             </ReactGridLayout>
    //         </div>
    //         );
    // }
/****************************************************************************************** */
}
/*

*/

export default GamePlay;
