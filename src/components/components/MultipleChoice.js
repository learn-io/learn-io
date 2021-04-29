import React, { useEffect,useState} from 'react';
import '../ComponentStyle.css';
import {Button} from 'react-bootstrap';

const MultipleChoice=({widget,widgetIndex,setWidgetIndex})=>{
    const [options,setOptions]=useState([]);
    const [answer,setAnswer]=useState([]);
    useEffect(
        ()=>{
            if(widget===''||widget===undefined)
                return;
            setOptions(widget.options);
        },[widget]   
	);
    const onCheckValue=(i)=>{
        if(answer.includes(i)){
            let arr=answer.filter((x)=>x!==i);
            setAnswer(arr);
        }else{
            answer.push(i);
        }
    }
    const checkResult=(setWidgetIndex,widgetIndex)=>{
        for(let i=0;i<options.length;i++){
            if(options[i].isCorrect){
                if(answer.includes(i)){
                    console.log(options[i].option);
                }
            }
        }
        setWidgetIndex(widgetIndex+1)
    }
    let multipleChoice;
    if(options.length===0){
        multipleChoice=<div className='flashcard'/>;
    }else{
        let opt=options.map((x,i) => {
            return (
                <label className="container" key={i}>{options[i].option}
                    <div>
                        <input type="checkbox" value={options[i].option}/>
                        <span className="checkmark" onClick={()=>{onCheckValue(i)}}/>
                    </div>
                </label>
            );
        })
        multipleChoice=<div className='flashcard' style={{paddingTop:'1%'}}>
                            <p>Think you're good enough to identify all the Botany Berries?</p>
                            <p style={{paddingTop:'5%'}}>Select all that apply!</p>
                            <div id="check" style={{paddingTop:'5%'}}>
                                {opt}
                            </div>
                        </div>;
    }
    return <div >
                {multipleChoice}
                <div style={{marginTop: '1%'}} className='clearfix'>
                    <Button style={{display:'center'}} className='playButton' onClick={()=>{checkResult(setWidgetIndex,widgetIndex)}}> Next Page</Button> 
				</div>
            </div>
}
export default MultipleChoice;