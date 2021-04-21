import React, { useRef, useEffect } from 'react';
import '../ComponentStyle.css';
import lockIcon from '../images/lock.png';
const Module=(props)=>{
	// first way
	let module=<div className='moduleStyle grow'>
					<h6>{props.module.moduleName}</h6>
					<img style={{display:'block',marginLeft:'auto',marginRight:'auto'}} src={lockIcon} height='30px' width='30px' alt="lock"/>
				</div>
	//second way*************************************************************
	// let module=<canvas id={props.index} height={props.module.height} width={props.module.width}  className='moduleStyle grow'/>
	// end second way*************************************************************
	// let c = document.getElementById(props.index);
	// let ctx = c.getContext("2d");
	// ctx.font = "30px Arial";
	// ctx.fillText(props.module.moduleName,10,50);
	// let c = document.getElementById("myCanvas");
	// let ctx = c.getContext("2d");
	// ctx.beginPath();
	// ctx.arc(100, 75, 50, 0, 2 * Math.PI);
	// ctx.stroke();
	// console.log(document.getElementById());
	// document.getElementById(props.index).moduleStyle.height=props.module.height+'px';
	// document.getElementById(props.index).moduleStyle.width=props.module.width+'px';
	// last way**********************************************************************
	// const canvas = useRef();
	// let ctx = null;
	// // let img=useRef();
	// // initialize the canvas context
	// useEffect(() => {
	// 	// dynamically assign the width and height to canvas
	// 	const canvasEle = canvas.current;
	// 	// canvasEle.width = canvasEle.clientWidth;
	// 	// canvasEle.height = canvasEle.clientHeight;
	// 	canvasEle.width = props.module.width;
	// 	canvasEle.height = props.module.height;
	// 	// get context of the canvas
	// 	ctx = canvasEle.getContext("2d");
	// }, []);
	
	// useEffect(() => {
	// 	writeText({ text: props.module.moduleName, x: 100, y: 150 }, { fontSize: 15, color: 'black', textAlign: 'center' });
	// }, []);
	
	// // write a text
	// const writeText = (info, style = {}) => {
	// 	const { text, x, y } = info;
	// 	const { fontSize = 20, fontFamily = 'Arial', color = 'black', textAlign = 'left', textBaseline = 'top' } = style;
	
	// 	ctx.beginPath();
	// 	ctx.font = fontSize + 'px ' + fontFamily;
	// 	ctx.textAlign = textAlign;
	// 	ctx.textBaseline = textBaseline;
	// 	ctx.fillStyle = color;
	// 	ctx.fillText(text, x, y);
	// 	// ctx.drawImage(img,10,10);
	// 	ctx.stroke();
	// }
	// return(
	// 	<canvas className='moduleStyle grow' ref={canvas}></canvas>
	// );
	return(
		module
	);
}

export default Module;
//{/* <canvas height={props.module.height} width={props.module.width}  className='moduleStyle grow' ref={canvas}></canvas> */}
// style={{transform: 'translate(10px,200px)'}}
// style={{transform: 'translate(20%,20%)'}}