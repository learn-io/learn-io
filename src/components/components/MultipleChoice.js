import React, { useEffect,useState} from 'react';
import '../ComponentStyle.css';
import {Button} from 'react-bootstrap';

const MultipleChoice=({widget,widgetIndex,setWidgetIndex})=>{
    const [options,setOptions]=useState([]);
    useEffect(
        ()=>{
            if(widget===''||widget===undefined)
                return;
            setOptions(widget.options);
        },[widget]   
	);
    let multipleChoice=<div className='flashcard'/>;
    if(options.length===0){
        multipleChoice=<div className='flashcard'/>;
    }else{
        let opt=options.map((x,i) => {
            return (
                <label className="container" key={i}>{options[i].option}
                    <div>
                        <input type="checkbox"/>
                        <span className="checkmark"/>
                    </div>
                </label>
            );
        })
        multipleChoice=<div className='flashcard' style={{paddingTop:'1%'}}>
                            <p>Think you're good enough to identify all the Botany Berries?</p>
                            <p style={{paddingTop:'5%'}}>Select all that apply!</p>
                            <div style={{paddingTop:'5%'}}>
                                {opt}
                            </div>
                        </div>;
    }
    return <div >
                {multipleChoice}
                <div style={{marginTop: '1%'}} className='clearfix'>
                    <Button style={{display:'center'}} className='playButton' onClick={()=>{setWidgetIndex(widgetIndex+1)}}> Next Page</Button> 
				</div>
            </div>
}
export default MultipleChoice;