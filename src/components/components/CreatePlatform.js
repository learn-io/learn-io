import React, { useState }  from 'react';
import '../ComponentStyle.css';
import closeIcon from '../images/close.png';
import {Form} from 'react-bootstrap';
import axios_instance from '../axios_instance.js';

const CreatePlatform=({create,setCreate,save,setSave})=>{
    // const [header,setHeader]=useState('');
    let header;
    let desc;
    let imagehash;
    const createPlat=()=>{
        if(!header){
            setCreate(false);
        }else{
            axios_instance({
                method: 'post',
                url: "platform/",
                data: {
                    platformName: header,
                    image:imagehash,
                    description:desc
                }
            }).then((res)=>{
                setCreate(false);
                setSave(save+1);
            }).catch((e)=>{
                console.log(e);
            })
        }
    }
    const changeHeader=(event)=>{
        header=event.target.value;
        // setHeader(event.target.value);
    }
    const onUploadImage=(event)=>{
		if (event.target.files && event.target.files[0]) {
            let imageFile = event.target.files[0];
            let imageExtension = event.target.files[0].type;
                
			let reader = new FileReader();
			reader.onload = (e) => {
				let form = new FormData();
				form.append('file', e.target.result);
				form.append('extension', imageExtension);
				axios_instance({
					method: 'post',
					url: "media/",
					data: form,
					headers: {
						'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
					},
				}).then((res)=>{
					imagehash=res.data.hash;
				}).catch((e)=>{
					console.log(e);
				})
			};
			reader.readAsDataURL(imageFile);
		}
    }
    const changeDesc=(event)=>{
        desc=event.target.value;
    }
    if(create){
        return(
            <section id="overlay">
				<div className='overlayStyle'>
					<div className='selectConfirm'>
                        <button className='closeButton' onClick={()=>{setCreate(false)}}><img src={closeIcon} height='40px' width='40px' alt="close"/></button>
                        <p>Enter name of the new platform:</p>
                        <input style={{width:'50%'}} onChange={(event)=>{changeHeader(event)}} type="text" id="header" name="header"/>
                        <p>Enter the new platform description:</p>
                        <input style={{width:'50%',height:'20%'}} onChange={(event)=>{changeDesc(event)}} type="text" id="desc" name="desc"/>
                        <div style={{marginTop: '2%'}}>
                            <input type="file" onChange={onUploadImage} />
                        </div>
                        <div style={{marginTop: '1%'}} className='clearfix'>
                            <button className='playButton' onClick={()=>{createPlat()}}>Confirm</button>
                        </div>
					</div>
				</div>
			</section>
        );
    }else{
        return null;
    }
}

export default CreatePlatform;