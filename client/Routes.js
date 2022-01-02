import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainSearch from './components/MainSearch';


const RoutesComp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSearch />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComp
