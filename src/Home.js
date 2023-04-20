import React from 'react';
import "./App.css";
import { Link } from 'react-router-dom';
import { FaHeart, FaMoon } from 'react-icons/fa';
import { GiCrystalBall } from 'react-icons/gi';



function Home() {

  return (
    <div className="home-container">
      <h2>Bienvenue sur Destin en ligne !</h2>
      <p classNamee="welcome-text">Explorez votre avenir et dévoilez les secrets de l'amour et des relations grâce à nos outils divinatoires en ligne.</p>

      <div className="home-buttons">
        <Link className="home-button-link" to="/SimpleQuestion">
          <button className="home-btn">
            <GiCrystalBall className="home-icon" />
            <h3>Boule de cristal</h3>
            <p>Obtenez des réponses à vos questions</p>
          </button>
        </Link>
        <Link className="home-button-link" to="/CompatibilityTab">
          <button className="home-btn">
            <FaHeart className="home-icon" />
            <h3>Compatibilité</h3>
            <p>Découvrez la compatibilité amoureuse, professionnelle et amicale entre deux personnes</p>
          </button>
        </Link>

        <button className="home-btn-disabled" disabled>
          <FaMoon className="home-icon" />
          <h3>Interprétation des rêves</h3>
          <p>Bientôt disponible !</p>
        </button>
      </div>
    </div>
  );
}

export default Home;
