import React, { useRef, useEffect, useState } from 'react';
import '../ComponentStyle.css';
import axios_instance from '../axios_instance.js';
import lockIcon from '../images/lock.png';
import unlockIcon from '../images/unlock.png'

const ModuleList=({toggleConnection, isEdit, moveModuleTo, userPlatformInfo, 
    modules, setSelectedModule, setSelectedDisable,
    dragging, setDragging, platformId, setSave, editMode, setEditMode})=>{

    const imgLock = useRef(new Image())
    const imgUnlock = useRef(new Image())

    const canvasRef = useRef();

    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);

    const [redraw, setRedraw] = useState(false);
    
    const [unlockList]=useState([]);

    const [editSelected, setEditSelected] = useState(-1);

    const [editXOFF, setEditXOFF] = useState(0);
    const [editYOFF, setEditYOFF] = useState(0);

    const [connectLine, setConnectLine] = useState({})

    

    const width = 1920;
    const height = 1080;

    const radius = 75;

    useEffect( ()=> {
        function resize()
        {
            //setScaleY( (widthPercent * window.innerHeight) / height );
            //setScaleX( (heightPercent * window.innerWidth) / width );
            setScaleY((height / (window.innerWidth*.7 * (height/width))) );
            setScaleX((width / (window.innerWidth*.7)) ); 
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
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        let lockStatus=false;
        // if there is user platform information
        let userCompleteId=[];      // use to handle how many modules that user complete
        if(userPlatformInfo.completeId!==undefined){
            if(userPlatformInfo.completeId.length!==0){
                // check user completion
                for(let i=0;i<userPlatformInfo.completeId.length;i++){
                    if(!userCompleteId.includes(userPlatformInfo.completeId[i].moduleId)){
                        userCompleteId.push(userPlatformInfo.completeId[i].moduleId);
                    }
                }
            }
        }

        unlockList.splice(0, unlockList.length);
        
        for(let i = 0; i < modules.length; i++){
            // if without lockedby value, set it unlock
            if(modules[i].lockedby.length===0){
                if(!unlockList.includes(modules[i]._id)){
                    unlockList.push(modules[i]._id);
                }
            }else{
                // check user whether meet unlock condition
                let checkUnlock;
                for(let j=0;j<modules[i].lockedby.length;j++){
                    checkUnlock=userCompleteId.includes(modules[i].lockedby[j]);
                    if(!checkUnlock){
                        break;
                    }
                }
                if(checkUnlock){
                    if(!unlockList.includes(modules[i]._id)){
                        unlockList.push(modules[i]._id);
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
        for (let i = 0; i < modules.length; i++)
        {
            drawline(modules[i]);
        }
        for (let i = 0; i < modules.length; i++)
        {
            // for(let j=0;j<props.modules[i].lockedby.length;j++){
            //     let isInclude=unlockList.includes(props.modules[i].lockedby[j]);
            //     if(!isInclude){
            //         lockStatus=true;
            //         break;
            //     }
            // }
            let isInclude=unlockList.includes(modules[i]._id);
            if(!isInclude){
                lockStatus=true;
            }
            writeModule(modules[i], lockStatus, { fontSize: 20, color: 'black', textAlign: 'center' });
            lockStatus=false;
        }
        if (editSelected !== -1 && editMode === 1 && connectLine)
        {
            ctx.beginPath();
            ctx.moveTo(connectLine.sX, connectLine.sY);
            ctx.lineTo(connectLine.eX, connectLine.eY);
            ctx.stroke();
        }
        // console.log(unlockList);
	}, [editMode, modules, unlockList, redraw, userPlatformInfo, connectLine, editSelected]
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
        
		const { fontSize = 30, fontFamily = 'Arial', color = 'black', textAlign = 'left', textBaseline = 'middle'} = style;

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

        ctx.font = "bold " + fontSize + 'px ' + fontFamily;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillStyle = color;

        for(let i=1;i<words.length; i++){
            let word = words[i];
            let width = ctx.measureText(currentLine + " " + word).width;
            if (width < (radius*2 - 10)) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        if(lines.length>=2){
            for(let j=0;j<lines.length;j++){
                ctx.fillText(lines[j], x, y+((j-1)*fontSize));
            }
        } else {
            ctx.fillText(moduleName, x, y);
        }

        let image;
        if(isLocked){
            image=imgLock.current;
        }else{
            image=imgUnlock.current;
        }
        ctx.drawImage(image, x-25, y + radius - 50,50,50);

	}

    const drawline=(module)=>{
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        for(let i=0;i<module.unlocks.length;i++){
            ctx.beginPath();
            ctx.moveTo(module.x , module.y);
            for(let j=0;j<modules.length;j++){
                if(module.unlocks[i]===modules[j]._id){
                    ctx.lineTo(modules[j].x, modules[j].y);
                }
            }
            ctx.stroke();
        }
    }
    const getModuleId = (x, y) =>
    {
        for (let i = 0; i < modules.length; i++)
        {
            let distance = Math.pow(x - modules[i].x, 2) + Math.pow(y - modules[i].y, 2)
             //console.log("Checked " + modules[i].moduleName + " at distance " + distance + " out of " + Math.pow(radius, 2));
            if (  distance < Math.pow(radius,2) )
            {
                //console.log("Found " + i);
                return i;
            }
        }
        return -1;
    }

    const handleCanvasClick=(e)=>
    {
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        var rect = ctx.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        if (isEdit && editMode !== -1) //enter mode only when editing
            return;
        let id = getModuleId(x, y);
        //console.log(id);
        if (id === -1)
            return;
            //console.log(isEdit);
        // if is unlocked
        if(unlockList.includes(modules[id]._id)){
            setSelectedModule(modules[id]);
            setSelectedDisable(false);
            // alert("Clicked " + props.modules[i].moduleName + " at distance " + distance);
        }else{
            setSelectedModule(modules[id]);
            setSelectedDisable(true);
        }
    }

    const handleMouseMove=(e)=>
    {
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        if (!isEdit || editSelected === -1 || !(editMode === 0 || editMode === 1)) //drag or connect
            return;
        var rect = ctx.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        if (editMode === 0)
        {
            let toX = x-editXOFF;
            let toY = y-editYOFF;

            if (toX < radius)
                toX = radius;
            if (toY < radius)
                toY = radius;
            if (toX > width-radius)
                toX = width-radius;
            if (toY > height-radius)
                toY = height-radius;

            moveModuleTo(editSelected, toX, toY);
            setRedraw(r => !r);
        }
        else if (editMode === 1)
        {
            setConnectLine({sX:editXOFF, sY:editYOFF, eX:x, eY:y})
        }
        else
            return;
        
    }

    const handleMouseDown = (e) =>
    {
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;
        var rect = ctx.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        if (!isEdit || editMode === -1)
            return;
        let id = getModuleId(x, y);
        console.log(id);
        if (id === -1)
            return;

        if (editMode === 0) //drag
        {
            setEditXOFF(x - modules[id].x);
            setEditYOFF(y - modules[id].y);
        }
        else if (editMode === 1) //connect
        {
            setEditXOFF(x);
            setEditYOFF(y);
        }
        else
            return;
        setEditSelected(id);
    }

    const handleMouseUp = (e) =>
    {
        let ctx = canvasRef.current.getContext('2d');
        if (!ctx)
            return;

        if (!isEdit || editMode === -1)
            return;

        if (editMode === 1)
        {
            var rect = ctx.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;
            let id = getModuleId(x, y);
            if (id === -1)
            {
                setEditSelected(-1);
                setConnectLine({})
                return;
            }
            let sourceId = getModuleId(editXOFF, editYOFF);
            if (sourceId === -1 || id === sourceId)
            {
                setEditSelected(-1);
                setConnectLine({})
                return;
            }            
            toggleConnection(sourceId, id);
            setRedraw(r => !r);
        }
        setConnectLine({})
        setEditSelected(-1);
        setSave(s=>s+1);
    }

    useEffect( ()=> {
        if(dragging == false || isEdit === false)
            return;
        setDragging(false);
        setEditMode(0);
        setEditXOFF(0);
        setEditYOFF(0);
        axios_instance({
			method:'post',
			url: "platform/newModule",
			data:{
				_id:platformId,
				moduleName:"New Module",
                moduleDescription:"A Freshly Created Module!",
                lockedby: [],
                unlocks: [],
                x: 0,
                y: 0,
                height: 75,
                width: 75,
                completionScore: 10,
				image:"",
				rank:0,
				entry:false
			}
		}).then((res)=>{
            setEditSelected(res.data);
			setSave(x=>x+1);
		});
        
    }, [dragging]
    );

	return(   
            <canvas className='canvasStyle content' ref={canvasRef} 
            onClick={handleCanvasClick} onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}/>
    );

}

export default ModuleList;