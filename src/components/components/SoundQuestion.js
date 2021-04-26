// import React, { useEffect,useState} from 'react';
import React from 'react';
import '../ComponentStyle.css';
import {Button} from 'react-bootstrap';
import PlayButton from './PlayButton.js';
// import axios_instance from '../axios_instance.js';
import testSound from '../images/testsound.mp3';


const SoundQuestion=({widget,widgetIndex,setWidgetIndex})=>{
    // const [play,{ stop,isPlaying }] = useSound(testSound);
    // useEffect(
    //     ()=>{
    //         if(widget===undefined||widget==='')
    //             return;
    //         axios_instance({
    //             method: 'get',
    //             url: "media/"+encodeURIComponent(widget.hash),
    //         }).then((res)=>{
    //             setImageData(res.data.data);
    //         }).catch((err)=>{
	// 			console.log(err);
	// 		});
    //     },[widget]   
	// );
    // useEffect(() => stop, [])
    // useEffect(() => {
    //     return () => {
    //         if(isPlaying){
    //             stop();
    //         }
    //     }
    // }, [isPlaying])
    let soundquestion;
    if(!1){
        soundquestion=<div className='flashcard'/>;
    }else{
        soundquestion=<div className='flashcard'>
                        <div style={{paddingTop:'10%'}}>
                            {/* <button className='deleteButton' onMouseEnter={play} onMouseLeave={stop()}><img src={soundIcon} height='50px' width='50px' alt=""/></button> */}
                            {/* <button className='deleteButton' onClick={stop}><img src={stopIcon} height='50px' width='50px' alt=""/></button> */}
                            <PlayButton sound={testSound}/>
                            <PlayButton sound={testSound}/>
                        </div>
                    </div>;
    }
    return <div >
                {soundquestion}
                <div style={{marginTop: '1%'}} className='clearfix'>
                    <Button style={{display:'center'}} className='playButton' onClick={()=>{setWidgetIndex(widgetIndex+1)}}> Next Page</Button> 
				</div>
            </div>
}
export default SoundQuestion;