/* ============================================================
   LA.FLEURISTE — CHARGEUR DE SECTIONS
   Insère chaque fichier de sections/ à sa place puis lance le
   rendu (main.js). Nécessite un petit serveur local pour la
   prévisualisation — voir README.md.
   ============================================================ */
(function () {
  "use strict";
  var nodes = document.querySelectorAll("[data-include]");
  var jobs = Array.prototype.map.call(nodes, function (node) {
    var url = node.getAttribute("data-include");
    return fetch(url)
      .then(function (r) { if (!r.ok) throw new Error(url); return r.text(); })
      .then(function (html) { node.outerHTML = html; })
      .catch(function (err) {
        node.innerHTML = '<p style="padding:30px;color:#b23">Section introuvable : ' + url + "</p>";
        console.error(err);
      });
  });
  Promise.all(jobs)
    .then(function () { return window.LF_CONTENT; })   // attend le contenu en ligne s'il existe
    .catch(function () {})
    .then(function () {
      if (window.LF_RENDER) window.LF_RENDER();
    });
})();
