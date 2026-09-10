# Site La.Fleuriste — mode d'emploi

Ce guide est écrit pour être suivi **même sans rien connaître à l'informatique**.
Prenez votre temps, faites les étapes dans l'ordre.

Il y a **deux choses** :

1. **Le site** — ce que voient vos clients (`www.votresite.com`).
2. **L'espace gestionnaire** — une page privée (`www.votresite.com/admin.html`)
   où **vous** modifiez le site : textes, photos, vidéos, numéro WhatsApp…
   sans toucher au code.

---

## Partie 1 — Mettre le site en ligne (10 minutes)

On utilise **Netlify**, un hébergeur gratuit.

1. Allez sur **https://app.netlify.com** et créez un compte gratuit
   (bouton *Sign up* — vous pouvez utiliser votre compte Google).
2. Une fois connectée, cliquez sur l'onglet **« Sites »** puis repérez la zone
   **« Deploy manually »** (ou « Drag and drop your site folder here »).
3. Sur votre ordinateur, ouvrez le dossier qui contient ce fichier.
   **Glissez-déposez le dossier entier** dans la zone de Netlify.
4. Patientez quelques secondes. Netlify vous donne une adresse du type
   `https://nom-au-hasard-123.netlify.app`. **Votre site est en ligne.**
5. Pour une jolie adresse : dans Netlify, **Site configuration → Change site name**
   (ex. `lafleuriste`), ou **Domains** pour brancher `www.lafleuriste.sn`.

> À chaque fois que vous modifiez des fichiers, il faudra **re-glisser le dossier**
> au même endroit pour mettre à jour. **Sauf** pour les modifications faites depuis
> l'espace gestionnaire une fois la Partie 2 terminée : celles-là se publient toutes seules.

L'espace gestionnaire est alors accessible à `https://votre-adresse.netlify.app/admin.html`.

### Tout de suite utilisable

Même sans faire la Partie 2, l'espace gestionnaire fonctionne en **mode local** :
mot de passe **`fleuriste2026`**, vous modifiez, vous cliquez
**« Télécharger une sauvegarde (config.js) »**, vous remplacez l'ancien fichier
`config.js` du dossier par celui téléchargé, et vous re-glissez le dossier sur Netlify.

La Partie 2 sert à **éviter ce va-et-vient** : les modifications se publient en
un clic, et vous vous connectez avec un vrai compte (e-mail ou Google).

---

## Partie 2 — Créer la base en ligne gratuite (Firebase) (20 minutes, une seule fois)

**Firebase** est un service **gratuit de Google** qui va :
- garder le contenu de votre site en ligne,
- gérer votre connexion (e-mail / mot de passe **ou** compte Google),
- stocker les photos et vidéos que vous ajoutez depuis l'espace gestionnaire.

### 2.1 — Créer le projet

1. Allez sur **https://console.firebase.google.com** et connectez-vous avec
   votre compte Google.
2. Cliquez **« Créer un projet »**. Donnez un nom (ex. `la-fleuriste`).
   Continuez. Vous pouvez **désactiver Google Analytics** (pas nécessaire).
   Cliquez **« Créer le projet »**, puis **« Continuer »**.

### 2.2 — Ajouter une application web

1. Sur la page d'accueil du projet, cliquez sur l'icône **`</>`**
   (« Ajouter une application » → Web).
2. Donnez un surnom (ex. `site`). **Ne cochez pas** « Firebase Hosting ».
   Cliquez **« Enregistrer l'application »**.
3. Firebase affiche un encadré de code avec `const firebaseConfig = { … }`.
   Vous y voyez **6 lignes** :
   `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.
4. Ouvrez le fichier **`firebase-config.js`** de votre dossier avec un éditeur de
   texte (TextEdit, Bloc-notes…). Recopiez **exactement** chaque valeur entre les
   guillemets, à la place de `VOTRE_…`. Enregistrez.

Exemple (les vôtres seront différentes) :

```js
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyB....................",
  authDomain: "la-fleuriste.firebaseapp.com",
  projectId: "la-fleuriste",
  storageBucket: "la-fleuriste.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123..."
};
```

Juste en dessous, dans la liste `window.ADMIN_EMAILS`, mettez **votre adresse
e-mail** (celle avec laquelle vous vous connecterez). Vous pouvez en ajouter
d'autres, entre guillemets, séparées par des virgules.

### 2.3 — Activer la connexion

1. Menu de gauche → **« Authentication »** → **« Commencer »**.
2. Onglet **« Sign-in method »**.
3. Cliquez **« E-mail/Mot de passe »** → activez le premier interrupteur → **Enregistrer**.
4. Cliquez **« Google »** → activez → choisissez votre e-mail d'assistance →
   **Enregistrer**.

### 2.4 — Créer la base de données (Firestore)

1. Menu de gauche → **« Firestore Database »** → **« Créer une base de données »**.
2. Choisissez un emplacement (ex. `eur3` (Europe)) → **Suivant**.
3. Démarrez en **« mode production »** → **Créer**.
4. Onglet **« Règles »**. Effacez tout et collez ceci, en remplaçant l'e-mail
   par le(s) vôtre(s) :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /site/content {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email in ["orecarole54@gmail.com"];
    }
  }
}
```

   Cliquez **« Publier »**.

### 2.5 — Activer le stockage des photos/vidéos (Storage)

1. Menu de gauche → **« Storage »** → **« Commencer »** → **Suivant** →
   **« Terminé »**.
2. Onglet **« Règles »**. Effacez tout et collez ceci (même e-mail que ci-dessus) :

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /media/{fichier} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email in ["orecarole54@gmail.com"];
    }
  }
}
```

   Cliquez **« Publier »**.

### 2.6 — Autoriser votre adresse de site

1. **Authentication → Settings → Authorized domains → Add domain**.
2. Ajoutez votre adresse Netlify (ex. `lafleuriste.netlify.app`) et votre
   domaine final s'il existe (ex. `www.lafleuriste.sn`).

### 2.7 — Re-mettre le site en ligne

`firebase-config.js` a changé : **re-glissez le dossier** sur Netlify (Partie 1,
étape 3). C'est la dernière fois que vous ferez ça pour du contenu.

---

## Partie 3 — Modifier le site au quotidien

1. Allez sur **`votre-adresse/admin.html`**.
2. **Première fois :** entrez votre e-mail + un mot de passe (6 caractères mini)
   et cliquez **« Créer un compte »**. Les fois suivantes : **« Se connecter »**,
   ou **« Continuer avec Google »**.
   *(Seules les adresses de `ADMIN_EMAILS` peuvent enregistrer des modifications.)*
3. En haut : **un onglet par partie du site** — Accueil, Occasions, Ateliers,
   Galerie, Pied de page…
4. Chaque onglet est un **formulaire** :
   - **Textes** : tapez directement dans les cases.
   - **Listes** (occasions, questions/réponses, photos…) : **« + Ajouter »**,
     flèches **↑ ↓** pour changer l'ordre, **« Supprimer »**.
   - **Photos / vidéos** : **« Choisir un fichier »** → le fichier est envoyé et
     s'affiche. (Grosse vidéo : préférez remplacer le fichier dans le dossier
     `assets/` en gardant le même nom.)
   - **Bouton WhatsApp / numéro / lien du formulaire / réseaux sociaux** :
     onglets **« Contact »** et **« Réseaux sociaux »**.
5. Quand tout est bon, cliquez en bas sur **« Publier en ligne »**.
   ✅ Le site est mis à jour tout seul. Rafraîchissez-le pour vérifier.
6. **« Télécharger une sauvegarde (config.js) »** garde une copie de sécurité
   sur votre ordinateur (facultatif mais conseillé de temps en temps).

---

## Questions fréquentes

**Je ne veux pas de Firebase, c'est trop.**
Restez en mode local : mot de passe `fleuriste2026`, modifiez, « Télécharger une
sauvegarde », remplacez `config.js`, re-glissez le dossier sur Netlify.

**Changer le mot de passe du mode local.**
Ouvrez `admin.html`, tout en haut, ligne
`window.ADMIN_PASSWORD = "fleuriste2026";` → changez le texte entre guillemets.

**Ajouter / retirer une personne autorisée.**
Fichier `firebase-config.js`, liste `window.ADMIN_EMAILS`. Pensez à mettre la
même adresse dans les **règles Firestore et Storage** (Partie 2.4 et 2.5), sinon
la publication sera refusée.

**« Droits insuffisants » au moment de publier.**
L'adresse connectée n'est pas dans les règles Firestore. Corrigez l'e-mail dans
les règles (console Firebase → Firestore → Règles → Publier).

**Changer le logo.**
Remplacez `assets/logo-lafleuriste.png` par votre version (fond transparent,
même nom), ou passez par l'espace gestionnaire, onglet **« Marque »**.

---

## Contenu du dossier (pour information)

```
index.html          la page du site (assemble les sections)
sections/           chaque partie du site dans son fichier
config.js           contenu de secours (utilisé si Firebase n'est pas là)
firebase-config.js  ⚙️ vos 6 clés Firebase + adresses autorisées
content-loader.js   va chercher le contenu en ligne
include.js / main.js / style.css   fonctionnement et apparence (ne pas modifier)
admin.html          l'espace gestionnaire
assets/             logo, photos, vidéos
_archive/           ancienne version du site (inutilisée)
```
