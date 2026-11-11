// app.js : 영화 배열을 다루는 함수와 카드 그리기 / 정수혁(2651064) / 11주차

function average(list) {
  let sum = 0;
  for (const m of list) sum += m.rating;
  return sum / list.length;
}

function best(list) {
  let top = list[0];
  for (const m of list) {
    if (m.rating > top.rating) top = m;
  }
  return top;
}

function filterByRating(list, min) {
  return list.filter(m => m.rating >= min);
}

function yearsSince(dateStr) {
  return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

function posterUrl(path, size) {
  return "https://image.tmdb.org/t/p/" + size + path;
}

function renderCards(list) {
  const board = document.querySelector(".board");
  board.innerHTML = "";
  for (const m of list) {
    const card = document.createElement("article");
    card.className = "card";
    if (m.rating >= 8) {
      card.classList.add("hot");
    }
    card.dataset.id = m.id;
    card.onclick = function () { alert(m.overview); };
    card.innerHTML = `
      <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">
      <span class="badge">${m.rating}</span>
      <div class="info">
        <h3>${m.title}</h3>
        <p class="year">${m.year}</p>
      </div>`;
    board.appendChild(card);
  }
  document.getElementById("count").textContent = list.length + "편";
}

function sortBy(list, key, desc) {
  const copy = [...list];
  copy.sort((a, b) => {
    if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
    return a[key] - b[key];
  });
  if (desc) copy.reverse();
  return copy;
}

function applySort() {
  const key = document.getElementById("sort").value;
  renderCards(sortBy(movies, key, key !== "title"));
}

applySort();