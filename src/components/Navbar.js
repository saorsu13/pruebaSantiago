import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavbarStyle.css'

const Navbar = () => {
    return (
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/home" className="nav-link">Bancos</Link>
          </li>
          <li className="nav-item">
            <Link to="/accounts" className="nav-link">Cuentas</Link>
          </li>
          <li className="nav-item">
            <Link to="/transactions" className="nav-link">Transacciones</Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">Configuración</Link>
          </li>
        </ul>
      </nav>
    );
  };

export default Navbar;
