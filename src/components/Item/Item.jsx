import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Item.css';
import { CartContext } from "../../context/CartContext";

const Item = ({ product }) => {
  const navigate = useNavigate();
  const { cart, addToCart, clearCart } = useContext(CartContext);

  const [cantidad, setCantidad] = useState(1);
  const [maxDisponible, setMaxDisponible] = useState(product.stock);

  useEffect(() => {
    // Calcula stock restante considerando el carrito
    const productoEnCarrito = cart.find(p => p.id === product.id);
    const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.quantity : 0;
    setMaxDisponible(product.stock - cantidadEnCarrito);

    if (cantidad > product.stock - cantidadEnCarrito) {
      setCantidad(product.stock - cantidadEnCarrito > 0 ? product.stock - cantidadEnCarrito : 1);
    }
  }, [cart, product.stock]);

  const handleDetalles = () => navigate(`/item/${product.id}`);

  const handleAgregar = () => {
    if (cantidad > maxDisponible) {
      alert(`No puedes agregar más de ${maxDisponible} unidades disponibles.`);
      return;
    }
    addToCart(product, cantidad);
    setCantidad(1);
  };

  const incrementar = () => {
    if (cantidad < maxDisponible) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  return (
    <div className="card">
      {/* Imagen */}
      <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />

      {/* Separador */}
      <div className="card-separator"></div>

      {/* Datos */}
      <h3 className="card-title">{product.name}</h3>
      <p>Precio: ${product.price}</p>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>Stock disponible: {maxDisponible}</p>

      {/* Contador */}
      <div className="contador">
        <button onClick={decrementar}>-</button>
        <span className="cantidad">{cantidad}</span>
        <button onClick={incrementar}>+</button>
      </div>

      {/* Botones */}
      <div className="botones">
        <button className="btn-detalles" onClick={handleDetalles}>Detalles</button>
        <button className="btn-agregar" onClick={handleAgregar}>Agregar al carrito</button>
        <button className="btn-vaciar" onClick={clearCart}>Vaciar Carrito</button>
      </div>
    </div>
  );
};

export default Item;