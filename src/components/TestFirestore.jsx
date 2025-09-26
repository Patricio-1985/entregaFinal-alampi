import React, { useState, useEffect } from "react";
import ItemListContainer from "./ItemListContainer/ItemListContainer";

const TestFirestore = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Datos de prueba
    const demoProducts = [
      { id: "1", name: "Remera Iron Maiden", price: 25000 },
      { id: "2", name: "Cinturon de tachas", price: 14000 },
      { id: "3", name: "Remera Metallica, color Gris", price: 22000 },
      { id: "4", name: "Remera Black Sabath, color negro", price: 32000 },
      { id: "5", name: "Gorra Trucker Ozzy", price: 12000 },
      { id: "6", name: "Mochila Hermetica", price: 18000 },
      { id: "7", name: "DVD Megadeth live in obras", price: 28000 },
      { id: "8", name: "Pantalon Cargo negro", price: 26000 },
      { id: "9", name: "DvD Iron Maiden live donington 1993", price: 35000 },
      { id: "10", name: "Bermudas Guerrilleras", price: 15000 },
    ];

    setProducts(demoProducts);
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <ItemListContainer products={products} />
    </div>
  );
};

export default TestFirestore;