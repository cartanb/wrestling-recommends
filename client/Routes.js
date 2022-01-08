import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainSearch from './components/MainSearch';


const RoutesComp = () => {
  return (
    <Routes>
      <Route path="/" element={<MainSearch />} />
    </Routes>
  );
};

export default RoutesComp
