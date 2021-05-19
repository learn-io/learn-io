import React, {useEffect, useState} from 'react';
import {Table,Button,Dropdown} from 'react-bootstrap';
import './editStyle.css';
import axios_instance from '../../axios_instance.js';
import EditSnackRow from './EditSnackRow';
import deleteIcon from '../../images/delete.png';

const EditSnackSnake = ({selectedWidget,curPage,updatePage,pages})=>{
    const [update,setUpdate]= useState(0);
    useEffect(
        ()=>{
        },[update]
    );
    
    // const handleClick = (event,index) => {
    //     console.log(event);
    //     console.log(hiddenFileInput.current);
	// 	hiddenFileInput.current.click();
	// };
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
    // const onChangeAnswerTarget=(event,answer)=>{
    //     for(let i=0;i<curPage.widgets.length;i++){
    //         if(curPage.widgets[i]===selectedWidget){
    //             if(answer==="Correct"){
    //                 curPage.widgets[i].internals.rightAnswer.target=event.target.value;
    //             }else{
    //                 curPage.widgets[i].internals.wrongAnswer.target=event.target.value;
    //             }
    //             break;
    //         }
    //     }
    // }
    const onChangeSnack=(event,position,index,type)=>{
        if(type==="text"){
            for(let i=0;i<curPage.widgets.length;i++){
                if(curPage.widgets[i]===selectedWidget){
                    if(position==="correct"){
                        curPage.widgets[i].internals.options[index].rightText=event.target.value;
                    }else{
                        curPage.widgets[i].internals.options[index].wrongText=event.target.value;
                    }
                    // console.log(curPage.widgets[i].internals.options);
                    break;
                }
            }
        }else{
            if (event.target.files && event.target.files[0]) {
                let imageFile = event.target.files[0];
                let imageExtension = event.target.files[0].type;
                    
                let reader = new FileReader();
                reader.onload = (e) => {
                    let form = new FormData();
                    form.append('file', e.target.result);
                    form.append('extension', imageExtension);
                    axios_instance({
                        method: 'post',
                        url: "media/",
                        data: form,
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                        },
                    }).then((res)=>{
                        // setImageHash(res.data.hash);
                        for(let i=0;i<curPage.widgets.length;i++){
                            if(curPage.widgets[i]===selectedWidget){
                                if(position==="correct"){
                                    curPage.widgets[i].internals.options[index].rightImage=res.data.hash;
                                }else{
                                    curPage.widgets[i].internals.options[index].wrongImage=res.data.hash;
                                }
                                updatePage();
                                // console.log(curPage.widgets[i].internals.options);
                                break;
                            }
                        }
                    }).catch((e)=>{
                        console.log(e);
                    })
                };
                reader.readAsDataURL(imageFile);
                setUpdate(update+1);
            }
        }
        
        // console.log(curPage);
    }
    const onDelete=(i)=>{
        for(let j=0;j<curPage.widgets.length;j++){
            if(curPage.widgets[j]===selectedWidget){
                let filter=curPage.widgets[j].internals.options.filter((x)=>x!==selectedWidget.internals.options[i]);
                curPage.widgets[j].internals.options=filter;
                setUpdate(update+1);
                break;
            }
        }
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
        // console.log(curPage);
    }
    const addText=()=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                let ob={"rightText":"","wrongText":""}
                curPage.widgets[i].internals.options.push(ob);
                setUpdate(update+1);
                break;
            }
        }
    }
    const addImage=()=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                let ob={"rightImage":"","wrongImage":""}
                curPage.widgets[i].internals.options.push(ob);
                setUpdate(update+1);
                break;
            }
        }
    }
    let text="";
    let targetPart;
    if(selectedWidget.internals.rightAnswer.actionType==='P'){
        for(let i=0;i<pages.length;i++){
            if(pages[i]._id===selectedWidget.internals.rightAnswer.target){
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
                                        <Dropdown.Item onClick={(event)=>onChangeAnswerTarget(event,"Correct",x.pageName)} key={i}>{x.pageName}</Dropdown.Item>
                                    );
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
    }else{
        targetPart=<input defaultValue={selectedWidget.internals.rightAnswer.target} onChange={(event)=>onChangeAnswerTarget(event,"Correct")} className='inputStyle' type="text" id="target" name="target"/>
    }
    // console.log(textArray);
    let textArray=[]
    // console.log(selectedWidget.internals.options);
    // for(let i=0;i<selectedWidget.internals.options.length;i++){
    //     if(selectedWidget.internals.options[i].rightImage===undefined){
    //         textArray.push(selectedWidget.internals.options[i]);
    //     }else{
    //         // console.log(i);
    //         let ob={"rightImage":"","wrongImage":""};
    //         // console.log(selectedWidget.internals.options);
    //         if(selectedWidget.internals.options[i].rightImage!==""){
    //             axios_instance({
    //                 method: 'get',
    //                 url: "media/"+encodeURIComponent(selectedWidget.internals.options[i].rightImage),
    //             }).then((res)=>{
    //                 ob.rightImage=res.data.data;
    //             }).catch((err)=>{
    //                 console.log(err);
    //             });
    //         }
    //         if(selectedWidget.internals.options[i].wrongImage!==""){
    //             axios_instance({
    //                 method: 'get',
    //                 url: "media/"+encodeURIComponent(selectedWidget.internals.options[i].wrongImage),
    //             }).then((res)=>{
    //                 ob.wrongImage=res.data.data;
    //             }).catch((err)=>{
    //                 console.log(err);
    //             });
    //         }
    //         // console.log(ob);
    //         textArray.push(ob);
    //     }
    // }
    for(let i=0;i<selectedWidget.internals.options.length;i++){
        textArray.push(selectedWidget.internals.options[i]);
    }
    // console.log(textArray);
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
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                    {selectedWidget.internals.rightAnswer.actionType}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>onChangeAnswer("P","Correct")}>P</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>onChangeAnswer("S","Correct")}>S</Dropdown.Item>
                                    {/* <Dropdown.Item onClick={()=>{onChangeLimit(20)}}>20</Dropdown.Item> */}
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <input defaultValue={selectedWidget.internals.rightAnswer.actionType} onChange={(event)=>onChangeAnswer(event,"Correct")} className='inputStyle' type="text" id="pors" name="pors"/> */}
                        </td>
                        <td style={{width:'60%'}}>{targetPart}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Delete</th>
                        <th>Correct Option</th>
                        <th>Wrong Option</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        <tr>
                        <td><input onChange={(event)=>{onChangeSnack(event,"correct",0)}} className='inputStyle' type="text" id="correctText1" name="correctText"/></td>
                        <td><input onChange={(event)=>{onChangeSnack(event,"wrong",0)}} className='inputStyle' type="text" id="wrongText1" name="wrongText"/></td>
                        </tr>
                    </tbody> */}
                    <tbody>
                        {/* {console.log(textArray)} */}
                        {
                            textArray.map((x,i) => {
                                if(x.rightImage===undefined){
                                    return (
                                        <tr key={i}>
                                            <td><button onClick={()=>{onDelete(i)}} className='deleteButton'><img src={deleteIcon} height='40px' width='40px' alt="delete"/></button></td>
                                            <td><input defaultValue={x.rightText} onChange={(event)=>{onChangeSnack(event,"correct",i,"text")}} className='inputStyle' type="text" name="correctText"/></td>
                                            <td><input defaultValue={x.wrongText} onChange={(event)=>{onChangeSnack(event,"wrong",i,"text")}} className='inputStyle' type="text" name="wrongText"/></td>
                                        </tr>
                                    );
                                }else{
                                    // let rightdata="";
                                    // let wrongdata="";
                                    // if(x.rightImage!==""){
                                    //     axios_instance({
                                    //         method: 'get',
                                    //         url: "media/"+encodeURIComponent(x.rightImage),
                                    //     }).then((res)=>{
                                    //         ob.rightImage=res.data.data;
                                    //     }).catch((err)=>{
                                    //         console.log(err);
                                    //     });
                                    // }
                                    // if(x.wrongImage!==""){
                                    //     axios_instance({
                                    //         method: 'get',
                                    //         url: "media/"+encodeURIComponent(x.wrongImage),
                                    //     }).then((res)=>{
                                    //         ob.wrongImage=res.data.data;
                                    //     }).catch((err)=>{
                                    //         console.log(err);
                                    //     });
                                    // }
                                    return (
                                        <tr key={i}>
                                            <EditSnackRow row={x} onChangeSnack={onChangeSnack} i={i} onDelete={onDelete} updatePage={updatePage}/>
                                            {/* <td>
                                                <button className='deleteButton' onClick={(event)=>{handleClick(event,i)}}><img src={x.rightImage} height='50px' width='50%' alt="image"/></button>
							                    <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={(event)=>{onChangeSnack(event,"correct",i,"image")}} />
                                            </td>
                                            <td>
                                                <button className='deleteButton' onClick={handleClick}><img src={x.wrongImage} height='50px' width='50%' alt="image"/></button>
							                    <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={(event)=>{onChangeSnack(event,"wrong",i,"image")}} />
                                            </td> */}
                                            {/* <td><input onChange={(event)=>{onChangeSnack(event,"correct",i,"image")}} className='inputStyle' type="file" name="correctText"/><img src={textArray[i].rightImage} height='50px' width='50%' alt=''/></td>
                                            <td><input onChange={(event)=>{onChangeSnack(event,"wrong",i,"image")}} className='inputStyle' type="file" name="wrongText"/><img src={textArray[i].wrongImage} height='50px' width='50%' alt=''/></td> */}
                                        </tr>
                                    );
                                }
                                
                            })
                        }
                        
                    </tbody>
                </Table>
                <div style={{justifyContent:'space-around',display:'flex'}}>
                    <Button onClick={()=>{addText()}}>Add Text</Button>
                    <Button onClick={()=>{addImage()}}>Add Image</Button>
                </div>
            </div>
    return(game);
}

export default EditSnackSnake;