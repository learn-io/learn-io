import React, { useEffect,useState} from 'react';
import '../../ComponentStyle.css';
import axios_instance from '../../axios_instance.js';

const ImageBox=({internals})=>{
    const [imageData,setImageData]=useState('');
    useEffect(
        ()=>{
            if(internals===undefined||internals==='')
                return;
            axios_instance({
                method: 'get',
                url: "media/"+encodeURIComponent(internals.hash),
            }).then((res)=>{
                setImageData(res.data.data);
            }).catch((err)=>{
				console.log(err);
			});
        },[internals]   
	);
    let ImageBox;
    if(!imageData){
        ImageBox=<div className='flashcard'/>
    }else{
        ImageBox=<div className='flashcard'>
                        <img alt='' src={imageData} height='100%' width='100%' />
                    </div>
    }
    return (ImageBox)
}
export default ImageBox;