import React from "react";
import { getGrid, Outcome, position } from "../model/common";
import "./game-canvas.css";
import "../../algorithms/algorithm";
import { dfs } from "../../algorithms/algorithm";
import { fetchAllPaths } from "../../algorithms/fetchAllPossiblePaths";
import { Popup } from "../popup/popup";

interface Sprops {
  grid: number[][];
  show: boolean;
  timer: NodeJS.Timeout;
  minutes: number;
  seconds: number;
  outcome: Outcome;
  selected?: number;
  start?: position;
  end?: position;
}

export class GameCanvas extends React.Component<any, Sprops> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      timer: setInterval(this.countDown, 1000),
      outcome: Outcome.LOST,
      minutes: 3,
      seconds: 0,
      grid: getGrid(),
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidUpdate() {
    if (!!this.state.selected && !!this.state.start && !!this.state.end) {
      this.handleSelectedTiles();
      let status = this.checkGameOver();
      this.setState({
        outcome: status ? Outcome.WIN : Outcome.LOST,
      });
      if (status) this.showStatusAndEndGame();
    }
  }

  countDown = () => {
    const { minutes, seconds } = this.state;
    let c_seconds = minutes * 60 + seconds;

    if (c_seconds) {
      // seconds change
      seconds
        ? this.setState({ seconds: seconds - 1 })
        : this.setState({ seconds: 59 });

      // minutes change
      if (c_seconds % 60 === 0 && minutes) {
        this.setState({ minutes: minutes - 1 });
      }
    } else {
      this.setState({
        outcome: this.checkGameOver() ? Outcome.WIN : Outcome.LOST,
      });
      this.showStatusAndEndGame();
    }
  };

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  showStatusAndEndGame = async () => {
    clearInterval(this.state.timer);
    this.showModal();
    await this.delay(5000);
    console.log("here");
    this.hideModal();
    this.props.onBack();
  };

  checkGameOver = () => {
    for (var rows of this.state.grid) {
      for (var item of rows) {
        if (item !== 0) return false;
      }
    }
    return true;
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  reset(): void {
    this.setState({
      grid: this.state.grid,
      selected: undefined,
      start: undefined,
      end: undefined,
    });
  }

  setStart(item: number, start: position) {
    this.setState({
      grid: this.state.grid,
      selected: item,
      start: start,
      end: undefined,
    });
  }

  setEnd(item: number, end: position) {
    this.setState({
      grid: this.state.grid,
      selected: item,
      start: this.state.start,
      end: end,
    });
  }

  deleteStart() {
    this.reset();
  }

  deleteEnd() {
    this.setState({
      grid: this.state.grid,
      selected: this.state.selected,
      start: this.state.start,
    });
  }

  checkSelection(x: number, y: number): boolean {
    return (
      (!!this.state.start &&
        this.state.start.x === x &&
        this.state.start.y === y) ||
      (!!this.state.end && this.state.end.x === x && this.state.end.y === y)
    );
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

    const visited: boolean[][] = new Array(grid.length)
      .fill(false)
      .map(() => new Array(grid[0].length).fill(false));
    const visitedForAllPaths: boolean[][] = new Array(grid.length)
      .fill(false)
      .map(() => new Array(grid[0].length).fill(false));

    const stack: number[][] = [];

    const stackForAllPaths: number[][] = [];
    const shortestStack: number[][] = [];

    if (
      dfs(
        grid,
        start?.x as number,
        start?.y as number,
        grid.length,
        grid[0].length,
        0,
        "",
        end?.x as number,
        end?.y as number,
        visited,
        stack
      )
    ) {
      // Finding all the paths to capture the shortest path in the shortestStack variable.
      fetchAllPaths(
        grid,
        start?.x as number,
        start?.y as number,
        grid.length,
        grid[0].length,
        0,
        "",
        end?.x as number,
        end?.y as number,
        visitedForAllPaths,
        stackForAllPaths,
        shortestStack
      );

      let newGrid = grid;
      // @ts-ignore
      newGrid[start?.x][start?.y] = 0;
      // @ts-ignore
      newGrid[end?.x][end?.y] = 0;
      // console.log(shortestStack);
      this.drawLines(shortestStack);
      this.setState({
        grid: newGrid,
        selected: undefined,
        start: undefined,
        end: undefined,
      });
    } else {
      this.reset();
    }
  }

  handleClick(x: number, y: number, item: number): void {
    if (this.checkSelection(x, y)) {
      this.removeSelection(x, y);
      return;
    }
    if (!this.state.start) {
      // empty
      this.setStart(item, { x, y });
    } else {
      if (this.state.selected !== item) {
        this.deleteStart();
        this.setStart(item, { x, y });
      } else {
        this.setEnd(item, { x, y });
      }
    }
  }

  drawLines(path: number[][]) {
    const myDivs = path.map(
      (item) =>
        document.getElementById(`${item[0]}${item[1]}`) as HTMLDivElement
    );
    for (let i = 0; i < myDivs.length - 1; i++) {
      const [p, q] = [
        myDivs[i].offsetLeft + myDivs[i].offsetWidth / 2,
        myDivs[i].offsetTop + myDivs[i].offsetHeight / 2,
      ];
      const [r, s] = [
        myDivs[i + 1].offsetLeft + myDivs[i + 1].offsetWidth / 2,
        myDivs[i + 1].offsetTop + myDivs[i + 1].offsetHeight / 2,
      ];

      console.log(p, q, r, s);
      const length = Math.sqrt(
        Math.abs(r - p) * Math.abs(r - p) + Math.abs(s - q) * Math.abs(s - q)
      );
      const angle =
        Math.atan2(Math.abs(q - s), Math.abs(p - r)) * (180 / Math.PI);

      var cx = (p + r) / 2 - length / 2;
      var cy = (q + s) / 2 - 4 / 2;
      var htmlLine =
        "<div style='padding:0px; margin:0px; height:2px; background-color:red ; line-height:1px; position:absolute; left:" +
        cx +
        "px; top:" +
        cy +
        "px; width:" +
        length +
        "px; -moz-transform:rotate(" +
        angle +
        "deg); -webkit-transform:rotate(" +
        angle +
        "deg); -o-transform:rotate(" +
        angle +
        "deg); -ms-transform:rotate(" +
        angle +
        "deg); transform:rotate(" +
        angle +
        "deg);' />";
      // @ts-ignore
      document.getElementById("overlay").innerHTML += htmlLine;
    }
    setTimeout(() => {
      // @ts-ignore
      document.getElementById("overlay").innerHTML = "";
      console.log("waiting...");
    }, 500);
    return;
  }

  render() {
    return (
      <div className="parent">
        <Popup show={this.state.show} handleClose={this.hideModal}>
          <h1>You {this.state.outcome === Outcome.WIN ? "Win" : "Lost"}</h1>
        </Popup>
        <div id="overlay"></div>
        <div className="canvas">
          <div className="grid">
            {this.state.grid.map((row, x) => (
              <div className="row">
                {row.map((item, y) =>
                  item !== 0 ? (
                    <div
                      className={`cell ${
                        this.checkSelection(x, y) ? "selected" : null
                      }`}
                      id={`${x}${y}`}
                      onClick={() => this.handleClick(x, y, item)}
                    >
                      {item}
                    </div>
                  ) : (
                    <div className="hidden" id={`${x}${y}`}>
                      {item}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
          <h1>
            {" "}
            Timer {this.state.minutes} :{" "}
            <a style={{ color: this.state.minutes === 0 ? "red" : "black" }}>
              {this.state.seconds}
            </a>{" "}
          </h1>
          <div className="stop">
            <button onClick={() => this.props.onBack()}>Back</button>
          </div>
        </div>
      </div>
    );
  }
}
