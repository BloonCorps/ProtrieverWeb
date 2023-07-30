import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlotLayout from './PlotLayout';
import SearchLayout from './SearchLayout';
import MenuLayout from './MenuLayout';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<PlotLayout/>}/>
          <Route path="/search" element={<SearchLayout/>}/>
          <Route path="/menu" element={<MenuLayout/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
