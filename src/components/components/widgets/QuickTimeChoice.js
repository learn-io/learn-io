import React, { useEffect,useState} from 'react';
import '../../ComponentStyle.css';
import {Button, Container, Row, Col} from 'react-bootstrap';


const QuickTime=({internals, setAction,widgetClicked})=>
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
        <Container>
            <Row>
                <Col></Col>
                <Col><Button onClick={()=>{setAction(top); widgetClicked();}}>{top.text}</Button></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col><Button onClick={()=>{setAction(left); widgetClicked();}}>{left.text}</Button></Col>
                <Col></Col>
                <Col><Button onClick={()=>{setAction(right); widgetClicked();}}>{right.text}</Button></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col><Button onClick={()=>{setAction(bottom); widgetClicked();}}>{bottom.text}</Button></Col>
                <Col></Col>
            </Row>
        </Container>
    </div>)
    }
}
export default QuickTime;