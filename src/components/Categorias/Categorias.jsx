import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import Item from "../Item/Item";
import "../../styles/cards.css";

const Categorias = () => {
  const categorias = ["remeras", "accesorios", "musica", "pantalon"];
  const [products, setProducts] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("remeras");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", categoriaSeleccionada)
        );
        const snapshot = await getDocs(q);
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoriaSeleccionada]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ color: "#fff" }}>Categorías</h1>

      {/* Botones de categorías */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: cat === categoriaSeleccionada ? "#d33f49" : "#6b9640",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Productos filtrados */}
      <div className="cards-container">
        {products.length === 0 ? (
          <p style={{ color: "#fff" }}>Cargando productos...</p>
        ) : (
          products.map(product => <Item key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default Categorias;