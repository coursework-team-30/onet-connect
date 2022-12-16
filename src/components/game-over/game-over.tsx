import React from "react";
import "./game-over.css";

export class GameOver extends React.Component<any, any> {
    render() {
        return(
            <div className="over">
                <button className="actionButton" onClick={() => this.props.onRestart()}>Restart</button>
            </div>
        )
    }
}