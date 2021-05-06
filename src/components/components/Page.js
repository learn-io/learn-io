import { useState, useEffect } from 'react';
import '../ComponentStyle.css';

const Page = ({pageInfo}) => {
    
    console.log("pageInfo")
    console.log(pageInfo)

    const [entry,setEntry]=useState(false);
    const [pageName,setPageName]=useState("");
    const [rank, setRank]=useState(0);

    useEffect(
        ()=>{
            if(pageInfo === undefined)
                return;
            
            setEntry(pageInfo.entry);
            setPageName(pageInfo.pageName);
            setRank(pageInfo.rank);
        }, [pageInfo]
    )

    return(
        <div className="page">
            <h1>{pageName}</h1>
        </div>
    );
};

export default Page;