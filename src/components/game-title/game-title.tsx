import React from "react";
import './game-title.css';

export class GameTitle extends React.Component<any, any> {
    render() {
        return (
            <div className="title">
                <h2 className="title_heading">Onet.---.Connect</h2>
            </div>
        )
    }
}