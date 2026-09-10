/* ============================================================
   LA.FLEURISTE — CHARGEMENT DU CONTENU EN LIGNE
   ------------------------------------------------------------
   Récupère le contenu enregistré dans Firebase et le fusionne
   par-dessus config.js. Ainsi :
   - ce que la gestionnaire a modifié en ligne s'applique ;
   - les nouveautés ajoutées au code (nouvelles sections, etc.)
     restent présentes même si elles ne sont pas encore dans la
     base ;
   - le site reste fonctionnel même hors ligne (config.js seul).
   ============================================================ */

const SDK = "https://www.gstatic.com/firebasejs/10.12.5";

function isConfigured(c) {
  return c && typeof c.apiKey === "string" && c.apiKey.indexOf("VOTRE_") !== 0 && c.projectId;
}

/* fusion profonde : les objets sont fusionnés, les tableaux sont remplacés */
function deepMerge(base, over) {
  if (Array.isArray(over)) return over.slice();
  if (over && typeof over === "object") {
    const out = (base && typeof base === "object" && !Array.isArray(base)) ? Object.assign({}, base) : {};
    Object.keys(over).forEach(function (k) { out[k] = deepMerge(out[k], over[k]); });
    return out;
  }
  return over === undefined ? base : over;
}
window.LF_DEEP_MERGE = deepMerge;

window.LF_CONTENT = (async () => {
  const cfg = window.FIREBASE_CONFIG;
  if (!isConfigured(cfg)) return;
  try {
    const { initializeApp } = await import(`${SDK}/firebase-app.js`);
    const { getFirestore, doc, getDoc } = await import(`${SDK}/firebase-firestore.js`);
    const app = initializeApp(cfg);
    const snap = await getDoc(doc(getFirestore(app), "site", "content"));
    if (snap.exists() && snap.data() && snap.data().data) {
      window.SITE_CONFIG = deepMerge(window.SITE_CONFIG || {}, snap.data().data);
    }
  } catch (e) {
    console.warn("[La.Fleuriste] Contenu en ligne indisponible — version locale utilisée.", e);
  }
})();
