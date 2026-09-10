/* ============================================================
   LA.FLEURISTE — CHARGEMENT DU CONTENU EN LIGNE
   ------------------------------------------------------------
   Essaie de récupérer le contenu du site depuis la base
   Firebase. S'il y arrive, ce contenu remplace celui de
   config.js. Sinon (pas encore configuré, hors ligne…), le
   site garde le contenu local de config.js — il reste donc
   toujours fonctionnel.
   ============================================================ */

const SDK = "https://www.gstatic.com/firebasejs/10.12.5";

function isConfigured(c) {
  return c && typeof c.apiKey === "string" && c.apiKey.indexOf("VOTRE_") !== 0 && c.projectId;
}

window.LF_CONTENT = (async () => {
  const cfg = window.FIREBASE_CONFIG;
  if (!isConfigured(cfg)) return;
  try {
    const { initializeApp } = await import(`${SDK}/firebase-app.js`);
    const { getFirestore, doc, getDoc } = await import(`${SDK}/firebase-firestore.js`);
    const app = initializeApp(cfg);
    const snap = await getDoc(doc(getFirestore(app), "site", "content"));
    if (snap.exists() && snap.data() && snap.data().data) {
      window.SITE_CONFIG = snap.data().data;
    }
  } catch (e) {
    console.warn("[La.Fleuriste] Contenu en ligne indisponible — version locale utilisée.", e);
  }
})();
