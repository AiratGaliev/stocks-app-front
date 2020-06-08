import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Stocks from "./components/Stock/Stocks";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Stocks} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
