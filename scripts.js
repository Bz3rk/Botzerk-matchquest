const cardArray = [
  {
    name: "css",
    img: "img/css.png",
  },
  {
    name: "html",
    img: "img/html.png",
  },
  {
    name: "javascript",
    img: "img/javascript.png",
  },
  {
    name: "python",
    img: "img/python.png",
  },
  {
    name: "react",
    img: "img/react.png",
  },
  {
    name: "spanner",
    img: "img/spanner.png",
  },
  {
    name: "css",
    img: "img/css.png",
  },
  {
    name: "html",
    img: "img/html.png",
  },
  {
    name: "javascript",
    img: "img/javascript.png",
  },
  {
    name: "python",
    img: "img/python.png",
  },
  {
    name: "react",
    img: "img/react.png",
  },
  {
    name: "spanner",
    img: "img/spanner.png",
  },
];
cardArray.sort(() => Math.random() - 0.5);

const cardContainer = document.querySelector(".cards");
const score = document.querySelector("#score");
const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#startButton");
let time = 60;

let cardChoosenId = [];
let cardsChoosen = [];
let cardsWon = [];

function createCards() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "img/blank.png");
    card.classList.add("card");
    card.setAttribute("alt", `Card ${i + 1}`);
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    cardContainer.appendChild(card);
  }
}

startBtn.addEventListener("click", () => {
  function countDown() {
    startBtn.remove();
    time--;
    timer.textContent = time;
    if (time == 0) {
      clearInterval(count);
      const allCards = document.querySelectorAll(".card");
      allCards.forEach((card) => card.removeEventListener("click", flipCard));
    }
  }

  createCards();
  let count = setInterval(countDown, 1000);
});

function flipCard() {
  const cardChoosenIds = this.getAttribute("data-id");

  this.setAttribute("src", cardArray[cardChoosenIds].img);
  const cardChoosen = cardArray[cardChoosenIds].name;

  cardChoosenId.push(cardChoosenIds);
  cardsChoosen.push(cardChoosen);

  if (cardsChoosen.length == 2) {
    setTimeout(checkMatch, 500);
  }
}

function showPopup() {
  const overlay = document.getElementById("popup1");
  overlay.style.visibility = "visible";
  overlay.style.opacity = "1";
}

function closePopup() {
  const overlay = document.getElementById("popup1");
  overlay.style.visibility = "hidden";
  overlay.style.opacity = "0";
}

function checkMatch() {
  const cards = document.querySelectorAll("img");
  const c1 = cards[cardChoosenId[0]];
  const c2 = cards[cardChoosenId[1]];
  if (c1 == c2) {
    cardChoosenId = [];
    cardsChoosen = [];
    c1.setAttribute("src", "img/blank.png");
    return;
  }

  if (cardsChoosen[0] == cardsChoosen[1]) {
    c1.setAttribute("src", "img/white.png");
    c2.setAttribute("src", "img/white.png");
    c1.removeEventListener("click", flipCard);
    c2.removeEventListener("click", flipCard);
    cardsWon.push(cardsChoosen);
  } else {
    c1.setAttribute("src", "img/blank.png");
    c2.setAttribute("src", "img/blank.png");
  }
  cardChoosenId = [];
  cardsChoosen = [];
  if (cardsWon.length == cardArray.length / 2) {
    showPopup();
    time = 1;
  }

  score.textContent = cardsWon.length;
}
