import React, {useEffect, useState} from 'react';
import {Table,Button} from 'react-bootstrap';
import './editStyle.css';
import axios_instance from '../../axios_instance.js';

const EditSnackSnake = ({selectedWidget,curPage,add,setAdd,pages})=>{
    const [update,setUpdate]= useState(0);
    // const [textArray,setTextArray]= useState([]);
    // const hiddenFileInput = React.useRef(null);
    useEffect(
        ()=>{
        },[update]
    );
    
    // const handleClick = (event,index) => {
    //     console.log(event);
    //     console.log(hiddenFileInput.current);
	// 	hiddenFileInput.current.click();
	// };
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
    const onChangeAnswerTarget=(event,answer)=>{
        for(let i=0;i<curPage.widgets.length;i++){
            if(curPage.widgets[i]===selectedWidget){
                let value="";
                if(answer==="Correct"){
                    if(selectedWidget.internals.rightAnswer.actionType==='P'){
                        for(let j=0;j<pages.length;j++){
                            if(pages[j].pageName===event.target.value){
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
                            if(pages[j].pageName===event.target.value){
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
    if(selectedWidget.internals.rightAnswer.actionType==='P'){
        for(let i=0;i<pages.length;i++){
            if(pages[i]._id===selectedWidget.internals.rightAnswer.target){
                text=pages[i].pageName;
                break;
            }
        }
    }else{
        text=selectedWidget.internals.rightAnswer.target;
    }
    // console.log(textArray);
    let textArray=[]
    console.log(selectedWidget.internals.options);
    for(let i=0;i<selectedWidget.internals.options.length;i++){
        if(selectedWidget.internals.options[i].rightImage===undefined){
            textArray.push(selectedWidget.internals.options[i]);
        }else{
            console.log(i);
            let ob={"rightImage":"","wrongImage":""};
            console.log(selectedWidget.internals.options);
            if(selectedWidget.internals.options[i].rightImage!==""){
                axios_instance({
                    method: 'get',
                    url: "media/"+encodeURIComponent(selectedWidget.internals.options[i].rightImage),
                }).then((res)=>{
                    ob.rightImage=res.data.data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            if(selectedWidget.internals.options[i].wrongImage!==""){
                axios_instance({
                    method: 'get',
                    url: "media/"+encodeURIComponent(selectedWidget.internals.options[i].wrongImage),
                }).then((res)=>{
                    ob.wrongImage=res.data.data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            console.log(ob);
            textArray.push(ob);
        }
    }
    console.log(textArray);
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
                        <td><input defaultValue={text} onChange={(event)=>onChangeAnswerTarget(event,"Correct")} className='inputStyle' type="text" id="target" name="target"/></td>
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
                    {/* <tbody>
                        <tr>
                        <td><input onChange={(event)=>{onChangeSnack(event,"correct",0)}} className='inputStyle' type="text" id="correctText1" name="correctText"/></td>
                        <td><input onChange={(event)=>{onChangeSnack(event,"wrong",0)}} className='inputStyle' type="text" id="wrongText1" name="wrongText"/></td>
                        </tr>
                    </tbody> */}
                    <tbody>
                        {console.log(textArray)}
                        {
                            textArray.map((x,i) => {
                                if(x.rightImage===undefined){
                                    return (
                                        <tr key={i}>
                                            <td><input defaultValue={x.rightText} onChange={(event)=>{onChangeSnack(event,"correct",i,"text")}} className='inputStyle' type="text" name="correctText"/></td>
                                            <td><input defaultValue={x.wrongText} onChange={(event)=>{onChangeSnack(event,"wrong",i,"text")}} className='inputStyle' type="text" name="wrongText"/></td>
                                        </tr>
                                    );
                                }else{
                                    console.log(x);
                                    return (
                                        <tr key={i}>
                                            {/* <td>
                                                <button className='deleteButton' onClick={(event)=>{handleClick(event,i)}}><img src={x.rightImage} height='50px' width='50%' alt="image"/></button>
							                    <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={(event)=>{onChangeSnack(event,"correct",i,"image")}} />
                                            </td>
                                            <td>
                                                <button className='deleteButton' onClick={handleClick}><img src={x.wrongImage} height='50px' width='50%' alt="image"/></button>
							                    <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={(event)=>{onChangeSnack(event,"wrong",i,"image")}} />
                                            </td> */}
                                            <td><input onChange={(event)=>{onChangeSnack(event,"correct",i,"image")}} className='inputStyle' type="file" name="correctText"/><img src={textArray[i].rightImage} height='50px' width='50%' alt=''/></td>
                                            <td><input onChange={(event)=>{onChangeSnack(event,"wrong",i,"image")}} className='inputStyle' type="file" name="wrongText"/><img src={textArray[i].wrongImage} height='50px' width='50%' alt=''/></td>
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