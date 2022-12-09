import React from "react";

export class GameCanvas extends React.Component<any, any> {
    render() {
        return(
            <div>
                testing
                <button onClick={() => this.props.onStop()}>Stop</button>
            </div>
        );
    }
}