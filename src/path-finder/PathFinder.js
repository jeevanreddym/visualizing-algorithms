import React, {Component} from 'react';

import classes from './PathFinder.css';

import Row from "./row/Row";
import Cell from "./cell/Cell";

import MinHeap from "../utils/PriorityQueue";
import {dirs, SpeedOption, speeds} from "../utils/constants";





class PathFinder extends Component {

    state = {
        grid: [],
        speed: 0,
    };


    dfs = (source) => {
        let grid = [...this.state.grid];
        this.dfsUtil(grid, source.row, source.col, 0, 10).then(() => {});
    };

    async dfsUtil(grid, row, col, level, cnt) {

        grid = [...grid];

        console.log(row + ',' + col);

        // chk to avoid grid overflow & already visited nodes.
        if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && !grid[row][col].visited && !grid[row][col].wall) {

            grid[row][col].minDist = level;
            grid[row][col].processing = true;
            grid[row][col].visited = true; 	// process the node.

            await this.setState({grid: grid});

            level++;

            cnt++;

            grid[row][col].processing = false;

            await this.dfsSubUtil(grid, 0, row, col, level, cnt); // trying all the 4 possible directions.

        } else {
            return true;
        }
    }

    async dfsSubUtil(grid, i, row, col, level, cnt) {

        if (i < dirs.length) {

            const dir = dirs[i];
            const newRow = row + dir[0];
            const newCol = col + dir[1];

            await setTimeout(() => {

                this.dfsUtil(grid, newRow, newCol, level, cnt).then(goAhead => {
                    if (goAhead) {
                        this.dfsSubUtil(grid, i + 1, row, col, level, cnt + 1);
                    }
                });

            }, this.state.speed);

        }
    };


    bfs = (source) => {
        const grid = [...this.state.grid];
        const sourceCell = this.state.grid[source.row][source.col];

        const q = [];
        q.push(grid[sourceCell.row][sourceCell.col]);

        this.bfsUtil(grid, q, 0);
    };

    bfsUtil = async (grid, q, level) => {

        if (q.length > 0) {

            const currCell = q.shift();

            grid[currCell.row][currCell.col].visited = true; // process the node.
            grid[currCell.row][currCell.col].minDist = level;
            grid[currCell.row][currCell.col].processing = true;

            this.setState({grid: grid});

            grid[currCell.row][currCell.col].processing = false;

            await setTimeout(() => {

                level++;

                for (const dir of dirs) {

                    const newRow = currCell.row + dir[0];
                    const newCol = currCell.col + dir[1];

                    if (this.isValid(grid, newRow, newCol)) {

                        q.push(grid[newRow][newCol]);

                        this.bfsUtil(grid, q, level);
                    }
                }

            }, this.state.speed);
        }
    };

    isValid = (grid, row, col) => {
        return (row >= 0 && row < grid.length
            && col >= 0 && col < grid[0].length
            && !grid[row][col].wall
            && !grid[row][col].visited);
    };

    /**
     *
     */
    findShortestPath = (source, target) => {
        this.computeMinimumPathsFrom(source, target);
    };

    /**
     *  compute min paths from source node to all other nodes in the matrix.
     */
    computeMinimumPathsFrom = (source, target) => {

        const grid = [...this.state.grid];

        /**
         * 	Using Priority Queue (min heap) here to get the next vertex with min distance.
         */
        const pq = new MinHeap();

        const sourceCell = grid[source.row][source.col];
        sourceCell.minDist = 0; // setting to 0 as dist from node to itself is 0.
        pq.insert(sourceCell);

        this.computeMinimumPathsFromUtil(grid, pq, target);
    };

    async computeMinimumPathsFromUtil (grid, pq, target) {

        if (!pq.isEmpty()) {

            const currCell = pq.remove(); // gives the next vertex with min dist.

            currCell.visited = true; // process the node.
            grid[currCell.row][currCell.col].processing = true;

            await this.setState({grid: grid});

            grid[currCell.row][currCell.col].processing = false;

            await setTimeout(() => {

                for (const dir of dirs) {

                    const newRow = currCell.row + dir[0];
                    const newCol = currCell.col + dir[1];

                    // valid neighbour (doesn't underflow or overflow).
                    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length && !grid[newRow][newCol].wall) {

                        const neighbourCell = grid[newRow][newCol];

                        /**
                         * 	new dist = min dist so far to the curr node + dist from curr node to target node.
                         */
                        const newDist = currCell.minDist + 1; // here we consider distance b/w 2 nodes as 1 as they are adjacent cells.
                        // in an actual weighed graph the dist b/w 2 nodes could be different.

                        if (newDist < neighbourCell.minDist) { // update if new min dist is less that existing min distance for the neighbour node.

                            neighbourCell.minDist = newDist;

                            neighbourCell.predecessor = currCell;

                            pq.insert(neighbourCell); // removing, updating min dist & adding back the neighbour cell to Priority Queue.
                        }

                        this.computeMinimumPathsFromUtil(grid, pq, target);
                    }
                }

            }, this.state.speed);

        } else {

            let targetCell = this.state.grid[target.row][target.col];
            this.getShortestPathTo(grid, targetCell);
        }
    };

    /**
     * 	Get shortest path from source to one of the requested target vertex.
     */
    getShortestPathTo = (grid, target) => {

        let bfsCompleted = true;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                const currCell = grid[row][col];
                if (!currCell.wall && !currCell.visited) {
                    bfsCompleted = false;
                    break;
                }
            }
            if (!bfsCompleted) {
                break;
            }
        }

        if (bfsCompleted) {
            let currCell = grid[target.row][target.col];
            this.getShortestPathToUtil(grid, currCell);
        }
    };

    getShortestPathToUtil = async (grid, currCell) => {

        if (currCell != null) {

            await setTimeout(() => {

                currCell.inPath = true;
                this.setState({grid: grid});

                currCell = currCell.predecessor;

                this.getShortestPathToUtil(grid, currCell);

            }, this.state.speed);
        }
    };


    setSpeed = (e) => {
        let speedVal = 100;
        const selSpeedOptn = speeds.find(optn => optn.speed == (e? e.target.value: SpeedOption.FAST));
        if (selSpeedOptn && selSpeedOptn.timeInMillis) {
            speedVal = selSpeedOptn.timeInMillis;
        }
        this.setState({
            speed: speedVal
        });
    };

    setAsWall = (cellInfo) => {
        let grid = [...this.state.grid];
        grid[cellInfo.row][cellInfo.col].wall = true;
        this.setState({
            grid: grid
        });
    };

    setUp = () => {
        const rows = [];
        for (let row = 0; row < 18; row++) {
            const curRow = [];
            for (let col = 0; col < 50; col++) {
                curRow.push({
                    row, col,
                    visited: false,
                    minDist: Infinity,
                    predecessor: null,
                    inPath: false,
                    wall: ((row == 6 || row == 2) && (col < 9)),
                });
            }
            rows.push(curRow);
        }
        this.setState({
            grid: rows
        });
    };

    componentDidMount() {
        this.setUp();
        this.setSpeed();
    }

    render = () => {
        return (
            <div>
                <div style={{paddingBottom: '15px'}}>

                    <div className="buttons-panel">
                        <span className={'path-finder-label'}>Path Finding Visualizer</span>
                        <button onClick={() => this.dfs({row:10,col:24})}>dfs</button>
                        <button onClick={() => this.bfs({row:10,col:24})}>bfs</button>
                        <button onClick={() => this.findShortestPath({row:10,col:24}, {row:15,col:45})}>Shortest Path</button>
                        <select onChange={(event) => this.setSpeed(event)}
                                defaultValue={SpeedOption.FAST}>
                            {speeds.map(speedOptn => {
                                return <option value={speedOptn.speed}>{speedOptn.text}</option>
                            })};
                        </select>
                        <button onClick={() => this.setUp()}>reset</button>
                    </div>
                </div>
                <div className="grid">
                    {this.state.grid.map((row, rowInd) => {
                        return <Row key={rowInd}>
                            {row.map((cell, colInd) => {
                                return <Cell key={rowInd + colInd}
                                             info={cell}
                                             setAsWall={(cellInfo) => this.setAsWall(cellInfo)}/>
                            })}
                        </Row>
                    })}
                </div>
            </div>
        )
    }

}
export default PathFinder;
