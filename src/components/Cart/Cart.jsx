// src/components/Cart/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart, incrementarCantidad, decrementarCantidad } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) return <p>El carrito está vacío</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Carrito de Compras</h2>
      {cart.map((item) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          <img src={item.image || "https://via.placeholder.com/80"} alt={item.name} style={{ width: "80px", marginRight: "10px" }} />
          
          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>Precio unitario: ${item.price}</p>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => decrementarCantidad(item.id)}
                style={{ padding: "5px 10px", cursor: "pointer" }}
              >
                -
              </button>

              {/* Contador en el medio */}
              <span style={{ minWidth: "20px", textAlign: "center", display: "inline-block" }}>
                {item.quantity}
              </span>

              <button
                onClick={() => incrementarCantidad(item.id, item.stock)}
                style={{ padding: "5px 10px", cursor: "pointer" }}
              >
                +
              </button>
            </div>

            <p>Subtotal: ${item.price * item.quantity}</p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            style={{ padding: "5px 10px", cursor: "pointer" }}
          >
            Eliminar
          </button>
        </div>
      ))}

      <h3>Total: ${total}</h3>

      <div style={{ marginTop: "20px" }}>
        <button onClick={clearCart} style={{ marginRight: "10px", padding: "10px 20px", cursor: "pointer" }}>Vaciar Carrito</button>
        <button onClick={() => navigate("/checkout")} style={{ padding: "10px 20px", cursor: "pointer" }}>Ir a Pagar</button>
      </div>
    </div>
  );
};

export default Cart;