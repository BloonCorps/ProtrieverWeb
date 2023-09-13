import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlotLayout from './PlotLayout/PlotLayout';
import SearchLayout from './SearchLayout/SearchLayout';
import MenuLayout from './PlotLayout/MenuLayout';
import Test from './Test/Test.js';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<PlotLayout dataType={"default"}/>} />
          <Route path="/disordered" element={<PlotLayout dataType={"disordered"}/>} />
          <Route path="/search" element={<SearchLayout/>} />
          <Route path="/menu" element={<MenuLayout/>} />
          <Route path='/test' element={<Test/>} /> 
        </Routes>
      </Router>
    );
  }
}

export default App;
