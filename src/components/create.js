import React, { useState, useEffect } from 'react';
import './GridStyle.css';
import './ComponentStyle.css';
import {Row, Col} from 'react-bootstrap';
import RGL, { WidthProvider } from "react-grid-layout";
import deleteIcon from './images/delete.png';
import saveIcon from './images/save.png';
// import axios_instance from './axios_instance.js';
// import flashcard from './components/widgets/Flashcard';
// import TextButton from './components/widgets/TextButton';

const ReactGridLayout = WidthProvider(RGL);

const CreateController = ({isSignedIn}) =>
{
    // const [widgets, setWidgets] = useState('');
    // useEffect(
    //     ()=>{
	// 		axios_instance({
    //             method: 'get',
    //             url: "widgets/"
    //         }).then(function(response){
    //             setWidgets(response.data);
    //         }).catch(function(err){
    //             console.log(err);
    //         });
    //     },[]
    // );
    // console.log(widgets);
    
    // let textBut=<button>
    //                 Text Button
    //             </button>
    let textBut=<button style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}}>Text Button</button>
    let textBox=<div style={{backgroundColor:'#96CCFF',borderRadius: '.1rem',marginTop: '10%',width:'80%',height:'50px', marginLeft:'10%'}}>
                    <p>Test Box</p>
                </div>
    let rightbarTop=<div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
                    {textBut}
                    {textBox}
                </div>
    let rightbarBottom=<div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
                        {textBut}
                    </div>
    let rightbar=<div style={{height: '100%',backgroundColor:"#9EEBCF"}}>
                    {rightbarTop}
                    {rightbarBottom}
                </div>
    let leftbarTop=<div style={{overflowY:'scroll', border: '1px solid black', height: '80%'}}>
                        <button className='deleteButton'><img src={saveIcon} height='40px' width='40px' alt="save"/></button>
                    </div>
    let leftbarBottom=<div style={{height: '20%'}}>
                            <button style={{paddingTop:'25%'}} className='deleteButton'><img src={deleteIcon} height='80px' width='80px' alt="delete"/></button>
                        </div>
    
    let leftbar=<div style={{height: '100%',backgroundColor:"#9EEBCF"}}>
                    {leftbarTop}
                    {leftbarBottom}
                </div>
    return(
        <div className="create">
            <Row>
                <Col>{leftbar}</Col>
                <Col xs={9}><ReactGridLayout 
                className="grid" 
                compactType={null}
                cols={8}
                /></Col>
                <Col >{rightbar}</Col>
            </Row>
        </div>
        );
}

export default CreateController;