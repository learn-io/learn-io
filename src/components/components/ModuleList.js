import React, { useRef, useEffect, useState } from 'react';
import '../ComponentStyle.css';
import lockIcon from '../images/lock.png';
import unlockIcon from '../images/unlock.png';

const ModuleList=(props)=>{

    const imgLock = useRef(new Image())
    const imgUnlock = useRef(new Image())

    const canvasRef = useRef();

    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);

    const [redraw, setRedraw] = useState(false);
    
    const [unlockList]=useState([]);

    const width = 800;
    const height = 1000;

    const widthPercent = .9;
    const heightPercent = .9;

    useEffect( ()=> {
        function resize()
        {
            setScaleY( (widthPercent * window.innerHeight) / height );
            setScaleX( (heightPercent * window.innerWidth) / width );
        };
        window.addEventListener('resize', resize);
        resize();

        imgLock.current.onload = ()=>{setRedraw(r => !r)};
        imgUnlock.current.onload = ()=>{setRedraw(r => !r)};

        imgLock.current.src = lockIcon;
        imgUnlock.current.src = unlockIcon;
        
        return () => { window.removeEventListener('resize', resize);}
    },[]);

	useEffect(() => {
        let ctx = canvasRef.current.getContext('2d');
        if(!ctx)
            return;
        ctx.canvas.width = width * scaleX;
        ctx.canvas.height = height * scaleY;
        ctx.scale(scaleX, scaleY);
        let lockStatus=false;
        // if there is user platform information
        let userCompleteId=[];      // use to handle how many modules that user complete
        if(props.userPlatformInfo.completeId!==undefined){
            if(props.userPlatformInfo.completeId.length!==0){
                // check user completion
                for(let i=0;i<props.userPlatformInfo.completeId.length;i++){
                    if(!userCompleteId.includes(props.userPlatformInfo.completeId[i].moduleId)){
                        userCompleteId.push(props.userPlatformInfo.completeId[i].moduleId);
                    }
                }
            }
        }
        
        for(let i = 0; i < props.modules.length; i++){
            // if without lockedby value, set it unlock
            if(props.modules[i].lockedby.length===0){
                if(!unlockList.includes(props.modules[i]._id)){
                    unlockList.push(props.modules[i]._id);
                }
            }else{
                // check user whether meet unlock condition
                let checkUnlock;
                for(let j=0;j<props.modules[i].lockedby.length;j++){
                    checkUnlock=userCompleteId.includes(props.modules[i].lockedby[j]);
                    if(!checkUnlock){
                        break;
                    }
                }
                if(checkUnlock){
                    if(!unlockList.includes(props.modules[i]._id)){
                        unlockList.push(props.modules[i]._id);
                    }
                }
            }
        }
        // add user complete modules id to unlock list
        for(let i=0;i<userCompleteId.length;i++){
            if(!unlockList.includes(userCompleteId[i])){
                unlockList.push(userCompleteId[i]);
            }
        }
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (let i = 0; i < props.modules.length; i++)
        {
            drawline(props.modules[i]);
        }
        for (let i = 0; i < props.modules.length; i++)
        {
            // for(let j=0;j<props.modules[i].lockedby.length;j++){
            //     let isInclude=unlockList.includes(props.modules[i].lockedby[j]);
            //     if(!isInclude){
            //         lockStatus=true;
            //         break;
            //     }
            // }
            let isInclude=unlockList.includes(props.modules[i]._id);
            if(!isInclude){
                lockStatus=true;
            }
            writeModule(props.modules[i], lockStatus, { fontSize: 10, color: 'black', textAlign: 'center' });
            lockStatus=false;
        }
        // console.log(unlockList);
	}, [props.modules, scaleX, scaleY, unlockList, redraw, props.userPlatformInfo]
    );
    /*
    
    "platformId": "607b74dc4165c90aa0dfdce5",
    "moduleName": "Pumpkins!?",
    "moduleDescription": "How about halloween pumpkins!!",
    "lockedby": [5],
    "unlocks": [],
    "x": 77,
    "y": 100,
    "height": 130,
    "width": 130

	*/
    // write a text
	const writeModule = (module, lockStatus,style = {}) => {
        // console.log(props.modules);
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        const { moduleName, x, y, /*radius, isLocked*/} = module;
        let isLocked = lockStatus;
        let radius = 50;
		const { fontSize = 15, fontFamily = 'Arial', color = 'black', textAlign = 'left', textBaseline = 'middle' } = style;

        // make outline
        ctx.beginPath();
        ctx.arc(x, y, radius+2, 0, 2 * Math.PI);
        ctx.fillStyle = 'grey';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fillStyle = 'lightblue';
        ctx.fill();

        let words = moduleName.split(" ");
        let lines = [];
        let currentLine = words[0];

        for(let i=1;i<words.length; i++){
            let word = words[i];
            let width = ctx.measureText(currentLine + " " + word).width;
            if (width < (radius*2)) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        if(lines.length>=2){
            for(let j=0;j<lines.length;j++){
                ctx.beginPath();
                ctx.font = fontSize + 'px ' + fontFamily;
                ctx.textAlign = textAlign;
                ctx.textBaseline = textBaseline;
                ctx.fillStyle = color;
                ctx.fillText(lines[j], x, y+((j-1)*15));
                ctx.stroke();
            }
        } else {
            ctx.beginPath();
            ctx.font = fontSize + 'px ' + fontFamily;
            ctx.textAlign = textAlign;
            ctx.textBaseline = textBaseline;
            ctx.fillStyle = color;
            ctx.fillText(moduleName, x, y);
            ctx.stroke();
        }

        let image;
        if(isLocked){
            image=imgLock.current;
        }else{
            image=imgUnlock.current;
        }
        ctx.drawImage(image, x-15, y+15,30,30);

	}

    const drawline=(module)=>{
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        for(let i=0;i<module.unlocks.length;i++){
            ctx.beginPath();
            ctx.moveTo(module.x , module.y);
            for(let j=0;j<props.modules.length;j++){
                if(module.unlocks[i]===props.modules[j]._id){
                    ctx.lineTo(props.modules[j].x, props.modules[j].y);
                }
            }
            ctx.stroke();
        }
    }
    const handleCanvasClick=(e)=>
    {
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        var rect = ctx.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left)/scaleX;
        const y = (e.clientY - rect.top)/scaleY;
        let radius = 50;
        for (let i = 0; i < props.modules.length; i++)
        {
            let distance = Math.pow(x - props.modules[i].x, 2) + Math.pow(y - props.modules[i].y, 2)
            // console.log("Checked " + props.modules[i].moduleName + " at distance " + distance);
            if (  distance < Math.pow(radius,2) )
            {
                // if is locked
                if(unlockList.includes(props.modules[i]._id)){
                    props.setSelectedModule(props.modules[i]);
                    props.setSelectedDisable(false);
                    // alert("Clicked " + props.modules[i].moduleName + " at distance " + distance);
                }else{
                    props.setSelectedModule(props.modules[i]);
                    props.setSelectedDisable(true);
                }
                return;
            }
        }
    }

	return(
		<canvas className='canvasStyle' ref={canvasRef} onClick={handleCanvasClick}/>
	);

}

export default ModuleList;