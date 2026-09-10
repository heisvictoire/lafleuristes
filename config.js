/* ============================================================
   LA.FLEURISTE — CONTENU DU SITE (config.js)
   ------------------------------------------------------------
   TOUT le contenu du site est ici : textes, images, vidéos,
   numéro WhatsApp, réseaux sociaux, couleurs d'accent.
   Vous pouvez modifier ce fichier à la main (respectez les
   guillemets " " et les virgules) OU utiliser admin.html qui
   fait la même chose sans toucher au code.

   Astuce : un "\n" dans un titre = un retour à la ligne.
   Accents d'accent disponibles : "gold", "marigold", "orange".
   ============================================================ */
window.SITE_CONFIG = {

  /* Écran de chargement : courte vidéo affichée le temps que le
     site charge (disparaît toute seule). Mettez enabled à false
     pour l'enlever. La vidéo peut être un fichier assets/… ou un
     lien (Google Drive accepté). */
  preloader: {
    enabled: true,
    video: "assets/quote.mp4",
    poster: "assets/quote.jpg",
    minSeconds: 1.5,   // durée minimale d'affichage
    maxSeconds: 6      // durée maximale (disparaît de force après)
  },

  brand: {
    name: "La.Fleuriste",
    logo: "assets/logo-lafleuriste.png"
  },

  contact: {
    whatsapp: "221762935845",
    phoneDisplay: "+221 76 293 58 45",
    email: "bonjour@lafleuriste.sn",
    website: "https://www.lafleuriste.sn",
    websiteLabel: "www.lafleuriste.sn",
    address: "Almadies, Dakar — Sénégal",
    formUrl: "https://forms.gle/8rchqQha5xCCrBMR8",
    whatsappFloatText: "Bonjour La.Fleuriste, j'ai une question."
  },

  social: {
    instagram: "",
    facebook: "",
    tiktok: ""
  },

  nav: [
    { label: "Bouquets",  href: "#bouquets" },
    { label: "Occasions", href: "#occasions" },
    { label: "Ateliers",  href: "#ateliers" },
    { label: "Maison",    href: "#maison" },
    { label: "Contact",   href: "#contact" }
  ],

  hero: {
    eyebrow: "Maison florale — Dakar · depuis 2026",
    eyebrowAccent: "gold",
    title: "Un bouquet\nn'est jamais\nqu'un bouquet",
    ctaLabel: "Commander",
    ctaHref: "#contact",
    linkLabel: "Découvrir l'atelier",
    linkHref: "#ateliers",
    aside: "Chez La.Fleuriste, on choisit, on compose et on offre des fleurs avec intention — des créations qui racontent une histoire et transmettent une émotion.",
    asideEyebrow: "Fait main, tige à tige",
    video: "assets/hero-band.mp4",
    poster: "assets/hero-band.jpg",
    tabLabel: "Commander un bouquet",
    tabHref: "#contact"
  },

  intro: {
    statement: "Nos bouquets, plus qu'une œuvre d'art : un souvenir inoubliable.",
    stats: [
      { value: "100%",  text: "Noué à la main, chaque tige choisie et placée une par une." },
      { value: "3 · 5", text: "Trois fleurs, cinq couleurs : le fil conducteur de l'édition d'atelier en cours." }
    ]
  },

  occasions: {
    eyebrow: "Occasions",
    eyebrowAccent: "orange",
    title: "Pour chaque\nmoment qui compte",
    intro: "Nos créations accompagnent les moments précieux de la vie — et parfois, il n'y a pas besoin d'occasion.",
    items: [
      { accent: "gold",     title: "Anniversaire",        short: "Célébrer une nouvelle année qui commence.",
        detail: "Pour souffler une bougie de plus. On compose selon la personne — ses couleurs, la saison, l'ambiance de la fête — un bouquet qui célèbre l'année qui commence." },
      { accent: "marigold", title: "Mariage",             short: "Magnifier l'amour et l'union.",
        detail: "Bouquet de mariée, cérémonie, décor de table ou remerciements aux témoins. On travaille sur-mesure, en amont, pour accompagner chaque étape de la journée." },
      { accent: "orange",   title: "Soutenance",          short: "Féliciter une réussite, saluer le travail accompli.",
        detail: "Féliciter un diplôme, une thèse, une réussite. Un bouquet net et lumineux, remis le jour J, pour saluer le travail accompli." },
      { accent: "marigold", title: "Événement heureux",   short: "Marquer une belle occasion, petite ou grande.",
        detail: "Naissance, promotion, emménagement, fiançailles… Toutes les bonnes nouvelles méritent des fleurs. Dites-nous l'occasion, on imagine la composition." },
      { accent: "orange",   title: "Événement difficile", short: "Apporter une pensée et du réconfort, avec délicatesse.",
        detail: "Deuil, convalescence, soutien. Des fleurs sobres et délicates, avec un mot si vous le souhaitez, livrées avec discrétion." },
      { accent: "gold",     title: "Sans occasion",       short: "Faire plaisir, tout simplement.",
        detail: "Parce qu'il n'y a pas toujours besoin d'une raison. Un bouquet « juste pour toi », dans le budget que vous fixez." }
    ]
  },

  histoire: {
    eyebrow: "Notre histoire",
    title: "L'art de choisir,\ncomposer et offrir",
    text: "Fondée en février 2026 à Dakar, La.Fleuriste est une maison florale dédiée à l'art de choisir, composer et offrir des fleurs avec intention. Elle accompagne chaque client dans le choix des fleurs, des couleurs et de la composition, afin de créer des bouquets qui racontent une histoire et transmettent une émotion.",
    photo: "assets/portrait-histoire.jpg",
    photoAlt: "Cliente de La.Fleuriste tenant un bouquet, portrait noir et blanc",
    ctaLabel: "Nos ateliers",
    ctaHref: "#ateliers"
  },

  galerie: {
    eyebrow: "L'univers",
    eyebrowAccent: "gold",
    title: "Ce que nous\navons composé",
    items: [
      { img: "assets/gallery-1.jpg",         accent: "gold",     cap: "Corail",  sub: "Douceur",   alt: "Bouquet de roses corail bicolores" },
      { img: "assets/marche.jpg",            accent: "marigold", cap: "Palette", sub: "Diversité", alt: "Étal de fleurs multicolores chez le producteur" },
      { img: "assets/roses-fuchsia.jpg",     accent: "orange",   cap: "Fuchsia", sub: "Éclat",     alt: "Bouquet de roses fuchsia vives" },
      { img: "assets/portrait-nuit.jpg",     accent: "gold",     cap: "Soirée",  sub: "Élégance",  alt: "Cliente en tailleur blanc avec un bouquet rose, portrait de nuit" },
      { img: "assets/gallery-5-atelier.jpg", accent: "marigold", cap: "Soleil",  sub: "Atelier",   alt: "Bouquet de lys jaunes et fleurs de paradis orange" },
      { img: "assets/gallery-4-rouge.jpg",   accent: "orange",   cap: "Rouge",   sub: "Passion",   alt: "Bouquet de roses rouges profond, papier sombre" }
    ]
  },

  citation: {
    eyebrow: "Le mot de la maison",
    quote: "Nos bouquets, plus qu'une œuvre d'art — un souvenir inoubliable",
    cite: "La.Fleuriste — Almadies, Dakar",
    video: "assets/quote.mp4",
    poster: "assets/quote.jpg"
  },

  ateliers: {
    eyebrow: "Ateliers",
    eyebrowAccent: "marigold",
    title: "L'atelier floral",
    intro: "Bien plus qu'un simple cours de composition florale, chaque atelier invite à découvrir l'univers des fleurs, à comprendre leur langage et à créer une composition unique, dans une atmosphère élégante et conviviale. Chaque édition explore un univers, une histoire ou une émotion différente.",
    edition: {
      eyebrow: "Édition en cours",
      title: "Couleurs\n& Émotions",
      desc: "Une expérience florale où les fleurs deviennent un langage. Pour cette édition, 3 fleurs et 5 couleurs deviennent le fil conducteur d'une expérience pensée autour de la rose, du lys et de la marguerite, dans des nuances de rose, jaune, orange, blanc et rouge.",
      temps: [
        { n: "01", accent: "gold",     title: "Apprendre", text: "Découvrir les fleurs, leurs significations et le langage des couleurs." },
        { n: "02", accent: "marigold", title: "Créer",     text: "Composer son propre bouquet, accompagné(e) par La.Fleuriste." },
        { n: "03", accent: "orange",   title: "Savourer",  text: "Un moment convivial autour d'un brunch — et repartir avec sa création." }
      ],
      facts: [
        { k: "Date",    v: "Samedi 10 octobre 2026" },
        { k: "Horaire", v: "15h00 – 17h00" },
        { k: "Lieu",    v: "Almadies, Dakar" },
        { k: "Tarif",   v: "30 000 FCFA" },
        { k: "Places",  v: "Limitées — réservation obligatoire" }
      ],
      includes: [
        "Le cours floral",
        "Les fleurs et accessoires nécessaires à la composition",
        "La création de votre bouquet",
        "Le brunch",
        "Votre bouquet à emporter"
      ],
      dresscode: "💛 🩷 🧡",
      ctaLabel: "Réserver ma place",
      questionLabel: "Poser une question",
      afficheLabel: "Affiche promotionnelle",
      video: "assets/atelier.mp4",
      videoWebm: "",
      poster: "assets/atelier-poster.jpg",
      mediaCaption: "Aperçu — Atelier Couleurs & Émotions"
    }
  },

  /* Section « affiche » (visuel promotionnel en grand). */
  affiche: {
    eyebrow: "L'affiche",
    eyebrowAccent: "gold",
    title: "L'édition en cours,\nen grand",
    note: "Enregistrez l'affiche de l'Atelier Couleurs & Émotions et partagez-la autour de vous.",
    image: "assets/poster.jpg",
    imageAlt: "Affiche de l'Atelier Floral Couleurs & Émotions — Samedi 10 octobre 2026, Almadies, Dakar",
    ctaLabel: "Réserver ma place"
  },

  faq: {
    eyebrow: "Questions",
    eyebrowAccent: "orange",
    title: "Avant\nde réserver",
    items: [
      { q: "Faut-il une expérience préalable ?",           r: "Aucune. Les ateliers sont ouverts à toutes, débutantes comme confirmées." },
      { q: "Le matériel est-il fourni ?",                  r: "Oui : fleurs, outils et emballage sont inclus dans le prix indiqué." },
      { q: "Que dois-je apporter ?",                       r: "Rien de particulier, juste votre bonne humeur — un tablier est fourni si besoin." },
      { q: "Puis-je venir accompagnée ?",                  r: "Bien sûr : l'atelier se prête aussi bien à un moment entre amies qu'en solo." },
      { q: "Que se passe-t-il si je dois annuler ?",       r: "Contactez-nous sur WhatsApp au moins 48h avant la session pour reporter votre place." }
    ]
  },

  cta: {
    eyebrow: "Réservation",
    title: "Réservez\nvotre place",
    text: "Places limitées pour l'atelier Couleurs & Émotions. Réservez en ligne, ou écrivez-nous directement sur WhatsApp.",
    ctaLabel: "Formulaire d'inscription"
  },

  footer: {
    eyebrow: "La.Fleuriste",
    big: "Dites-le\navec des fleurs",
    columns: [
      { title: "Bouquets", links: [
        { label: "Anniversaire", href: "#occasions" },
        { label: "Mariage", href: "#occasions" },
        { label: "Soutenance", href: "#occasions" },
        { label: "Sans occasion", href: "#occasions" }
      ]},
      { title: "Ateliers", links: [
        { label: "Couleurs & Émotions", href: "#ateliers" },
        { label: "L'expérience en 3 temps", href: "#ateliers" },
        { label: "Réserver une place", href: "#contact" }
      ]},
      { title: "Maison", links: [
        { label: "Notre histoire", href: "#maison" },
        { label: "Le savoir-faire", href: "#bouquets" },
        { label: "Contact", href: "#contact" }
      ]}
    ],
    copyright: "La.Fleuriste — Dakar. Tous droits réservés."
  }
};
