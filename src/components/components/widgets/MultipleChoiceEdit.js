import React from 'react';
import '../../ComponentStyle.css';
import {Button} from 'react-bootstrap';
const MultipleChoiceEdit=({internals})=>{
    let multipleChoice;
    if(internals.options.length===0){
        multipleChoice=<div className='flashcard'/>;
    }else{
        let opt=internals.options.map((x,i) => {
            return (
                <label className="container" key={i} >{internals.options[i].option}
                    <div>
                        <input type="checkbox" checked={internals.options[i].isCorrect}/>
                        <span className="checkmark"/>
                    </div>
                </label>
            );
        })
        multipleChoice=<div className='flashcard'>
                            {/* <p>Think you're good enough to identify all the Botany Berries?</p>
                            <p style={{paddingTop:'5%'}}>Select all that apply!</p> */}
                            <div id="check" style={{paddingTop:'5%'}}>
                                {opt}
                            </div>
                            <Button style={{display:'center'}} className='playButton'> {internals.buttonText}</Button> 
                        </div>;
    }
    return(multipleChoice);
}
export default MultipleChoiceEdit;