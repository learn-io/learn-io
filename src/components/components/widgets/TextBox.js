import React from 'react';
import '../../ComponentStyle.css';


const TextButton=({internals})=>
{
    return (
        <div className='flashcard'>
            <p className="widgetText">{internals.text}</p>
        </div>
    )    
}
export default TextButton;