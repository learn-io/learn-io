import React from 'react';
import './GridStyle.css';
import './ComponentStyle.css';
import {Row, Col} from 'react-bootstrap';
import RGL, { WidthProvider } from "react-grid-layout";
import deleteIcon from './images/delete.png';

const ReactGridLayout = WidthProvider(RGL);

const CreateController = ({isSignedIn}) =>
{
    let textBut=<button>
                    Text Button
                </button>
    let rightbarTop=<div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
                    {textBut}
                </div>
    let rightbarBottom=<div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
                        {textBut}
                    </div>
    let rightbar=<div style={{height: '100%',backgroundColor:"#9EEBCF"}}>
                    {rightbarTop}
                    {rightbarBottom}
                </div>
    let leftbarTop=<div style={{overflowY:'scroll', border: '1px solid black', height: '80%'}}>
                        {textBut}
                    </div>
    let leftbarBottom=<div style={{height: '20%'}}>
                            <button className='deleteButton'><img src={deleteIcon} height='80px' width='80px' alt="delete"/></button>
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