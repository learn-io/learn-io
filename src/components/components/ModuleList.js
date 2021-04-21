import React, { useRef, useEffect } from 'react';
import '../ComponentStyle.css';
import Module from './Module';

const ModuleList=(props)=>{
	// console.log(props.selectPlatform);
    // console.log(props.platform);
    // let modules=props.platform.modules;
    // console.log(modules);

    const canvasRef = useRef();
	let ctx = null;

	useEffect(() => {
        ctx = canvasRef.current.getContext('2d');
	}, []);
	
	useEffect(() => {
        if(!ctx)
            return;
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (let i = 0; i < props.modules.length; i++)
        {
            writeModule(props.modules[i], { fontSize: 10, color: 'black', textAlign: 'center' });
        }
	}, [props.modules, window.innerWidth, window.innerHeight]);
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
	const writeModule = (module, style = {}) => {
        if (!ctx)
            return;
        const { moduleName, x, y, /*radius, isLocked*/} = module;
        let isLocked = false;
        let radius = 50;
		const { fontSize = 15, fontFamily = 'Arial', color = 'black', textAlign = 'left', textBaseline = 'top' } = style;
	
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
	}

    const handleCanvasClick=(e)=>
    {
        var rect = ctx.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        let radius = 50;
        for (let i = 0; i < props.modules.length; i++)
        {
            let distance = Math.pow(x - props.modules[i].x, 2) + Math.pow(y - props.modules[i].y, 2)
            console.log("Checked " + props.modules[i].moduleName + " at distance " + distance);
            if (  distance < Math.pow(radius,2) )
            {
                alert("Clicked " + props.modules[i].moduleName + " at distance " + distance);
                return;
            }
        }
    }

	return(
		<canvas className='canvasStyle' ref={canvasRef} onClick={handleCanvasClick}/>
	);

/*


    if(props.platform===""){
        return null
    }else{
        return(
            // loop for all modules
            <div>
                {
                    modules.map((x,i) => {
                        return (
                            <Module
                                key={i}
                                module={modules[i]}
                                index={i}
                            />
                        );
                    })
                }
            </div>
        );
    }
	*/
}

export default ModuleList;