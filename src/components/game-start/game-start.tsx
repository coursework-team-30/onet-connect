import React from "react";

export class GameStart extends React.Component<any, any> {

    render() {
        return(
            <div className='start'>
                <button onClick={() => this.props.onStart()}>Start</button>
            </div>
        )
    }
}