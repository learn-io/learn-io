import React, { useEffect,useState,useRef} from 'react';
import {Button} from 'react-bootstrap';
import '../../ComponentStyle.css';

import axios_instance from '../../axios_instance.js';

const Snacksnake=({internals, setAction, widgetClicked})=>{
    const canvasRef = useRef();

    const[options,setOptions] = useState([]);
    //const[rightAnswer,setRightAnswer] = useState([]);

    const[imageDataRight, setImageDataRight] = useState([]);
    const[imageDataWrong, setImageDataWrong] = useState([]);
    const[index,setIndex] = useState(0);

    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);

    const [startGame, setStartGame] = useState(false);

    const width = 600, height = 600;
    const widthPercent = .9, heightPercent = .9;
    const boxHeight = height/20, boxWidth = width/20;
    const initialx = width/2, initialy = height/2;
    // var changeX=0, changeY=0;
    const [changeX, setChangeX] = useState(0);
    const [changeY, setChangeY] = useState(boxHeight);
    var changingDirection = false;
    const [snakeBody,setSnakeBody] = useState([{x:initialx, y:initialy},{x:initialx,y:initialy-boxHeight+5}]);

    useEffect(
        ()=>{
            if(internals===''||internals===undefined)
                return;
            // console.log("internals");
            // console.log(internals);
            setOptions(internals.options);
            //setRightAnswer(internals.rightAnswer);
        },[internals]   
	);

    useEffect(
        ()=>{      
            if(options===undefined||options===[])     {
                return;
            }
            // console.log(options);
            let promisesRight=[];
            let promisesWrong=[];

            let tempArr2=[];

            for(let i=0;i<options.length;i++){
                // console.log(options[i]);
                if(options[i].rightImage === undefined){
                    tempArr2.push(options[i]);
                    continue;
                }
                promisesRight.push(axios_instance({
                    method: 'get',
                    url: "media/"+encodeURIComponent(options[i].rightImage)
                }));
                
                // console.log(options[i]);
                promisesWrong.push(axios_instance({
                    method: 'get',
                    url: "media/"+encodeURIComponent(options[i].wrongImage)
                }));
            }

            Promise.all(promisesRight).then((values)=>{
                var tempArr = [];
                for(var j=0; j<values.length; j++){
                    // console.log(values[j].data)
                    tempArr.push({data:values[j].data.data, x:Math.floor(Math.random()*20)*30, y: Math.floor(Math.random()*20)*30});
                }
                // console.log(tempArr2);
                for(j=0;j<tempArr2.length;j++){
                    tempArr.push({text:tempArr2[j].rightText, x:Math.floor(Math.random()*20)*30, y: Math.floor(Math.random()*20)*30});
                }

                setImageDataRight(tempArr);
                // console.log(tempArr);
            });

            Promise.all(promisesWrong).then((values)=>{
                var tempArr = [];
                for(var j=0; j<values.length; j++){
                    // console.log(values[j].data)
                    tempArr.push({data: values[j].data.data, x:Math.floor(Math.random()*20)*30, y: Math.floor(Math.random()*20)*30});
                }
                // console.log(tempArr2);
                for(j=0;j<tempArr2.length;j++){
                    tempArr.push({text:tempArr2[j].wrongText, x:Math.floor(Math.random()*20)*30, y: Math.floor(Math.random()*20)*30});
                }
                setImageDataWrong(tempArr);
                // console.log(tempArr);
            });
            // axios_instance({
            //     method: 'get',
            //     url: "media/"+encodeURIComponent(),
            // })
        },[options]
    )

    useEffect( ()=> {
        function resize()
        {
            setScaleY( (widthPercent * window.innerHeight) / (height*1.75) );
            setScaleX( (heightPercent * window.innerWidth) / (width*1.75) );
        };
        window.addEventListener('resize', resize);
        resize();
        return () => { window.removeEventListener('resize', resize);}
    },[]);

    useEffect( ()=> {
        window.addEventListener("keydown", changeDirection);
        return() => {window.removeEventListener("keydown", changeDirection)}
    })


    useEffect(() => {
        let ctx = canvasRef.current.getContext('2d');
        if(!ctx)
            return;
        ctx.canvas.width = width * scaleX;
        ctx.canvas.height = height * scaleY;
        ctx.scale(scaleX, scaleY);

        clearCanvas();
        drawSnake();

    }, [scaleX,scaleY]
    );

    function moveSnake(){
        if(startGame){
            clearCanvas();
            const snakeHead = { x: snakeBody[0].x + changeX, y: snakeBody[0].y + changeY};
            snakeBody.unshift(snakeHead);

            // console.log("snakeBody[0].x:"+snakeBody[0].x+" imageDataRight[index].x:"+imageDataRight[index].x);
            // console.log("snakeBody[0].x:"+snakeBody[0].y+" imageDataRight[index].x:"+imageDataRight[index].y);
            if(snakeBody[0].x === imageDataRight[index].x && snakeBody[0].y === imageDataRight[index].y)
            {
                if(index+1 === imageDataRight.length){
                    // console.log("INSIDE YOU WIN");
                    setStartGame(false);
                    alert("YOU WIN");
                    setAction(internals.rightAnswer);
                    return;
                } else {
                    // console.log("INSIDE NEXT FOOD")
                    setIndex(index+1);
                }
            }
            else if(snakeBody[0].x === imageDataWrong[index].x && snakeBody[0].y === imageDataWrong[index].y)
            {
                // console.log("INCORRECT DETECTED");
                // setStartGame(false);
                // setSnakeBody([{x:initialx, y:initialy},{x:initialx,y:initialy-boxHeight+5}])
                // document.getElementById("playButton").disabled = false;
                // setIndex(0);
                // setChangeX(0);
                // setChangeY(boxHeight);
                resetGame();
                alert("Wrong Answer");
            } 
            else 
            {
                snakeBody.pop();
            }

            drawSnake();
            drawFood();
            shouldGameEnd();
        } else {
            clearCanvas();
            drawSnake();
        }
    }

    function changeDirection(e){
        const LEFT_ARROW = 37;
        const UP_ARROW = 38;
        const RIGHT_ARROW = 39;
        const DOWN_ARROW = 40;
        if(changingDirection){
            return;
        }
        changingDirection = true;
        const keyPressed = e.keyCode;
        const goLeft = changeX === -boxWidth;
        const goUp = changeY === -boxHeight;
        const goRight = changeX === boxWidth;
        const goDown = changeY === boxHeight;
        if(keyPressed === LEFT_ARROW && !goRight){
            setChangeX(-boxWidth);
            setChangeY(0);
        }
        if(keyPressed === UP_ARROW && !goDown){
            setChangeX(0);
            setChangeY(-boxHeight);
        }
        if(keyPressed === RIGHT_ARROW && !goLeft){
            setChangeX(boxWidth);
            setChangeY(0);
        }
        if(keyPressed === DOWN_ARROW && !goUp){
            setChangeX(0);
            setChangeY(boxHeight);
        }
        changingDirection=false;
    }

    function drawSnake(){
        let ctx = canvasRef.current.getContext('2d');
        if(!ctx) return;
        // snakeBody.snakeHead
        snakeBody.forEach(drawSnakeBody)

        //Eyes on head
        ctx.strokeRect(snakeBody[0].x+8,snakeBody[0].y+15,4,4);
        ctx.strokeRect(snakeBody[0].x+16,snakeBody[0].y+15,4,4);

        ctx.fillStyle="#000000";
        ctx.fillRect(snakeBody[0].x+9,snakeBody[0].y+15,2,2);
        ctx.fillRect(snakeBody[0].x+17,snakeBody[0].y+15,2,2);
    }

    function drawSnakeBody(snakeBody){
        let ctx = canvasRef.current.getContext('2d');
        if(!ctx) return;
        //Draw snake body
        ctx.fillStyle="#FF0000";
        ctx.strokeStyle = "#000000";
        ctx.fillRect(snakeBody.x,snakeBody.y,boxHeight,boxWidth);
        ctx.strokeRect(snakeBody.x,snakeBody.y,boxHeight,boxWidth);
    }

    function drawFood(){
        let ctx = canvasRef.current.getContext('2d');
        if(!ctx) return;
        if(imageDataRight===undefined || imageDataRight===[]) return;
        if(imageDataWrong===undefined || imageDataWrong===[]) return;

        // console.log(imageDataRight[0]);
        // console.log(imageDataWrong[0]);
        if(imageDataRight[index].data === undefined){
            var rightText = imageDataRight[index].text;
            var rightTextX = imageDataRight[index].x;
            var rightTextY = imageDataRight[index].y;

            var wrongText = imageDataWrong[index].text;
            var wrongTextX = imageDataWrong[index].x;
            var wrongTextY = imageDataWrong[index].y;

            ctx.fillText(rightText,rightTextX,rightTextY+20,boxWidth);
            ctx.fillText(wrongText,wrongTextX,wrongTextY+20,boxWidth);
        } else {
            var rightImage = new Image();
            rightImage.src = imageDataRight[index].data;
            var rightImageX = imageDataRight[index].x;
            var rightImageY = imageDataRight[index].y;

            var wrongImage = new Image();
            wrongImage.src = imageDataWrong[index].data;
            var wrongImageX = imageDataWrong[index].x;
            var wrongImageY = imageDataWrong[index].y;

            ctx.drawImage(rightImage,rightImageX,rightImageY,boxWidth,boxHeight);
            ctx.drawImage(wrongImage,wrongImageX,wrongImageY,boxWidth,boxHeight);
        }
    }

    function clearCanvas(){
        let ctx = canvasRef.current.getContext('2d');
        if(!ctx) return;
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fillRect(0,0, width, height);
        ctx.strokeRect(0,0,width, height);
    }

    function resetGame(){
        setStartGame(false);
        setSnakeBody([{x:initialx, y:initialy},{x:initialx,y:initialy-boxHeight+5}])
        document.getElementById("playButton").disabled = false;
        setIndex(0);
        setChangeX(0);
        setChangeY(boxHeight);
    }

    function shouldGameEnd(){
        var leftWall = snakeBody[0].x < 0;
        var topWall = snakeBody[0].y < 0;
        var rightWall = snakeBody[0].x > width-boxWidth;
        var bottomWall = snakeBody[0].y > height-boxHeight;
        if(leftWall||topWall||rightWall||bottomWall){
            resetGame();
            alert("You hit a wall!");
        }
    }

    function useInterval(callback, delay){
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        });

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }, [delay]);
    }
    
    useInterval(moveSnake,200);

    return  <div className="snacksnake">
                <div className="btn-toolbar" style={{justifyContent:'space-between'}}>
                    <Button id="playButton" onClick={e=>{setStartGame(!startGame); widgetClicked();}}>Play/Pause</Button>
                    <Button onClick={e=>{
                        widgetClicked();
                        setStartGame(false);
                        setSnakeBody([{x:initialx, y:initialy},{x:initialx,y:initialy-boxHeight+5}])
                        // document.getElementById("playButton").disabled = false;
                        setIndex(0);
                    }}>Reset Game</Button>
                </div>
                <canvas className='canvasStyle' ref={canvasRef} id="myCanvas">
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </div>
}

export default Snacksnake;