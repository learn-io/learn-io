import React, {useEffect, useState} from 'react';
import {Table,Dropdown} from 'react-bootstrap';
import './editStyle.css';

const EditMatching = ({selectedWidget,curPage,add,setAdd, pages})=>{
    const [update,setUpdate]= useState(0);
    useEffect(
        ()=>{
        },[update]
    );
    const onChangeAnswer=(value,answer)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                if(answer==="Correct"){
                    curPage.widgets[i].internals.rightAnswer.actionType=value;
                    curPage.widgets[i].internals.rightAnswer.target="";
                }else{
                    curPage.widgets[i].internals.wrongAnswer.actionType=value;
                    curPage.widgets[i].internals.wrongAnswer.target="";
                }
                break;
            }
        }
        setUpdate(update+1);
        // console.log(curPage);
    }
    const onChangeAnswerTarget=(event,answer,pageN)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                let value="";
                if(answer==="Correct"){
                    if(curPage.widgets[i].internals.rightAnswer.actionType==='P'){
                        for(let j=0;j<pages.length;j++){
                            if(pages[j].pageName===pageN){
                                value=pages[j]._id;
                                break;
                            }
                        }
                    }else{
                        value=event.target.value;
                    }
                    curPage.widgets[i].internals.rightAnswer.target=value;
                }else{
                    if(curPage.widgets[i].internals.wrongAnswer.actionType==='P'){
                        for(let j=0;j<pages.length;j++){
                            if(pages[j].pageName===pageN){
                                value=pages[j]._id;
                                break;
                            }
                        }
                    }else{
                        value=event.target.value;
                    }
                    curPage.widgets[i].internals.wrongAnswer.target=value;
                }
                break;
            }
        }
        setUpdate(update+1);
        console.log(curPage);
    }

    const onChangeMatchText=(event,index,position)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                while(curPage.widgets[i].internals.options.length<=index){
                    let ob={"left":"","right":""}
                    curPage.widgets[i].internals.options.push(ob);
                }
                if(position==="left"){
                    curPage.widgets[i].internals.options[index].left=event.target.value;
                }else{
                    curPage.widgets[i].internals.options[index].right=event.target.value;
                }
                break;
            }
        }
        // console.log(curPage);
        setAdd(add+1);
    }
    const onChangeButtonText=(event)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.buttonText=event.target.value;
                break;
            }
        }
        setAdd(add+1);
    }
    let textArray=[]
        for(let i=0;i<4;i++){
            let ob={"left":"","right":""}
            if(i<selectedWidget.internals.options.length){
                ob.left=selectedWidget.internals.options[i].left;
                ob.right=selectedWidget.internals.options[i].right;
            }
            textArray.push(ob);
        }
    let correcttext="";
    let wrongtext="";
    let correctTarget;
    let wrongTarget;
    if(selectedWidget.internals.rightAnswer.actionType==='P'){
        for(let i=0;i<pages.length;i++){
            if(pages[i]._id===selectedWidget.internals.rightAnswer.target){
                correcttext=pages[i].pageName;
                break;
            }
        }
        correctTarget=<Dropdown>
                        <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                            {correcttext}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                pages.map((x,i)=>{
                                    return(
                                        <Dropdown.Item onClick={(event)=>onChangeAnswerTarget(event,"Correct",x.pageName)} key={i}>{x.pageName}</Dropdown.Item>
                                    );
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
    }else{
        correctTarget=<input className='inputStyle' defaultValue={selectedWidget.internals.rightAnswer.target} onChange={(event)=>onChangeAnswerTarget(event,"Correct")} type="text" id="correcttarget" name="target"/>
    }
    if(selectedWidget.internals.wrongAnswer.actionType==='P'){
        for(let i=0;i<pages.length;i++){
            if(pages[i]._id===selectedWidget.internals.wrongAnswer.target){
                wrongtext=pages[i].pageName;
                break;
            }
        }
        wrongTarget=<Dropdown>
                        <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                            {wrongtext}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                pages.map((x,i)=>{
                                    return(
                                        <Dropdown.Item onClick={(event)=>onChangeAnswerTarget(event,"Wrong",x.pageName)} key={i}>{x.pageName}</Dropdown.Item>
                                    );
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
    }else{
        wrongTarget=<input className='inputStyle' defaultValue={selectedWidget.internals.wrongAnswer.target} onChange={(event)=>onChangeAnswerTarget(event,"Wrong")} type="text" id="wrongtarget" name="target"/>
    }
    let game=<div>
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
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                    {selectedWidget.internals.rightAnswer.actionType}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>onChangeAnswer("P","Correct")}>P</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>onChangeAnswer("S","Correct")}>S</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <input className='inputStyle' defaultValue={selectedWidget.internals.rightAnswer.actionType} onChange={(event)=>onChangeAnswer(event,"Correct")} type="text" id="correctpors" name="pors"/> */}
                        </td>
                        <td style={{width:'60%'}}>{correctTarget}</td>
                        </tr>
                        <tr>
                        <td>Wrong</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                    {selectedWidget.internals.wrongAnswer.actionType}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>onChangeAnswer("P","Wrong")}>P</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>onChangeAnswer("S","Wrong")}>S</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <input className='inputStyle' defaultValue={selectedWidget.internals.wrongAnswer.actionType} onChange={(event)=>onChangeAnswer(event,"Wrong")} type="text" id="wrongpors" name="pors"/> */}
                        </td>
                        <td style={{width:'60%'}}>{wrongTarget}</td>
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
                            <td><input className='inputStyle' defaultValue={textArray[0].left} onChange={(event)=>{onChangeMatchText(event,0,"left")}} type="text" id="leftText1" name="leftText"/></td>
                            <td><input className='inputStyle' defaultValue={textArray[0].right} onChange={(event)=>{onChangeMatchText(event,0,"right")}} type="text" id="rightText1" name="rightText"/></td>
                            </tr>
                            <tr>
                            <td><input className='inputStyle' defaultValue={textArray[1].left} onChange={(event)=>{onChangeMatchText(event,1,"left")}} type="text" id="leftText2" name="leftText"/></td>
                            <td><input className='inputStyle' defaultValue={textArray[1].right} onChange={(event)=>{onChangeMatchText(event,1,"right")}} type="text" id="rightText2" name="rightText"/></td>
                            </tr>
                            <tr>
                            <td><input className='inputStyle' defaultValue={textArray[2].left} onChange={(event)=>{onChangeMatchText(event,2,"left")}} type="text" id="leftText3" name="leftText"/></td>
                            <td><input className='inputStyle' defaultValue={textArray[2].right} onChange={(event)=>{onChangeMatchText(event,2,"right")}} type="text" id="rightText3" name="rightText"/></td>
                            </tr>
                            <tr>
                            <td><input className='inputStyle' defaultValue={textArray[3].left} onChange={(event)=>{onChangeMatchText(event,3,"left")}} type="text" id="leftText4" name="leftText"/></td>
                            <td><input className='inputStyle' defaultValue={textArray[3].right} onChange={(event)=>{onChangeMatchText(event,3,"right")}} type="text" id="rightText4" name="rightText"/></td>
                            </tr>
                        </tbody>
                    </Table>
                    <div>Input Button Text:<input defaultValue={selectedWidget.internals.buttonText} style={{width:'90%'}} type="text" id="textinput" name="textinput" onChange={onChangeButtonText}/></div>
            </div>
    return (game);
}

export default EditMatching;