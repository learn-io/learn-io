import React, { useEffect,useState} from 'react';
import '../../ComponentStyle.css';
import {Button} from 'react-bootstrap';
import axios_instance from '../../axios_instance.js';

const ImageQuestion=({widget,widgetIndex,setWidgetIndex})=>{
    const [imageData,setImageData]=useState('');
    useEffect(
        ()=>{
            if(widget===undefined||widget==='')
                return;
            axios_instance({
                method: 'get',
                url: "media/"+encodeURIComponent(widget.hash),
            }).then((res)=>{
                setImageData(res.data.data);
            }).catch((err)=>{
				console.log(err);
			});
        },[widget]   
	);
    let imagequestion=<div className='flashcard'/>;
    if(!imageData){
        imagequestion=<div className='flashcard'/>;
    }else{
        imagequestion=<div className='flashcard' style={{paddingTop:'1%'}}>
                            <p>Click one of Images</p>
                            <div style={{paddingTop:'1%'}}>
                            <button className='deleteButton' ><img src={imageData} height='200px' width='200px' alt=""/></button>
                            <button className='deleteButton' ><img src={imageData} height='200px' width='200px' alt=""/></button>
                            <button className='deleteButton' ><img src={imageData} height='200px' width='200px' alt=""/></button>
                            <button className='deleteButton' ><img src={imageData} height='200px' width='200px' alt=""/></button>
                            </div>
                        </div>;
    }
    return <div >
                {imagequestion}
                <div style={{marginTop: '1%'}} className='clearfix'>
                    <Button style={{display:'center'}} className='playButton' onClick={()=>{setWidgetIndex(widgetIndex+1)}}> Next Page</Button> 
				</div>
            </div>
}
export default ImageQuestion;