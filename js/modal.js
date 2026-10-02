// ===============================
// MODAL
// ===============================

import { books, favorites, selectedBook, setSelectedBook } from "./state.js";

import { getCoverUrl } from "./utils.js";

import { toggleFavorite } from "./favorites.js";

// ===============================
// DOM ELEMENTS
// ===============================

const modal = document.querySelector(".modal");

const modalOverlay = document.querySelector(".modal-overlay");

const modalClose = document.querySelector(".modal-close");

const modalCover = document.querySelector(".modal-cover");

const modalGenre = document.querySelector(".modal-genre");

const modalTitle = document.querySelector(".modal-title");

const modalAuthor = document.querySelector(".modal-author");

const modalRating = document.querySelector(".modal-rating");

const modalDescription = document.querySelector(".modal-description");

const modalPages = document.querySelector(".modal-pages");

const modalYear = document.querySelector(".modal-year");

const modalFavoriteBtn = document.querySelector(".modal-favorite-btn");

// ===============================
// OPEN MODAL
// ===============================

export function openModal(bookId) {
  const book = books.find((book) => book.id === bookId);

  if (!book) return;

  setSelectedBook(book);

  modalCover.src = getCoverUrl(book, "L");

  modalCover.alt = book.title;

  modalGenre.textContent = book.genre;

  modalTitle.textContent = book.title;

  modalAuthor.textContent = book.author;

  modalRating.textContent = `⭐ ${book.rating}`;

  modalDescription.textContent = book.description;

  modalPages.textContent = book.pages;

  modalYear.textContent = book.year;

  updateModalFavoriteButton();

  modal.classList.remove("hidden");

  document.body.classList.add("modal-open");
}

// ===============================
// UPDATE MODAL FAVORITE
// ===============================

export function updateModalFavoriteButton() {
  if (!selectedBook) return;

  const isFavorite = favorites.includes(selectedBook.id);

  modalFavoriteBtn.textContent = isFavorite
    ? "♥ Remove from Favorites"
    : "♡ Add to Favorites";

  modalFavoriteBtn.classList.toggle("active", isFavorite);
}

// ===============================
// FAVORITE BUTTON
// ===============================

modalFavoriteBtn.addEventListener("click", () => {
  if (!selectedBook) return;

  toggleFavorite(selectedBook.id);

  updateModalFavoriteButton();
});

// ===============================
// CLOSE MODAL
// ===============================

export function closeModal() {
  modal.classList.add("hidden");

  document.body.classList.remove("modal-open");

  setSelectedBook(null);
}

// ===============================
// CLOSE EVENTS
// ===============================

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
