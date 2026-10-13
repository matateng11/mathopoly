"use strict";

const playerCountEl = document.getElementById("playerCount");
const playerNamesEl = document.getElementById("playerNames");
const playerSetupEl = document.querySelector(".player-setup");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

const boardEl = document.getElementById("board");
const playersEl = document.getElementById("players");
const statusEl = document.getElementById("status");
const rollButton = document.getElementById("rollButton");
const diceIconEl = document.getElementById("diceIcon");
const diceResultEl = document.getElementById("diceResult");

const questionForm = document.getElementById("questionForm");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");

const communityPopup = document.getElementById("communityPopup");
const communityTitle = document.getElementById("communityTitle");
const communityDescription = document.getElementById("communityDescription");
const communityOk = document.getElementById("communityOk");

const challengePopup = document.getElementById("challengePopup");
const challengeProgress = document.getElementById("challengeProgress");
const challengeQuestionEl = document.getElementById("challengeQuestion");
const challengeOptionsEl = document.getElementById("challengeOptions");
const challengeFeedback = document.getElementById("challengeFeedback");

const playerIcons = ["🔵", "🔴", "🟢", "🟡", "🟣", "🟠", "⚫", "⚪"];
const playerColors = [
  "#3498db", "#e74c3c", "#2ecc71", "#f1c40f",
  "#9b59b6", "#e67e22", "#34495e", "#95a5a6"
];

const STARTING_MONEY = 1500;
const STEP_DELAY = 350;
const CHALLENGE_REWARD = 50;
const CHALLENGE_PENALTY = 75;
const CHALLENGE_QUESTION_COUNT = 3;

const diceIcons = [
  "fa-dice-one",
  "fa-dice-two",
  "fa-dice-three",
  "fa-dice-four",
  "fa-dice-five",
  "fa-dice-six"
];

const tiles = [
  { name: "Mulai Belajar", type: "start", info: "Lewat: +$200" },
  { name: "Kelas Aljabar", type: "property", price: 60, rent: 2 },
  { name: "Dana Beasiswa", type: "community", info: "Ambil kartu" },
  { name: "Ruang Aritmetika", type: "property", price: 60, rent: 4 },
  { name: "Pajak Praktikum", type: "tax", amount: 200 },
  { name: "Stasiun Ilmu", type: "railroad", price: 200, rent: 25 },
  { name: "Kelas Geometri", type: "property", price: 100, rent: 6 },
  { name: "Kartu Tantangan", type: "chance", info: "Ambil kartu" },
  { name: "Laboratorium Sains", type: "property", price: 100, rent: 6 },
  { name: "Perpustakaan Dasar", type: "property", price: 120, rent: 8 },

  { name: "Ruang Disiplin", type: "jail", info: "Hanya berkunjung" },
  { name: "Kelas Trigonometri", type: "property", price: 140, rent: 10 },
  { name: "Pembangkit Listrik Kampus", type: "utility", price: 150, rent: 0 },
  { name: "Ruang Kalkulus", type: "property", price: 140, rent: 10 },
  { name: "Laboratorium Komputer", type: "property", price: 160, rent: 12 },
  { name: "Stasiun Pengetahuan", type: "railroad", price: 200, rent: 25 },
  { name: "Kelas Statistika", type: "property", price: 180, rent: 14 },
  { name: "Dana Beasiswa", type: "community", info: "Ambil kartu" },
  { name: "Ruang Persamaan", type: "property", price: 180, rent: 14 },
  { name: "Perpustakaan Matematika", type: "property", price: 200, rent: 16 },

  { name: "Waktu Istirahat", type: "free", info: "Istirahat" },
  { name: "Kelas Matematika Diskrit", type: "property", price: 220, rent: 18 },
  { name: "Kartu Tantangan", type: "chance", info: "Ambil kartu" },
  { name: "Laboratorium Robotika", type: "property", price: 220, rent: 18 },
  { name: "Ruang Teori Bilangan", type: "property", price: 240, rent: 20 },
  { name: "Stasiun Akademik", type: "railroad", price: 200, rent: 25 },
  { name: "Kelas Aljabar Linear", type: "property", price: 260, rent: 22 },
  { name: "Pusat Riset Matematika", type: "property", price: 260, rent: 22 },
  { name: "Instalasi Air Kampus", type: "utility", price: 150, rent: 0 },
  { name: "Laboratorium Fisika", type: "property", price: 280, rent: 24 },

  { name: "Ruang Kepala Sekolah", type: "goToJail", info: "Ke Ruang Disiplin" },
  { name: "Kelas Persamaan Diferensial", type: "property", price: 300, rent: 26 },
  { name: "Observatorium Sains", type: "property", price: 300, rent: 26 },
  { name: "Dana Beasiswa", type: "community", info: "Ambil kartu" },
  { name: "Pusat Olimpiade Matematika", type: "property", price: 320, rent: 28 },
  { name: "Stasiun Riset", type: "railroad", price: 200, rent: 25 },
  { name: "Kartu Tantangan", type: "chance", info: "Ambil kartu" },
  { name: "Akademi Matematika", type: "property", price: 350, rent: 35 },
  { name: "Biaya Ujian", type: "tax", amount: 100 },
  { name: "Universitas Matematika", type: "property", price: 400, rent: 50 }
];

const challengeQuestionBank = [
  {
    topic: "Negasi",
    question: "Jika p adalah “Hari ini hujan”, apa negasi dari p?",
    options: ["Hari ini tidak hujan", "Besok hujan", "Hari ini cerah dan hujan", "Hari ini mungkin hujan"],
    answer: 0
  },
  {
    topic: "Konjungsi",
    question: "Konjungsi p ∧ q bernilai benar jika...",
    options: ["p dan q keduanya benar", "p atau q benar", "p salah dan q benar", "p dan q keduanya salah"],
    answer: 0
  },
  {
    topic: "Disjungsi",
    question: "Disjungsi p ∨ q bernilai salah jika...",
    options: ["p dan q keduanya salah", "p dan q keduanya benar", "p benar saja", "q benar saja"],
    answer: 0
  },
  {
    topic: "Implikasi",
    question: "Pernyataan p → q bernilai salah ketika...",
    options: ["p benar dan q salah", "p salah dan q benar", "p dan q benar", "p dan q salah"],
    answer: 0
  },
  {
    topic: "Biimplikasi",
    question: "Pernyataan p ↔ q bernilai benar ketika...",
    options: ["Nilai kebenaran p dan q sama", "p selalu benar", "q selalu salah", "Nilai kebenaran p dan q berbeda"],
    answer: 0
  },
  {
    topic: "Limit aljabar",
    question: "Nilai lim x→2 (x + 3) adalah...",
    options: ["5", "3", "2", "6"],
    answer: 0
  },
  {
    topic: "Limit aljabar",
    question: "Nilai lim x→3 (x² − 9)/(x − 3) adalah...",
    options: ["6", "3", "9", "0"],
    answer: 0
  },
  {
    topic: "Matematika dasar",
    question: "Hasil dari ¾ + ½ adalah...",
    options: ["1¼", "1", "¾", "1½"],
    answer: 0
  },
  {
    topic: "Matematika dasar",
    question: "Jika 3x + 5 = 20, nilai x adalah...",
    options: ["5", "3", "8", "15"],
    answer: 0
  },
  {
    topic: "Matematika dasar",
    question: "FPB dari 18 dan 24 adalah...",
    options: ["6", "3", "8", "12"],
    answer: 0
  },
  {
    topic: "Geometri",
    question: "Berapa banyak garis melalui dua titik berbeda?",
    options: ["Tepat satu garis", "Dua garis", "Tidak ada garis", "Tak terhingga"],
    answer: 0
  },
  {
    topic: "Geometri",
    question: "Dua garis yang tidak pernah berpotongan disebut...",
    options: ["Garis sejajar", "Garis tegak lurus", "Garis berpotongan", "Garis lengkung"],
    answer: 0
  }
];

const communityCards = [
  { text: "Kamu mendapat beasiswa. Terima $100!", amount: 100 },
  { text: "Nilaimu sempurna! Terima hadiah $50.", amount: 50 },
  { text: "Menang lomba matematika! Terima $75.", amount: 75 },
  { text: "Mendapat hadiah dari sekolah. Terima $150!", amount: 150 },
  { text: "Menjual buku pelajaran bekas. Terima $40.", amount: 40 },
  { text: "Menjadi juara olimpiade sekolah. Terima $200!", amount: 200 },
  { text: "Bayar biaya buku dan alat tulis $40.", amount: -40 },
  { text: "Bayar iuran kegiatan sekolah $25.", amount: -25 },
  { text: "Bayar biaya laboratorium $50.", amount: -50 },
  { text: "Laptop sekolah rusak. Bayar biaya perbaikan $100.", amount: -100 },
  { text: "Bayar biaya kursus tambahan $90.", amount: -90 },
  { text: "Mendapat hadiah dari alumni. Terima $80.", amount: 80 }
];

let players = [];
let currentPlayer = 0;
let pendingPurchase = null;
let gameOver = false;
let isMoving = false;
let challengeQuestions = [];
let challengeQuestionIndex = 0;
let challengePlayerIndex = null;
let challengeAnswered = false;
let actionTimer = null;

function renderPlayerNameInputs() {
  const count = Number(playerCountEl.value);

  playerNamesEl.innerHTML = Array.from({ length: count }, (_, index) => `
    <div class="player-name-field">
      <label for="playerName${index}">Nama Pemain ${index + 1}</label>
      <input
        id="playerName${index}"
        type="text"
        maxlength="20"
        value="Pemain ${index + 1}"
        placeholder="Pemain ${index + 1}"
      />
    </div>
  `).join("");
}

function newGame() {
  clearTimeout(actionTimer);

  const count = Number(playerCountEl.value);

  players = Array.from({ length: count }, (_, index) => {
    const input = document.getElementById(`playerName${index}`);
    const name = input?.value.trim();

    return {
      name: name || `Pemain ${index + 1}`,
      icon: playerIcons[index],
      color: playerColors[index],
      position: 0,
      money: STARTING_MONEY
    };
  });

  tiles.forEach(tile => {
    tile.owner = null;
  });

  currentPlayer = 0;
  pendingPurchase = null;
  gameOver = false;
  isMoving = false;

  playerSetupEl.style.display = "none";
  questionForm.classList.remove("visible");
  communityPopup.style.display = "none";
  challengePopup.style.display = "none";

  diceIconEl.className = "fas fa-dice-one";
  diceResultEl.textContent = "—";
  rollButton.disabled = false;
  statusEl.textContent = `Giliran ${players[0].name}. Lempar dadu untuk mulai!`;

  render();
}

function render() {
  if (players.length === 0) return;

  boardEl.innerHTML = tiles.map((tile, index) => {
    const position = getBoardPosition(index);
    const occupants = players
      .filter(player => player.position === index)
      .map(player => `<span class="token" title="${escapeHtml(player.name)}">${player.icon}</span>`)
      .join("");

    let info = tile.info || "";

    if (["property", "railroad", "utility"].includes(tile.type)) {
      info = `Harga $${tile.price}${tile.rent ? ` · Sewa $${tile.rent}` : ""}`;
    } else if (tile.type === "tax") {
      info = `Bayar $${tile.amount}`;
    }

    const hasOwner = tile.owner !== null && tile.owner !== undefined;
    const ownerName = hasOwner ? escapeHtml(players[tile.owner].name) : "";
    const ownerMarkup = hasOwner
      ? `<div class="tile-owner">Milik ${ownerName}</div>`
      : "";
    const tileColor = hasOwner ? players[tile.owner].color : "";

    return `
      <div class="tile ${players[currentPlayer].position === index ? "current" : ""}"
        style="grid-column:${position.gridColumn}; grid-row:${position.gridRow}; ${tileColor ? `background-color:${tileColor};` : ""}">
        <div>
          <div class="tile-name">${escapeHtml(tile.name)}</div>
          <div class="tile-info">${escapeHtml(info)}</div>
        </div>
        <div>
          ${ownerMarkup}
          <div class="tokens">${occupants}</div>
        </div>
      </div>
    `;
  }).join("");

  playersEl.innerHTML = players.map((player, index) => `
    <div class="player-card ${index === currentPlayer ? "active" : ""}">
      <div class="player-top">
        <span>${player.icon} ${escapeHtml(player.name)}</span>
        <span>${player.money <= 0 ? "Bangkrut" : ""}</span>
      </div>
      <div class="player-money">Uang: $${player.money}</div>
    </div>
  `).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getBoardPosition(index) {
  if (index <= 10) return { gridColumn: 11 - index, gridRow: 10 };
  if (index <= 20) return { gridColumn: 1, gridRow: 20 - index };
  if (index <= 30) return { gridColumn: index - 19, gridRow: 1 };
  return { gridColumn: 10, gridRow: index - 29 };
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function movePlayer(player, steps) {
  for (let step = 0; step < steps; step++) {
    const oldPosition = player.position;
    player.position = (player.position + 1) % tiles.length;

    if (player.position === 0 && oldPosition !== 0) {
      player.money += 200;
      statusEl.textContent = `${player.name} melewati Mulai dan mendapat $200.`;
    } else {
      statusEl.textContent =
        `${player.name} bergerak ke ${tiles[player.position].name}.`;
    }

    render();
    await wait(STEP_DELAY);
  }
}

async function rollDice() {
  if (!players.length || gameOver || pendingPurchase || isMoving) return;

  isMoving = true;
  rollButton.disabled = true;

  const player = players[currentPlayer];
  const roll = Math.floor(Math.random() * 6) + 1;

  diceIconEl.className = `fas ${diceIcons[roll - 1]}`;
  diceResultEl.textContent = roll;
  statusEl.textContent = `${player.name} melempar dadu: ${roll}.`;

  await wait(300);
  await movePlayer(player, roll);

  const tile = tiles[player.position];
  let message = `${player.name} mendarat di ${tile.name}.`;

  if (["property", "railroad", "utility"].includes(tile.type)) {
    if (tile.owner === null || tile.owner === undefined) {
      isMoving = false;
      statusEl.textContent = message;
      askPurchaseQuestion(tile, player.position);
      return;
    }

    if (tile.owner !== currentPlayer) {
      const owner = players[tile.owner];
      const rent = tile.type === "utility"
        ? roll * 4
        : tile.rent;

      player.money -= rent;
      owner.money += rent;
      message += ` Membayar sewa $${rent} kepada ${owner.name}.`;
    } else {
      message += " Properti ini milikmu.";
    }
  } else if (tile.type === "community") {
    const card = drawCommunityCard(player);
    statusEl.textContent = `${message} ${card.text}`;
    render();
    showCommunityPopup(card);
    isMoving = false;
    return;
  } else if (tile.type === "chance") {
    statusEl.textContent = message;
    render();
    isMoving = false;
    startChallenge(player);
    return;
  } else if (tile.type === "tax") {
    player.money -= tile.amount;
    message += ` Membayar pajak $${tile.amount}.`;
  } else if (tile.type === "goToJail") {
    player.position = 10;
    message += " Langsung menuju Ruang Disiplin.";
  }

  statusEl.textContent = message;
  isMoving = false;
  finishTurn();
}

function askPurchaseQuestion(tile, tileIndex) {
  const a = Math.floor(Math.random() * 12) + 3;
  const b = Math.floor(Math.random() * 12) + 3;

  pendingPurchase = { tileIndex, answer: a * b };
  questionText.textContent =
    `Untuk membeli ${tile.name} seharga $${tile.price}, berapa ${a} × ${b}?`;

  questionForm.classList.add("visible");
  answerInput.value = "";
  answerInput.focus();
  rollButton.disabled = true;
}

function drawCommunityCard(player) {
  const card = communityCards[Math.floor(Math.random() * communityCards.length)];
  player.money += card.amount;
  return card;
}

function showCommunityPopup(card) {
  communityTitle.textContent = card.amount >= 0 ? "Kartu Hadiah!" : "Kartu Biaya";
  communityDescription.textContent = card.text;
  communityPopup.style.display = "flex";
}

function startChallenge(player) {
  challengePlayerIndex = players.indexOf(player);
  challengeQuestionIndex = 0;
  challengeAnswered = false;

  challengeQuestions = [...challengeQuestionBank]
    .sort(() => Math.random() - 0.5)
    .slice(0, CHALLENGE_QUESTION_COUNT);

  challengePopup.style.display = "flex";
  showChallengeQuestion();
}

function showChallengeQuestion() {
  const item = challengeQuestions[challengeQuestionIndex];

  challengeAnswered = false;
  challengeProgress.textContent =
    `Soal ${challengeQuestionIndex + 1} dari ${CHALLENGE_QUESTION_COUNT} · ${item.topic}`;
  challengeQuestionEl.textContent = item.question;
  challengeFeedback.textContent = "";
  challengeOptionsEl.innerHTML = "";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "challenge-option";
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.addEventListener("click", () => answerChallenge(index));
    challengeOptionsEl.appendChild(button);
  });
}

function answerChallenge(selectedIndex) {
  if (challengeAnswered) return;

  challengeAnswered = true;

  const item = challengeQuestions[challengeQuestionIndex];
  const player = players[challengePlayerIndex];

  challengeOptionsEl.querySelectorAll("button").forEach(button => {
    button.disabled = true;
  });

  if (selectedIndex === item.answer) {
    player.money += CHALLENGE_REWARD;
    challengeFeedback.textContent = `Benar! Kamu mendapat $${CHALLENGE_REWARD}.`;
    challengeFeedback.style.color = "green";
  } else {
    player.money -= CHALLENGE_PENALTY;
    challengeFeedback.textContent =
      `Salah. Jawaban benar: ${item.options[item.answer]}. Uang berkurang $${CHALLENGE_PENALTY}.`;
    challengeFeedback.style.color = "crimson";
  }

  render();

  actionTimer = setTimeout(() => {
    challengeQuestionIndex++;

    if (challengeQuestionIndex < CHALLENGE_QUESTION_COUNT) {
      showChallengeQuestion();
    } else {
      finishChallenge();
    }
  }, 1000);
}

function finishChallenge() {
  challengePopup.style.display = "none";
  statusEl.textContent += " Tantangan selesai.";
  finishTurn();
}

function finishTurn() {
  isMoving = false;

  const bankruptPlayer = players.find(player => player.money <= 0);

  if (bankruptPlayer) {
    gameOver = true;
    const winner = players.find(player => player !== bankruptPlayer);

    statusEl.textContent += winner
      ? ` ${bankruptPlayer.name} bangkrut. ${winner.name} menang!`
      : ` ${bankruptPlayer.name} bangkrut.`;

    rollButton.disabled = true;
  } else {
    currentPlayer = (currentPlayer + 1) % players.length;
    rollButton.disabled = false;
  }

  render();
}

playerCountEl.addEventListener("change", renderPlayerNameInputs);
startButton.addEventListener("click", newGame);
rollButton.addEventListener("click", rollDice);

resetButton.addEventListener("click", () => {
  clearTimeout(actionTimer);

  players = [];
  currentPlayer = 0;
  pendingPurchase = null;
  gameOver = false;
  isMoving = false;
  challengeQuestions = [];

  playerSetupEl.style.display = "";
  questionForm.classList.remove("visible");
  communityPopup.style.display = "none";
  challengePopup.style.display = "none";

  boardEl.innerHTML = "";
  playersEl.innerHTML = "";
  diceIconEl.className = "fas fa-dice-one";
  diceResultEl.textContent = "—";
  rollButton.disabled = true;
  statusEl.textContent = "Atur pemain, lalu tekan Mulai Permainan.";
});

communityOk.addEventListener("click", () => {
  communityPopup.style.display = "none";
  finishTurn();
});

questionForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!pendingPurchase) return;

  const answer = Number(answerInput.value);
  const tile = tiles[pendingPurchase.tileIndex];
  const player = players[currentPlayer];

  if (answer === pendingPurchase.answer) {
    if (player.money >= tile.price) {
      player.money -= tile.price;
      tile.owner = currentPlayer;
      statusEl.textContent =
        `Benar! ${player.name} membeli ${tile.name} seharga $${tile.price}.`;
    } else {
      statusEl.textContent =
        `Jawaban benar, tetapi uang ${player.name} tidak cukup untuk membeli ${tile.name}.`;
    }
  } else {
    statusEl.textContent =
      `Belum tepat. Jawaban yang benar adalah ${pendingPurchase.answer}.`;
  }

  pendingPurchase = null;
  questionForm.classList.remove("visible");
  finishTurn();
});

renderPlayerNameInputs();
