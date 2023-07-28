import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlotLayout from './PlotLayout';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<PlotLayout />}/>
          <Route path="/search" element={<SearchLayout/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
