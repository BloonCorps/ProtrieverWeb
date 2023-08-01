import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlotLayout from './PlotLayout/PlotLayout';
import SearchLayout from './SearchLayout/SearchLayout';
import MenuLayout from './PlotLayout/MenuLayout';

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
