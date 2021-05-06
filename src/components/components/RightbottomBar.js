import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import axios_instance from '../axios_instance.js';

const RightbottomBar = ({selectedWidget,curPage,add,setAdd}) =>{
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

    //need to fix
    const onUploadImage=(event)=>{
        // console.log("upload");
        if (event.target.files && event.target.files[0]) {
            let imageFile = event.target.files[0];
            let imageExtension = event.target.files[0].type;
                
			let reader = new FileReader();
			reader.onload = (e) => {
				let form = new FormData();
				form.append('file', e.target.result);
				form.append('extension', imageExtension);
				axios_instance({
					method: 'post',
					url: "media/",
					data: form,
					headers: {
						'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
					},
				}).then((res)=>{
					// setImageHash(res.data.hash);
                    for(let i=0;i<curPage.length;i++){
                        if(curPage[i]===selectedWidget){
                            curPage[i].internals.hash=res.data.hash;
                            break;
                        }
                    }
                    setAdd(add+1);
				}).catch((e)=>{
					console.log(e);
				})
			};
			reader.readAsDataURL(imageFile);
		}
    }
    const onChangeText=(event)=>{
        // console.log(curPage);
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                curPage[i].internals.text=event.target.value;
                break;
            }
        }
        // console.log(curPage);
        setAdd(add+1);
        // console.log(event.target.value);
    }
    const onChangeFlashText=(event,index,position)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                while(curPage[i].internals.text.length<=index){
                    let ob={"front":"","back":""}
                    curPage[i].internals.text.push(ob);
                }
                if(position==="front"){
                    curPage[i].internals.text[index].front=event.target.value;
                }else{
                    curPage[i].internals.text[index].back=event.target.value;
                }
                break;
            }
        }
        setAdd(add+1);
    }
    const onChangePorS=(event)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                curPage[i].internals.click.actionType=event.target.value;
                break;
            }
        }
    }
    const onChangeTarget=(event)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                curPage[i].internals.click.target=event.target.value;
                break;
            }
        }
    }
    const onChangeAnswer=(event,answer)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                if(answer==="Correct"){
                    curPage[i].internals.rightAnswer.actionType=event.target.value;
                }else{
                    curPage[i].internals.wrongAnswer.actionType=event.target.value;
                }
                break;
            }
        }
        // console.log(curPage);
    }
    const onChangeAnswerTarget=(event,answer)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                if(answer==="Correct"){
                    curPage[i].internals.rightAnswer.target=event.target.value;
                }else{
                    curPage[i].internals.wrongAnswer.target=event.target.value;
                }
                break;
            }
        }
    }
    const onChangeCheckBox=(index)=>{
        // console.log(index);
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                if(selectedWidget.internals.options[index].isCorrect){
                    curPage[i].internals.options[index].isCorrect=false;
                    selectedWidget.internals.options[index].isCorrect=false;
                }else{
                    curPage[i].internals.options[index].isCorrect=true;
                    selectedWidget.internals.options[index].isCorrect=true;
                }
                break;
            }
        }
        // console.log(curPage);
        setAdd(add+1);
    }
    const onTextChange=(event, index)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                curPage[i].internals.options[index].option=event.target.value;
                break;
            }
        }
        setAdd(add+1);
    }
    const onChangeMatchText=(event,index,position)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                while(curPage[i].internals.options.length<=index){
                    let ob={"left":"","right":""}
                    curPage[i].internals.options.push(ob);
                }
                if(position==="left"){
                    curPage[i].internals.options[index].left=event.target.value;
                }else{
                    curPage[i].internals.options[index].right=event.target.value;
                }
                break;
            }
        }
        // console.log(curPage);
        setAdd(add+1);
    }
    const onChangeQuickTimeText=(event,index)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                curPage[i].internals.options[index].text=event.target.value;
                break;
            }
        }
        // console.log(curPage);
        setAdd(add+1);
    }
    const onChangeQuickTimePos=(event,index)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                curPage[i].internals.options[index].actionType=event.target.value;
                break;
            }
        }
        // console.log(curPage);
        // setAdd(add+1);
    }
    const onChangeQuickTimeTarget=(event,index)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                curPage[i].internals.options[index].target=event.target.value;
                break;
            }
        }
        // console.log(curPage);
        // setAdd(add+1);
    }
    const onChangeQuickTimeout=(event)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                curPage[i].internals.timeout.actionType=event.target.value;
                break;
            }
        }
        // console.log(curPage);
    }
    const onChangeQuickTimeoutTarget=(event)=>{
        for(let i=0;i<curPage.length;i++){
            if(curPage[i]===selectedWidget){
                curPage[i].internals.timeout.target=event.target.value;
                break;
            }
        }
    }
    // let textInput=<div>Input Text:<input style={{width:'90%'}} type="text" id="textinput" name="textinput" onChange={onChangeText}/></div>
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
    let game;
    if(selectedWidget==="")
        return <div></div>;
    if(selectedWidget.internals.widgetFlavor==="Sound"||selectedWidget.internals.widgetFlavor==="ImageBox"){
        let textforButton;
        if(selectedWidget.internals.widgetFlavor==="Sound"){
            textforButton="Upload Sound";
        }else{
            textforButton="Upload Image";
        }
        game=<div>
                <button style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}} onClick={handleClick}>{textforButton}</button>
                <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={onUploadImage} />
            </div>
    }else if(selectedWidget.internals.widgetFlavor==="TextBox"){
        game=<div>Input Text:<input defaultValue={selectedWidget.internals.text} style={{width:'90%'}} type="text" id="textinput" name="textinput" onChange={onChangeText}/></div>;
    }else if(selectedWidget.internals.widgetFlavor==="Flashcard"){
        let textArray=[]
        for(let i=0;i<3;i++){
            let ob={"front":"","back":""}
            if(i<selectedWidget.internals.text.length){
                ob.front=selectedWidget.internals.text[i].front;
                ob.back=selectedWidget.internals.text[i].back;
            }
            textArray.push(ob);
        }
        game=<div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Front</th>
                        <th>Back</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><input defaultValue={textArray[0].front} onChange={(event)=>onChangeFlashText(event,0,"front")} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="front0" name="front"/></td>
                        <td><input defaultValue={textArray[0].back} onChange={(event)=>onChangeFlashText(event,0,"back")} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="back0" name="back"/></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td><input defaultValue={textArray[1].front} onChange={(event)=>onChangeFlashText(event,1,"front")} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="front1" name="front"/></td>
                        <td><input defaultValue={textArray[1].back} onChange={(event)=>onChangeFlashText(event,1,"back")} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="back1" name="back"/></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td><input defaultValue={textArray[2].front} onChange={(event)=>onChangeFlashText(event,2,"front")} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="front2" name="front"/></td>
                        <td><input defaultValue={textArray[2].back} onChange={(event)=>onChangeFlashText(event,2,"back")} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="back2" name="back"/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    }else if(selectedWidget.internals.widgetFlavor==="ImageButton"){
        game=<div>
                <div>
                    <button style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}} onClick={handleClick}>Upload Image</button>
                    <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={onUploadImage} />
                </div>
                <div style={{paddingTop:'5%'}}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Page(P) or Score(S)</th>
                                    <th>Target</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td><input defaultValue={selectedWidget.internals.click.actionType} style={{border:'none',backgroundColor:"transparent",width:'100%'}} onChange={(event)=>onChangePorS(event)} type="text" id="pors" name="pors"/></td>
                                    <td><input defaultValue={selectedWidget.internals.click.target} style={{border:'none',backgroundColor:"transparent",width:'100%'}} onChange={(event)=>onChangeTarget(event)} type="text" id="target" name="target"/></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
            </div>
    }else if(selectedWidget.internals.widgetFlavor==="MultipleChoice"){
        game=<div>
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
                        <td><input defaultValue={selectedWidget.internals.rightAnswer.actionType} style={{border:'none',backgroundColor:"transparent",width:'100%'}} onChange={(event)=>onChangeAnswer(event,"Correct")} type="text" id="correctpors" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.rightAnswer.target} style={{border:'none',backgroundColor:"transparent",width:'100%'}} onChange={(event)=>onChangeAnswerTarget(event,"Correct")} type="text" id="correcttarget" name="target"/></td>
                        </tr>
                        <tr>
                        <td>Wrong</td>
                        <td><input defaultValue={selectedWidget.internals.wrongAnswer.actionType} style={{border:'none',backgroundColor:"transparent",width:'100%'}} onChange={(event)=>onChangeAnswer(event,"Wrong")} type="text" id="wrongpors" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.wrongAnswer.target} style={{border:'none',backgroundColor:"transparent",width:'100%'}} onChange={(event)=>onChangeAnswerTarget(event,"Wrong")} type="text" id="wrongtarget" name="target"/></td>
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
                        <td><input style={{width:'100%'}} type="checkbox" id="box1" name="correctText" checked={selectedWidget.internals.options[0].isCorrect} onChange={()=>onChangeCheckBox(0)}/></td>
                        <td><input style={{border:'none',backgroundColor:"transparent",width:'100%'}} defaultValue={selectedWidget.internals.options[0].option} onChange={(event)=>onTextChange(event,0)} type="text" id="text1" name="wrongText"/></td>
                        </tr>
                        <tr>
                        <td><input style={{width:'100%'}} type="checkbox" id="box2" name="correctText" checked={selectedWidget.internals.options[1].isCorrect} onChange={()=>onChangeCheckBox(1)}/></td>
                        <td><input style={{border:'none',backgroundColor:"transparent",width:'100%'}} defaultValue={selectedWidget.internals.options[1].option} onChange={(event)=>onTextChange(event,1)} type="text" id="text2" name="wrongText"/></td>
                        </tr>
                        <tr>
                        <td><input style={{width:'100%'}} type="checkbox" id="box3" name="correctText" checked={selectedWidget.internals.options[2].isCorrect} onChange={()=>onChangeCheckBox(2)}/></td>
                        <td><input style={{border:'none',backgroundColor:"transparent",width:'100%'}} defaultValue={selectedWidget.internals.options[2].option} onChange={(event)=>onTextChange(event,2)} type="text" id="text3" name="wrongText"/></td>
                        </tr>
                        <tr>
                        <td><input style={{width:'100%'}} type="checkbox" id="box4" name="correctText" checked={selectedWidget.internals.options[3].isCorrect} onChange={()=>onChangeCheckBox(3)}/></td>
                        <td><input style={{border:'none',backgroundColor:"transparent",width:'100%'}} defaultValue={selectedWidget.internals.options[3].option} onChange={(event)=>onTextChange(event,3)} type="text" id="text4" name="wrongText"/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    }else if(selectedWidget.internals.widgetFlavor==="Matching"){
        let textArray=[]
        for(let i=0;i<4;i++){
            let ob={"left":"","right":""}
            if(i<selectedWidget.internals.options.length){
                ob.left=selectedWidget.internals.options[i].left;
                ob.right=selectedWidget.internals.options[i].right;
            }
            textArray.push(ob);
        }
        game=<div>
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
                        <td><input defaultValue={selectedWidget.internals.rightAnswer.actionType} onChange={(event)=>onChangeAnswer(event,"Correct")} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="correctpors" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.rightAnswer.target} onChange={(event)=>onChangeAnswerTarget(event,"Correct")} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="correcttarget" name="target"/></td>
                        </tr>
                        <tr>
                        <td>Wrong</td>
                        <td><input defaultValue={selectedWidget.internals.wrongAnswer.actionType} onChange={(event)=>onChangeAnswer(event,"Wrong")} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="wrongpors" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.wrongAnswer.target} onChange={(event)=>onChangeAnswerTarget(event,"Wrong")} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="wrongtarget" name="target"/></td>
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
                            <td><input defaultValue={textArray[0].left} onChange={(event)=>{onChangeMatchText(event,0,"left")}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="leftText1" name="leftText"/></td>
                            <td><input defaultValue={textArray[0].right} onChange={(event)=>{onChangeMatchText(event,0,"right")}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="rightText1" name="rightText"/></td>
                            </tr>
                            <tr>
                            <td><input defaultValue={textArray[1].left} onChange={(event)=>{onChangeMatchText(event,1,"left")}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="leftText2" name="leftText"/></td>
                            <td><input defaultValue={textArray[1].right} onChange={(event)=>{onChangeMatchText(event,1,"right")}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="rightText2" name="rightText"/></td>
                            </tr>
                            <tr>
                            <td><input defaultValue={textArray[2].left} onChange={(event)=>{onChangeMatchText(event,2,"left")}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="leftText3" name="leftText"/></td>
                            <td><input defaultValue={textArray[2].right} onChange={(event)=>{onChangeMatchText(event,2,"right")}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="rightText3" name="rightText"/></td>
                            </tr>
                            <tr>
                            <td><input defaultValue={textArray[3].left} onChange={(event)=>{onChangeMatchText(event,3,"left")}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="leftText4" name="leftText"/></td>
                            <td><input defaultValue={textArray[3].right} onChange={(event)=>{onChangeMatchText(event,3,"right")}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="rightText4" name="rightText"/></td>
                            </tr>
                        </tbody>
                    </Table>
            </div>
    }else if(selectedWidget.internals.widgetFlavor==="QuickTimeChoice"){
        game=<div>
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
                        <td><input defaultValue={selectedWidget.internals.options[0].text} onChange={(event)=>{onChangeQuickTimeText(event,0)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="text1" name="text"/></td>
                        <td><input defaultValue={selectedWidget.internals.options[0].actionType} onChange={(event)=>{onChangeQuickTimePos(event,0)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="pors1" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.options[0].target} onChange={(event)=>{onChangeQuickTimeTarget(event,0)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="target1" name="target"/></td>
                        </tr>
                        <tr>
                        <td><input defaultValue={selectedWidget.internals.options[1].text} onChange={(event)=>{onChangeQuickTimeText(event,1)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="text2" name="text"/></td>
                        <td><input defaultValue={selectedWidget.internals.options[1].actionType} onChange={(event)=>{onChangeQuickTimePos(event,1)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="pors2" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.options[1].target} onChange={(event)=>{onChangeQuickTimeTarget(event,1)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="target2" name="target"/></td>
                        </tr>
                        <tr>
                        <td><input defaultValue={selectedWidget.internals.options[2].text} onChange={(event)=>{onChangeQuickTimeText(event,2)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="text3" name="text"/></td>
                        <td><input defaultValue={selectedWidget.internals.options[2].actionType} onChange={(event)=>{onChangeQuickTimePos(event,2)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="pors3" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.options[2].target} onChange={(event)=>{onChangeQuickTimeTarget(event,2)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="target3" name="target"/></td>
                        </tr>
                        <tr>
                        <td><input defaultValue={selectedWidget.internals.options[3].text} onChange={(event)=>{onChangeQuickTimeText(event,3)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="text4" name="text"/></td>
                        <td><input defaultValue={selectedWidget.internals.options[3].actionType} onChange={(event)=>{onChangeQuickTimePos(event,3)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="pors4" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.options[3].target} onChange={(event)=>{onChangeQuickTimeTarget(event,3)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="target4" name="target"/></td>
                        </tr>
                        <tr>
                        <td>Timeout</td>
                        <td><input defaultValue={selectedWidget.internals.timeout.actionType} onChange={(event)=>{onChangeQuickTimeout(event)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="timeoutpors" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.timeout.target} onChange={(event)=>{onChangeQuickTimeoutTarget(event)}} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="timeouttarget" name="target"/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    }else if(selectedWidget.internals.widgetFlavor==="TextButton"){
        game=<div style={{paddingTop:'5%'}}>
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
                        <td><input defaultValue={selectedWidget.internals.text} onChange={onChangeText} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="buttontext" name="buttontext"/></td>
                        <td><input defaultValue={selectedWidget.internals.click.actionType} onChange={onChangePorS} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="pors" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.click.target} onChange={onChangeTarget} style={{border:'none',backgroundColor:"transparent",width:'100%'}} type="text" id="target" name="target"/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    }else if(selectedWidget.internals.widgetFlavor==="Snacksnake"){
        game=snackInfo;
    }
    return (
        <div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
            {game}
        </div>
    );
}

export default RightbottomBar;