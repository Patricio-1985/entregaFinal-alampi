import React from "react";
import { Link } from "react-router-dom";
import "../../styles/cards.css";

const ItemCard = ({ product }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/detail/${product.id}`}>
        <button>Ver detalle</button>
      </Link>
    </div>
  );
};

export default ItemCard;