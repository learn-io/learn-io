import React, { useState, useEffect } from 'react';
import './GridStyle.css';
import './ComponentStyle.css';
import {Row, Col,Table} from 'react-bootstrap';
import RGL, { WidthProvider } from "react-grid-layout";
import deleteIcon from './images/delete.png';
import saveIcon from './images/save.png';
import soundIcon from './images/sound.png';
import snackIcon from './images/snack.PNG';
import flashIcon from './images/flash.PNG';
import choiceIcon from './images/choice.png';
import Widget from './components/widgets/Widget';
import axios_instance from './axios_instance.js';
// import flashcard from './components/widgets/Flashcard';
// import TextButton from './components/widgets/TextButton';

const ReactGridLayout = WidthProvider(RGL);

const CreateController = ({isSignedIn}) =>
{
    const [layout, setLayout] = useState( []);
    const [curPage] = useState([]);
    const [add,setAdd]= useState(0);
    const [selectedWidget,setSelectedWidget]= useState("");
    const hiddenFileInput = React.useRef(null);
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
        // remember to fix x and y
        // var rect = ctx.canvas.getBoundingClientRect();
        console.log(event.clientX);
        console.log(event.clientY);
        // console.log(widgets);
        switch(data)
        {
            case "Flashcard":
                game={
                    name: "Flashcard",
                    x: (event.clientX/100),
                    y: (event.clientY/100),
                    height: 1,
                    width: 1,
                    internals: {
                        widgetFlavor: "Flashcard",
                        text: [{
                            front: "Text",
                            back: "Text"
                        }]
                    }
                }
            break;
            case "ImageButton":
                game={
                    name: "Image Button",
                    x: (event.clientX/100),
                    y: (event.clientY/100),
                    height: 1,
                    width: 1,
                    internals: {
                        widgetFlavor:"ImageButton",
                        hash:"",
                        click:{
                            actionType:"P",
                            target:""
                        }
                    }
                }
            break;
            case "MultipleChoice":
                game={
                    name: "Multiple Choice",
                    x: (event.clientX/100),
                    y: (event.clientY/100),
                    height: 1,
                    width: 1,
                    internals: {
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
                }
            break;
            case "Sound":
                game={
                    name: "Sound",
                    x: (event.clientX/100),
                    y: (event.clientY/100),
                    height: 1,
                    width: 1,
                    internals: {
                        widgetFlavor:"Sound",
                        hash:""
                    }
                }
            break;
            case "Matching":
                game={
                    name: "Matching",
                    x: (event.clientX/100),
                    y: (event.clientY/100),
                    height: 2,
                    width: 2,
                    internals: {
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
                }
            break;
            case "ImageBox":
                game={
                    name: "Image Box",
                    x: (event.clientX/100),
                    y: (event.clientY/100),
                    height: 1,
                    width: 1,
                    internals: {
                        widgetFlavor:"ImageBox",
                        hash:""
                    }
                }
            break;
            case "QuickTimeChoice":
                game={
                    name: "Quick Time Choice",
                    x: (event.clientX/100),
                    y: (event.clientY/100),
                    height: 1,
                    width: 1,
                    internals: {
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
                }
            break;
            case "TextBox":
                game={name:"Text Box",x:(event.clientX/100),y:(event.clientY/100),height:1,width:1,internals:{widgetFlavor:"TextBox",text:"Text Box"}}
            break;
            case "TextButton":
                game={name:"Text Button",x:(event.clientX/100),y:(event.clientY/100),height:1,width:1,internals:{widgetFlavor:"TextButton",text:"Text Button",click:{actionType:"",target:""}}}
                // let inside=widgets[8];
                // game={name:"Text Button",x:(event.clientX/100),y:(event.clientY/100),height:1,width:1,internals:{inside}}
            break;
            case "Snacksnake":
                game={
                    name: "Snack snake",
                    x: (event.clientX/100),
                    y: (event.clientY/100),
                    height: 1,
                    width: 1,
                    internals: {
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
                }
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
        console.log("delete");
    }
    const savePage=()=>{
        console.log("save");
        console.log(curPage);
        console.log(layout);
    }
    const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

    //need to fix
    const onUploadImage=(event)=>{
        console.log("upload");
        // if (event.target.files && event.target.files[0]) {
        //     let imageFile = event.target.files[0];
        //     let imageExtension = event.target.files[0].type;
                
		// 	let reader = new FileReader();
		// 	reader.onload = (e) => {
		// 		let oldData = ImageData;
		// 		setImageData(e.target.result);
		// 		let form = new FormData();
		// 		form.append('file', e.target.result);
		// 		form.append('extension', imageExtension);
		// 		axios_instance({
		// 			method: 'post',
		// 			url: "media/",
		// 			data: form,
		// 			headers: {
		// 				'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
		// 			},
		// 		}).then((res)=>{
		// 			setImageHash(res.data.hash);
		// 		}).catch((e)=>{
		// 			setImageData(oldData);
		// 		})
		// 	};
		// 	reader.readAsDataURL(imageFile);
		// }
    }
    let textBut=<button onDragStart={(e)=>{onDragStart(e,"TextButton")}} draggable style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}}>Text Button</button>
    let textBox=<div draggable onDragStart={(e)=>{onDragStart(e,"TextBox")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'50px', marginLeft:'10%'}}>
                    <p>Text Box</p>
                </div>
    let imageBox=<div draggable onDragStart={(e)=>{onDragStart(e,"ImageBox")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'150px', marginLeft:'10%'}}>
                    <p>ImageBox</p>
                </div>
    let imageBut=<div draggable onDragStart={(e)=>{onDragStart(e,"ImageButton")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'70%',height:'100px', marginLeft:'10%'}}>
                    <p>Image Button</p>
                </div>
    let soundBut=<div draggable onDragStart={(e)=>{onDragStart(e,"Sound")}} style={{backgroundColor:'transparent',borderRadius: '.3rem',marginTop: '10%', width:'70%', marginLeft:'10%'}}>
                    <img src={soundIcon} height='40px' width='40px' alt="sound"/> Add Sound
                </div>
    let flash=<div draggable onDragStart={(e)=>{onDragStart(e,"Flashcard")}} style={{backgroundColor:'transparent',borderRadius: '.3rem',marginTop: '10%', width:'70%', marginLeft:'10%'}}>
                    <img src={flashIcon} height='70%' width='200px' alt=""/>
                </div>
    let snack=<div draggable onDragStart={(e)=>{onDragStart(e,"Snacksnake")}} style={{backgroundColor:'transparent',borderRadius: '.3rem',marginTop: '10%', width:'70%', marginLeft:'10%'}}>
                    <img src={snackIcon} height='70%' width='200px' alt=""/>
                </div>
    let choice=<div draggable onDragStart={(e)=>{onDragStart(e,"MultipleChoice")}} style={{backgroundColor:'transparent',borderRadius: '.3rem',marginTop: '10%', width:'70%', marginLeft:'10%'}}>
                    <img src={choiceIcon} height='50px' width='50px' alt=""/>Multiple Choice
                </div>
    let quickChoice=<div draggable onDragStart={(e)=>{onDragStart(e,"QuickTimeChoice")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'150px', marginLeft:'10%'}}>
                    <p>Quick Choice</p>
                </div>
    let matchChoice=<div draggable onDragStart={(e)=>{onDragStart(e,"Matching")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'150px', marginLeft:'10%'}}>
                        <p>Matching</p>
                    </div>
    let rightbarTop=<div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
                    {textBut}
                    {textBox}
                    {imageBox}
                    {imageBut}
                    {soundBut}
                    {flash}
                    {snack}
                    {choice}
                    {quickChoice}
                    {matchChoice}
                </div>
    let uploadButon=<div>
                        <button style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}} onClick={handleClick}>Upload Image</button>
                        <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={onUploadImage} />
                    </div>
    let textInput=<div>Input Text:<input style={{width:'100%'}} type="text" id="textinput" name="textinput"/></div>
    let texbuttonInfo=<div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Text</th>
                                    <th>Page(P) or Score(S)</th>
                                    <th>Target</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td><input style={{width:'100%'}} type="text" id="buttontext" name="buttontext"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
    let flashcardInfo=<div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Front</th>
                                    <th>Back</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td><input style={{width:'100%'}} type="text" id="front" name="front"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="back" name="back"/></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                    <td><input style={{width:'100%'}} type="text" id="front" name="front"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="back" name="back"/></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                    <td><input style={{width:'100%'}} type="text" id="front" name="front"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="back" name="back"/></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
    let snackInfo=<div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Correct Text</th>
                                <th>Page(P) or Score(S)</th>
                                <th>Target</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td><input style={{width:'100%'}} type="text" id="buttontext" name="buttontext"/></td>
                                <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Correct Option</th>
                                <th>Wrong Opstion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td><input style={{width:'100%'}} type="text" id="correctText" name="correctText"/></td>
                                <td><input style={{width:'100%'}} type="text" id="wrongText" name="wrongText"/></td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                <td><input style={{width:'100%'}} type="text" id="correctText" name="correctText"/></td>
                                <td><input style={{width:'100%'}} type="text" id="wrongText" name="wrongText"/></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
    let multipleChoiceInfo=<div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Answer</th>
                                        <th>Page(P) or Score(S)</th>
                                        <th>Target</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>Correct</td>
                                        <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                        </tr>
                                        <tr>
                                        <td>Wrong</td>
                                        <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Correct?</th>
                                        <th>Text</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><input style={{width:'100%'}} type="checkbox" id="correctText" name="correctText"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="wrongText" name="wrongText"/></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                        <td><input style={{width:'100%'}} type="checkbox" id="correctText" name="correctText"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="wrongText" name="wrongText"/></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
    let quickChoiceInfo=<div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Text</th>
                                    <th>Page(P) or Score(S)</th>
                                    <th>Target</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td><input style={{width:'100%'}} type="text" id="text" name="text"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                    </tr>
                                    <tr>
                                    <td><input style={{width:'100%'}} type="text" id="text" name="text"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
    let matchingInfo=<div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Answer</th>
                                    <th>Page(P) or Score(S)</th>
                                    <th>Target</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>Correct</td>
                                    <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                    </tr>
                                    <tr>
                                    <td>Wrong</td>
                                    <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Left</th>
                                        <th>Right</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><input style={{width:'100%'}} type="text" id="leftText" name="leftText"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="rightText" name="rightText"/></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                        <td><input style={{width:'100%'}} type="text" id="leftText" name="leftText"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="rightText" name="rightText"/></td>
                                        </tr>
                                    </tbody>
                                </Table>
                        </div>
    let rightbarBottom=<div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
                        {uploadButon}
                        {/* {texbuttonInfo}
                        {flashcardInfo}
                        {textInput}
                        {snackInfo}
                        {multipleChoiceInfo}
                        {quickChoiceInfo}
                        {matchingInfo} */}
                    </div>
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