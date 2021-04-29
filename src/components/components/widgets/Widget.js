import '../../ComponentStyle.css';
import './widgets.css';
import React from 'react';
import Flashcard from './Flashcard.js';
import ImageButton from './ImageButton.js';
import MultipleChoice from './MultipleChoice.js';
import ImageQuestion from './ImageQuestion.js';
import SoundQuestion from './SoundQuestion.js';
import Matching from './Matching.js';

import QuickTime from './QuickTimeChoice.js';
import TextButton from './TextButton.js';


const Widget = ({internals, setAction})=>{
    let game;
    switch(internals.widgetFlavor)
    {
        case "Flashcard":
            game=<Flashcard internals={internals}/>
        break;
        case "ImageButton":
            game=<ImageButton internals={internals} setAction={setAction}/>
        break;
        case "MultipleChoice":
            game=<MultipleChoice internals={internals} setAction={setAction}/>
        break;
        case "Image":
            game=<ImageQuestion internals={internals}/>
        break;
        case "Sound":
            game=<SoundQuestion internals={internals}/>
        break;
        case "Matching":
            game=<Matching internals={internals} setAction={setAction}/>
        break;
        case "QuickTimeChoice":
            game=<QuickTime internals={internals} setAction={setAction}/>
        break;
        case "TextButton":
            game=<TextButton internals={internals} setAction={setAction}/>
        break;
        default:
            game=<div>No Widget!</div>
    } 
    
    return(
        game
        );
};

export default Widget;
