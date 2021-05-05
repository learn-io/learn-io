import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import axios_instance from '../axios_instance.js';

const RightbottomBar = ({selectedWidget,curPage,add,setAdd}) =>{
    const hiddenFileInput = React.useRef(null);

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
                    for(let i=0;i<curPage.length;i++){
                        if(curPage[i]===selectedWidget){
                            curPage[i].internals.hash=res.data.hash;
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
        console.log(curPage);
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
    
    // let textInput=<div>Input Text:<input style={{width:'90%'}} type="text" id="textinput" name="textinput" onChange={onChangeText}/></div>
    let texbuttonInfo=<div style={{paddingTop:'5%'}}>
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
                                    <td><input style={{width:'100%'}} type="text" id="buttontext" name="buttontext"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
    let flashcardInfo=<div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Front</th>
                                    <th>Back</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td><input style={{width:'100%'}} type="text" id="front" name="front"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="back" name="back"/></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                    <td><input style={{width:'100%'}} type="text" id="front" name="front"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="back" name="back"/></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                    <td><input style={{width:'100%'}} type="text" id="front" name="front"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="back" name="back"/></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
    let snackInfo=<div>
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
                                <td><input style={{width:'100%'}} type="text" id="buttontext" name="buttontext"/></td>
                                <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
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
                            <tbody>
                                <tr>
                                <td><input style={{width:'100%'}} type="text" id="correctText" name="correctText"/></td>
                                <td><input style={{width:'100%'}} type="text" id="wrongText" name="wrongText"/></td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                <td><input style={{width:'100%'}} type="text" id="correctText" name="correctText"/></td>
                                <td><input style={{width:'100%'}} type="text" id="wrongText" name="wrongText"/></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
    let multipleChoiceInfo=<div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Answer</th>
                                        <th>Page(P) or Score(S)</th>
                                        <th>Target</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>Correct</td>
                                        <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                        </tr>
                                        <tr>
                                        <td>Wrong</td>
                                        <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Correct?</th>
                                        <th>Text</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><input style={{width:'100%'}} type="checkbox" id="correctText" name="correctText"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="wrongText" name="wrongText"/></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                        <td><input style={{width:'100%'}} type="checkbox" id="correctText" name="correctText"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="wrongText" name="wrongText"/></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
    let quickChoiceInfo=<div>
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
                                    <td><input style={{width:'100%'}} type="text" id="text" name="text"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                    </tr>
                                    <tr>
                                    <td><input style={{width:'100%'}} type="text" id="text" name="text"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
    let matchingInfo=<div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Answer</th>
                                    <th>Page(P) or Score(S)</th>
                                    <th>Target</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>Correct</td>
                                    <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                    </tr>
                                    <tr>
                                    <td>Wrong</td>
                                    <td><input style={{width:'100%'}} type="text" id="pors" name="pors"/></td>
                                    <td><input style={{width:'100%'}} type="text" id="target" name="target"/></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Left</th>
                                        <th>Right</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><input style={{width:'100%'}} type="text" id="leftText" name="leftText"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="rightText" name="rightText"/></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                        <td><input style={{width:'100%'}} type="text" id="leftText" name="leftText"/></td>
                                        <td><input style={{width:'100%'}} type="text" id="rightText" name="rightText"/></td>
                                        </tr>
                                    </tbody>
                                </Table>
                        </div>
    let game;
    if(selectedWidget==="")
        return <div></div>;
    if(selectedWidget.internals.widgetFlavor==="Sound"||selectedWidget.internals.widgetFlavor==="ImageBox"){
        let textforButton;
        if(selectedWidget.internals.widgetFlavor==="Sound"){
            textforButton="Upload Sound";
        }else{
            textforButton="Upload Image";
        }
        game=<div>
                <button style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}} onClick={handleClick}>{textforButton}</button>
                <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={onUploadImage} />
            </div>
    }else if(selectedWidget.internals.widgetFlavor==="TextBox"){
        game=<div>Input Text:<input defaultValue={selectedWidget.internals.text} style={{width:'90%'}} type="text" id="textinput" name="textinput" onChange={onChangeText}/></div>;
    }else if(selectedWidget.internals.widgetFlavor==="Flashcard"){
        game=flashcardInfo;
    }else if(selectedWidget.internals.widgetFlavor==="ImageButton"){
        game=<div>
                <div>
                    <button style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}} onClick={handleClick}>Upload Image</button>
                    <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={onUploadImage} />
                </div>
                {texbuttonInfo}
            </div>
    }else if(selectedWidget.internals.widgetFlavor==="MultipleChoice"){
        game=multipleChoiceInfo;
    }else if(selectedWidget.internals.widgetFlavor==="Matching"){
        game=matchingInfo;
    }else if(selectedWidget.internals.widgetFlavor==="QuickTimeChoice"){
        game=quickChoiceInfo;
    }else if(selectedWidget.internals.widgetFlavor==="TextButton"){
        game=texbuttonInfo;
    }else if(selectedWidget.internals.widgetFlavor==="Snacksnake"){
        game=snackInfo;
    }
    return (
        <div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
            {game}
        </div>
    );
}

export default RightbottomBar;