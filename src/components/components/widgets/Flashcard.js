import React, {useState} from 'react';
import '../../ComponentStyle.css';
import leftIcon from '../../images/left.png';
import rightIcon from '../../images/right.png';
import turnIcon from '../../images/turn.png';


const Flashcard=({internals,widgetClicked,isEdit})=>
{
    const [index,setIndex]=useState(0);
    const [front,setFront]=useState(true);

    const onChangeIndex=(delta)=>{
		setIndex(i => ( (i+delta)%internals.text.length + internals.text.length)%internals.text.length);
        setFront(true);
	}
    return (
        <div className="flashcard">
            <div style={{justifyContent:'space-between',display:'flex'}}>
                <button className='leftButton' onClick={()=>{onChangeIndex(-1); if(!isEdit){widgetClicked();}}}>
                    <img src={leftIcon} height='30px' width='30px' alt="left"/>
                </button>
                <p className='textBox'>{front? internals.text[index].front : internals.text[index].back}</p>
                <button className='rightButton' onClick={()=>{onChangeIndex(1);if(!isEdit){widgetClicked();}}}>
                    <img src={rightIcon} height='30px' width='30px' alt="right"/>
                </button>
                
            </div>
            <div style={{marginTop: '1%'}} className='clearfix'>
                <button style={{paddingBottom:'10%'}} className='bottomButton' onClick={()=>{setFront(r=>!r);if(!isEdit){widgetClicked();}}}>
                    <img src={turnIcon} height='50px' width='50px' alt="turn"/>
                </button>
            </div>
        </div>
    )    

}
export default Flashcard;