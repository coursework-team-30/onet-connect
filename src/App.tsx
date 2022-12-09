import React from 'react';
import './App.css';
import {Game} from "./components/game";
import {State} from "./components/model/common";

function App() {
  return (
    <div className="App">
      <Game status={State.Start}/>
    </div>
  );
}

export default App;
