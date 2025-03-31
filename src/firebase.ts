// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase con los datos de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyC1EHwNbgXt6h1gAnOXpMeKoElzMrpx4Yo",
  authDomain: "almacen-3edd6.firebaseapp.com",
  projectId: "almacen-3edd6",
  storageBucket: "almacen-3edd6.firebasestorage.app",
  messagingSenderId: "818797105237",
  appId: "1:818797105237:web:8354836bc35046d69344dc"
};

// Inicializar la app de Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Inicializar Firestore para interactuar con la base de datos
const db = getFirestore(app);

// Exportar la instancia de Firestore para usarla en otras partes de la app
export { db };
