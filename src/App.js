// src/App.js
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import React from 'react';
import SimpleQuestion from "./SimpleQuestion";
import CompatibilityTab from "./CompatibilityTab";
import Logo from './logo.svg';
import "./App.css";

const Header = () => {
  return (
    <header className="App-header">
        <NavLink className="div-logo" to="/">
          <img src={Logo} className="App-logo" alt="logo" />
          <h1>Voiance</h1>
        </NavLink>
      <nav className="Navigation">
        <div className="ListNav">
            <NavLink className="linkNav" style={({ isActive }) => ({
                            padding: isActive ? '5px;' : '5px',
                            margin: isActive ? '0px 2px' : '0px 2px',
                            borderRadius : isActive ? '5px' : '5px',
                            color: isActive ? '#fff' : '#545e6f',
                            background: isActive ? 'purple' : '#f0f0f0',
                            })} to="/">
              Accueil
            </NavLink>
            <NavLink className="linkNav" style={({ isActive }) => ({
                            padding: isActive ? '5px;' : '5px',
                            margin: isActive ? '0px 2px' : '0px 2px',
                            borderRadius : isActive ? '5px' : '5px',
                            color: isActive ? '#fff' : '#545e6f',
                            background: isActive ? 'purple' : '#f0f0f0',
                            })} to="/SimpleQuestion">
              Boule de crystale
            </NavLink>
            <NavLink className="linkNav" style={({ isActive }) => ({
                            padding: isActive ? '5px;' : '5px',
                            margin: isActive ? '0px 2px' : '0px 2px',
                            borderRadius : isActive ? '5px' : '5px',
                            color: isActive ? '#fff' : '#545e6f',
                            background: isActive ? 'purple' : '#f0f0f0',
                            })} to="/CompatibilityTab">
              Compatibilité
            </NavLink>
        </div>
      </nav>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/CompatibilityTab" element={<CompatibilityTab />} />
          <Route path="/SimpleQuestion" element={<SimpleQuestion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
