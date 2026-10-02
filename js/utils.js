// ===============================
// COVER URL
// ===============================

export function getCoverUrl(book, size = "M") {
  return `https://covers.openlibrary.org/b/id/${book.coverId}-${size}.jpg`;
}
