import React, { useState, useEffect } from 'react';
import './GridStyle.css';
import './ComponentStyle.css';
import {Row, Col} from 'react-bootstrap';
import RGL, { WidthProvider } from "react-grid-layout";
import deleteIcon from './images/delete.png';
import saveIcon from './images/save.png';
import Widget from './components/widgets/Widget'
// import axios_instance from './axios_instance.js';
// import flashcard from './components/widgets/Flashcard';
// import TextButton from './components/widgets/TextButton';

const ReactGridLayout = WidthProvider(RGL);

const CreateController = ({isSignedIn}) =>
{
    const [layout, setLayout] = useState( []);
    const [curPage, setCurPage] = useState([]);
    const [add,setAdd]= useState(0);
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
    //     },[]
    // );
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

    const onDragStart=(event,text)=> {
        event.dataTransfer.setData("Text", text);
    }
    const onDragOver=(event)=>{
        event.preventDefault();
    }
    const onDrop=(event)=>{
        // add widget into curPage
        event.preventDefault();
        let data = event.dataTransfer.getData("Text");
        let game;
        switch(data)
        {
            case "Flashcard":
                // game=<Flashcard internals={internals}/>
                console.log("Flashcard");
            break;
            case "ImageButton":
                // game=<ImageQuestion internals={internals} setAction={setAction}/>
                console.log("ImageButton");
            break;
            case "MultipleChoice":
                // game=<MultipleChoice internals={internals} setAction={setAction}/>
                console.log("MultipleChoice");
            break;
            case "Sound":
                // game=<SoundQuestion internals={internals}/>
                console.log("Sound");
            break;
            case "Matching":
                // game=<Matching internals={internals} setAction={setAction}/>
                console.log("Matching");
            break;
            case "ImageBox":
                // game=<ImageBox internals={internals}/>
                console.log("ImageBox");
            break;
            case "QuickTimeChoice":
                // game=<QuickTime internals={internals} setAction={setAction}/>
                console.log("QuickTimeChoice");
            break;
            case "TextBox":
                // game=<TextBox internals={internals}/>
                console.log("TextBox");
            break;
            case "TextButton":
                game={name:"Text Button",x:(event.clientX/1000),y:(event.clientY/1000),height:1,width:1,internals:{widgetFlavor:"TextButton",text:"Text Button",click:{actionType:"",target:""}}}
            break;
            case "Snacksnake":
                // game=<Snacksnake internals={internals} setAction={setAction}/>
                console.log("Snacksnake");
            break;
            default:
                game=<div>No Widget!</div>
        } 
        curPage.push(game);
        setAdd(add+1);
        // console.log(curPage);
        // console.log("drop"+event);
        // console.log(event.clientX);
        // console.log(event.clientY);
    }
    const deleteSelectedWidget=()=>{
        console.log("delete");
    }
    const savePage=()=>{
        console.log("save");
    }
    let textBut=<button onDragStart={(e)=>{onDragStart(e,"TextButton")}} draggable style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}}>Text Button</button>
    let textBox=<div draggable onDragStart={(e)=>{onDragStart(e,"TextBox")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'50px', marginLeft:'10%'}}>
                    <p>Test Box</p>
                </div>
    let rightbarTop=<div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
                    {textBut}
                    {textBox}
                </div>
    let rightbarBottom=<div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
                        widgets content
                    </div>
    let rightbar=<div style={{height: '100%',backgroundColor:"#9EEBCF"}}>
                    {rightbarTop}
                    {rightbarBottom}
                </div>
    let leftbarTop=<div style={{overflowY:'scroll', border: '1px solid black', height: '80%'}}>
                        <button className='deleteButton' onClick={()=>{savePage()}}><img src={saveIcon} height='40px' width='40px' alt="save"/></button>
                    </div>
    let leftbarBottom=<div style={{height: '20%'}}>
                            <button style={{paddingTop:'25%'}} onClick={()=>{deleteSelectedWidget()}} className='deleteButton'><img src={deleteIcon} height='80px' width='80px' alt="delete"/></button>
                        </div>
    
    let leftbar=<div style={{height: '100%',backgroundColor:"#9EEBCF"}}>
                    {leftbarTop}
                    {leftbarBottom}
                </div>
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
                            <div key={''+key} className="widget">
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