import React from 'react';
import {Table} from 'react-bootstrap';
import axios_instance from '../axios_instance.js';
import EditFlashcard from './editwidgets/EditFlashcard.js';
import EditMatching from './editwidgets/EditMatching.js';
import EditMultipleChoice from './editwidgets/EditMultipleChoice.js';
import EditQuickTimeChoice from './editwidgets/EditQuickTimeChoice.js';
import EditTextButton from './editwidgets/EditTextButton.js';
import EditSnackSnake from './editwidgets/EditSnackSnake.js';

const RightbottomBar = ({curPage, selectType, selected, add,setAdd,pages}) =>{ //selectedWidget,curPage
    const hiddenFileInput = React.useRef(null);
    if(selected === undefined){
        return (
            <div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>

            </div>
        );
    }
    // console.log("selected")
    // console.log(selected);
    let selectedInfo = "";
    
    if(selectType === "Module"){

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
        
        const onChangePorS=(event)=>{
            for(let i=0;i<curPage.widgets.length;i++){
                if(curPage.widgets[i]===selected){
                    curPage.widgets[i].internals.click.actionType=event.target.value;
                    break;
                }
            }
        }

        const onChangeTarget=(event)=>{
            for(let i=0;i<curPage.widgets.length;i++){
                let value="";
                if(curPage.widgets[i]===selected){
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
                                        <td><input defaultValue={selected.internals.click.actionType} style={{border:'none',backgroundColor:"transparent",width:'100%'}} onChange={(event)=>onChangePorS(event)} type="text" id="pors" name="pors"/></td>
                                        <td><input defaultValue={text} style={{border:'none',backgroundColor:"transparent",width:'100%'}} onChange={(event)=>onChangeTarget(event)} type="text" id="target" name="target"/></td>
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
            game=<EditSnackSnake selectedWidget={selected} curPage={curPage} add={add} setAdd={setAdd} pages={pages}/>
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
        </div>
    );
}

export default RightbottomBar;