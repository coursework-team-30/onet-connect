import React from "react";
import './game-start.css';

export class GameStart extends React.Component<any, any> {

    render() {
        return (
            <div className='start'>
                <button className="actionButton" onClick={() => this.props.onStart()}>Start</button>
            </div>
        )
    }
}