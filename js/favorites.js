// ===============================
// FAVORITES
// ===============================

import { favorites, setFavorites } from "./state.js";

// ===============================
// TOGGLE FAVORITE
// ===============================

export function toggleFavorite(bookId) {
  let updatedFavorites;

  if (favorites.includes(bookId)) {
    updatedFavorites = favorites.filter((id) => id !== bookId);
  } else {
    updatedFavorites = [...favorites, bookId];
  }

  setFavorites(updatedFavorites);

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}
