import React from 'react';
import soundIcon from '../images/sound.png';
import snackIcon from '../images/snack.PNG';
import flashIcon from '../images/flash.PNG';
import choiceIcon from '../images/choice.png';

const RighttopBar = ({selectType, onDragStart}) =>{
    let rightTopContent = "";
    if(selectType === "Module"){
        let moduleBox =   <div draggable onDragStart={(e)=>{onDragStart(e,"TextBox")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'50px', marginLeft:'10%'}}>
                            <p>New Module</p>
                        </div>
        rightTopContent=moduleBox;
    } else if(selectType === "Page"){
        let pageBox =   <div draggable onDragStart={(e)=>{onDragStart(e,"TextBox")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'50px', marginLeft:'10%'}}>
                            <p>New Page</p>
                        </div>
        rightTopContent=pageBox;

    } else if(selectType === "Widget"){
        let textBut=<button onDragStart={(e)=>{onDragStart(e,"TextButton")}} draggable style={{backgroundColor:'#96CCFF',borderRadius: '.5rem',marginTop: '10%'}}>Text Button</button>
        let textBox=<div draggable onDragStart={(e)=>{onDragStart(e,"TextBox")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'50px', marginLeft:'10%'}}>
                        <p>Text Box</p>
                    </div>
        let imageBox=<div draggable onDragStart={(e)=>{onDragStart(e,"ImageBox")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'150px', marginLeft:'10%'}}>
                        <p>ImageBox</p>
                    </div>
        let imageBut=<div draggable onDragStart={(e)=>{onDragStart(e,"ImageButton")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'70%',height:'100px', marginLeft:'10%'}}>
                        <p>Image Button</p>
                    </div>
        let soundBut=<div draggable onDragStart={(e)=>{onDragStart(e,"Sound")}} style={{backgroundColor:'transparent',borderRadius: '.3rem',marginTop: '10%', width:'70%', marginLeft:'10%'}}>
                        <img src={soundIcon} height='40px' width='40px' alt="sound"/> Add Sound
                    </div>
        let flash=<div draggable onDragStart={(e)=>{onDragStart(e,"Flashcard")}} style={{backgroundColor:'transparent',borderRadius: '.3rem',marginTop: '10%', width:'70%', marginLeft:'10%'}}>
                        <img src={flashIcon} height='70%' width='200px' alt=""/>
                    </div>
        let snack=<div draggable onDragStart={(e)=>{onDragStart(e,"Snacksnake")}} style={{backgroundColor:'transparent',borderRadius: '.3rem',marginTop: '10%', width:'70%', marginLeft:'10%'}}>
                        <img src={snackIcon} height='70%' width='200px' alt=""/>
                    </div>
        let choice=<div draggable onDragStart={(e)=>{onDragStart(e,"MultipleChoice")}} style={{backgroundColor:'transparent',borderRadius: '.3rem',marginTop: '10%', width:'70%', marginLeft:'10%'}}>
                        <img src={choiceIcon} height='50px' width='50px' alt=""/>Multiple Choice
                    </div>
        let quickChoice=<div draggable onDragStart={(e)=>{onDragStart(e,"QuickTimeChoice")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'150px', marginLeft:'10%'}}>
                        <p>Quick Choice</p>
                    </div>
        let matchChoice=<div draggable onDragStart={(e)=>{onDragStart(e,"Matching")}} style={{backgroundColor:'#96CCFF',borderRadius: '.3rem',marginTop: '10%',width:'80%',height:'150px', marginLeft:'10%'}}>
                            <p>Matching</p>
                        </div>
        rightTopContent=<div> {textBut} {textBox} {imageBox} {imageBut} {soundBut} {flash} {snack} {choice} {quickChoice} {matchChoice} </div>;
    } else {
        rightTopContent=<div></div>
    }
    
    return (
        <div style={{overflowY:'scroll', border: '1px solid black', height: '50%'}}>
            {rightTopContent}
        </div>
    );
}

export default RighttopBar;