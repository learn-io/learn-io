import React from 'react';
import {Table} from 'react-bootstrap';
import axios_instance from '../axios_instance.js';

const RightbottomBar = ({selectedWidget,curPage}) =>{
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

    //need to fix
    const onUploadImage=(event)=>{
        console.log("upload");
        // if (event.target.files && event.target.files[0]) {
        //     let imageFile = event.target.files[0];
        //     let imageExtension = event.target.files[0].type;
                
		// 	let reader = new FileReader();
		// 	reader.onload = (e) => {
		// 		let oldData = ImageData;
		// 		setImageData(e.target.result);
		// 		let form = new FormData();
		// 		form.append('file', e.target.result);
		// 		form.append('extension', imageExtension);
		// 		axios_instance({
		// 			method: 'post',
		// 			url: "media/",
		// 			data: form,
		// 			headers: {
		// 				'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
		// 			},
		// 		}).then((res)=>{
		// 			setImageHash(res.data.hash);
		// 		}).catch((e)=>{
		// 			setImageData(oldData);
		// 		})
		// 	};
		// 	reader.readAsDataURL(imageFile);
		// }
    }
    let textforButton;
    if(selectedWidget==="Sound"){
        textforButton="Upload Sound";
    }else{
        textforButton="Upload Image";
    }
    let uploadButton=<div>
                        <button style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}} onClick={handleClick}>{textforButton}</button>
                        <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={onUploadImage} />
                    </div>
    let textInput=<div>Input Text:<input style={{width:'90%'}} type="text" id="textinput" name="textinput"/></div>
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
    switch(selectedWidget.internals.widgetFlavor)
    {
        case "Flashcard":
            game=flashcardInfo;
        break;
        case "ImageButton":
            game=<div>
                    {uploadButton}
                    {texbuttonInfo}
                </div>
        break;
        case "MultipleChoice":
            game=multipleChoiceInfo;
        break;
        case "Sound":
            game=uploadButton;
        break;
        case "Matching":
            game=matchingInfo;
        break;
        case "ImageBox":
            game=uploadButton;
        break;
        case "QuickTimeChoice":
            game=quickChoiceInfo;
        break;
        case "TextBox":
            game=textInput;
        break;
        case "TextButton":
            game=texbuttonInfo;
        break;
        case "Snacksnake":
            game=snackInfo;
        break;
        default:
            game=<div></div>
    } 
    return (
        <div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
            {game}
        </div>
    );
}

export default RightbottomBar;