import React from 'react';
import '../ComponentStyle.css';
import Module from './Module';

const ModuleList=(props)=>{
	// console.log(props.selectPlatform);
    // console.log(props.platform);
    // let modules=props.platform.modules;
    // console.log(modules);
	let modules=[{
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "Obscure Berries",
        "moduleDescription": "This is a berry test!!",
        "lockedby": [],
        "unlocks": [],
        "x": 0,
        "y": 0,
        "height": 130,
        "width": 130
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "What are Common Berries?",
        "moduleDescription": "Guess what is a berry test!!",
        "lockedby": [0],
        "unlocks": [2],
        "x": 0,
        "y": 0,
        "height": 130,
        "width": 130
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "What are Botany Berries?",
        "moduleDescription": "berry berry!!",
        "lockedby": [1],
        "unlocks": [3],
        "x": 0,
        "y": 0,
        "height": 130,
        "width": 130
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "Bananas?",
        "moduleDescription": "Does bananas belong to berry?!",
        "lockedby": [2],
        "unlocks": [4],
        "x": 0,
        "y": 0,
        "height": 130,
        "width": 130
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "Watermelon!",
        "moduleDescription": "How about watermelon",
        "lockedby": [3],
        "unlocks": [5],
        "x": 0,
        "y": 0,
        "height": 130,
        "width": 130
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "Lemons?",
        "moduleDescription": "Is it a berry?",
        "lockedby": [4],
        "unlocks": [6],
        "x": 0,
        "y": 0,
        "height": 300,
        "width": 300
    }, {
        "platformId": "607b74dc4165c90aa0dfdce5",
        "moduleName": "Pumpkins!?",
        "moduleDescription": "How about halloween pumpkins!!",
        "lockedby": [5],
        "unlocks": [],
        "x": 0,
        "y": 0,
        "height": 130,
        "width": 130
    }];
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
	
}

export default ModuleList;