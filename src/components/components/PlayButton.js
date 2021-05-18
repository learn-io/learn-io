import React, { useEffect} from 'react';
import '../ComponentStyle.css';
import useSound from 'use-sound';
import soundIcon from '../images/sound.png';
import stopIcon from '../images/stop.png';

const PlayButton=({sound, widgetClicked,isEdit})=>{
    const [play,{ stop,isPlaying }] = useSound(sound);
    useEffect(() => {
        return () => {
            if(isPlaying){
                stop();
            }
        }
    }, [isPlaying,stop])
    let but;
    if(isPlaying){
        but=<button className='deleteButton' onClick={()=>{stop(); if(!isEdit){widgetClicked();}}}><img src={stopIcon} height='50px' width='50px' alt=""/></button>;
    }else{
        but=<button className='deleteButton' onClick={()=>{play(); if(!isEdit){widgetClicked();}}}><img src={soundIcon} height='50px' width='50px' alt=""/></button>;
    }
    return but;
}
export default PlayButton;