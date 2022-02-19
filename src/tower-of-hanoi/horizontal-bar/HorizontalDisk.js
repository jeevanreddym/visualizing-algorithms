import React from "react";
import classes from './HorizontalDisk.css';


const HorizontalDisk = (props) => {
    const disk = props.info;


    const divClasses = `${"horizontal-disk" + ' ' + disk.layer}`;

    return (
        <div className={divClasses}>

        </div>
    );
};
export default HorizontalDisk;
