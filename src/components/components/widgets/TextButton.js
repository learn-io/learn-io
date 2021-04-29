import React, { useEffect,useState} from 'react';
import '../../ComponentStyle.css';
import {Button} from 'react-bootstrap';
import leftIcon from '../../images/left.png';
import rightIcon from '../../images/right.png';
import turnIcon from '../../images/turn.png';


const TextButton=({internals, setAction})=>
{
    return (
        <Button className='textbutton' onClick={()=>{setAction(internals.click)}}>
            {internals.text}
        </Button>
    )    
}
export default TextButton;