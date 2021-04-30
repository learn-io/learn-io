import React, { useEffect,useState} from 'react';
import '../../ComponentStyle.css';
import PlayButton from '../PlayButton.js';
import axios_instance from '../../axios_instance.js';


const SoundQuestion=({internals})=>{
    // const [play,{ stop,isPlaying }] = useSound(testSound);
    const [soundData,setSoundData]=useState('');
    useEffect(
        ()=>{
            if(internals===undefined||internals==='')
                return;
            axios_instance({
                method: 'get',
                url: "media/"+encodeURIComponent(internals.hash),
            }).then((res)=>{
                setSoundData(res.data.data);
            }).catch((err)=>{
				console.log(err);
			});
        },[internals]   
	);
    let soundquestion;
    if(!1){
        soundquestion=<div className='flashcard'/>;
    }else{
        soundquestion=<div className='flashcard'>
                            <PlayButton sound={soundData}/>
                    </div>;
    }
    return (soundquestion);
}
export default SoundQuestion;