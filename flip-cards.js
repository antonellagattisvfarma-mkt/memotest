console.log("JS cargado OK");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwX284vtN4pjx11yuqqPvLDKmzSisi9bSoF6VQ60LDaOS684NzGiNdjbfSpRpjzXw0mEw/exec";

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

  const cards = [...baseCards, ...baseCards].sort(() => 0.5 - Math.random());
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

      if (opened[0].dataset.id === opened[1].dataset.id) {
        opened.forEach(c => c.classList.add("matched"));
        pairs++;
        opened = [];
        lock = false;

        if (pairs === 8) {
          document.getElementById("winModal").classList.add("show");
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

  // BOTÓN RECLAMAR
  document.getElementById("claimBtn").addEventListener("click", () => {
    const emailInput = document.getElementById("claimEmail");
    const msg = document.getElementById("claimMsg");
    const email = emailInput.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = "Ingresá un email válido";
      return;
    }

    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        points: 100,
        campaign: "Memotest SVFarma"
      })
    })
    .then(() => {
      msg.textContent = "Puntos acreditados 🎉";
      emailInput.disabled = true;
    })
    .catch(() => {
      msg.textContent = "Error al enviar";
    });
  });

});





