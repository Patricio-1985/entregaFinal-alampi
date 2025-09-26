import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Item.css";

const Item = ({ product }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  const incrementar = () => {
    if (cantidad < product.stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAgregar = () => {
    if (cantidad > product.stock) {
      alert(`No puedes agregar más de ${product.stock} unidades disponibles.`);
      return;
    }
    addToCart(product, cantidad);
    alert(`${cantidad} unidad(es) de ${product.name} agregada(s) al carrito`);
    setCantidad(1); // resetea contador
  };

  const handleVaciar = () => removeFromCart(product.id);

  return (
    <div className="item-card">
      <img src={product.image || "https://via.placeholder.com/250"} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>

      <div className="contador">
        <button onClick={decrementar}>-</button>
        <span>{cantidad}</span>
        <button onClick={incrementar}>+</button>
      </div>

      <div className="botones">
        <button className="btn-unico" onClick={handleAgregar}>Agregar</button>
        <button className="btn-unico" onClick={handleVaciar}>Vaciar</button>
      </div>

      <Link to={`/item/${product.id}`} className="btn-unico btn-detalle">Ver detalle</Link>
    </div>
  );
};

export default Item;