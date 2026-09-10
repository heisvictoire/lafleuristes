/* ============================================================
   LA.FLEURISTE — CONNEXION À LA BASE EN LIGNE (Firebase)
   ------------------------------------------------------------
   Ce fichier relie le site et l'espace gestionnaire à une base
   de données GRATUITE (Firebase, de Google). Sans lui, le site
   fonctionne quand même avec le contenu de config.js, mais les
   modifications faites dans admin.html ne seront pas enregistrées
   en ligne.

   👉 Comment le remplir : voir le fichier README.md, partie
      « Créer la base en ligne (Firebase) ». Vous copierez 6
      valeurs depuis votre compte Firebase et les collerez
      ci-dessous, entre les guillemets.
   ============================================================ */

window.FIREBASE_CONFIG = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET",
  storageBucket: "VOTRE_PROJET.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

/* Adresses e-mail autorisées à modifier le site depuis admin.html.
   Ajoutez ou retirez des adresses entre guillemets, séparées par
   des virgules. Seules ces personnes pourront enregistrer des
   modifications (même si quelqu'un d'autre crée un compte). */
window.ADMIN_EMAILS = [
  "orecarole54@gmail.com"
];
