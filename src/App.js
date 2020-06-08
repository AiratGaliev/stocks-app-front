import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Stocks from './components/Stock/Stocks';

function App() {
  return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Stocks}/>
        </div>
      </Router>
  );
}

export default App;
