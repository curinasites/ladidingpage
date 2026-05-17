// ========== CONFIGURAÇÃO FIREBASE - LANDING PAGE ==========
const firebaseConfig = {
  apiKey: "AIzaSyAoTpeweJAuluIYFwLkVhiUVso8yxU8T_s",
  authDomain: "francisco-sites.firebaseapp.com",
  databaseURL: "https://francisco-sites-default-rtdb.firebaseio.com",
  projectId: "francisco-sites",
  storageBucket: "francisco-sites.firebasestorage.app",
  messagingSenderId: "386716924748",
  appId: "1:386716924748:web:7656bac0936c68ba416de9",
  measurementId: "G-GGE9RE58G2"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const db = firebase.firestore();
const auth = firebase.auth();
