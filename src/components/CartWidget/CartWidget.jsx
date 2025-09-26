import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./CartWidget.css";

const CartWidget = () => {
  const { getTotalQuantity } = useContext(CartContext);

  return (
    <div className="cart-widget">
      <Link to="/cart">
        🛒
        {getTotalQuantity() > 0 && (
          <span className="cart-count">{getTotalQuantity()}</span>
        )}
      </Link>
    </div>
  );
};

export default CartWidget;