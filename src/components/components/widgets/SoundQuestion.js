// import React, { useEffect,useState} from 'react';
import React from 'react';
import '../../ComponentStyle.css';
import {Button} from 'react-bootstrap';
import PlayButton from '../PlayButton.js';
// import axios_instance from '../axios_instance.js';
import testSound from '../../images/testsound.mp3';


const SoundQuestion=({internals})=>{
    // const [play,{ stop,isPlaying }] = useSound(testSound);
    // useEffect(
    //     ()=>{
    //         if(internals===undefined||internals==='')
    //             return;
    //         axios_instance({
    //             method: 'get',
    //             url: "media/"+encodeURIComponent(internals.hash),
    //         }).then((res)=>{
    //             setImageData(res.data.data);
    //         }).catch((err)=>{
	// 			console.log(err);
	// 		});
    //     },[internals]   
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
                            <PlayButton sound={testSound}/>
                    </div>;
    }
    return (soundquestion);
}
export default SoundQuestion;