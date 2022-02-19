import React from 'react';

import classNames from "classnames";

import classes from './Cell.css';

const Cell = (props) => {
    const cell = props.info;
    return (
        <div className={classNames({
                cell: true,
                visited: cell.visited,
                'shortest-path': cell.inPath,
                wall: cell.wall,
                processing: cell.processing,
            })}
            onClick={() => {props.setAsWall(cell)}}>
            {cell.minDist === Infinity? '#': cell.minDist}
        </div>
    );
};
export default Cell;
