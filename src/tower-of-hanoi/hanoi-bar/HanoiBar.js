import React, {Fragment} from "react";
import classNames from "classnames";
import classes from './HanoiBar.css';
import HorizontalDisk from "../horizontal-bar/HorizontalDisk";



const HanoiBar = (props) => {
    const barInfo = props.barInfo;
    return (
        <Fragment>

            <div className={classes.container_row}>

                <div className={classNames({
                    'hanoi-bar': true,
                    current: barInfo.current,
                })}>
                    {barInfo.value}
                    {barInfo.disks}
                </div>

                <HorizontalDisk info={{layer: "layer1"}} />
                <HorizontalDisk info={{layer: "layer2"}} />
                <HorizontalDisk info={{layer: "layer3"}} />

            </div>

        </Fragment>
    );
};
export default HanoiBar;
