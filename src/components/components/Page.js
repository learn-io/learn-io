import { useState, useEffect } from 'react';
import '../ComponentStyle.css';

const Page = ({pageInfo}) => {
    return(
        <div className="page">
            <h3>{pageInfo}</h3>
        </div>
    );
};

export default Page;