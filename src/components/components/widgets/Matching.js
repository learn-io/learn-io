import React, { useRef,useEffect,useState} from 'react';
import '../../ComponentStyle.css';
import {Button} from 'react-bootstrap';

const Matching=({internals,setAction})=>{
    const [options,setOptions]=useState([]);
    const canvasRef = useRef();
    const [selectLeft,setSelectLeft]=useState(-1);
    const [selectRight,setSelectRight]=useState(-1);
    const [leftIndex]=useState([]);
    const [rightIndex]=useState([]);
    const [leftSide,setLeftSide]=useState([]);
    const [rightSide,setRightSide]=useState([]);
    const [update,setUpdate]=useState(0);
    const [result,setResult]=useState(-1);
    useEffect(
        ()=>{
            if(internals===''||internals===undefined)
                return;
            setOptions(internals.options);
        },[internals]   
	);
    useEffect(
        ()=>{
            if(options.length===0)
                return;
            let ctx = canvasRef.current.getContext('2d');
            if(!ctx)
                return;
            ctx.canvas.width = 300;
            ctx.canvas.height = 200;
            if(leftSide.length===0||rightSide.length===0){
                for(let i=0;i<options.length;i++){
                    leftSide.push(options[i].left);
                    rightSide.push(options[i].right);
                }
                setLeftSide(leftSide.sort((a, b) => 0.5 - Math.random()));
                setRightSide(rightSide.sort((a, b) => 0.5 - Math.random()));
            }
            for(let i=0;i<options.length;i++){
                writeModule(options,leftSide,rightSide,i, selectLeft,selectRight,leftIndex,rightIndex);
            }
        },[options,selectLeft,selectRight,leftIndex,rightIndex, leftSide, rightSide]   
	);
    
    const writeModule = (options,leftSide,rightSide,i,selectLeft,selectRight,leftIndex,rightIndex) => {
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        // const {left,right}=options;
        const left=leftSide[i];
        const right=rightSide[i];
        // const { fontSize = 15, fontFamily = 'Arial', color = 'blue', textBaseline = 'middle' }=style ;

        // left text
        if(leftIndex.includes(i)||selectLeft===i){
            ctx.beginPath();
            ctx.font = "15px Arial";
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'grey';
            ctx.fillText(left,80,30*(i+1));
        }else{
            ctx.beginPath();
            ctx.font = "15px Arial";
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'black';
            ctx.fillText(left,80,30*(i+1));
        }
        

        // right text
        if(rightIndex.includes(i)||selectRight===i){
            ctx.beginPath();
            ctx.font = "15px Arial";
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'grey';
            ctx.fillText(right,220,30*(i+1));
        }else{
            ctx.beginPath();
            ctx.font = "15px Arial";
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'black';
            ctx.fillText(right,220,30*(i+1));
        }
        
	}

    useEffect(
        ()=>{
            if(leftIndex.length===0||rightIndex.length===0)
                return;
            let ctx = canvasRef.current.getContext('2d');
            if(!ctx)
                return;
            let size;
            if(options.length<leftIndex.length){
                size=options.length;
            }else{
                size=leftIndex.length
            }
            for(let i=0;i<size;i++){
                ctx.beginPath();
                ctx.moveTo(100 , 30*(leftIndex[i]+1));
                ctx.lineTo(200, 30*(rightIndex[i]+1));
                ctx.stroke();
            }
        },[update,selectLeft,selectRight,leftIndex,rightIndex,options.length]   
	);
    const checkResult =()=>{
        let result=options.length;
        if(result!==leftIndex.length){
            result=result-(result-leftIndex.length);
        }
        for(let i=0;i<leftIndex.length;i++){
            for(let j=0;j<options.length;j++){
                if(options[j].left===leftSide[leftIndex[i]]){
                    if(options[j].right!==rightSide[rightIndex[i]]){
                        result--;
                    }
                    break;
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
    const handleCanvasClick=(e)=>
    {
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        var rect = ctx.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // let radius = 30;
        for (let i = 0; i < options.length; i++)
        {
            if(x<100){
                // left side
                if(y<=(30*(i+1)+10)){
                    if(!leftIndex.includes(i)){
                        if(selectLeft>=0){
                            alert("Checked Left again, reselect!!" + leftSide[i]);
                            setSelectLeft(-1);
                        }else{
                            if(selectRight>=0){
                                // add answer
                                leftIndex.push(i);
                                rightIndex.push(selectRight);
                                setUpdate(update+1);
                                setSelectLeft(-1);
                                setSelectRight(-1);
                            }else{
                                setSelectLeft(i);
                            }
                        }
                    }
                    return;
                }
                
            }else if(x>200){
                //right side
                if(y<=(30*(i+1)+10)){
                    if(!rightIndex.includes(i)){
                        if(selectRight>=0){
                            alert("Checked Left again, reselect!! " + rightSide[i]);
                            setSelectRight(-1);
                        }else{
                            if(selectLeft>=0){
                                // add answer
                                leftIndex.push(selectLeft);
                                rightIndex.push(i);
                                setUpdate(update+1);
                                setSelectLeft(-1);
                                setSelectRight(-1);
                            }else{
                                setSelectRight(i);
                            }
                        }
                    }
                    return;
                }
                
            }
            
            // let distance;
            // // check left
            // if(x<150){
            //     distance = Math.pow(x - 60, 2) + Math.pow(y - (30*(i+1)), 2);
            // }else{
            //     distance = Math.pow(x - 220, 2) + Math.pow(y - (30*(i+1)), 2);
            // }
            // if (  distance < Math.pow(radius,2) )
            // {
            //     if(x<150){
            //         // check if already have this answer
            //         if(!leftIndex.includes(i)){
            //             if(selectLeft>=0){
            //                 alert("Checked Left again, reselect!!" + options[i].left + " at distance " + distance);
            //                 setSelectLeft(-1);
            //             }else{
            //                 if(selectRight>=0){
            //                     // add answer
            //                     leftIndex.push(i);
            //                     rightIndex.push(selectRight);
            //                     setUpdate(update+1);
            //                     setSelectLeft(-1);
            //                     setSelectRight(-1);
            //                 }else{
            //                     setSelectLeft(i);
            //                 }
            //             }
            //         }
            //     }else{
            //         // check if already have this answer
            //         if(!rightIndex.includes(i)){
            //             if(selectRight>=0){
            //                 alert("Checked Left again, reselect!! " + options[i].right + " at distance " + distance);
            //                 setSelectRight(-1);
            //             }else{
            //                 if(selectLeft>=0){
            //                     // add answer
            //                     leftIndex.push(selectLeft);
            //                     rightIndex.push(i);
            //                     setUpdate(update+1);
            //                     setSelectLeft(-1);
            //                     setSelectRight(-1);
            //                 }else{
            //                     setSelectRight(i);
            //                 }
            //             }
            //         }
            //     }
                
            //     return;
            // }
        }
    }
    let matching;
    if(options.length===0){
        matching=<div className='flashcard'/>;
    }else if(result>=0){
        matching=<div className='flashcard'>
                    <p className='showResult'>{result} answer(s) correct!</p>
                </div>
    }else{
        matching=<div className='flashcard'>
                    <canvas style={{backgroundColor:'#9EEBCF'}} className='canvasStyle' ref={canvasRef} onClick={handleCanvasClick}/>
                    <Button style={{display:'center'}} className='cavasButton'  onClick={()=>{checkResult()}}> {internals.buttonText}</Button> 
                </div>;
    }
    return (matching);
}
export default Matching;