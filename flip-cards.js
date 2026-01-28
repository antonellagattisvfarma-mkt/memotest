console.log("JS cargado OK");

document.addEventListener("DOMContentLoaded", () => {

  const BACK_IMAGE = "memocard-0.png";

  const baseCards = [
  { id: 1, img: "memocard-1.png" },
  { id: 2, img: "memocard-2.png" },
  { id: 3, img: "memocard-3.png" },
  { id: 4, img: "memocard-4.png" },
  { id: 5, img: "memocard-5.png" },
  { id: 6, img: "memocard-6.png" },
  { id: 7, img: "memocard-7.png" },
  { id: 8, img: "memocard-8.png" }
  ];

  let cards = [...baseCards, ...baseCards].sort(() => 0.5 - Math.random());

  const parent = document.querySelector(".parent");

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "child";
    div.dataset.id = card.id;

    div.innerHTML = `
      <img class="front" src="${BACK_IMAGE}">
      <img class="back" src="${card.img}" style="display:none">
    `;

    parent.appendChild(div);
  });

  let opened = [];
  let lock = false;
  let moves = 0;
  let pairs = 0;

  parent.addEventListener("click", (e) => {
    const card = e.target.closest(".child");
    if (!card || lock || card.classList.contains("open") || card.classList.contains("matched")) return;

    card.classList.add("open");
    card.querySelector(".front").style.display = "none";
    card.querySelector(".back").style.display = "block";

    opened.push(card);

    if (opened.length === 2) {
      lock = true;
      moves++;
      document.querySelector(".moveCount").textContent = moves;

      if (opened[0].dataset.id === opened[1].dataset.id) {
        opened.forEach(c => c.classList.add("matched"));
        pairs++;
        document.querySelector(".pairCount").textContent = pairs;
        opened = [];
        lock = false;

        if (pairs === 8) {
          setTimeout(() => {
            document.getElementById("winModal").classList.add("show");
          }, 400);
        }

      } else {
        setTimeout(() => {
          opened.forEach(c => {
            c.classList.remove("open");
            c.querySelector(".front").style.display = "block";
            c.querySelector(".back").style.display = "none";
          });
          opened = [];
          lock = false;
        }, 700);
      }
    }
  });

});





