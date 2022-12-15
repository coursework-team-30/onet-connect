import React from "react";
import {getGrid, position} from "../model/common";
import "./game-canvas.css";
import "../../algorithms/algorithm";
import {dfs} from "../../algorithms/algorithm";

interface Sprops {
    grid: number[][];
    selected?: number;
    start?: position;
    end?: position;
}

export class GameCanvas extends React.Component<any, Sprops> {
    constructor(props: any) {
        super(props);
        this.state = {
            grid: getGrid(),
        }
    }

    componentDidUpdate() {
        if (!!this.state.selected && !!this.state.start && !!this.state.end) {
            this.handleSelectedTiles();
        }
    }

    reset(): void {
        this.setState({grid: this.state.grid, selected: undefined, start: undefined, end: undefined});
    }

    setStart(item: number, start: position) {
        this.setState({grid: this.state.grid, selected: item, start: start, end: undefined});
    }

    setEnd(item: number, end: position) {
        this.setState({grid: this.state.grid, selected: item, start: this.state.start, end: end});
    }

    deleteStart() {
        this.reset();
    }

    deleteEnd() {
        this.setState({grid: this.state.grid, selected: this.state.selected, start: this.state.start});
    }

    checkSelection(x: number, y: number): boolean {
        return (!!this.state.start && this.state.start.x === x && this.state.start.y === y)
            || (!!this.state.end && this.state.end.x === x && this.state.end.y === y);
    }

    removeSelection(x: number, y: number) {
        if (this.state.start?.x === x && this.state.start?.y === y) {
            this.deleteStart();
        } else {
            this.deleteEnd();
        }
    }

    handleSelectedTiles() {
        const grid = this.state.grid;
        const start = this.state.start;
        const end = this.state.end;

        const visited: boolean[][] = new Array(grid.length).fill(false).map(() => new Array(grid[0].length).fill(false));
        const stack: number[][] = [];
        if (dfs(grid, start?.x as number, start?.y as number, grid.length, grid[0].length,
            0, "", end?.x as number, end?.y as number, visited, stack)) {
            console.log(stack);
            let newGrid = grid;
            // @ts-ignore
            newGrid[start?.x][start?.y] = 0;
            // @ts-ignore
            newGrid[end?.x][end?.y] = 0;
            console.log(newGrid);
            this.setState({grid: newGrid, selected: undefined, start: undefined, end: undefined});
        } else {
            this.reset();
        }
    }

    handleClick(x: number, y: number, item: number): void {
        if (this.checkSelection(x, y)) {
            this.removeSelection(x, y);
            return;
        }
        if (!this.state.start) { // empty
            this.setStart(item, {x, y});
        } else {
            if (this.state.selected !== item) {
                this.deleteStart();
                this.setStart(item, {x, y})
            } else {
                this.setEnd(item, {x, y});
            }
        }
    }

    render() {
        return (
            <div className="canvas">
                <div className="grid">
                    {this.state.grid.map((row, x) => (
                        <div className="row">
                            {row.map((item, y) => (
                                item !== 0 ? <div className={`cell ${this.checkSelection(x, y) ? "selected" : null}`}
                                                  onClick={() => this.handleClick(x, y, item)}>
                                    {item}
                                </div> : <div className="hidden">{item}</div>
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