import React from 'react';
import '../../ComponentStyle.css';
import {Button} from 'react-bootstrap';


const TextButton=({internals, setAction, widgetClicked})=>
{
    return (
        <Button className='textbutton' onClick={()=>{setAction(internals.click); widgetClicked();}}>
            {internals.text}
        </Button>
    )    
}
export default TextButton;