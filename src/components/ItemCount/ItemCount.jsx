import React, { useState } from "react";

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
      <button onClick={decrement} style={{ padding: "0.5rem 1rem", backgroundColor: "#d33f49", color: "#fff", border: "none", borderRadius: "5px" }}>-</button>
      <span style={{ color: "#fff", fontWeight: "bold" }}>{quantity}</span>
      <button onClick={increment} style={{ padding: "0.5rem 1rem", backgroundColor: "#d33f49", color: "#fff", border: "none", borderRadius: "5px" }}>+</button>
      <button onClick={() => onAdd(quantity)} style={{ padding: "0.5rem 1rem", backgroundColor: "#ff1a1a", color: "#fff", border: "none", borderRadius: "5px", marginLeft: "1rem" }}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
