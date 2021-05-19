import React from 'react';
import '../../ComponentStyle.css';
import {Button} from 'react-bootstrap';
const MatchingEdit=({internals,setAction})=>{
    let text=[];
    for(let i=0;i<internals.options.length;i++){
        let ob={"left":"","right":""}
        ob.left=internals.options[i].left;
        ob.right=internals.options[i].right;
        text.push(ob);
    }
    let matching;
    matching=<div style={{paddingTop:"10px"}} className='flashcard'>
                    {
                        text.map((val,key) => {
                            return (
                                <div key={''+key} style={{justifyContent:'space-between',display:'flex',paddingLeft:'10px',paddingRight:'10px'}}>
                                    <p>{val.left}</p>
                                    <p>{val.right}</p>
                                </div>
                            );
                        })
                    }
                    <Button style={{display:'center'}} className='cavasButton' > {internals.buttonText}</Button> 
                </div>
    return (matching);
}
export default MatchingEdit;