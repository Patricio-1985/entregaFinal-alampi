import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const colRef = collection(db, "products");
        const snapshot = await getDocs(colRef);

        if (!snapshot.empty) {
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setProducts(items);
        } else {
          console.log("No se encontraron productos");
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", padding: "15px" }}>
      {products.map((product) => (
        <div 
          key={product.id} 
          style={{ 
            border: "1px solid black", 
            borderRadius: "5px", 
            padding: "10px", 
            width: "200px" 
          }}
        >
          <h3>{product.name}</h3>
          <p>Precio: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Categoria: {product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;