import React, {useEffect, useState} from 'react';
import {Table,Dropdown} from 'react-bootstrap';
import axios_instance from '../axios_instance.js';
import EditFlashcard from './editwidgets/EditFlashcard.js';
import EditMatching from './editwidgets/EditMatching.js';
import EditMultipleChoice from './editwidgets/EditMultipleChoice.js';
import EditQuickTimeChoice from './editwidgets/EditQuickTimeChoice.js';
import EditTextButton from './editwidgets/EditTextButton.js';
import EditSnackSnake from './editwidgets/EditSnackSnake.js';

const RightbottomBar = ({curPage, selectType, selected, add,setAdd,pages, updatePage}) =>{ //selectedWidget,curPage
    const [update,setUpdate]= useState(0);
    useEffect(
        ()=>{
        },[update]
    );
    const hiddenFileInput = React.useRef(null);
    if(selected === undefined && selectType !== "Module"){
        return (
            <div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>

            </div>
        );
    }
    let selectedInfo = "";
    
    if(selectType === "Module"){
        return (
        <div>
            <div>
                <input type="radio" id="Edit" name="editmode" onChange={()=>{setAdd(-1)}} checked={add===-1} value="-1"/>
                Edit Mode
            </div>
            <div>
                <input type="radio" id="Drag" name="editmode" onChange={()=>{setAdd(0)}} checked={add===0} value="0"/>
                Drag Mode
            </div>
            <div>
                <input type="radio" id="Connect" name="editmode" onChange={()=>{setAdd(1)}} checked={add===1} value="1"/>
                Connect Mode
            </div>
        </div>
        )

    } else if (selectType === "Page"){
        const onChangeName=(event)=>{
            // console.log(curPage);
            selected.pageName = event.target.value;
            // console.log(curPage);
            setAdd(add+1);
            // console.log(event.target.value);
        }
        const onChangeEntry=(event)=>{
            selected.entry = !selected.entry;
            setAdd(add+1);
        }
        const onChangeRank=(event)=>{
            selected.rank = event.target.value;
            setAdd(add+1);
        }

        let pageName =  <label>
                            Page Name:
                            <input style={{width:'90%'}} type="text" id="pageNameInput" name="pageNameInput" value={selected.pageName} onChange={onChangeName}/>
                        </label>;
        let entry = <label>
                        Entry:
                        <input style={{width:'90%'}} type="checkbox" id="entryInput" name="entryInput" checked={selected.entry} onChange={onChangeEntry}/>
                    </label>;
        let rank = <label>
                        Rank:
                        <input style={{width:'90%'}} type="number" id="rankInput" name="textinput" value={selected.rank} onChange={onChangeRank}/>
                    </label>;
        selectedInfo=<div> {pageName} <br/> {rank} <br/> {entry} </div>;
    } else if (selectType === "Widget"){
        if(curPage._id === undefined){
            return (
                <div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
    
                </div>
            );
        }
        // console.log(pages);
        const handleClick = (event) => {
            hiddenFileInput.current.click();
        };

        //need to fix
        const onUploadImage=(event)=>{
            // console.log("upload");
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
                            if(curPage.widgets[i]===selected){
                                curPage.widgets[i].internals.hash=res.data.hash;
                                break;
                            }
                        }
                        setAdd(add+1);
                    }).catch((e)=>{
                        console.log(e);
                    })
                };
                reader.readAsDataURL(imageFile);
            }
        }

        const onChangeText=(event)=>{
            // console.log(curPage);
            for(let i=0;i<curPage.widgets.length;i++){
                if(curPage.widgets[i]===selected){
                    curPage.widgets[i].internals.text=event.target.value;
                    break;
                }
            }
            setAdd(add+1);
            // console.log(event.target.value);
        }
        
        const onChangePorS=(value)=>{
            for(let i=0;i<curPage.widgets.length;i++){
                if(curPage.widgets[i]===selected){
                    curPage.widgets[i].internals.click.actionType=value;
                    curPage.widgets[i].internals.click.target="";
                    break;
                }
            }
            setUpdate(update+1);
        }

        const onChangeTarget=(event, pageN)=>{
            for(let i=0;i<curPage.widgets.length;i++){
                let value="";
                if(curPage.widgets[i]===selected){
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
        // let textInput=<div>Input Text:<input style={{width:'90%'}} type="text" id="textinput" name="textinput" onChange={onChangeText}/></div>
        let game;
            // let textInput=<div>Input Text:<input style={{width:'90%'}} type="text" id="textinput" name="textinput" onChange={onChangeText}/></div>
        if(selected==="")
            return <div></div>;
        if(selected.internals.widgetFlavor==="Sound"||selected.internals.widgetFlavor==="ImageBox"){
            let textforButton;
            if(selected.internals.widgetFlavor==="Sound"){
                textforButton="Upload Sound";
            }else{
                textforButton="Upload Image";
            }
            game=<div>
                    <button style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}} onClick={handleClick}>{textforButton}</button>
                    <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={onUploadImage} />
                </div>
        }else if(selected.internals.widgetFlavor==="TextBox"){
            game=<div>Input Text:<input defaultValue={selected.internals.text} style={{width:'90%'}} type="text" id="textinput" name="textinput" onChange={onChangeText}/></div>;
        }else if(selected.internals.widgetFlavor==="Flashcard"){
            game=<EditFlashcard selectedWidget={selected} curPage={curPage} add={add} setAdd={setAdd}/>
        }else if(selected.internals.widgetFlavor==="ImageButton"){
            let text="";
            if(selected.internals.click.actionType==='P'){
                for(let i=0;i<pages.length;i++){
                    if(pages[i]._id===selected.internals.click.target){
                        text=pages[i].pageName;
                        break;
                    }
                }
            }else{
                text=selected.internals.click.target;
            }
            let targetPart;
            // console.log(pages);
            if(selected.internals.click.actionType==="P"){
                let title="";
                for(let k=0;k<pages.length;k++){
                    if(pages[k]._id===selected.internals.click.target){
                        title=pages[k].pageName;
                    }
                }
                targetPart=<Dropdown>
                                <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                    {title}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        pages.map((x,i)=>{
                                            return(
                                                <Dropdown.Item onClick={(event)=>onChangeTarget(event,x.pageName)} key={i}>{x.pageName}</Dropdown.Item>
                                            );
                                        })
                                    }
                                    {/* <Dropdown.Item>P</Dropdown.Item>
                                    <Dropdown.Item>S</Dropdown.Item> */}
                                    {/* <Dropdown.Item onClick={()=>{onChangeLimit(20)}}>20</Dropdown.Item> */}
                                </Dropdown.Menu>
                            </Dropdown>
            }else{
                targetPart=<input defaultValue={text} style={{border:'none',backgroundColor:"transparent",width:'100%'}} onChange={(event)=>onChangeTarget(event)} type="text" id="target" name="target"/>
            }
            game=<div>
                    <div>
                        <button style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}} onClick={handleClick}>Upload Image</button>
                        <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={onUploadImage} />
                    </div>
                    <div style={{paddingTop:'5%'}}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Page(P) or Score(S)</th>
                                        <th>Target</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                                    {selected.internals.click.actionType}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={()=>onChangePorS("P")}>P</Dropdown.Item>
                                                    <Dropdown.Item onClick={()=>onChangePorS("S")}>S</Dropdown.Item>
                                                    {/* <Dropdown.Item onClick={()=>{onChangeLimit(20)}}>20</Dropdown.Item> */}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {/* <input defaultValue={selected.internals.click.actionType} style={{border:'none',backgroundColor:"transparent",width:'100%'}} onChange={(event)=>onChangePorS(event)} type="text" id="pors" name="pors"/> */}
                                        </td>
                                        <td style={{width:'60%'}}>{targetPart}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                </div>
        }else if(selected.internals.widgetFlavor==="MultipleChoice"){
            game=<EditMultipleChoice selectedWidget={selected} curPage={curPage} add={add} setAdd={setAdd} pages={pages}/>
        }else if(selected.internals.widgetFlavor==="Matching"){
            game=<EditMatching selectedWidget={selected} curPage={curPage} add={add} setAdd={setAdd} pages={pages}/>
        }else if(selected.internals.widgetFlavor==="QuickTimeChoice"){
            game=<EditQuickTimeChoice selectedWidget={selected} curPage={curPage} add={add} setAdd={setAdd} pages={pages}/>
        }else if(selected.internals.widgetFlavor==="TextButton"){
            game=<EditTextButton selectedWidget={selected} curPage={curPage} add={add} setAdd={setAdd} pages={pages}/>
        }else if(selected.internals.widgetFlavor==="Snacksnake"){
            game=<EditSnackSnake selectedWidget={selected} curPage={curPage} add={add} setAdd={setAdd} pages={pages} updatePage={updatePage}/>
        }
        selectedInfo = game;
    } else {
        return(
            <div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>

            </div>
        )
    }
    
    return (
        <div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
            {selectedInfo}
            <div style={{height:"20px"}}></div>
        </div>
    );
}

export default RightbottomBar;