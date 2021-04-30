import React from 'react';
import '../../ComponentStyle.css';
import {Button} from 'react-bootstrap';


const TextButton=({internals, setAction})=>
{
    return (
        <Button className='textbutton' onClick={()=>{setAction(internals.click)}}>
            {internals.text}
        </Button>
    )    
}
export default TextButton;