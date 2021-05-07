import React from 'react';
import {Accordion, Card, Button} from 'react-bootstrap';
import deleteIcon from '../images/delete.png';
import saveIcon from '../images/save.png';
import '../ComponentStyle.css';

const LeftBarHeader = ({saveAll}) =>
{
    return (
    <button className='deleteButton' 
    onClick={()=>{saveAll()}}>
        <img src={saveIcon} height='40px' width='40px' alt="save"/>
    </button>
    )
}

const LeftBarAccordion = ({platform, modules, pages, setPageId, setModuleId}) =>
{
    const getPageAccordion = (page, index) =>
    {
        return <Button key={index} className="moduleTreeButton" variant="info" onClick={()=>setPageId(page._id)}>{page.pageName}</Button>
    }

    const getModuleAccordion = (module, index) => 
    {
        if (pages[0] && module._id === pages[0].moduleId)
        {
            return (
                <Accordion key={index} defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as = {Card.Header} eventKey="0">
                            {module.moduleName}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                            <Button className="moduleTreeButton" variant="primary" onClick={()=>{setModuleId(module._id); setPageId("");}}>
                                {module.moduleName}
                            </Button>
                            {
                                pages.map( (page, i) =>
                                {
                                    return getPageAccordion(page, i);
                                })
                            }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
    
                </Accordion>
            )
        }
        else
        {
            return <Button key={index} className="moduleTreeButton" variant="info" onClick={()=>{setModuleId(module._id); setPageId("");}}>{module.moduleName}</Button>
        }
    }

    const getPlatformAccordion = (platform) =>
    {
        let platformButton = <Button className="moduleTreeButton" variant="primary" onClick={()=>{setModuleId(""); setPageId("");}}>
            {platform.platformName}
            </Button>
        if (!platform.modules)
            return platformButton;
        return  <>
            {platformButton}
            <br/>
            {
            platform.modules.map( (module, i) =>
            {
                return getModuleAccordion(module, i);
            })
            }
            </>
    }
    return getPlatformAccordion(platform);
        
}
const LeftBarBigDelete = ({doDelete}) =>
{
    return (
        <button onClick={()=>{doDelete()}} className='LeftDelete deleteButton'>
            <img src={deleteIcon} height='80px' width='80px' alt="delete"/>
        </button>
    )
}

const LeftBar = ({isEdit, doDelete, saveAll, platform, pages, setPageId, setModuleId}) =>
{
    if (!isEdit)
    return(<div className="leftbaroff">

    </div>)

    return (
    <div className="leftbar">
        <LeftBarHeader saveAll={saveAll}/>
        <LeftBarAccordion setPageId={setPageId} setModuleId={setModuleId} platform={platform} modules={platform.modules} pages={pages}/>
        <LeftBarBigDelete doDelete={doDelete}/>
    </div>
    )
}

export default LeftBar;