// src/components/ItemDetailContainer/ItemDetailContainer.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { CartContext } from "../../context/CartContext";
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { cart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maxDisponible, setMaxDisponible] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const prodData = { id: docSnap.id, ...docSnap.data() };

          // Stock considerando lo que ya está en el carrito
          const prodEnCarrito = cart.find(p => p.id === docSnap.id);
          const cantidadEnCarrito = prodEnCarrito ? prodEnCarrito.quantity : 0;
          setMaxDisponible(prodData.stock - cantidadEnCarrito);

          setProduct(prodData);
        } else {
          console.log("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, cart]);

  return (
    <>
      {loading && <p style={{textAlign:"center"}}>Cargando producto...</p>}
      {!loading && !product && <p style={{textAlign:"center"}}>Producto no encontrado</p>}
      {product && (
        <ItemDetail product={product} maxDisponible={maxDisponible} />
      )}
    </>
  );
};

export default ItemDetailContainer;