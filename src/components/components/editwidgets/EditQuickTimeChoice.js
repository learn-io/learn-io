import React from 'react';
import {Table} from 'react-bootstrap';
import './editStyle.css';

const EditQuickTimeChoice = ({selectedWidget,curPage,add,setAdd})=>{
    const onChangeQuickTimeText=(event,index)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.options[index].text=event.target.value;
                break;
            }
        }
        // console.log(curPage);
        setAdd(add+1);
    }
    const onChangeQuickTimePos=(event,index)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.options[index].actionType=event.target.value;
                break;
            }
        }
        // console.log(curPage);
        // setAdd(add+1);
    }
    const onChangeQuickTimeTarget=(event,index)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.options[index].target=event.target.value;
                break;
            }
        }
        // console.log(curPage);
        // setAdd(add+1);
    }
    const onChangeQuickTimeout=(event)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.timeout.actionType=event.target.value;
                break;
            }
        }
        // console.log(curPage);
    }
    const onChangeQuickTimeoutTarget=(event)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.timeout.target=event.target.value;
                break;
            }
        }
    }
    let game=<div>
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
                    <td><input defaultValue={selectedWidget.internals.options[0].text} onChange={(event)=>{onChangeQuickTimeText(event,0)}} className='inputStyle' type="text" id="text1" name="text"/></td>
                    <td><input defaultValue={selectedWidget.internals.options[0].actionType} onChange={(event)=>{onChangeQuickTimePos(event,0)}} className='inputStyle' type="text" id="pors1" name="pors"/></td>
                    <td><input defaultValue={selectedWidget.internals.options[0].target} onChange={(event)=>{onChangeQuickTimeTarget(event,0)}} className='inputStyle' type="text" id="target1" name="target"/></td>
                    </tr>
                    <tr>
                    <td><input defaultValue={selectedWidget.internals.options[1].text} onChange={(event)=>{onChangeQuickTimeText(event,1)}} className='inputStyle' type="text" id="text2" name="text"/></td>
                    <td><input defaultValue={selectedWidget.internals.options[1].actionType} onChange={(event)=>{onChangeQuickTimePos(event,1)}} className='inputStyle' type="text" id="pors2" name="pors"/></td>
                    <td><input defaultValue={selectedWidget.internals.options[1].target} onChange={(event)=>{onChangeQuickTimeTarget(event,1)}} className='inputStyle' type="text" id="target2" name="target"/></td>
                    </tr>
                    <tr>
                    <td><input defaultValue={selectedWidget.internals.options[2].text} onChange={(event)=>{onChangeQuickTimeText(event,2)}} className='inputStyle' type="text" id="text3" name="text"/></td>
                    <td><input defaultValue={selectedWidget.internals.options[2].actionType} onChange={(event)=>{onChangeQuickTimePos(event,2)}} className='inputStyle' type="text" id="pors3" name="pors"/></td>
                    <td><input defaultValue={selectedWidget.internals.options[2].target} onChange={(event)=>{onChangeQuickTimeTarget(event,2)}} className='inputStyle' type="text" id="target3" name="target"/></td>
                    </tr>
                    <tr>
                    <td><input defaultValue={selectedWidget.internals.options[3].text} onChange={(event)=>{onChangeQuickTimeText(event,3)}} className='inputStyle' type="text" id="text4" name="text"/></td>
                    <td><input defaultValue={selectedWidget.internals.options[3].actionType} onChange={(event)=>{onChangeQuickTimePos(event,3)}} className='inputStyle' type="text" id="pors4" name="pors"/></td>
                    <td><input defaultValue={selectedWidget.internals.options[3].target} onChange={(event)=>{onChangeQuickTimeTarget(event,3)}} className='inputStyle' type="text" id="target4" name="target"/></td>
                    </tr>
                    <tr>
                    <td>Timeout</td>
                    <td><input defaultValue={selectedWidget.internals.timeout.actionType} onChange={(event)=>{onChangeQuickTimeout(event)}} className='inputStyle' type="text" id="timeoutpors" name="pors"/></td>
                    <td><input defaultValue={selectedWidget.internals.timeout.target} onChange={(event)=>{onChangeQuickTimeoutTarget(event)}} className='inputStyle' type="text" id="timeouttarget" name="target"/></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    return (game);
}

export default EditQuickTimeChoice;