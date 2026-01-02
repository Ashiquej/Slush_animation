import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TransitionLayout from './TransitionLayout';
import Home from './Home';
import SecurityPage from './SecurityPage';
import GetStartedPage from './GetStartedPage';
import DeFiPage from './DeFiPage';
import GuidesPage from './GuidesPage';


function App() {
  return (
    <Routes>
      <Route element={<TransitionLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/defi" element={<DeFiPage />} />
        <Route path="/guides" element={<GuidesPage />} />

      </Route>
    </Routes>
  );
}

export default App;
