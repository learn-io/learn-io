import React from 'react';
import {Table} from 'react-bootstrap';
import './editStyle.css';

const EditTextButton = ({selectedWidget,curPage,add,setAdd,pages})=>{
    const onChangeText=(event)=>{
        // console.log(curPage);
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.text=event.target.value;
                break;
            }
        }
        // console.log(curPage);
        setAdd(add+1);
        // console.log(event.target.value);
    }
    
    const onChangePorS=(event)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.click.actionType=event.target.value;
                break;
            }
        }
    }
    const onChangeTarget=(event)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            let value="";
            if(curPage.widgets[i]===selectedWidget){
                if(curPage.widgets[i].internals.click.actionType==='P'){
                    for(let j=0;j<pages.length;j++){
                        if(pages[j].pageName===event.target.value){
                            value=pages[j]._id;
                            break;
                        }
                    }
                }else{
                    value=event.target.value;
                }
                curPage.widgets[i].internals.click.target=value;
                break;
            }
        }
        // console.log(curPage);
    }
    let text="";
    if(selectedWidget.internals.click.actionType==='P'){
        for(let i=0;i<pages.length;i++){
            if(pages[i]._id===selectedWidget.internals.click.target){
                text=pages[i].pageName;
                break;
            }
        }
    }else{
        text=selectedWidget.internals.click.target;
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
                        <td><input defaultValue={text} onChange={onChangeTarget} className='inputStyle' type="text" id="target" name="target"/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    return (game);
}

export default EditTextButton;