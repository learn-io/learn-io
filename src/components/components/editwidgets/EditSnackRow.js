import React , { useEffect, useState } from 'react';
import axios_instance from '../../axios_instance.js';
import './editStyle.css';
import deleteIcon from '../../images/delete.png';

const loading = "https://i.gifer.com/4V0b.gif";
const EditSnackRow =({row,onChangeSnack,i,onDelete,updatePage})=>{
	const [right,setRight]=useState(loading);
    const [wrong,setWrong]=useState(loading);
	useEffect(
        ()=>{
			setRight(loading);
            setWrong(loading);
			if(row===''||row===undefined)
				return;
            if(row.rightImage!==""){
                axios_instance({
                    method: 'get',
                    url: "media/"+encodeURIComponent(row.rightImage),
                }).then((res)=>{
                    setRight(res.data.data);
                }).catch((err)=>{
                    console.log(err);
                });
            }
            if(row.wrongImage!==""){
                axios_instance({
                    method: 'get',
                    url: "media/"+encodeURIComponent(row.wrongImage),
                }).then((res)=>{
                    setWrong(res.data.data);
                }).catch((err)=>{
                    console.log(err);
                });
            }
			// if(platform.image===undefined||platform.image===''){
        	// 	setImageData(`https://robohash.org/${platform.platformName}?300x300`);
        	// }else{
			// 	axios_instance({
			// 		method: 'get',
			// 		url: "media/"+encodeURIComponent(platform.image),
			// 	}).then((res)=>{
			// 		setImageData(res.data.data);
			// 	}).catch((err)=>{
			// 		console.log(err);
			// 	});
			// }
        },[row.rightImage, row.wrongImage]
    );
	
	return(
		<>
            <td><button onClick={()=>{onDelete(i)}} className='deleteButton'><img src={deleteIcon} height='40px' width='40px' alt="delete"/></button></td>
            <td><input onChange={(event)=>{onChangeSnack(event,"correct",i,"image")}} className='inputStyle' type="file" name="correctText"/><img src={right} height='50px' width='50%' alt=''/></td>
            <td><input onChange={(event)=>{onChangeSnack(event,"wrong",i,"image")}} className='inputStyle' type="file" name="wrongText"/><img src={wrong} height='50px' width='50%' alt=''/></td>
        </>
	);
}

export default EditSnackRow;