import React, {useEffect, useState} from 'react';
import {Table,Dropdown} from 'react-bootstrap';
import './editStyle.css';

const EditTextButton = ({selectedWidget,curPage,add,setAdd,pages})=>{
    const [update,setUpdate]= useState(0);
    useEffect(
        ()=>{
        },[update]
    );
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
    
    const onChangePorS=(value)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.click.actionType=value;
                break;
            }
        }
        setUpdate(update+1);
    }
    const onChangeTarget=(event,pageN)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            let value="";
            if(curPage.widgets[i]===selectedWidget){
                if(curPage.widgets[i].internals.click.actionType==='P'){
                    for(let j=0;j<pages.length;j++){
                        if(pages[j].pageName===pageN){
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
        setUpdate(update+1);
        // console.log(curPage);
    }
    let text="";
    let targetPart;
    if(selectedWidget.internals.click.actionType==='P'){
        for(let i=0;i<pages.length;i++){
            if(pages[i]._id===selectedWidget.internals.click.target){
                text=pages[i].pageName;
                break;
            }
        }
        targetPart=<Dropdown>
                        <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                            {text}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                pages.map((x,i)=>{
                                    return(
                                        <Dropdown.Item onClick={(event)=>onChangeTarget(event,x.pageName)} key={i}>{x.pageName}</Dropdown.Item>
                                    );
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
    }else{
        targetPart=<input defaultValue={selectedWidget.internals.click.target} onChange={(event)=>{onChangeTarget(event)}} className='inputStyle' type="text" id="target" name="target"/>
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
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                    {selectedWidget.internals.click.actionType}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>onChangePorS("P")}>P</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>onChangePorS("S")}>S</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <input defaultValue={selectedWidget.internals.click.actionType} onChange={onChangePorS} className='inputStyle' type="text" id="pors" name="pors"/> */}
                        </td>
                        <td style={{width:'60%'}}>{targetPart}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    return (game);
}

export default EditTextButton;