import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./ItemDetail.css"; // CSS con botones rojos y estilo original

const ItemDetail = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, getQuantityInCart } = useContext(CartContext);

  const cantidadEnCarrito = getQuantityInCart(product.id) || 0;
  const stockDisponible = product.stock - cantidadEnCarrito;

  const [cantidad, setCantidad] = useState(stockDisponible > 0 ? 1 : 0);

  useEffect(() => {
    if (cantidad > stockDisponible) setCantidad(stockDisponible);
    if (stockDisponible === 0) setCantidad(0);
  }, [stockDisponible, cantidad]);

  const incrementar = () => {
    if (cantidad < stockDisponible) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAgregar = () => {
    if (stockDisponible === 0) {
      alert("Producto sin stock disponible");
      return;
    }
    if (cantidad > stockDisponible) {
      alert(`Solo quedan ${stockDisponible} unidad(es) disponibles.`);
      setCantidad(stockDisponible);
      return;
    }

    addToCart(product, cantidad);
    alert(`${cantidad} unidad(es) de ${product.name} agregada(s) al carrito`);
    setCantidad(stockDisponible > 1 ? 1 : 0);
  };

  return (
    <div className="item-detail">
      <img src={product.image || "https://via.placeholder.com/250"} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Precio: ${product.price}</p>
      <p>Stock disponible: {stockDisponible}</p>
      <p>{product.description || "Más información del producto aquí..."}</p>

      <div className="contador">
        <button onClick={decrementar} disabled={cantidad <= 1}>-</button>
        <span>{cantidad}</span>
        <button onClick={incrementar} disabled={cantidad >= stockDisponible}>+</button>
      </div>

      <div className="botones">
        <button
          className="btn-agregar"
          onClick={handleAgregar}
          disabled={stockDisponible === 0}
        >
          {stockDisponible === 0 ? "Sin stock" : "Agregar al carrito"}
        </button>
        <button
          className="btn-volver"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;