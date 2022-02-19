import classNames from "classnames";

import classes from './VerticalBar.css';
import React from "react";

const VerticalBar = (props) => {
    const bar = props.info;
    return (
        <div className={classNames({
                'vertical-bar': true,
                current: bar.current,
            })} style={{height: bar.height + 'px'}}>
            {bar.value}
        </div>
    );
};
export default VerticalBar;
