import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Item from "../Item/Item";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          stock: doc.data().stock || 0,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="cards-container">
      {products.length === 0 ? (
        <p className="loading-text">Cargando productos...</p>
      ) : (
        products.map(product => <Item key={product.id} product={product} />)
      )}
    </div>
  );
};

export default ItemListContainer;