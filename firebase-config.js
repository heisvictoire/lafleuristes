/* ============================================================
   LA.FLEURISTE — CONNEXION À LA BASE EN LIGNE (Firebase)
   ------------------------------------------------------------
   Relie le site et l'espace gestionnaire à la base Firebase
   du projet « la-fleuriste ». Sans ce fichier rempli, l'admin
   fonctionne en « mode local » (téléchargement de config.js).
   ============================================================ */

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBFCv7FBUzhV01PFBKvVm6Nm_6s5V9HxIE",
  authDomain: "la-fleuriste.firebaseapp.com",
  projectId: "la-fleuriste",
  storageBucket: "la-fleuriste.firebasestorage.app",
  messagingSenderId: "174725769282",
  appId: "1:174725769282:web:af674fba3fbb6128bd25db"
};

/* Adresses e-mail autorisées à modifier le site depuis admin.html.
   ⚠️ Mettez EXACTEMENT l'adresse avec laquelle la personne se
   connectera (par e-mail OU par « Continuer avec Google »).
   La même adresse doit figurer dans les règles Firestore et
   Storage (voir README, Partie 2). */
window.ADMIN_EMAILS = [
  "orecarole54@gmail.com",
  "vicab2002@gmail.com"
];
