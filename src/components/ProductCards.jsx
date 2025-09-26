import React from "react";

const products = [
  { id: 1, name: "Remera Iron Maiden", price: 25000 },
  { id: 2, name: "Cinturon de tachas", price: 14000 },
  { id: 3, name: "Remera Metallica, color Gris", price: 22000 },
  { id: 4, name: "Remera Black Sabath, color negro", price: 32000 },
  { id: 5, name: "Gorra Trucker Ozzy", price: 12000 },
  { id: 6, name: "Mochila Hermetica", price: 18 },
  { id: 7, name: "DVD Megadeth live in obras", price: 28000 },
  { id: 8, name: "Pantalon Cargo negro", price: 26000 },
  { id: 9, name: "DvD Iron Maiden live donington 1993", price: 35000 },
  { id: 10, name: "Bermudas Guerrilleras", price: 15000 },
];

export default function ProductCards() {
  return (
    <div>
      <h2>Productos</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #fff",
              padding: "10px",
              width: "200px",
              backgroundColor: "#1d034e",
              color: "#fff",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ fontSize: "16px" }}>{p.name}</h3>
            <p style={{ fontWeight: "bold" }}>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}