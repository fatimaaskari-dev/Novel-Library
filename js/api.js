// ===============================
// API
// ===============================

import { GENRES } from "./state.js";

// ===============================
// GET BOOKS BY GENRE
// ===============================

export async function getBooksByGenre(genre) {
  const url =
    `https://openlibrary.org/search.json` +
    `?subject=${encodeURIComponent(genre)}` +
    `&limit=10` +
    `&fields=key,title,author_name,cover_i,first_publish_year,number_of_pages_median,ratings_average,subject`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load ${genre} books`);
  }

  const data = await response.json();

  return data.docs
    .filter((book) => book.cover_i)
    .map((book) => ({
      id: book.key,

      title: book.title || "Unknown Title",

      author: book.author_name?.[0] || "Unknown Author",

      coverId: book.cover_i,

      year: book.first_publish_year || "Unknown",

      pages: book.number_of_pages_median || "Unknown",

      rating: book.ratings_average ? book.ratings_average.toFixed(1) : "N/A",

      subjects: book.subject || [],

      genre: genre,

      genres: [genre],

      description: createDescription(book.subject || []),
    }));
}

// ===============================
// CREATE DESCRIPTION
// ===============================

function createDescription(subjects) {
  if (!subjects.length) {
    return "Discover this interesting novel and explore its story.";
  }

  const topics = subjects.slice(0, 4).join(", ");

  return `This novel explores themes such as ${topics}. Discover more about this book and its story.`;
}

// ===============================
// LOAD ALL BOOKS
// ===============================

export async function loadBooks() {
  const results = await Promise.all(
    GENRES.map((genre) => getBooksByGenre(genre)),
  );

  const allBooks = results.flat();

  const booksMap = new Map();

  allBooks.forEach((book) => {
    if (!booksMap.has(book.id)) {
      booksMap.set(book.id, book);
    } else {
      const existingBook = booksMap.get(book.id);

      existingBook.genres = [
        ...new Set([...existingBook.genres, ...book.genres]),
      ];
    }
  });

  return [...booksMap.values()];
}
