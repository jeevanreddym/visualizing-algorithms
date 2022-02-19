import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Fragment} from "react";


import './App.css';
import PathFinder from "./path-finder/PathFinder";
import SortingVisualizer from "./sorting-visualizer/SortingVisualizer";
import VisualizerContainer from "./visualizer-home/VisualizerContainer";
import TowerOfHanoi from "./tower-of-hanoi/TowerOfHanoi";
import HomePage from "./home/home-page";




class App extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="App">
                    <BrowserRouter>
                        <header>
                            <nav>
                                <ul>
                                    <li><NavLink to="/">Home</NavLink></li>
                                    <li><NavLink to="/positioning">Positioning</NavLink></li>
                                    <li><NavLink to="/path-finder">Path Finder</NavLink></li>
                                    <li><NavLink to="/sorting">Sorting</NavLink></li>
                                    <li><NavLink to="/tower-of-hanoi">Tower of Hanoi</NavLink></li>
                                </ul>
                            </nav>
                        </header>
                        <div>
                            <Switch>
                                <Route path="/" exact component={HomePage} />
                                <Route path="/positioning" exact component={VisualizerContainer} />
                                <Route path="/path-finder" exact component={PathFinder} />
                                <Route path="/sorting" exact component={SortingVisualizer} />
                                <Route path="/tower-of-hanoi" exact component={TowerOfHanoi} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </div>
            </Fragment>
        );
    }
}
export default App;
