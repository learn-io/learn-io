import React from 'react';
import {Table} from 'react-bootstrap';
import './editStyle.css';

const EditFlashcard = ({selectedWidget,curPage,add,setAdd})=>{
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
    let textArray=[]
        for(let i=0;i<3;i++){
            let ob={"front":"","back":""}
            if(i<selectedWidget.internals.text.length){
                ob.front=selectedWidget.internals.text[i].front;
                ob.back=selectedWidget.internals.text[i].back;
            }
            textArray.push(ob);
        }
    let game=<div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Front</th>
                        <th>Back</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><input className='inputStyle' defaultValue={textArray[0].front} onChange={(event)=>onChangeFlashText(event,0,"front")} type="text" id="front0" name="front"/></td>
                        <td><input className='inputStyle' defaultValue={textArray[0].back} onChange={(event)=>onChangeFlashText(event,0,"back")} type="text" id="back0" name="back"/></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td><input className='inputStyle' defaultValue={textArray[1].front} onChange={(event)=>onChangeFlashText(event,1,"front")} type="text" id="front1" name="front"/></td>
                        <td><input className='inputStyle' defaultValue={textArray[1].back} onChange={(event)=>onChangeFlashText(event,1,"back")} type="text" id="back1" name="back"/></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <td><input className='inputStyle' defaultValue={textArray[2].front} onChange={(event)=>onChangeFlashText(event,2,"front")} type="text" id="front2" name="front"/></td>
                        <td><input className='inputStyle' defaultValue={textArray[2].back} onChange={(event)=>onChangeFlashText(event,2,"back")} type="text" id="back2" name="back"/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    return (game);
}

export default EditFlashcard;