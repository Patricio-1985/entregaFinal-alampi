import React, { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config"; 
import { CartContext } from "../../context/CartContext";

const CheckoutForm = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const [buyer, setBuyer] = useState({ name: "", email: "" });
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      buyer,
      items: cart,
      total: getTotalPrice(),
      date: new Date()
    };
    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error agregando la orden: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={buyer.name}
        onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={buyer.email}
        onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
        required
      />
      <button type="submit">Confirmar compra</button>
      {orderId && <p>¡Compra realizada! ID de la orden: {orderId}</p>}
    </form>
  );
};

export default CheckoutForm;