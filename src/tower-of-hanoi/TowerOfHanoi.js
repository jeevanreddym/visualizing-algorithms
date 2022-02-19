import React, {Component} from 'react';
import classes from './TowerOfHanoi.css';
import HanoiBar from "./hanoi-bar/HanoiBar";
import HorizontalDisk from "./horizontal-bar/HorizontalDisk";





export default class TowerOfHanoi extends Component {

    state = {
        noOfDisks: 0,
        numOfMoves: 0,
        source: {},
        auxillary: {},
        destination: {},
        setUpDone: false,
    };


    moveDisks = () => {
        if (this.state.setUpDone) {
            let {source, auxillary, destination} = this.state;
            this.runHanoi(5, source, auxillary, destination, 0).then((numOfMoves) => {
                this.setState({numOfMoves})
            });
        } else {
            alert('Select number of Disks!');
        }
    };

    runHanoi = async (numOfDisks, source, auxillary, destination, numOfMoves) => {

        if (numOfDisks == 1) {

            numOfMoves++;

            this.shiftDisk(source, destination);
            await this.setState({source, auxillary, destination, numOfMoves});
            return numOfMoves;

        } else {

            await this.runHanoi(numOfDisks - 1, source, destination, auxillary, numOfMoves);

            numOfMoves++;

            this.shiftDisk(auxillary, destination);
            await this.setState({source, auxillary, destination, numOfMoves});

            await this.runHanoi(numOfDisks - 1, auxillary, source, destination, numOfMoves);
        }
    };

    shiftDisk = (from, to) => {
        to.disks.push(from.disks.pop());
    };

    setNumOfDisks = (noOfDisks) => {
        this.setState({noOfDisks: parseInt(noOfDisks), setUpDone: true}, () => {
            this.setUp();
        });
    };

    setUp = () => {
        const disks = Array(this.state.noOfDisks).fill(0).map((_, i) => i+1);
        let source = {
            value: 'S',
            disks: disks,
        };
        let auxillary = {value: 'A', disks: []};
        let destination = {value: 'D', disks: []};
        this.setState({source, auxillary, destination});
    };

    componentDidMount = () => {
        //this.setUp();
    };

    render = () => (
        <div>
            <div style={{padding: "20px"}}>Tower of Hanoi</div>
            <div style={{paddingBottom: '20px'}}>
                <span>
                    <label htmlFor="noOfDisks">Number of Disks</label>
                    <input id="noOfDisks" type="number" value={this.state.noOfDisks}
                           onChange={(e) => this.setNumOfDisks(e.target.value)} />
                </span>
                <button onClick={() => this.moveDisks()}>Start</button>
                <span>
                    <label htmlFor="numOfMoves">Number of Moves</label>
                    <input id="numOfMoves" type="number" value={this.state.numOfMoves} />
                </span>
            </div>
            <div className="bars-container">
                {<HanoiBar barInfo={this.state.source} />}
                {<HanoiBar barInfo={this.state.auxillary} />}
                {<HanoiBar barInfo={this.state.destination} />}
            </div>
        </div>
    );

}
