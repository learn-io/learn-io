import React, { useEffect,useState} from 'react';
import '../ComponentStyle.css';
import {Button} from 'react-bootstrap';
import leftIcon from '../images/left.png';
import rightIcon from '../images/right.png';
import turnIcon from '../images/turn.png';

const Flashcard=({widget,widgetIndex,setWidgetIndex})=>{
    const [index,setIndex]=useState(-1);
    const [text,setText]=useState([]);
    const [front,setFront]=useState(true);
    const [current,setCurrent]=useState('');

    useEffect(
        ()=>{
            if(widget===''||widget===undefined)
                return;
            setText(widget.text);
            setIndex(0);
        },[widget]   
	);
    useEffect(
        ()=>{
            if(index<0||text.length===0)
                return;
            if(index<text.length){
                if(front){
                    setCurrent(text[index].front);
                }else{
                    setCurrent(text[index].back);
                }
            }
        },[front,index]   
	);

    const onChangeFront=()=>{
		if(front){
            setFront(false);
        }else{
            setFront(true);
        }
	}
    const onChangeIndex=(value)=>{
		setIndex(value);
        setFront(true);
	}

    let flashcard;
    if (index<0||text.length===0||current===''){
        flashcard=<div className='flashcard'/>;
    }else{
        let textpart;
        if(index===0){
            textpart=<div style={{justifyContent:'space-between',display:'flex'}}>
                        <button className='deleteButton' style={{cursor:'auto'}} disabled><img src={leftIcon} height='30px' width='30px' alt="left"/></button>
                        <p className='textBox'>{current}</p>
                        <button className='deleteButton' onClick={()=>{onChangeIndex(index+1)}}><img src={rightIcon} height='30px' width='30px' alt="right"/></button>
                    </div>
        }else if(index<text.length-1){
            textpart=<div style={{justifyContent:'space-between',display:'flex'}}>
                        <button className='deleteButton'onClick={()=>{onChangeIndex(index-1)}}><img src={leftIcon} height='30px' width='30px' alt="left"/></button>
                        <p className='textBox'>{current}</p>
                        <button className='deleteButton' onClick={()=>{onChangeIndex(index+1)}}><img src={rightIcon} height='30px' width='30px' alt="right"/></button>
                    </div>
        }else{
            textpart=<div style={{justifyContent:'space-between',display:'flex'}}>
                        <button className='deleteButton'onClick={()=>{onChangeIndex(index-1)}}><img src={leftIcon} height='30px' width='30px' alt="left"/></button>
                        <p className='textBox'>{current}</p>
                        <button className='deleteButton' style={{cursor:'auto'}} disabled><img src={rightIcon} height='30px' width='30px' alt="right"/></button>
                    </div>
        }
        flashcard=<div className='flashcard'>
                    {textpart}
                    <button style={{paddingBottom:'10%'}} className='bottomButton' onClick={()=>{onChangeFront()}}><img src={turnIcon} height='50px' width='50px' alt="turn"/></button>
                </div>;
    }
    return <div >
                {flashcard}
                <div style={{marginTop: '1%'}} className='clearfix'>
                    <Button style={{display:'center'}} className='playButton' onClick={()=>{setWidgetIndex(widgetIndex+1)}}> Next Page</Button> 
				</div>
            </div>
}
// onClick={()=>{onSavePlatformInfo(selectPlatform)}}
export default Flashcard;