import React, { useEffect,useState} from 'react';
import '../../ComponentStyle.css';
import PlayButton from '../PlayButton.js';
import axios_instance from '../../axios_instance.js';


const SoundQuestion=({internals,hash})=>{
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
        },[internals,hash]   
	);
    let soundquestion;
    if(!soundData){
        soundquestion=<div className='flashcard'>
                        <div className='widgetText'>
                            <PlayButton />
                        </div>
                    </div>
    }else{
        soundquestion=<div className='flashcard'>
                        <div className='widgetText'>
                            <PlayButton sound={soundData}/>
                        </div>
                    </div>;
    }
    return (soundquestion);
}
export default SoundQuestion;