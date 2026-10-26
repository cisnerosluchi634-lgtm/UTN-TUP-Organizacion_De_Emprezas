/* ============================================================
   Datos del ranking — editá este archivo y la página se actualiza.
   El orden final se calcula por "score" (de mayor a menor).

   Campos:
   - id:        identificador único (string)
   - title:     nombre del juego
   - studio:    estudio / desarrolladora
   - year:      año de lanzamiento
   - score:     puntuación de 0 a 100 (define el puesto)
   - genre:     género principal (se usa para los filtros)
   - tags:      etiquetas secundarias
   - platforms: plataformas disponibles
   - blurb:     descripción corta para la ficha
   - accent:    par de colores para el fondo de reserva
   - appId:     (opcional) App ID de Steam para la portada
   ============================================================ */

window.GAMES = [
  {
    id: "clair-obscur",
    title: "Clair Obscur: Expedition 33",
    studio: "Sandfall Interactive",
    year: 2025,
    score: 97,
    genre: "RPG",
    tags: ["Turnos", "Fantasía", "Historia"],
    platforms: ["PC", "PS5", "Xbox Series"],
    blurb:
      "Un RPG por turnos con alma de película: arte belle époque, combate reactivo y una historia que duele en el buen sentido.",
    accent: ["#f59e0b", "#4c1d95"],
    appId: 1903340,
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    studio: "Larian Studios",
    year: 2023,
    score: 96,
    genre: "RPG",
    tags: ["Estrategia", "Cooperativo", "Mundo abierto"],
    platforms: ["PC", "PS5", "Xbox Series"],
    blurb:
      "El estándar de oro del RPG moderno: libertad casi absurda, decisiones con peso y cientos de horas de rejugabilidad.",
    accent: ["#b91c1c", "#f59e0b"],
    appId: 1086940,
  },
  {
    id: "red-dead-redemption-2",
    title: "Red Dead Redemption 2",
    studio: "Rockstar Games",
    year: 2018,
    score: 95,
    genre: "Aventura",
    tags: ["Mundo abierto", "Western", "Historia"],
    platforms: ["PC", "PS5", "Xbox Series"],
    blurb:
      "El western definitivo. Un mundo abierto con un nivel de detalle que sigue sin tener rival años después.",
    accent: ["#dc2626", "#450a0a"],
    appId: 1174180,
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    studio: "FromSoftware",
    year: 2022,
    score: 94,
    genre: "Acción",
    tags: ["Soulslike", "Mundo abierto", "Fantasía"],
    platforms: ["PC", "PS5", "Xbox Series"],
    blurb:
      "FromSoftware en su máxima expresión: exploración sin brújula, jefes memorables y una sensación de descubrimiento única.",
    accent: ["#ca8a04", "#1e293b"],
    appId: 1245620,
  },
  {
    id: "hollow-knight-silksong",
    title: "Hollow Knight: Silksong",
    studio: "Team Cherry",
    year: 2025,
    score: 94,
    genre: "Metroidvania",
    tags: ["Indie", "Plataformas", "Desafío"],
    platforms: ["PC", "PS5", "Xbox Series", "Switch 2"],
    blurb:
      "Más rápido, más agresivo y más grande que su predecesor. Team Cherry convirtió la espera en un platforming de precisión impecable.",
    accent: ["#dc2626", "#1e1b4b"],
    appId: 1030300,
  },
  {
    id: "the-witcher-3",
    title: "The Witcher 3: Wild Hunt",
    studio: "CD Projekt Red",
    year: 2015,
    score: 93,
    genre: "RPG",
    tags: ["Mundo abierto", "Fantasía", "Historia"],
    platforms: ["PC", "PS5", "Xbox Series"],
    blurb:
      "Misiones secundarias con más alma que muchas campañas completas. Geralt sigue siendo el mejor embajador del RPG occidental.",
    accent: ["#f59e0b", "#064e3b"],
    appId: 292030,
  },
  {
    id: "hades-2",
    title: "Hades II",
    studio: "Supergiant Games",
    year: 2025,
    score: 92,
    genre: "Roguelike",
    tags: ["Acción", "Mitología", "Narrativa"],
    platforms: ["PC", "PS5", "Xbox Series", "Switch 2"],
    blurb:
      "Roguelike con narrativa que avanza en cada intento. Supergiant perfeccionó su fórmula con combate más táctico y personajes enormes.",
    accent: ["#22d3ee", "#6d28d9"],
    appId: 1145350,
  },
  {
    id: "kingdom-come-2",
    title: "Kingdom Come: Deliverance II",
    studio: "Warhorse Studios",
    year: 2025,
    score: 91,
    genre: "RPG",
    tags: ["Mundo abierto", "Histórico", "Simulación"],
    platforms: ["PC", "PS5", "Xbox Series"],
    blurb:
      "Simulación medieval sin atajos: cada pelea, cada robo y cada decisión se sienten reales.",
    accent: ["#65a30d", "#78350f"],
    appId: 1771300,
  },
  {
    id: "split-fiction",
    title: "Split Fiction",
    studio: "Hazelight Studios",
    year: 2025,
    score: 90,
    genre: "Cooperativo",
    tags: ["Aventura", "Puzzle", "Historia"],
    platforms: ["PC", "PS5", "Xbox Series"],
    blurb:
      "Cooperativo obligatorio y creatividad sin freno: cada nivel propone una idea nueva y ninguna se repite.",
    accent: ["#38bdf8", "#a855f7"],
    appId: 2001120,
  },
  {
    id: "monster-hunter-wilds",
    title: "Monster Hunter Wilds",
    studio: "Capcom",
    year: 2025,
    score: 89,
    genre: "Acción",
    tags: ["Cooperativo", "Caza", "Mundo abierto"],
    platforms: ["PC", "PS5", "Xbox Series"],
    blurb:
      "Cazar monstruos gigantes con amigos nunca fue tan espectacular. El ecosistema vivo es el verdadero protagonista.",
    accent: ["#f97316", "#0f766e"],
    appId: 2246340,
  },
  {
    id: "balatro",
    title: "Balatro",
    studio: "LocalThunk",
    year: 2024,
    score: 88,
    genre: "Roguelike",
    tags: ["Cartas", "Indie", "Estrategia"],
    platforms: ["PC", "PS5", "Xbox Series", "Switch"],
    blurb:
      "Póker + roguelike = la sorpresa más adictiva de los últimos años. Fácil de empezar, imposible de soltar.",
    accent: ["#ef4444", "#1d4ed8"],
    appId: 2379780,
  },
  {
    id: "helldivers-2",
    title: "Helldivers 2",
    studio: "Arrowhead Game Studios",
    year: 2024,
    score: 87,
    genre: "Shooter",
    tags: ["Cooperativo", "Acción", "Sátira"],
    platforms: ["PC", "PS5"],
    blurb:
      "Acción cooperativa caótica y satírica, con una comunidad que convirtió cada actualización en un evento.",
    accent: ["#facc15", "#0f172a"],
    appId: 553850,
  },
];
