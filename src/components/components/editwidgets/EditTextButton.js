import React from 'react';
import {Table} from 'react-bootstrap';
import './editStyle.css';

const EditTextButton = ({selectedWidget,curPage,add,setAdd})=>{
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
    let game=<div style={{paddingTop:'5%'}}>
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
                        <td><input defaultValue={selectedWidget.internals.text} onChange={onChangeText} className='inputStyle' type="text" id="buttontext" name="buttontext"/></td>
                        <td><input defaultValue={selectedWidget.internals.click.actionType} onChange={onChangePorS} className='inputStyle' type="text" id="pors" name="pors"/></td>
                        <td><input defaultValue={selectedWidget.internals.click.target} onChange={onChangeTarget} className='inputStyle' type="text" id="target" name="target"/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    return (game);
}

export default EditTextButton;