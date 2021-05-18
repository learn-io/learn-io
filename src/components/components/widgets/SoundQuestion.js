import React, { useEffect,useState} from 'react';
import '../../ComponentStyle.css';
import PlayButton from '../PlayButton.js';
import axios_instance from '../../axios_instance.js';


const SoundQuestion=({internals,hash,widgetClicked,isEdit})=>{
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
                            <PlayButton widgetClicked={widgetClicked} isEdit={isEdit} />
                        </div>
                    </div>
    }else{
        soundquestion=<div className='flashcard'>
                        <div className='widgetText'>
                            <PlayButton sound={soundData} widgetClicked={widgetClicked} isEdit={isEdit}/>
                        </div>
                    </div>;
    }
    return (soundquestion);
}
export default SoundQuestion;