// ===============================
// MAIN
// ===============================

import { loadBooks } from "./api.js";

import { setBooks } from "./state.js";

import { renderBooks, renderFavorites } from "./render.js";

import { renderFeaturedBooks } from "./slider.js";

import { setupEvents } from "./events.js";

import { openModal } from "./modal.js";

// ===============================
// DOM
// ===============================

const booksGrid = document.querySelector(".books-grid");

const favoritesGrid = document.querySelector(".favorites-grid");

const searchInput = document.querySelector(".search-input");

// ===============================
// INIT
// ===============================

async function init() {
  try {
    const loadedBooks = await loadBooks();

    setBooks(loadedBooks);

    // BOOKS
    renderBooks(booksGrid, searchInput);

    // FAVORITES
    renderFavorites(favoritesGrid);

    // SLIDER
    renderFeaturedBooks(openModal);

    // EVENTS
    setupEvents();

    console.log("Novel Library started successfully!");
  } catch (error) {
    console.error("Error loading books:", error);

    booksGrid.innerHTML = `
      <p class="error-message">
        Failed to load books.
        Please try again.
      </p>
    `;
  }
}

// ===============================
// START
// ===============================

init();
