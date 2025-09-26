import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; 
import CartWidget from "../CartWidget/CartWidget";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">🎸 Cara de Perro</div>
      <ul className="menu">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/catalogo">Catálogo</Link></li>
        <li><Link to="/categorias">Categorías</Link></li>
        <li><Link to="/carrito">Carrito </Link></li>
      </ul>
        <CartWidget />
    </nav>
  );
};

export default NavBar;



