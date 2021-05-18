import React from 'react';
import '../../ComponentStyle.css';
import {Button} from 'react-bootstrap';


const TextButton=({internals, setAction, widgetClicked,isEdit})=>
{
    return (
        <Button className='textbutton' onClick={()=>{setAction(internals.click); if(!isEdit){widgetClicked();}}}>
            {internals.text}
        </Button>
    )    
}
export default TextButton;