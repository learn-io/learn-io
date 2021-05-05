import React, { useState, useEffect } from 'react';
import './GridStyle.css';
import './ComponentStyle.css';
import {Row, Col} from 'react-bootstrap';
import RGL, { WidthProvider } from "react-grid-layout";
import deleteIcon from './images/delete.png';
import saveIcon from './images/save.png';
import Widget from './components/widgets/Widget';
import RighttopBar from './components/RighttopBar';
import RightbottomBar from './components/RightbottomBar';
import axios_instance from './axios_instance.js';
// import flashcard from './components/widgets/Flashcard';
// import TextButton from './components/widgets/TextButton';

const ReactGridLayout = WidthProvider(RGL);

const CreateController = ({isSignedIn}) =>
{
    const [layout, setLayout] = useState( []);
    const [curPage,setCurPage] = useState([]);
    const [add,setAdd]= useState(0);
    const [selectedWidget,setSelectedWidget]= useState("");
    // const hiddenFileInput = React.useRef(null);
    // const [widgets,setWidgets]= useState([]);
    // useEffect(
    //     ()=>{
	// 		axios_instance({
    //             method: 'get',
    //             url: "widgets/"
    //         }).then(function(response){
    //             setWidgets(response.data);
    //         }).catch(function(err){
    //             console.log(err);
    //         });
    //     },[isSignedIn]
    // );
    useEffect( () => {
        if (curPage === undefined)
            return;
        setLayout(curPage.map((val,key) => {
            return {i: ''+key, x: val.x, y: val.y, w: val.width, h: val.height, static: false}
        }));
    }, [add] 
    );
    // const [selected,setSelected]= useState('');  // use to handle which widget is selected
    // const [widgets, setWidgets] = useState('');
    
    // console.log(widgets);
    // useEffect(
    //     ()=>{
	// 		if(selected==='')
    //             return;
    //         if(selected==='textBox'){

    //         }
    //     },[selected]
    // );
    // let textBut=<button>
    //                 Text Button
    //             </button>
    const selectWidget=(key)=>{
        // console.log(curPage[key]);
        setSelectedWidget(curPage[key]);
        // console.log(1);
    }
    const onDragStart=(event,text)=> {
        // console.log(text);
        event.dataTransfer.setData("Text", text);
    }
    const onDragOver=(event)=>{
        event.preventDefault();
    }
    const onDrop=(event)=>{
        // add widget into curPage
        event.preventDefault();
        let data = event.dataTransfer.getData("Text");
        let game={
            name: "widget name",
            x: (event.clientX/320),
            y: (event.clientY/320),
            height: 1,
            width: 1,
            internals: {}
        };
        // remember to fix x and y
        console.log(event.clientX);
        console.log(event.clientY);
        // console.log(widgets);
        switch(data)
        {
            case "Flashcard":
                game.internals= {
                    widgetFlavor: "Flashcard",
                    text: [{
                        front: "Text",
                        back: "Text"
                    }]
                }
            break;
            case "ImageButton":
                game.internals={
                    widgetFlavor:"ImageButton",
                    hash:"",
                    click:{
                        actionType:"P",
                        target:""
                    }
                }
            break;
            case "MultipleChoice":
                game.internals={
                    widgetFlavor:"MultipleChoice",
                    options:[
                        {option:"Text",isCorrect:true},
                        {option:"Text",isCorrect:false},
                        {option:"Text",isCorrect:false},
                        {option:"Text",isCorrect:false}                            
                    ],
                    buttonText:"Text",
                    rightAnswer:{
                        actionType:"S",
                        target:""
                    },
                    wrongAnswer:{
                        actionType:"P",
                        target:""
                    }
                }
            break;
            case "Sound":
                game.internals={
                    widgetFlavor:"Sound",
                    hash:""
                }
            break;
            case "Matching":
                game.internals={
                    widgetFlavor:"Matching",
                    options:[
                        {
                            left:"Text",
                            right:"Text"
                        }
                    ],
                    buttonText:"Text",
                    rightAnswer:{
                        actionType:"S",
                        target:""
                    },
                    wrongAnswer:{
                        actionType:"P",
                        target:""
                    }
                }
                game.height=2;
                game.width=2;
            break;
            case "ImageBox":
                game.internals={
                    widgetFlavor:"ImageBox",
                    hash:""
                }
            break;
            case "QuickTimeChoice":
                game.internals={
                    widgetFlavor:"QuickTimeChoice",
                    options:[
                        {text:"Text",actionType:"P",target:""},
                        {text:"Text",actionType:"P",target:""},
                        {text:"Text",actionType:"P",target:""},
                        {text:"Text",actionType:"P",target:""}
                    ],
                    timeout:{
                        actionType:"P",
                        target:"",
                        seconds:3
                    },
                    startText:"Start Text",
                    question:"Question Text"
                }
            break;
            case "TextBox":
                game.internals={widgetFlavor:"TextBox",text:"Text Box"}
            break;
            case "TextButton":
                game.internals={widgetFlavor:"TextButton",text:"Text Button",click:{actionType:"",target:""}}
                // let inside=widgets[8];
                // game={name:"Text Button",x:(event.clientX/100),y:(event.clientY/100),height:1,width:1,internals:{inside}}
            break;
            case "Snacksnake":
                game.internals={
                    widgetFlavor:"Snacksnake",
                    options:[{
                        rightImage:"",
                        wrongImage:""
                    }],
                    rightAnswer:{
                        actionType:"S",
                        target:""
                    }
                }
                game.height=4;
                game.width=6;
            break;
            default:
                game=<div>No Widget!</div>
        } 
        // console.log(game);
        curPage.push(game);
        setAdd(add+1);
        // console.log(curPage);
        // console.log(curPage);
        // console.log("drop"+event);
        // console.log(event.clientX);
        // console.log(event.clientY);
    }
    const deleteSelectedWidget=()=>{
        let filter = curPage.filter(item => item !== selectedWidget)
        setCurPage(filter);
        setSelectedWidget("")
        setAdd(add+1);
    }
    const savePage=()=>{
        console.log("save");
        console.log(curPage);
        console.log(layout);
        // axios_instance({
        //     method: 'post',
        //     url: "page/update",
        //     data: {
        //         platformId:"",
        //         moduleId:"",
        //         pageId: "",
        //         pageName:"",
        //         widgets:curPage
        //     }
        // })
        // .then((res)=>{
        // 	console.log(res);
	    // })
	    // .catch(err=>console.log(err));
    }
    
    let rightbarTop=<RighttopBar onDragStart={onDragStart}/>
    
    let rightbarBottom=<RightbottomBar selectedWidget={selectedWidget} curPage={curPage} add={add} setAdd={setAdd}/>
    let rightbar=<div style={{height: '82%',backgroundColor:"#9EEBCF"}}>
                    {rightbarTop}
                    {rightbarBottom}
                </div>
    let leftbarTop=<div style={{overflowY:'scroll', border: '1px solid black', height: '80%'}}>
                        <button className='deleteButton' onClick={()=>{savePage()}}><img src={saveIcon} height='40px' width='40px' alt="save"/></button>
                    </div>
    let leftbarBottom=<div style={{height: '20%'}}>
                            <button style={{paddingTop:'25%'}} onClick={()=>{deleteSelectedWidget()}} className='deleteButton'><img src={deleteIcon} height='80px' width='80px' alt="delete"/></button>
                        </div>
    
    let leftbar=<div style={{height: '82%',backgroundColor:"#9EEBCF"}}>
                    {leftbarTop}
                    {leftbarBottom}
                </div>
    // console.log(curPage);
    return(
        <div className="create">
            <Row>
                <Col>{leftbar}</Col>
                <Col xs={9} onDragOver={(e)=>{onDragOver(e)}}
                onDrop={(e)=>{onDrop(e)}} ><ReactGridLayout 
                className="grid" 
                compactType={null}
                layout={layout}
                cols={8}
                >
                {/* <div key={''+'key'} className="widget">
                    {textBox}
                </div> */}
                { 
                    curPage.map((val,key) => {
                        return (
                            <div key={''+key} className="widget" onClick={()=>{selectWidget(key)}}>
                                <Widget internals={val.internals}/>
                            </div>
                        );
                    })
                }
                </ReactGridLayout>
                </Col>
                <Col >{rightbar}</Col>
            </Row>
        </div>
        );
}

export default CreateController;