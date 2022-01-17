import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainSearch from './components/MainSearch';
import Extras from './components/Extras';
import Credits from './components/Credits';

const RoutesComp = () => (
  <Routes>
    <Route path="/" element={<MainSearch />} />
    <Route path="extras" element={<Extras />} />
    <Route path="credits" element={<Credits />} />
  </Routes>
);

export default RoutesComp;
