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
import MatchingEdit from './MatchingEdit.js'
import MultipleChoiceEdit from './MultipleChoiceEdit.js';


const Widget = ({internals, setAction,isEdit,widgetClicked})=>{
    let game;
    switch(internals.widgetFlavor)
    {
        case "Flashcard":
            game=<Flashcard internals={internals} widgetClicked={widgetClicked}/>
        break;
        case "ImageButton":
            game=<ImageQuestion internals={internals} hash={internals.hash} setAction={setAction} widgetClicked={widgetClicked}/>
        break;
        case "MultipleChoice":
            if(isEdit){
                game=<MultipleChoiceEdit internals={internals} setAction={setAction}/>
            }else{
                game=<MultipleChoice internals={internals} setAction={setAction} widgetClicked={widgetClicked}/>
            }
        break;
        case "Sound":
            game=<SoundQuestion internals={internals} hash={internals.hash} widgetClicked={widgetClicked}/>
        break;
        case "Matching":
            if(isEdit){
                game=<MatchingEdit internals={internals} setAction={setAction}/>
            }else{
                game=<Matching internals={internals} setAction={setAction} widgetClicked={widgetClicked}/>
            }
            
        break;
        case "ImageBox":
            game=<ImageBox internals={internals} hash={internals.hash}/>
        break;
        case "QuickTimeChoice":
            game=<QuickTime internals={internals} setAction={setAction} widgetClicked={widgetClicked}/>
        break;
        case "TextBox":
            game=<TextBox internals={internals} widgetClicked={widgetClicked}/>
        break;
        case "TextButton":
            game=<TextButton internals={internals} setAction={setAction} widgetClicked={widgetClicked}/>
        break;
        case "Snacksnake":
            game=<Snacksnake internals={internals} setAction={setAction} widgetClicked={widgetClicked}/>
        break;
        default:
            game=<div>No Widget!</div>
    } 
    
    return(
        game
        );
};

export default Widget;
