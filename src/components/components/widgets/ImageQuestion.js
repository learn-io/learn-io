import React, { useEffect,useState} from 'react';
import '../../ComponentStyle.css';
// import {Button} from 'react-bootstrap';
import axios_instance from '../../axios_instance.js';

const ImageQuestion=({internals,hash,setAction})=>{
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
        },[internals,hash]   
	);
    const checkResult=()=>{
        setAction(internals.click);
    }
    let imagequestion;
    if(!imageData){
        imagequestion=<div className='flashcard'/>;
    }else{
        imagequestion=<div className='flashcard'>
                            <button className='imageButton' onClick={()=>{checkResult()}} ><img src={imageData} height='100%' width='100%' alt=""/></button>
                        </div>;
    }
    return(imagequestion);
    // return <div >
    //             {imagequestion}
    //             <div style={{marginTop: '1%'}} className='clearfix'>
    //                 <Button style={{display:'center'}} className='playButton' onClick={()=>{setWidgetIndex(widgetIndex+1)}}> Next Page</Button> 
	// 			</div>
    //         </div>
}
export default ImageQuestion;