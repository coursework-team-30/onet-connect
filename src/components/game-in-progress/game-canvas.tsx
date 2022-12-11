import React from "react";
import {getGrid} from "../model/common";
import "./game-canvas.css";

export class GameCanvas extends React.Component<any, any> {
    render() {
        const grid = getGrid();
        return (
            <div className="canvas">
                <div className="grid">
                    {grid.map(row => (
                        <div className="row">
                            {row.map(item => (
                                item !== 0 ? <div className="cell">
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