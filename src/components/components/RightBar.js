import RighttopBar from './RighttopBar';
import RightbottomBar from './RightbottomBar';

const RightBar = ({selectType, selected, onDragStart, add, setAdd}) => {

    console.log("selected")
    console.log(selected);

    let rightBarTop = <RighttopBar selectType={selectType} onDragStart={onDragStart}/>
    let rightBarBottom = <RightbottomBar selectType={selectType} selected={selected} add={add} setAdd={setAdd}/> // curPage={curPage}

    return(
        <div className="rightbar">
            {rightBarTop}
            {rightBarBottom}
        </div>
    );
}

export default RightBar;