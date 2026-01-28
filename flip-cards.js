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
// -----------------------------
// VALIDACIÓN EMAIL
// -----------------------------
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// -----------------------------
// ENVÍO MAIL (POPUP WIN)
// -----------------------------
  document.getElementById("claimBtn").addEventListener("click", () => {
    const email = document.getElementById("emailInput").value.trim();
    const msg = document.getElementById("msg");

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
    msg.textContent = "Ingresá un mail válido";
    return;
  }

  enviarMailYPuntos(email);

  msg.textContent = "Te estamos acreditando tus puntos 💙";
});

  }

  fetch("https://script.google.com/macros/s/AKfycbwX284vtN4pjx11yuqqPvLDKmzSisi9bSoF6VQ60LDaOS684NzGiNdjbfSpRpjzXw0mEw/exec", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: email,
    points: 100,
    campaign: "Memotest SVFarma"
  })
});

    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(() => {
    document.getElementById("claimMsg").style.display = "block";
    emailInput.disabled = true;
    document.getElementById("claimBtn").disabled = true;
  })
  .catch(() => {
    alert("Error al enviar, intentá nuevamente");
  });
});

function enviarMailYPuntos(email) {
  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      puntos: 100,
      fecha: new Date().toISOString()
    })
  });
}








