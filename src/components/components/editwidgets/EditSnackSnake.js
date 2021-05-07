import React from 'react';
import {Table} from 'react-bootstrap';
import './editStyle.css';

const EditSnackSnake = ({selectedWidget,curPage,add,setAdd})=>{

    const onChangeAnswer=(event,answer)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                if(answer==="Correct"){
                    curPage.widgets[i].internals.rightAnswer.actionType=event.target.value;
                }else{
                    curPage.widgets[i].internals.wrongAnswer.actionType=event.target.value;
                }
                break;
            }
        }
        // console.log(curPage);
    }
    const onChangeAnswerTarget=(event,answer)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                if(answer==="Correct"){
                    curPage.widgets[i].internals.rightAnswer.target=event.target.value;
                }else{
                    curPage.widgets[i].internals.wrongAnswer.target=event.target.value;
                }
                break;
            }
        }
    }
    let game=<div>
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
                        <td>Correct</td>
                        <td><input defaultValue={selectedWidget.internals.rightAnswer.actionType} onChange={(event)=>onChangeAnswer(event,"Correct")} className='inputStyle' type="text" id="pors" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.rightAnswer.target} onChange={(event)=>onChangeAnswerTarget(event,"Correct")} className='inputStyle' type="text" id="target" name="target"/></td>
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
                        <td><input className='inputStyle' type="text" id="correctText1" name="correctText"/></td>
                        <td><input className='inputStyle' type="text" id="wrongText1" name="wrongText"/></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td><input className='inputStyle' type="text" id="correctText2" name="correctText"/></td>
                        <td><input className='inputStyle' type="text" id="wrongText2" name="wrongText"/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    return(game);
}

export default EditSnackSnake;