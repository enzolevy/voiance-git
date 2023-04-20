// src/App.js
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import React from 'react';
import SimpleQuestion from "./SimpleQuestion";
import CompatibilityTab from "./CompatibilityTab";
import Home from './Home';
import Logo from './logo.svg';
import { AiFillHome } from 'react-icons/ai';
import { GiCrystalBall, GiNightSleep, GiLovers } from 'react-icons/gi';
import "./App.css";

const Header = () => {
  return (
    <div className="App-header">
        <NavLink className="div-logo" to="/">
          <img src={Logo} className="App-logo" alt="logo" />
          <h1>Destin en ligne</h1>
        </NavLink>
      <nav className="Navigation">
        <div className="ListNav">
            <NavLink className="linkNav" style={({ isActive }) => ({
                            padding: isActive ? '5px;' : '5px',
                            margin: isActive ? '0px 2px' : '0px 2px',
                            borderRadius : isActive ? '5px' : '5px',
                            color: isActive ? '#fff' : '#545e6f',
                            background: isActive ? '#6200ee' : '#f0f0f0',
                            })} to="/">
              <AiFillHome className="nav-icon" />
              Accueil
            </NavLink>
            <NavLink className="linkNav" style={({ isActive }) => ({
                            padding: isActive ? '5px;' : '5px',
                            margin: isActive ? '0px 2px' : '0px 2px',
                            borderRadius : isActive ? '5px' : '5px',
                            color: isActive ? '#fff' : '#545e6f',
                            background: isActive ? '#6200ee' : '#f0f0f0',
                            })} to="/SimpleQuestion">
              <GiCrystalBall className="nav-icon" />
              Boule de crystale
            </NavLink>
            <NavLink className="linkNav" style={({ isActive }) => ({
                            padding: isActive ? '5px;' : '5px',
                            margin: isActive ? '0px 2px' : '0px 2px',
                            borderRadius : isActive ? '5px' : '5px',
                            color: isActive ? '#fff' : '#545e6f',
                            background: isActive ? '#6200ee' : '#f0f0f0',
                            })} to="/CompatibilityTab">
              <GiLovers className="nav-icon" />
              Compatibilité
            </NavLink>
        </div>
      </nav>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CompatibilityTab" element={<CompatibilityTab />} />
          <Route path="/SimpleQuestion" element={<SimpleQuestion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
