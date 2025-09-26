// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⚡ Configuración corregida
const firebaseConfig = {
  apiKey: "AIzaSyDGdJV40Td2owKH3UX5jkSWDzBchFFEjXU",
  authDomain: "rockeria-ecomerce-34888.firebaseapp.com",
  projectId: "rockeria-ecomerce-34888",
  storageBucket: "rockeria-ecomerce-34888.appspot.com", // 👈 corregido
  messagingSenderId: "202668228715",
  appId: "1:202668228715:web:9977decb25f4b3943e712e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar instancia de Firestore
export const db = getFirestore(app);