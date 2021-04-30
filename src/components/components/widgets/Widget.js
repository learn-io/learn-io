import '../../ComponentStyle.css';
import './widgets.css';
import React from 'react';
import Flashcard from './Flashcard.js';
import MultipleChoice from './MultipleChoice.js';
import ImageQuestion from './ImageQuestion.js';
import SoundQuestion from './SoundQuestion.js';
import Matching from './Matching.js';
import TextBox from './TextBox.js';
import Snacksnake from './Snacksnake.js';
import ImageBox from './ImageBox.js';
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
            game=<ImageQuestion internals={internals} setAction={setAction}/>
        break;
        case "MultipleChoice":
            game=<MultipleChoice internals={internals} setAction={setAction}/>
        break;
        case "Sound":
            game=<SoundQuestion internals={internals}/>
        break;
        case "Matching":
            game=<Matching internals={internals} setAction={setAction}/>
        break;
        case "ImageBox":
            game=<ImageBox internals={internals}/>
        break;
        case "QuickTimeChoice":
            game=<QuickTime internals={internals} setAction={setAction}/>
        break;
        case "TextBox":
            game=<TextBox internals={internals}/>
        break;
        case "TextButton":
            game=<TextButton internals={internals} setAction={setAction}/>
        break;
        case "Snacksnake":
            game=<Snacksnake internals={internals} setAction={setAction}/>
        break;
        default:
            game=<div>No Widget!</div>
    } 
    
    return(
        game
        );
};

export default Widget;
