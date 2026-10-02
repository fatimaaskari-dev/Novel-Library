// ===============================
// SLIDER
// ===============================

import { books, currentSlide, setCurrentSlide } from "./state.js";

import { getCoverUrl } from "./utils.js";

// ===============================
// DOM
// ===============================

const sliderTrack = document.querySelector(".slider-track");

const prevBtn = document.querySelector(".prev-btn");

const nextBtn = document.querySelector(".next-btn");

const dotsContainer = document.querySelector(".slider-dots");

// ===============================
// RENDER SLIDER
// ===============================

export function renderFeaturedBooks(openModal) {
  sliderTrack.innerHTML = "";

  dotsContainer.innerHTML = "";

  setCurrentSlide(0);

  const featuredBooks = books.slice(0, 3);

  featuredBooks.forEach((book, index) => {
    const slide = document.createElement("div");

    slide.classList.add("featured-book");

    slide.innerHTML = `
        <img
          src="${getCoverUrl(book, "L")}"
          alt="${book.title}"
        >

        <div class="featured-info">

          <span>
            ${book.genre}
          </span>

          <h2>
            ${book.title}
          </h2>

          <p>
            ${book.author}
          </p>

          <p>
            ⭐ ${book.rating}
          </p>

          <button
            class="featured-details"
            data-id="${book.id}"
          >
            View Details
          </button>

        </div>
      `;

    sliderTrack.appendChild(slide);

    // Dot
    const dot = document.createElement("button");

    dot.classList.add("dot");

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      setCurrentSlide(index);

      updateSlider();
    });

    dotsContainer.appendChild(dot);
  });

  updateSlider();
}

// ===============================
// UPDATE SLIDER
// ===============================

export function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  const dots = document.querySelectorAll(".dot");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// ===============================
// NEXT
// ===============================

nextBtn.addEventListener("click", () => {
  const slides = document.querySelectorAll(".featured-book");

  if (!slides.length) return;

  let nextSlide = currentSlide + 1;

  if (nextSlide >= slides.length) {
    nextSlide = 0;
  }

  setCurrentSlide(nextSlide);

  updateSlider();
});

// ===============================
// PREVIOUS
// ===============================

prevBtn.addEventListener("click", () => {
  const slides = document.querySelectorAll(".featured-book");

  if (!slides.length) return;

  let previousSlide = currentSlide - 1;

  if (previousSlide < 0) {
    previousSlide = slides.length - 1;
  }

  setCurrentSlide(previousSlide);

  updateSlider();
});

// ===============================
// DETAILS
// ===============================

sliderTrack.addEventListener("click", (event) => {
  if (!event.target.classList.contains("featured-details")) {
    return;
  }

  const bookId = event.target.dataset.id;

  openModal(bookId);
});
