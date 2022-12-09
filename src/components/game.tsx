import React from "react";
import {GameStart} from "./game-start/game-start";
import {State} from "./model/common";
import {GameCanvas} from "./game-in-progress/game-canvas";
import {GameOver} from "./game-over/game-over";

interface IProps {
    status: State
}

export class Game extends React.Component<IProps, IProps> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            status: this.props.status
        }
    }

    handleStart() {
        this.setState({status: State.InGame});
    }

    handleGameOver() {
        this.setState({status: State.Over});
    }

    handleReset() {
        this.setState({status: State.Start});
    }

    render() {
        return(
            <div>
                {this.state.status === State.Start ? <GameStart onStart={() => this.handleStart()}/> : null}
                {this.state.status === State.InGame ? <GameCanvas onStop={() => this.handleGameOver()}/> : null}
                {this.state.status === State.Over ? <GameOver onRestart={() => this.handleReset()}/> : null}
            </div>
        )
    }
}
