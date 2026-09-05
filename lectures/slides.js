(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const currentEl = document.getElementById("current");
  const totalEl = document.getElementById("total");
  let index = 0;

  if (totalEl) totalEl.textContent = String(slides.length);

  function show(next) {
    index = Math.max(0, Math.min(slides.length - 1, next));
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    if (currentEl) currentEl.textContent = String(index + 1);
    location.hash = String(index + 1);
  }

  function fromHash() {
    const n = parseInt(location.hash.slice(1), 10);
    return Number.isFinite(n) ? n - 1 : 0;
  }

  document.addEventListener("keydown", (event) => {
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(event.key)) {
      event.preventDefault();
      show(index + 1);
    }
    if (["ArrowLeft", "PageUp", "Backspace"].includes(event.key)) {
      event.preventDefault();
      show(index - 1);
    }
    if (event.key === "Home") show(0);
    if (event.key === "End") show(slides.length - 1);
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    const mid = window.innerWidth / 2;
    show(event.clientX >= mid ? index + 1 : index - 1);
  });

  window.addEventListener("hashchange", () => show(fromHash()));
  show(fromHash());
})();
