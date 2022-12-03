import React from "react";
import {StartGame} from "./start-game/start-game";

export class Game extends React.Component<any, any> {
    render() {
        return(
            <div>
                <StartGame/>
                Hello
            </div>
        )
    }
}
