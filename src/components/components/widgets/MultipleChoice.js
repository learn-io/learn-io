import React, { useEffect,useState} from 'react';
import '../../ComponentStyle.css';
import {Button} from 'react-bootstrap';
const MultipleChoice=({internals,setAction})=>{
    const [options,setOptions]=useState([]);
    const [answer,setAnswer]=useState([]);
    const [result,setResult]=useState(-1);
    useEffect(
        ()=>{
            if(internals===''||internals===undefined)
                return;
            setOptions(internals.options);
        },[internals]   
	);
    const onCheckValue=(i)=>{
        if(answer.includes(i)){
            let arr=answer.filter((x)=>x!==i);
            setAnswer(arr);
        }else{
            answer.push(i);
        }
    }
    const checkResult=()=>{
        let result=options.length;
        for(let i=0;i<options.length;i++){
            if(options[i].isCorrect){
                if(!answer.includes(i)){
                    result--;
                }
            }else{
                if(answer.includes(i)){
                    result--;
                }
            }
        }
        setResult(result);
        if(result===options.length){
            setAction(internals.rightAnswer);
        }else{
            setAction(internals.wrongAnswer);
        }
    }
    let multipleChoice;
    if(options.length===0){
        multipleChoice=<div className='flashcard'/>;
    }else if(result>=0){
        multipleChoice=<div className='flashcard'>
                            <p className='showResult'>{result} answer(s) correct!</p>
                        </div>
    }else{
        let opt=options.map((x,i) => {
            return (
                <label className="container" key={i} >{options[i].option}
                    <div onClick={()=>{onCheckValue(i)}}>
                        <input type="checkbox" value={options[i].option}/>
                        <span className="checkmark" onClick={()=>{onCheckValue(i)}}/>
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
                            <Button style={{display:'center'}} className='playButton' onClick={()=>{checkResult()}}> {internals.buttonText}</Button> 
                        </div>;
    }
    return(multipleChoice);
    // return <div >
    //             {multipleChoice}
    //         </div>
}
export default MultipleChoice;