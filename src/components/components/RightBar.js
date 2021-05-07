import RighttopBar from './RighttopBar';
import RightbottomBar from './RightbottomBar';

const RightBar = ({selectType, curPage, selected, onDragStart, add, setAdd,pages}) => {

    console.log("selected")
    console.log(selected);

    let select_widget;
    if(selectType === "Widget"){
        if (curPage._id === undefined)
        {   
            return <div className="rightbar">Loading...</div>
        }
        select_widget = curPage.widgets[selected]
    }
    else
    {
        select_widget = selected;
    }

    let rightBarTop = <RighttopBar selectType={selectType} onDragStart={onDragStart}/>
    let rightBarBottom = <RightbottomBar curPage={curPage} selectType={selectType} selected={select_widget} add={add} setAdd={setAdd} pages={pages}/> // curPage={curPage}

    return(
        <div className="rightbar">
            {rightBarTop}
            {rightBarBottom}
        </div>
    );
}

export default RightBar;