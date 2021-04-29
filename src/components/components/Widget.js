import '../ComponentStyle.css';
import React from 'react';
import Flashcard from './Flashcard.js';
import ImageButton from './ImageButton.js';
import MultipleChoice from './MultipleChoice.js';
import ImageQuestion from './ImageQuestion.js';
import SoundQuestion from './SoundQuestion.js';
import Matching from './Matching.js';


const Widget = ({internals})=>{
  /*  let game;
    switch(internals.widgetFlavor)
    {
        case "Flashcard":
            game=<Flashcard internals={internals}/>
        break;
        case "ImageButton":
            game=<ImageButton internals={internals}/>
        break;
        case "MultipleChoice":
            game=<MultipleChoice internals={internals}/>
        break;
        case "Image":
            game=<ImageQuestion internals={internals}/>
        break;
        case "Sound":
            game=<SoundQuestion internals={internals}/>
        break;
        case "Matching":
            game=<Matching internals={internals}/>
        break;
        default:
            game=<div>No Widget!</div>
    } 
    */
    return(
        <div>
        hello
        </div>
        );
};

export default Widget;
