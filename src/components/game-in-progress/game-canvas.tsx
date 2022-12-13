import React from "react";
import {getGrid} from "../model/common";
import { testAlgo } from "../../algorithms/testAlgorithm";
import "./game-canvas.css";
import "../../algorithms/algorithm";

export class GameCanvas extends React.Component<any, any> {

    handleClick() {
        // Uncomment this function call to test the algoritm.
        testAlgo();
    }

    render() {
        const grid = getGrid();
        return (
            <div className="canvas">
                <div className="grid">
                    {grid.map(row => (
                        <div className="row">
                            {row.map(item => (
                                item !== 0 ? <div className="cell" onClick={() => this.handleClick()}>
                                    {item}
                                </div> : null
                            ))}
                        </div>
                    ))}
                </div>
                <div className="stop">
                    <button onClick={() => this.props.onStop()}>Stop</button>
                </div>
            </div>
        );
    }
}