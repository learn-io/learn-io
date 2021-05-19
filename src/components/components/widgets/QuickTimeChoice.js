import React, { useEffect,useState} from 'react';
import '../../ComponentStyle.css';
import {Button, Table} from 'react-bootstrap';


const QuickTime=({internals, setAction,widgetClicked,isEdit})=>
{
    const [started, setStarted] = useState(false);

    const [left, setLeft] = useState(<div/>);
    const [right, setRight] = useState(<div/>);
    const [top, setTop] = useState(<div/>);
    const [bottom, setBottom] = useState(<div/>);

    const start = () => 
    {
        setStarted(true);
        let arr = internals.options.sort( () => .5 - Math.random() );
        setTop(arr[0]);
        setLeft(arr[1]);
        setRight(arr[2]);
        setBottom(arr[3]);
    }

    useEffect( () =>
    {
        if (!started)
            return;
        let timer = setTimeout(() => setAction(internals.timeout), internals.timeout.seconds * 1000);
        return ()=>{clearTimeout(timer)}
    }, [started,internals.timeout,setAction]
    );

    if (!started)
    {
        return (
        <div className="flashcard">
            <Button onClick={()=>{start()}}>Start!</Button>
        </div>)
    }
    else
    {
    return (<div className="flashcard">
        <Table size="sm" borderless>    
            <tbody>
                <tr>
                    <td/>
                    <td><Button onClick={()=>{setAction(top); if(!isEdit){widgetClicked();}}}>{top.text}</Button></td>
                </tr>
                <tr>
                    <td><Button onClick={()=>{setAction(left); if(!isEdit){widgetClicked();}}}>{left.text}</Button></td>
                    <td><img height="50px" src="https://www.pinclipart.com/picdir/big/554-5549663_cross-clipart-cute-arrow-cross-png-download.png"></img></td>
                    <td><Button onClick={()=>{setAction(right); if(!isEdit){widgetClicked();}}}>{right.text}</Button></td>
                </tr>
                <tr>
                    <td/>
                    <td><Button onClick={()=>{setAction(bottom); if(!isEdit){widgetClicked();}}}>{bottom.text}</Button></td>
                </tr>
            </tbody>
        </Table>
    </div>)
    }
}
export default QuickTime;