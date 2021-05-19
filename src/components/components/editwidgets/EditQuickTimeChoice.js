import React, {useEffect, useState} from 'react';
import {Table,Dropdown} from 'react-bootstrap';
import './editStyle.css';

const EditQuickTimeChoice = ({selectedWidget,curPage,add,setAdd,pages})=>{
    const [update,setUpdate]= useState(0);
    useEffect(
        ()=>{
        },[update]
    );
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
    const onChangeQuickTimePos=(value,index)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.options[index].actionType=value;
                curPage.widgets[i].internals.options[index].target="";
                break;
            }
        }
        setUpdate(update+1);
        // console.log(curPage);
        // setAdd(add+1);
    }
    const onChangeQuickTimeTarget=(event,index,pageN)=>{
        // console.log(index);
        // console.log(pageN);
        for(let i=0;i<curPage.widgets.length;i++){
            let value="";
            if(curPage.widgets[i]===selectedWidget){
                if(curPage.widgets[i].internals.options[index].actionType==='P'){
                    for(let j=0;j<pages.length;j++){
                        if(pages[j].pageName===pageN){
                            value=pages[j]._id;
                            break;
                        }
                    }
                }else{
                    value=event.target.value;
                }
                curPage.widgets[i].internals.options[index].target=value;
                break;
            }
        }
        // console.log(curPage);
        setUpdate(update+1);
        // console.log(curPage);
        // setAdd(add+1);
    }
    const onChangeQuickTimeout=(value)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                curPage.widgets[i].internals.timeout.actionType=value;
                curPage.widgets[i].internals.timeout.target="";
                break;
            }
        }
        setUpdate(update+1);
        // console.log(curPage);
    }
    const onChangeQuickTimeoutTarget=(event,pageN)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            let value="";
            if(curPage.widgets[i]===selectedWidget){
                if(curPage.widgets[i].internals.timeout.actionType==='P'){
                    for(let j=0;j<pages.length;j++){
                        if(pages[j].pageName===pageN){
                            value=pages[j]._id;
                            break;
                        }
                    }
                }else{
                    value=event.target.value;
                }
                curPage.widgets[i].internals.timeout.target=value;
                break;
            }
        }
        setUpdate(update+1);
    }
    let text=[];
    let targetPart=[];
    for(let i=0;i<selectedWidget.internals.options.length;i++){
        let value="";
        let target;
        if(selectedWidget.internals.options[i].actionType==='P'){
            for(let j=0;j<pages.length;j++){
                if(pages[j]._id===selectedWidget.internals.options[i].target){
                    value=pages[j].pageName;
                    break;
                }
            }
            target=<Dropdown>
                        <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                            {value}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                pages.map((x,k)=>{
                                    return(
                                        <Dropdown.Item onClick={(event)=>onChangeQuickTimeTarget(event,i,x.pageName)} key={k}>{x.pageName}</Dropdown.Item>
                                    );
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
        }else{
            target=<input defaultValue={selectedWidget.internals.options[i].target} onChange={(event)=>{onChangeQuickTimeTarget(event,i)}} className='inputStyle' type="text" name="target"/>;
        }
        text.push(value);
        targetPart.push(target);
    }
    // console.log(targetPart);
    let timeoutText="";
    let timeoutTarget;
    if(selectedWidget.internals.timeout.actionType==='P'){
        for(let i=0;i<pages.length;i++){
            if(pages[i]._id===selectedWidget.internals.timeout.target){
                timeoutText=pages[i].pageName;
                break;
            }
        }
        timeoutTarget=<Dropdown>
                        <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                            {timeoutText}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                pages.map((x,i)=>{
                                    return(
                                        <Dropdown.Item onClick={(event)=>onChangeQuickTimeoutTarget(event,x.pageName)} key={i}>{x.pageName}</Dropdown.Item>
                                    );
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
    }else{
        timeoutTarget=<input defaultValue={selectedWidget.internals.timeout.target} onChange={(event)=>{onChangeQuickTimeoutTarget(event)}} className='inputStyle' type="text" id="timeouttarget" name="target"/>
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
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                {selectedWidget.internals.options[0].actionType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>onChangeQuickTimePos("P",0)}>P</Dropdown.Item>
                                <Dropdown.Item onClick={()=>onChangeQuickTimePos("S",0)}>S</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <input defaultValue={selectedWidget.internals.options[0].actionType} onChange={(event)=>{onChangeQuickTimePos(event,0)}} className='inputStyle' type="text" id="pors1" name="pors"/> */}
                    </td>
                    <td style={{width:'60%'}}>{targetPart[0]}</td>
                    </tr>
                    <tr>
                    <td><input defaultValue={selectedWidget.internals.options[1].text} onChange={(event)=>{onChangeQuickTimeText(event,1)}} className='inputStyle' type="text" id="text2" name="text"/></td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                {selectedWidget.internals.options[1].actionType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>onChangeQuickTimePos("P",1)}>P</Dropdown.Item>
                                <Dropdown.Item onClick={()=>onChangeQuickTimePos("S",1)}>S</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <input defaultValue={selectedWidget.internals.options[1].actionType} onChange={(event)=>{onChangeQuickTimePos(event,1)}} className='inputStyle' type="text" id="pors2" name="pors"/> */}
                    </td>
                    <td style={{width:'60%'}}>{targetPart[1]}</td>
                    </tr>
                    <tr>
                    <td><input defaultValue={selectedWidget.internals.options[2].text} onChange={(event)=>{onChangeQuickTimeText(event,2)}} className='inputStyle' type="text" id="text3" name="text"/></td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                {selectedWidget.internals.options[2].actionType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>onChangeQuickTimePos("P",2)}>P</Dropdown.Item>
                                <Dropdown.Item onClick={()=>onChangeQuickTimePos("S",2)}>S</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <input defaultValue={selectedWidget.internals.options[2].actionType} onChange={(event)=>{onChangeQuickTimePos(event,2)}} className='inputStyle' type="text" id="pors3" name="pors"/> */}
                    </td>
                    <td style={{width:'60%'}}>{targetPart[2]}</td>
                    </tr>
                    <tr>
                    <td><input defaultValue={selectedWidget.internals.options[3].text} onChange={(event)=>{onChangeQuickTimeText(event,3)}} className='inputStyle' type="text" id="text4" name="text"/></td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                {selectedWidget.internals.options[3].actionType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>onChangeQuickTimePos("P",3)}>P</Dropdown.Item>
                                <Dropdown.Item onClick={()=>onChangeQuickTimePos("S",3)}>S</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <input defaultValue={selectedWidget.internals.options[3].actionType} onChange={(event)=>{onChangeQuickTimePos(event,3)}} className='inputStyle' type="text" id="pors4" name="pors"/> */}
                    </td>
                    <td style={{width:'60%'}}>{targetPart[3]}</td>
                    </tr>
                    <tr>
                    <td>Timeout</td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                {selectedWidget.internals.timeout.actionType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>onChangeQuickTimeout("P")}>P</Dropdown.Item>
                                <Dropdown.Item onClick={()=>onChangeQuickTimeout("S")}>S</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <input defaultValue={selectedWidget.internals.timeout.actionType} onChange={(event)=>{onChangeQuickTimeout(event)}} className='inputStyle' type="text" id="timeoutpors" name="pors"/> */}
                    </td>
                    <td style={{width:'60%'}}>{timeoutTarget}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    return (game);
}

export default EditQuickTimeChoice;