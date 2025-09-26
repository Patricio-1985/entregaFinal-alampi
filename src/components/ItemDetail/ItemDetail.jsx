import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./ItemDetail.css";

const ItemDetail = ({ product, maxDisponible }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const [stock, setStock] = useState(maxDisponible);

  // Ajusta el stock si cambia
  useEffect(() => {
    setStock(maxDisponible);
    if (cantidad > maxDisponible) setCantidad(maxDisponible > 0 ? maxDisponible : 1);
  }, [maxDisponible]);

  const incrementar = () => {
    if (cantidad < stock) setCantidad(cantidad + 1);
  };
  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };
  const handleAgregar = () => {
    if (cantidad > stock) {
      alert(`No puedes agregar más de ${stock} unidades disponibles.`);
      return;
    }
    addToCart(product, cantidad);
    setCantidad(1);
  };

  return (
    <div className="item-detail">
      <img src={product.image || "https://via.placeholder.com/250"} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Precio: ${product.price}</p>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>Stock disponible: {stock}</p>
      <p>{product.description || "Más información del producto aquí..."}</p>

      {/* Contador */}
      <div className="contador">
        <button onClick={decrementar}>-</button>
        <span className="cantidad">{cantidad}</span>
        <button onClick={incrementar}>+</button>
      </div>

      {/* Botones */}
      <div className="botones">
        <button className="btn-agregar" onClick={handleAgregar}>Agregar al carrito</button>
        <button className="btn-volver" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
};

export default ItemDetail;