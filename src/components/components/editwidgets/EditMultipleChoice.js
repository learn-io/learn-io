import React, {useEffect, useState} from 'react';
import {Table,Dropdown} from 'react-bootstrap';
import './editStyle.css';

const EditMultipleChoice = ({selectedWidget,curPage,add,setAdd,pages})=>{
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
                    selectedWidget.internals.rightAnswer.actionType=value;
                    curPage.widgets[i].internals.rightAnswer.target="";
                }else{
                    curPage.widgets[i].internals.wrongAnswer.actionType=value;
                    selectedWidget.internals.wrongAnswer.actionType=value;
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
                    if(selectedWidget.internals.rightAnswer.actionType==='P'){
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
                    if(selectedWidget.internals.wrongAnswer.actionType==='P'){
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
    const onChangeCheckBox=(index)=>{
        // console.log(index);
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                if(selectedWidget.internals.options[index].isCorrect){
                    curPage.widgets[i].internals.options[index].isCorrect=false;
                    selectedWidget.internals.options[index].isCorrect=false;
                }else{
                    curPage.widgets[i].internals.options[index].isCorrect=true;
                    selectedWidget.internals.options[index].isCorrect=true;
                }
                break;
            }
        }
        // console.log(curPage);
        setAdd(add+1);
    }
    const onTextChange=(event, index)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.options[index].option=event.target.value;
                break;
            }
        }
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
        correctTarget=<input defaultValue={selectedWidget.internals.rightAnswer.target} className='inputStyle' onChange={(event)=>onChangeAnswerTarget(event,"Correct")} type="text" id="correcttarget" name="target"/>
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
        wrongTarget=<input defaultValue={selectedWidget.internals.wrongAnswer.target} className='inputStyle' onChange={(event)=>onChangeAnswerTarget(event,"Wrong")} type="text" id="wrongtarget" name="target"/>
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
                        {/* <input defaultValue={selectedWidget.internals.rightAnswer.actionType} className='inputStyle' onChange={(event)=>onChangeAnswer(event,"Correct")} type="text" id="correctpors" name="pors"/> */}
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
                        {/* <input defaultValue={selectedWidget.internals.wrongAnswer.actionType} className='inputStyle' onChange={(event)=>onChangeAnswer(event,"Wrong")} type="text" id="wrongpors" name="pors"/> */}
                    </td>
                    <td style={{width:'60%'}}>{wrongTarget}</td>
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
                    <td><input className='inputStyle' defaultValue={selectedWidget.internals.options[0].option} onChange={(event)=>onTextChange(event,0)} type="text" id="text1" name="wrongText"/></td>
                    </tr>
                    <tr>
                    <td><input style={{width:'100%'}} type="checkbox" id="box2" name="correctText" checked={selectedWidget.internals.options[1].isCorrect} onChange={()=>onChangeCheckBox(1)}/></td>
                    <td><input className='inputStyle' defaultValue={selectedWidget.internals.options[1].option} onChange={(event)=>onTextChange(event,1)} type="text" id="text2" name="wrongText"/></td>
                    </tr>
                    <tr>
                    <td><input style={{width:'100%'}} type="checkbox" id="box3" name="correctText" checked={selectedWidget.internals.options[2].isCorrect} onChange={()=>onChangeCheckBox(2)}/></td>
                    <td><input className='inputStyle' defaultValue={selectedWidget.internals.options[2].option} onChange={(event)=>onTextChange(event,2)} type="text" id="text3" name="wrongText"/></td>
                    </tr>
                    <tr>
                    <td><input style={{width:'100%'}} type="checkbox" id="box4" name="correctText" checked={selectedWidget.internals.options[3].isCorrect} onChange={()=>onChangeCheckBox(3)}/></td>
                    <td><input className='inputStyle' defaultValue={selectedWidget.internals.options[3].option} onChange={(event)=>onTextChange(event,3)} type="text" id="text4" name="wrongText"/></td>
                    </tr>
                </tbody>
            </Table>
            <div>Input Button Text:<input defaultValue={selectedWidget.internals.buttonText} style={{width:'90%'}} type="text" id="textinput" name="textinput" onChange={onChangeButtonText}/></div>
        </div>
    return (game);
}

export default EditMultipleChoice;