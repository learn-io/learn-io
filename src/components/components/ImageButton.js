import React, { useEffect,useState} from 'react';
import '../ComponentStyle.css';
import {Button,Dropdown} from 'react-bootstrap';
import axios_instance from '../axios_instance.js';

const ImageButton=({widget,widgetIndex,setWidgetIndex})=>{
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
    let imagebutton;
    if(!imageData){
        imagebutton=<div className='flashcard'/>;
    }else{
        imagebutton=<div className='flashcard'>
                        <div style={{paddingTop:'10%'}}>
                            <img alt='' src={imageData} height={300} width={300}/>;
                        </div>
                        <Dropdown style={{paddingTop:'5%'}}>
                            <Dropdown.Toggle style={{backgroundColor: '#cdecff',color:'#000'}} variant="success" id="dropdown-basic">
                                What??
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>What??</Dropdown.Item>
                                <Dropdown.Item>Berry!</Dropdown.Item>
                                <Dropdown.Item>Not A Berry!</Dropdown.Item>
                                {/* <Dropdown.Item onClick={()=>{onChangeLimit(20)}}>20</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>;
    }
    return <div >
                {imagebutton}
                <div style={{marginTop: '1%'}} className='clearfix'>
                    <Button style={{display:'center'}} className='playButton' onClick={()=>{setWidgetIndex(widgetIndex+1)}}> Next Page</Button> 
				</div>
            </div>
}
export default ImageButton;