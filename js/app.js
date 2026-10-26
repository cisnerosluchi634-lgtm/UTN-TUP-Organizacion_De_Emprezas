/* ============================================================
   GG RANK — lógica de la página
   ============================================================ */

(function () {
  "use strict";

  var STEAM_CDN = "https://cdn.cloudflare.steamstatic.com/steam/apps/";

  var els = {
    podium: document.getElementById("podium"),
    list: document.getElementById("list"),
    chips: document.getElementById("chips"),
    search: document.getElementById("search"),
    resultsMeta: document.getElementById("results-meta"),
    count: document.getElementById("count"),
    empty: document.getElementById("empty"),
    podiumSection: document.getElementById("ranking"),
    restSection: document.getElementById("rest-section"),
    dialog: document.getElementById("detail"),
    dialogContent: document.getElementById("detail-content"),
    statGames: document.getElementById("stat-games"),
    statScore: document.getElementById("stat-score"),
    statGenres: document.getElementById("stat-genres"),
  };

  var state = { query: "", genre: "Todos" };

  var games = (window.GAMES || []).slice().sort(function (a, b) {
    return b.score - a.score || a.title.localeCompare(b.title, "es");
  });

  var rankOf = new Map(
    games.map(function (game, index) {
      return [game.id, index + 1];
    })
  );

  /* ---------------- Utilidades ---------------- */

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initials(title) {
    return title
      .replace(/[^\p{L}\p{N} ]/gu, " ")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (word) {
        return word[0];
      })
      .join("")
      .toUpperCase();
  }

  function scoreClass(score) {
    if (score >= 92) return "";
    if (score >= 90) return "great";
    return "good";
  }

  function coverURL(game) {
    return game.appId ? STEAM_CDN + game.appId + "/header.jpg" : "";
  }

  function steamURL(title) {
    return "https://store.steampowered.com/search/?term=" + encodeURIComponent(title);
  }

  function coverMarkup(game, alt) {
    var url = coverURL(game);
    return (
      '<div class="cover-fallback" aria-hidden="true"><span>' +
      escapeHTML(initials(game.title)) +
      "</span></div>" +
      (url
        ? '<img src="' +
          url +
          '" alt="' +
          escapeHTML(alt) +
          '" loading="lazy" decoding="async" onerror="this.remove()" />'
        : "")
    );
  }

  function allTags(game) {
    return [game.genre].concat(game.tags || []);
  }

  /* ---------------- Estadísticas ---------------- */

  function renderStats() {
    var total = games.length;
    var average = total
      ? games.reduce(function (sum, game) {
          return sum + game.score;
        }, 0) / total
      : 0;
    var genres = new Set(
      games.map(function (game) {
        return game.genre;
      })
    );

    els.statGames.textContent = total;
    els.statScore.textContent = new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(average);
    els.statGenres.textContent = genres.size;
  }

  /* ---------------- Filtros ---------------- */

  function genreCounts() {
    var counts = new Map();
    games.forEach(function (game) {
      counts.set(game.genre, (counts.get(game.genre) || 0) + 1);
    });
    return Array.from(counts.entries()).sort(function (a, b) {
      return b[1] - a[1] || a[0].localeCompare(b[0], "es");
    });
  }

  function renderChips() {
    var items = [["Todos", games.length]].concat(genreCounts());

    els.chips.innerHTML = items
      .map(function (item) {
        var genre = item[0];
        var pressed = state.genre === genre;
        return (
          '<button class="chip" type="button" data-genre="' +
          escapeHTML(genre) +
          '" aria-pressed="' +
          pressed +
          '">' +
          escapeHTML(genre) +
          ' <span aria-hidden="true">· ' +
          item[1] +
          "</span></button>"
        );
      })
      .join("");
  }

  function setActiveChip() {
    Array.prototype.forEach.call(els.chips.querySelectorAll(".chip"), function (chip) {
      chip.setAttribute("aria-pressed", chip.dataset.genre === state.genre ? "true" : "false");
    });
  }

  function visibleGames() {
    var query = state.query.trim().toLowerCase();

    return games.filter(function (game) {
      var matchesGenre = state.genre === "Todos" || game.genre === state.genre;
      if (!matchesGenre) return false;
      if (!query) return true;

      var haystack = [game.title, game.studio, game.year]
        .concat(game.platforms || [])
        .concat(allTags(game))
        .join(" ")
        .toLowerCase();

      return haystack.indexOf(query) !== -1;
    });
  }

  /* ---------------- Render ---------------- */

  function cardMarkup(game, index) {
    var rank = rankOf.get(game.id);
    return (
      '<article class="card' +
      (rank === 1 ? " card--first" : "") +
      '" style="--i:' +
      index +
      ";--a1:" +
      game.accent[0] +
      ";--a2:" +
      game.accent[1] +
      '" data-id="' +
      game.id +
      '" tabindex="0" role="button" aria-label="Ver ficha de ' +
      escapeHTML(game.title) +
      '">' +
      '<div class="card-media">' +
      coverMarkup(game, "Portada de " + game.title) +
      '<span class="rank-badge rank-badge--' +
      rank +
      '">#' +
      rank +
      "</span>" +
      '<span class="score-pill ' +
      scoreClass(game.score) +
      '"><strong>' +
      game.score +
      "</strong><span>pts</span></span>" +
      "</div>" +
      '<div class="card-body">' +
      "<h3>" +
      escapeHTML(game.title) +
      "</h3>" +
      '<p class="card-meta">' +
      escapeHTML(game.studio) +
      " · " +
      game.year +
      "</p>" +
      '<ul class="tags">' +
      allTags(game)
        .slice(0, 3)
        .map(function (tag) {
          return "<li>" + escapeHTML(tag) + "</li>";
        })
        .join("") +
      "</ul>" +
      '<div class="score-bar" aria-hidden="true"><span style="width:' +
      game.score +
      '%"></span></div>' +
      "</div>" +
      "</article>"
    );
  }

  function rowMarkup(game, index) {
    var rank = rankOf.get(game.id);
    return (
      '<article class="row" style="--i:' +
      index +
      ";--a1:" +
      game.accent[0] +
      ";--a2:" +
      game.accent[1] +
      '" data-id="' +
      game.id +
      '" tabindex="0" role="button" aria-label="Ver ficha de ' +
      escapeHTML(game.title) +
      '">' +
      '<span class="row__rank">' +
      rank +
      "</span>" +
      '<span class="row__thumb">' +
      coverMarkup(game, "") +
      "</span>" +
      '<span class="row__info">' +
      '<span class="row__title">' +
      escapeHTML(game.title) +
      "</span>" +
      '<span class="row__meta">' +
      escapeHTML(game.genre) +
      " · " +
      escapeHTML(game.studio) +
      " · " +
      game.year +
      "</span>" +
      "</span>" +
      '<span class="row__score">' +
      '<span class="mini-bar" aria-hidden="true"><span style="width:' +
      game.score +
      '%"></span></span>' +
      "<strong>" +
      game.score +
      "</strong>" +
      "</span>" +
      '<svg class="row__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>' +
      "</article>"
    );
  }

  function render() {
    var visible = visibleGames();
    var podium = visible.slice(0, 3);
    var rest = visible.slice(3);

    els.podium.innerHTML = podium
      .map(function (game, index) {
        return cardMarkup(game, index);
      })
      .join("");

    els.list.innerHTML = rest
      .map(function (game, index) {
        return rowMarkup(game, index);
      })
      .join("");

    var isEmpty = visible.length === 0;
    els.empty.hidden = !isEmpty;
    els.podium.hidden = isEmpty;
    els.podiumSection.hidden = isEmpty;
    els.restSection.hidden = isEmpty || rest.length === 0;

    var label = visible.length === 1 ? "título" : "títulos";
    els.resultsMeta.textContent =
      "Mostrando " + visible.length + " de " + games.length + " " + label;
    els.count.textContent = isEmpty
      ? ""
      : visible.length > 3
        ? "4–" + visible.length + " de " + games.length
        : "";
  }

  /* ---------------- Ficha (dialog) ---------------- */

  function openDetail(id) {
    var game = games.find(function (item) {
      return item.id === id;
    });
    if (!game) return;

    var rank = rankOf.get(game.id);
    var url = coverURL(game);

    els.dialogContent.innerHTML =
      '<div class="dialog__media" style="--a1:' +
      game.accent[0] +
      ";--a2:" +
      game.accent[1] +
      '">' +
      (url
        ? '<img src="' + url + '" alt="Portada de ' + escapeHTML(game.title) + '" />'
        : '<div class="dialog__fallback">' + escapeHTML(initials(game.title)) + "</div>") +
      "</div>" +
      '<div class="dialog__body">' +
      '<span class="dialog__rank">Puesto #' +
      rank +
      " del ranking</span>" +
      "<h3 id=\"detail-title\">" +
      escapeHTML(game.title) +
      "</h3>" +
      '<p class="dialog__meta">' +
      escapeHTML(game.studio) +
      " · " +
      game.year +
      " · " +
      escapeHTML((game.platforms || []).join(", ")) +
      "</p>" +
      '<p class="dialog__blurb">' +
      escapeHTML(game.blurb) +
      "</p>" +
      '<div class="dialog__score">' +
      '<span class="dialog__score-value">' +
      game.score +
      "</span>" +
      '<span class="dialog__score-bar" aria-hidden="true"><span style="width:' +
      game.score +
      '%"></span></span>' +
      '<span class="dialog__score-label">puntuación</span>' +
      "</div>" +
      '<ul class="dialog__tags">' +
      allTags(game)
        .map(function (tag) {
          return "<li>" + escapeHTML(tag) + "</li>";
        })
        .join("") +
      "</ul>" +
      '<div class="dialog__actions">' +
      '<a class="btn btn--primary" href="' +
      steamURL(game.title) +
      '" target="_blank" rel="noopener">Ver en Steam</a>' +
      '<button class="btn btn--ghost" type="button" data-close>Cerrar</button>' +
      "</div>" +
      "</div>";

    if (typeof els.dialog.showModal === "function") {
      els.dialog.showModal();
    } else {
      els.dialog.setAttribute("open", "");
    }
  }

  function closeDetail() {
    if (typeof els.dialog.close === "function") {
      els.dialog.close();
    } else {
      els.dialog.removeAttribute("open");
    }
  }

  /* ---------------- Eventos ---------------- */

  function bind() {
    els.chips.addEventListener("click", function (event) {
      var button = event.target.closest(".chip");
      if (!button) return;
      state.genre = button.dataset.genre;
      renderChips();
      render();
    });

    els.search.addEventListener("input", function () {
      state.query = els.search.value;
      render();
    });

    els.podium.addEventListener("click", onGameClick);
    els.list.addEventListener("click", onGameClick);

    els.podium.addEventListener("keydown", onGameKeydown);
    els.list.addEventListener("keydown", onGameKeydown);

    els.empty.addEventListener("click", function (event) {
      if (!event.target.closest("[data-reset]")) return;
      state.query = "";
      state.genre = "Todos";
      els.search.value = "";
      renderChips();
      render();
      els.search.focus();
    });

    els.dialog.addEventListener("click", function (event) {
      if (event.target === els.dialog || event.target.closest("[data-close]")) {
        closeDetail();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
      var tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      event.preventDefault();
      els.search.focus();
    });
  }

  function onGameClick(event) {
    var card = event.target.closest("[data-id]");
    if (card) openDetail(card.dataset.id);
  }

  function onGameKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var card = event.target.closest("[data-id]");
    if (!card) return;
    event.preventDefault();
    openDetail(card.dataset.id);
  }

  /* ---------------- Init ---------------- */

  renderStats();
  renderChips();
  render();
  bind();
})();
