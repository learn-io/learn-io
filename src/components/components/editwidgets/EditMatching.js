import React from 'react';
import {Table} from 'react-bootstrap';
import './editStyle.css';

const EditMatching = ({selectedWidget,curPage,add,setAdd})=>{
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
        console.log(curPage);
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
                        <td><input className='inputStyle' defaultValue={selectedWidget.internals.rightAnswer.actionType} onChange={(event)=>onChangeAnswer(event,"Correct")} type="text" id="correctpors" name="pors"/></td>
                        <td><input className='inputStyle' defaultValue={selectedWidget.internals.rightAnswer.target} onChange={(event)=>onChangeAnswerTarget(event,"Correct")} type="text" id="correcttarget" name="target"/></td>
                        </tr>
                        <tr>
                        <td>Wrong</td>
                        <td><input className='inputStyle' defaultValue={selectedWidget.internals.wrongAnswer.actionType} onChange={(event)=>onChangeAnswer(event,"Wrong")} type="text" id="wrongpors" name="pors"/></td>
                        <td><input className='inputStyle' defaultValue={selectedWidget.internals.wrongAnswer.target} onChange={(event)=>onChangeAnswerTarget(event,"Wrong")} type="text" id="wrongtarget" name="target"/></td>
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
            </div>
    return (game);
}

export default EditMatching;