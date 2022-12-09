import React from "react";

export class GameOver extends React.Component<any, any> {
    render() {
        return(
            <div>
                <button onClick={() => this.props.onRestart()}>Restart</button>
            </div>
        )
    }
}