import React, {Component} from 'react';
import VerticalBar from "./vertical-bar/VerticalBar";
import classes from './SortingVisualizer.css';



export default class SortingVisualizer extends Component {

    state = {
        blocks: [],
    };

    bubbleSort = () => {

        const blocks = [...this.state.blocks];

        for (let i = 0; i < blocks.length - 1; i++) {

            setTimeout(() => {

                if (i != 0) {
                    blocks[i - 1].current = false;
                }

                blocks[i].current = true;
                this.setState({
                    blocks: blocks
                });

                for (let j = i + 1; j < blocks.length; j++) {

                    setTimeout(() => {

                        blocks[j - 1].current = false;

                        blocks[j].current = true;
                        this.setState({
                            blocks: blocks
                        });



                        if (blocks[i].value > blocks[j].value) {

                            let tmp = blocks[i];
                            blocks[i] = blocks[j];
                            blocks[j] = tmp;

                            this.setState({
                                blocks: blocks
                            });
                        }

                    }, 200 * j);
                }

            }, 200 * i);
        }
    };

    mergeSort = () => {
        let blocks = [...this.state.blocks];
        this.split(0, blocks.length - 1, blocks);
    };

    split = (l, r, blocks) => {

        if (r == l) {
            return {l, r};
        }

        let m = Math.floor(l + (r - l)/2);

        const {l: ltLow, r: ltHigh} = this.split(l, m, blocks);

        const {l: rtLow, r: rtHigh} = this.split(m + 1, r, blocks);

        return this.merge(ltLow, ltHigh, rtLow, rtHigh, blocks);
    };

    merge = (ltLow, ltHigh, rtLow, rtHigh, blocks) => {

        const leftLow = ltLow;

        const merged = [];
        let k = 0;

        while (ltLow <= ltHigh && rtLow <= rtHigh) {
            if (blocks[ltLow].value < blocks[rtLow].value) {
                merged[k++] = blocks[ltLow++];
            } else {
                merged[k++] = blocks[rtLow++];
            }
        }
        while (ltLow <= ltHigh) {
            merged[k++] = blocks[ltLow++];
        }
        while (rtLow <= rtHigh) {
            merged[k++] = blocks[rtLow++];
        }



        for (let i = leftLow, k = 0; i <= rtHigh; i++, k++) {

            blocks[i] = merged[k];

            this.setState({
                blocks: blocks
            });
        }

        return {l: leftLow, r: rtHigh};
    };



    getRandomInRange = (from, to) => {
        return Math.floor((Math.random() * (to - from) + from));
    };

    shuffleArray = (arr) => {

        const lastIndex = arr.length - 1;

        for (let currIndex = 0; currIndex < arr.length; currIndex++) {

            const randomIndex = this.getRandomInRange(currIndex, lastIndex);

            // and swap the values.
            if (randomIndex != currIndex) {
                let tmp = arr[currIndex];
                arr[currIndex] = arr[randomIndex];
                arr[randomIndex] = tmp;
            }
        }

        return arr;
    };

    setUp = () => {

        let nums = [];
        const limit = 80;
        for (let i=0; i < limit; i++) {
            nums[i] = (i * 11) % 40;
        }

        nums = this.shuffleArray(nums);

        const blocks = [];
        for (let i = 0; i < nums.length; i++) {
            blocks.push({
                value: nums[i],
                height: 10 * nums[i],
            });
        }
        this.setState({
            blocks
        });
    };

    componentDidMount() {
        this.setUp();
    }

    render() {
        return (
            <div>
                <div style={{padding: "20px"}}>Sorting Algorithms</div>

                <div style={{paddingBottom: '20px'}}>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.setUp()}>Reset</button>
                </div>

                <div className="bar-container">
                    {this.state.blocks.map((elm, i) => {
                        return <VerticalBar key={i} info={elm} />
                    })}
                </div>

            </div>
        )
    }

}
