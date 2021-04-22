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
    
    const [unlockList]=useState([0]);

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
        // need to fix because if user is logged, we must check the user completion.
        for(let i = 0; i < props.modules.length; i++){
            // if without lockedby value, set it unlock
            if(props.modules[i].lockedby.length===0){
                unlockList.push(i);
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
            let isInclude=unlockList.includes(i)
            if(!isInclude){
                lockStatus=true;
            }
            writeModule(props.modules[i], lockStatus, { fontSize: 10, color: 'black', textAlign: 'center' });
            lockStatus=false;
        }
	}, [props.modules, scaleX, scaleY, unlockList, redraw]
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
		const { fontSize = 15, fontFamily = 'Arial', color = 'black', textAlign = 'left', textBaseline = 'top' } = style;

        // make outline
        ctx.beginPath();
        ctx.arc(x, y, radius+2, 0, 2 * Math.PI);
        ctx.fillStyle = 'grey';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fillStyle = 'lightblue';
        ctx.fill();

        ctx.beginPath();
		ctx.font = fontSize + 'px ' + fontFamily;
		ctx.textAlign = textAlign;
		ctx.textBaseline = textBaseline;
		ctx.fillStyle = color;
		ctx.fillText(moduleName, x, y);
		ctx.stroke();

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
            ctx.lineTo(props.modules[module.unlocks[i]].x, props.modules[module.unlocks[i]].y);
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
            console.log("Checked " + props.modules[i].moduleName + " at distance " + distance);
            if (  distance < Math.pow(radius,2) )
            {
                // if is locked
                if(unlockList.includes(i)){
                    alert("Clicked " + props.modules[i].moduleName + " at distance " + distance);
                }else{
                    alert("Clicked " + props.modules[i].moduleName + ", but the module is locked");
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