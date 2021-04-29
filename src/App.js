import React from "react"
import './App.css';
import Main from "./Component/Main";
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import { store } from "./Redux/Store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
      <Main></Main>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
