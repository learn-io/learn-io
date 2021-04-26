import React, { useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import '../ComponentStyle.css';
import axios_instance from '../axios_instance.js';
import Flashcard from './Flashcard.js';
import ImageButton from './ImageButton.js';
import MultipleChoice from './MultipleChoice.js';
import ImageQuestion from './ImageQuestion.js';
import SoundQuestion from './SoundQuestion.js';

const GamePlay=({username})=>{
    let { platform,module } = useParams();
    const [plat,setPlat]=useState('');
    const [mod,setMod]=useState('');
    const [page,setPage]=useState([]);
    const [pageIndex,setPageIndex]=useState(-1);
    const [widgetIndex,setWidgetIndex]=useState(-1);
    const [widget,setWidget]=useState("");
    const [complete,setComplete]=useState(false);

    useEffect(
        ()=>{
			axios_instance({
                method: 'get',
                url: "platform/"+platform
            })
            .then((res)=>{
                setPlat(res.data);
                for(let i=0;i<res.data.modules.length;i++){
                    if(res.data.modules[i]._id===module){
                        setMod(res.data.modules[i]);
                    }
                }
            })
            .catch(err=>console.log(err));
            axios_instance({
                method: 'get',
                url: "page/"+platform+"/"+module
            })
            .then((res)=>{
                setPage(res.data);
                setPageIndex(0);
                setWidgetIndex(0);
            })
            .catch(err=>console.log(err));

        },[platform,module]   
	);
    
    useEffect(
        ()=>{
            if(pageIndex<0||widgetIndex<0)
                return;
            if(pageIndex<page.length&&widgetIndex<page[pageIndex].widgets.length){
                setWidget(page[pageIndex].widgets[widgetIndex].internals);
            }else{
                setComplete(true);
            }
        },[pageIndex,widgetIndex]   
	);
    
    if(page.length===0||pageIndex<0||widgetIndex<0){
        return(<h2 style={{color:'white'}}>{plat.platformName}</h2>);
    }else{
        let game;
        if(complete){
            game=<h2 style={{display:'center',marginTop: '10%',color:'white'}}>Module Complete</h2>
        }else{
            if(widget.widgetFlavor==='Flashcard'){
                game=<Flashcard widget={widget} widgetIndex={widgetIndex} setWidgetIndex={setWidgetIndex}/>
            }else if(widget.widgetFlavor==='ImageButton'){
                game=<ImageButton widget={widget} widgetIndex={widgetIndex} setWidgetIndex={setWidgetIndex}/>
            }else if(widget.widgetFlavor==='MultipleChoice'){
                game=<MultipleChoice widget={widget} widgetIndex={widgetIndex} setWidgetIndex={setWidgetIndex}/>
            }else if(widget.widgetFlavor==='Image'){
                game=<ImageQuestion widget={widget} widgetIndex={widgetIndex} setWidgetIndex={setWidgetIndex}/>
            }else if(widget.widgetFlavor==='Sound'){
                game=<SoundQuestion widget={widget} widgetIndex={widgetIndex} setWidgetIndex={setWidgetIndex}/>
            }
            
        }
        
        return(<div>
            <h2 style={{color:'white'}}>{plat.platformName}</h2>
            <h3 style={{color:'white'}}>{mod.moduleName} : {page[pageIndex].name}</h3>
            {game}
        </div>);
    }
}

export default GamePlay;
