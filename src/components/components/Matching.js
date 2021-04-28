import React, { useRef,useEffect,useState} from 'react';
import '../ComponentStyle.css';
import {Button} from 'react-bootstrap';

const Matching=({widget,widgetIndex,setWidgetIndex})=>{
    const [options,setOptions]=useState([]);
    const canvasRef = useRef();
    const [selectLeft,setSelectLeft]=useState(-1);
    const [selectRight,setSelectRight]=useState(-1);
    const [leftIndex]=useState([]);
    const [rightIndex]=useState([]);
    const [update,setUpdate]=useState(0);
    useEffect(
        ()=>{
            if(widget===''||widget===undefined)
                return;
            setOptions(widget.options);
        },[widget]   
	);
    useEffect(
        ()=>{
            if(options.length===0)
                return;
            let ctx = canvasRef.current.getContext('2d');
            if(!ctx)
                return;
            ctx.canvas.width = 500;
            ctx.canvas.height = 400;
            for(let i=0;i<options.length;i++){
                writeModule(options[i],i, selectLeft,selectRight,leftIndex,rightIndex);
            }
        },[options,selectLeft,selectRight,leftIndex,rightIndex]   
	);
    
    const writeModule = (options,i,selectLeft,selectRight,leftIndex,rightIndex) => {
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        const {left,right}=options;
        // const { fontSize = 15, fontFamily = 'Arial', color = 'blue', textBaseline = 'middle' }=style ;

        // left text
        if(leftIndex.includes(i)||selectLeft===i){
            ctx.beginPath();
            ctx.font = "15px Arial";
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'grey';
            ctx.fillText(left,150,50*(i+1));
        }else{
            ctx.beginPath();
            ctx.font = "15px Arial";
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'black';
            ctx.fillText(left,150,50*(i+1));
        }
        

        // right text
        if(rightIndex.includes(i)||selectRight===i){
            ctx.beginPath();
            ctx.font = "15px Arial";
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'grey';
            ctx.fillText(right,350,50*(i+1));
        }else{
            ctx.beginPath();
            ctx.font = "15px Arial";
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'black';
            ctx.fillText(right,350,50*(i+1));
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
                ctx.moveTo(160 , 50*(leftIndex[i]+1));
                ctx.lineTo(340, 50*(rightIndex[i]+1));
                ctx.stroke();
            }
        },[update,selectLeft,selectRight,leftIndex,rightIndex,options.length]   
	);

    const handleCanvasClick=(e)=>
    {
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        var rect = ctx.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        let radius = 50;
        for (let i = 0; i < options.length; i++)
        {
            let distance;
            // check left
            if(x<250){
                distance = Math.pow(x - 150, 2) + Math.pow(y - (50*(i+1)), 2);
            }else{
                distance = Math.pow(x - 350, 2) + Math.pow(y - (50*(i+1)), 2);
            }
            if (  distance < Math.pow(radius,2) )
            {
                if(x<250){
                    // check if already have this answer
                    if(!leftIndex.includes(i)){
                        if(selectLeft>=0){
                            alert("Checked Left again, reselect!!" + options[i].left + " at distance " + distance);
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
                }else{
                    // check if already have this answer
                    if(!rightIndex.includes(i)){
                        if(selectRight>=0){
                            alert("Checked Left again, reselect!! " + options[i].right + " at distance " + distance);
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
                }
                
                return;
            }
        }
    }
    let matching;
    if(options.length===0){
        matching=<div className='flashcard'/>;
    }else{
        matching=<div className='flashcard' style={{paddingTop:'1%'}}>
                            <canvas style={{backgroundColor:'#9EEBCF'}} className='canvasStyle' ref={canvasRef} onClick={handleCanvasClick}/>
                        </div>;
    }
    return <div >
                {matching}
                <div style={{marginTop: '1%'}} className='clearfix'>
                    <Button style={{display:'center'}} className='playButton' onClick={()=>{setWidgetIndex(widgetIndex+1)}}> Next Page</Button> 
				</div>
            </div>
}
export default Matching;