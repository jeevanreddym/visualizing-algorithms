import React, {Fragment} from "react";
import classes from './home-page.css';
import P5Sketch from "../utils/p5/P5Sketch";



class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    Sketch = (p) => {

        p.setup = () => {

        };

        p.draw = () => {

        }
    };

    render() {
        return <P5Sketch setup={this.setup} draw={this.draw} />
    }

};
export default HomePage;
