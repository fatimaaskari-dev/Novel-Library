// ===============================
// RENDER
// ===============================

import { books, currentFilter, favorites } from "./state.js";

import { getCoverUrl } from "./utils.js";

// ===============================
// CREATE BOOK CARD
// ===============================

export function createBookCard(book) {
  const isFavorite = favorites.includes(book.id);

  const card = document.createElement("article");

  card.classList.add("book-card");

  card.dataset.id = book.id;

  card.innerHTML = `
    <div class="card-cover">

      <img
        src="${getCoverUrl(book)}"
        alt="${book.title}"
      >

      <button
        class="favorite-btn ${isFavorite ? "active" : ""}"
        data-action="favorite"
        aria-label="Add to favorites"
      >
        ${isFavorite ? "♥" : "♡"}
      </button>

    </div>

    <div class="card-content">

      <span class="book-genre">
        ${book.genre}
      </span>

      <h3>
        ${book.title}
      </h3>

      <p class="author">
        ${book.author}
      </p>

      <div class="card-bottom">

        <span class="rating">
          ⭐ ${book.rating}
        </span>

        <button
          class="view-details"
          data-action="details"
        >
          View Details
        </button>

      </div>

    </div>
  `;

  return card;
}

// ===============================
// RENDER BOOKS
// ===============================

export function renderBooks(booksGrid, searchInput) {
  booksGrid.innerHTML = "";

  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm);

    const matchesGenre =
      currentFilter === "All" || book.genres.includes(currentFilter);

    return matchesSearch && matchesGenre;
  });

  if (!filteredBooks.length) {
    booksGrid.innerHTML = `
      <p class="no-books">
        No books found.
      </p>
    `;

    return;
  }

  filteredBooks.forEach((book) => {
    booksGrid.appendChild(createBookCard(book));
  });
}

// ===============================
// RENDER FAVORITES
// ===============================

export function renderFavorites(favoritesGrid) {
  favoritesGrid.innerHTML = "";

  const favoriteBooks = books.filter((book) => favorites.includes(book.id));

  if (!favoriteBooks.length) {
    favoritesGrid.innerHTML = `
      <p class="no-books">
        You haven't added any favorites yet.
      </p>
    `;

    return;
  }

  favoriteBooks.forEach((book) => {
    favoritesGrid.appendChild(createBookCard(book));
  });
}
