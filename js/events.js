// ===============================
// EVENTS
// ===============================

import { setCurrentFilter } from "./state.js";

import { renderBooks, renderFavorites } from "./render.js";

import { toggleFavorite } from "./favorites.js";

import { openModal } from "./modal.js";

// ===============================
// DOM
// ===============================

const booksGrid = document.querySelector(".books-grid");

const favoritesGrid = document.querySelector(".favorites-grid");

const filterBtns = document.querySelectorAll(".filter-btn");

const searchBtn = document.querySelector(".search-btn");

const searchInput = document.querySelector(".search-input");

const genreCards = document.querySelectorAll(".genre-card");

// ===============================
// SETUP EVENTS
// ===============================

export function setupEvents() {
  // FILTER
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setCurrentFilter(btn.dataset.filter);

      filterBtns.forEach((button) => {
        button.classList.remove("active");
      });

      btn.classList.add("active");

      renderBooks(booksGrid, searchInput);
    });
  });

  // SEARCH BUTTON
  searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("hidden");

    if (!searchInput.classList.contains("hidden")) {
      searchInput.focus();
    }
  });

  // SEARCH INPUT
  searchInput.addEventListener("input", () => {
    renderBooks(booksGrid, searchInput);
  });

  // ENTER SEARCH
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      document.querySelector("#books").scrollIntoView({
        behavior: "smooth",
      });

      searchInput.classList.add("hidden");
    }
  });

  // BOOKS GRID
  booksGrid.addEventListener("click", handleCardClick);

  // FAVORITES GRID
  favoritesGrid.addEventListener("click", handleCardClick);

  // GENRE CARDS
  genreCards.forEach((card) => {
    card.addEventListener("click", () => {
      const genre = card.querySelector("span").textContent.trim();

      const matchingButton = [...filterBtns].find(
        (btn) => btn.dataset.filter === genre,
      );

      if (matchingButton) {
        matchingButton.click();
      }

      document.querySelector("#books").scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// ===============================
// CARD CLICK
// ===============================

function handleCardClick(event) {
  const action = event.target.dataset.action;

  if (!action) return;

  const card = event.target.closest(".book-card");

  if (!card) return;

  const bookId = card.dataset.id;

  // FAVORITE
  if (action === "favorite") {
    toggleFavorite(bookId);

    renderBooks(booksGrid, searchInput);

    renderFavorites(favoritesGrid);
  }

  // DETAILS
  if (action === "details") {
    openModal(bookId);
  }
}
