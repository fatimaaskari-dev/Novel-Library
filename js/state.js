// ===============================
// STATE
// ===============================

export let books = [];

export let currentFilter = "All";

export let selectedBook = null;

export let currentSlide = 0;

export let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// ===============================
// GENRES
// ===============================

export const GENRES = [
  "Romance",
  "Mystery",
  "Fantasy",
  "Thriller",
  "Historical",
  "Adventure",
];

// ===============================
// SETTERS
// ===============================

export function setBooks(newBooks) {
  books = newBooks;
}

export function setCurrentFilter(filter) {
  currentFilter = filter;
}

export function setSelectedBook(book) {
  selectedBook = book;
}

export function setCurrentSlide(slide) {
  currentSlide = slide;
}

export function setFavorites(newFavorites) {
  favorites = newFavorites;
}
