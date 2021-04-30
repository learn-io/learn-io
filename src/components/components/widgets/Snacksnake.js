import React, { useEffect,useState,useRef} from 'react';
import {Button} from 'react-bootstrap';
import '../../ComponentStyle.css';

const Snacksnake=({options, optionsIndex})=>{
    const canvasRef = useRef();

    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [redraw, setRedraw] = useState(false);

    const [startGame, setStartGame] = useState(false);

    const width = 500, height = 600;
    const widthPercent = .9, heightPercent = .9;
    const boxHeight = height/20, boxWidth = width/20;
    const initialx = width/2, initialy = height/2;
    var changeX=0, changeY=boxHeight-5;
    var changingDirection = false;

    const [snakeBody,setSnakeBody] = useState([{x:initialx, y:initialy},{x:initialx,y:initialy-boxHeight+5}]);

    useEffect(()=>{
        if(options===undefined){
            return
        } else {
            console.log(options);
        }
    },[options])

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
        drawFood();

    }, [scaleX,scaleY, redraw, snakeBody, startGame]
    );

    function moveSnake(){
        if(startGame){
            clearCanvas();
            const snakeHead = { x: snakeBody[0].x + changeX, y: snakeBody[0].y + changeY};
            snakeBody.unshift(snakeHead);
            snakeBody.pop();
            drawSnake();
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
            changeX = -boxWidth-5;
            changeY = 0;
        }
        if(keyPressed === UP_ARROW && !goDown){
            changeX = 0;
            changeY = -boxHeight+5;
        }
        if(keyPressed === RIGHT_ARROW && !goLeft){
            changeX = boxWidth+5;
            changeY = 0;
        }
        if(keyPressed === DOWN_ARROW && !goUp){
            changeX = 0;
            changeY = boxHeight-5;
        }
        changingDirection=false;
    }

    function shouldGameEnd(){
        var leftWall = snakeBody[0].x < 0;
        var topWall = snakeBody[0].y < 0;
        var rightWall = snakeBody[0].x > width-boxWidth;
        var bottomWall = snakeBody[0].y > height-boxHeight;
        if(leftWall||topWall||rightWall||bottomWall){
            setStartGame(false);
            document.getElementById("playButton").disabled = true;
        }
    }

    function drawSnake(){
        let ctx = canvasRef.current.getContext('2d');
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
        //Draw snake body
        ctx.fillStyle="#FF0000";
        ctx.strokeStyle = "#000000";
        ctx.fillRect(snakeBody.x,snakeBody.y,boxHeight,boxWidth);
        ctx.strokeRect(snakeBody.x,snakeBody.y,boxHeight,boxWidth);
    }

    function drawFood(){
        let ctx = canvasRef.current.getContext('2d');
        

    }

    function clearCanvas(){
        let ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fillRect(0,0, width, height);
        ctx.strokeRect(0,0,width, height);
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
    
    useInterval(moveSnake,300);

    return  <div className="snacksnake">
                <div className="btn-toolbar" style={{justifyContent:'space-between'}}>
                    <Button id="playButton" onClick={e=>{setStartGame(!startGame)}}>Play/Pause</Button>
                    <Button onClick={e=>{
                        setStartGame(false);
                        setSnakeBody([{x:initialx, y:initialy},{x:initialx,y:initialy-boxHeight+5}])
                        document.getElementById("playButton").disabled = false;
                    }}>Reset Game</Button>
                </div>
                <canvas className='canvasStyle' ref={canvasRef} id="myCanvas">
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </div>
}

export default Snacksnake;