import React, {Component} from 'react';
import classes from './VisualizerContainer.css';



class VisualizerContainer extends Component {


    getPosition = (elm) => {
        let posX = 0, posY = 0;
        while (elm) {
            posX += elm.offsetLeft - elm.scrollLeft + elm.clientLeft;
            posY += elm.offsetTop - elm.scrollTop + elm.clientTop;
            elm = elm.offsetParent;
        }
        return {
            x: posX,
            y: posY
        }
    };

    getClickPosition = (e) => {

        let container = document.querySelector('#contentContainer');
        let circle1 = document.querySelector('#circle1');

        let parentPos = this.getPosition(container);

        let xPos = e.clientX - parentPos.x - (circle1.offsetWidth / 2);
        let yPos = e.clientY - parentPos.y - (circle1.offsetHeight / 2);
        let translate3dVal = 'translate3d(' + xPos + 'px,' + yPos + 'px, 0)';


        circle1.style.transform = translate3dVal;
    };

    exchangePositions = () => {

        let container = document.querySelector('#contentContainer');
        let circle1 = document.querySelector('#circle1');
        let circle2 = document.querySelector('#circle1');

        let parentPos = this.getPosition(container);
        let c1Pos = this.getPosition(circle1);
        let c2Pos = this.getPosition(circle2);

        let xPos = c2Pos.x - parentPos.x - (circle1.offsetWidth / 2);
        let yPos = c2Pos.y - parentPos.y - (circle1.offsetHeight / 2);
        let translate3dVal = 'translate3d(' + xPos + 'px,' + yPos + 'px, 0)';
        circle1.style.transform = translate3dVal;

        let xPos2 = c1Pos.x - parentPos.x - (circle2.offsetWidth / 2);
        let yPos2 = c1Pos.y - parentPos.y - (circle2.offsetHeight / 2);
        let translate3dVal2 = 'translate3d(' + xPos2 + 'px,' + yPos2 + 'px, 0)';
        circle2.style.transform = translate3dVal2;
    };

    render() {
        return (
            <div id="contentContainer"
                    onDoubleClick={(e) => {this.getClickPosition(e)}}
                    onClick={() => this.exchangePositions()}>
                <div className="circle" id="circle1">1</div>
                <div className="circle" id="circle2">2</div>
            </div>
        );
    }

};
export default VisualizerContainer;
