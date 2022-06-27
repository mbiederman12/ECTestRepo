import React from 'react'
import '../style/Backstage.css';
import VideoPosition from './VideoPosition';

var position = 
{
    position1: false,
    position2: false,
    position3: false,
    position4: false
};

function PositionButton(){
    
    function togglePosition1() {
        position.position1 =  !position.position1;
        if(position.position1){
            <VideoPosition />
            alert("Position 1 Runs")
        }
    };
    function togglePosition2() {
        position.position2 =  !position.position2;
        if(position.position2){
            <VideoPosition />
        }
    };
    function togglePosition3() {
        position.position3 =  !position.position3;
        if(position.position3){
            <VideoPosition />
        }
    };
    function togglePosition4() {
        position.position4 =  !position.position4;
        if(position.position4){
            <VideoPosition />
        }
    };
    
    return(
        <div className="videoButton">
            <div class="dropdown">
                <button class="dropbtn">Move Position</button>
                  <div class="dropdown-content">
                  <button id="position1" onClick={togglePosition1}> Position 1</button>
                  <button id="position2" onClick={togglePosition2}> Position 2 </button>
                  <button id="position3" onClick={togglePosition3}> Position 3 </button>
                  <button id="position4" onClick={togglePosition4}> Position 4 </button>
                   </div>
                </div>
                
        </div>
    );
}

export {position}
export default PositionButton