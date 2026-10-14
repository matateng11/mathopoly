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

const STARTING_MONEY = 1000;
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
  { name: "Kelas Aljabar", type: "property", price: 90, rent: 20 },
  { name: "Dana Beasiswa", type: "community", info: "Ambil kartu" },
  { name: "Ruang Aritmetika", type: "property", price: 90, rent: 30 },
  { name: "Pajak Praktikum", type: "tax", amount: 200 },
  { name: "Stasiun Ilmu", type: "railroad", price: 200, rent: 50 },
  { name: "Kelas Geometri", type: "property", price: 100, rent: 50 },
  { name: "Kartu Tantangan", type: "chance", info: "Ambil kartu" },
  { name: "Laboratorium Sains", type: "property", price: 100, rent: 40 },
  { name: "Perpustakaan Dasar", type: "property", price: 120, rent: 40 },

  { name: "Ruang Disiplin", type: "jail", info: "Hanya berkunjung" },
  { name: "Kelas Trigonometri", type: "property", price: 200, rent: 30 },
  { name: "Pembangkit Listrik Kampus", type: "utility", price: 150, rent: 0 },
  { name: "Ruang Kalkulus", type: "property", price: 200, rent: 50 },
  { name: "Laboratorium Komputer", type: "property", price: 180, rent: 30 },
  { name: "Stasiun Pengetahuan", type: "railroad", price: 200, rent: 40 },
  { name: "Kelas Statistika", type: "property", price: 180, rent: 50 },
  { name: "Dana Beasiswa", type: "community", info: "Ambil kartu" },
  { name: "Ruang Persamaan", type: "property", price: 180, rent: 40 },
  { name: "Perpustakaan Matematika", type: "property", price: 200, rent: 40 },

  { name: "Waktu Istirahat", type: "free", info: "Istirahat" },
  { name: "Kelas Matematika Diskrit", type: "property", price: 220, rent: 70 },
  { name: "Kartu Tantangan", type: "chance", info: "Ambil kartu" },
  { name: "Laboratorium Robotika", type: "property", price: 220, rent: 75 },
  { name: "Ruang Teori Bilangan", type: "property", price: 240, rent: 65 },
  { name: "Stasiun Akademik", type: "railroad", price: 200, rent: 40 },
  { name: "Kelas Aljabar Linear", type: "property", price: 260, rent: 55 },
  { name: "Pusat Riset Matematika", type: "property", price: 260, rent: 30 },
  { name: "Instalasi Air Kampus", type: "utility", price: 150, rent: 0 },
  { name: "Laboratorium Fisika", type: "property", price: 280, rent: 30 },

  { name: "Ruang Kepala Sekolah", type: "goToJail", info: "Ke Ruang Disiplin" },
  { name: "Kelas Persamaan Diferensial", type: "property", price: 300, rent: 50 },
  { name: "Observatorium Sains", type: "property", price: 300, rent: 45 },
  { name: "Dana Beasiswa", type: "community", info: "Ambil kartu" },
  { name: "Pusat Olimpiade Matematika", type: "property", price: 320, rent: 55 },
  { name: "Stasiun Riset", type: "railroad", price: 200, rent: 40 },
  { name: "Kartu Tantangan", type: "chance", info: "Ambil kartu" },
  { name: "Akademi Matematika", type: "property", price: 350, rent: 60 },
  { name: "Biaya Ujian", type: "tax", amount: 100 },
  { name: "Universitas Matematika", type: "property", price: 400, rent: 100 }
];

const challengeQuestionBank = [
  { //1
    question: "Hasil penyederhanaan dari 5x + 3x - 2x + 4 = ...",
    options: ["6x + 4", "10x + 4", "6x - 4", "8x + 4"],
    answer: 0
  },
  { //2
    question: "Hasil penyederhanaan dari 4a + 3b - 2a + 5b = ...",
    options: ["2a + 8b", "6a + 2b", "2a + 2b", "6a + 8b"],
    answer: 0
  },
  { //3
    question: "Hasil dari 3(2x + 4) - 2x adalah",
    options: ["6x + 12", "4x + 12", "4x + 4", "8x + 13"],
    answer: 1
  },
  { //4
    question: "Hasil dari (5x + 7) - (2x - 3) adalah",
    options: ["3x + 4", "7x + 10", "3x + 10", "3x - 10"],
    answer: 2
  },
  { //5
    question: "Hasil dari 2x(3x + 4) adalah",
    options: ["6x² + 8x", "6x + 8", "5x² + 4x", "6x² + 4x"],
    answer: 0
  },
  { //6
    question: "Hasil dari 12x² : 3x adalah",
    options: ["4x²", "4x", "9x", "4x"],
    answer: 1
  },
  { //7
    question: "Nilai x yang memenuhi 4x + 7 = 23 adalah",
    options: ["3", "5", "4", "6"],
    answer: 2
  },
  {//8
    question: "Nilai x yang memenuhi 3(x - 2) = 15 adalah",
    options: ["3", "5", "9", "7"],
    answer: 3
  },
  {//9
    question: "tentukan x dari 5x + 4 = 2x + 16",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {//10
    question: "tentukan x dari persamaan x² + 5x + 6 = 0",
    options: ["x = -2 atau x = -3", "x = 2 atau x = 3", "x = -1 atau x = -6", "x = 1 atau x = 6"],
    answer: 0
  },
  {//11
    question: "Hasil penyederhanaan dari 6x - 3 + 2x + 7 adalah",
    options: ["8x + 4", "8x - 4", "4x + 8", "8x + 10"],
    answer: 0
  },
  {//12
    question: "Hasil dari 2(3a - 4) + 5a adalah",
    options: ["11a - 8", "6a - 8", "11a + 8", "6a + 8"],
    answer: 0
  },
  {//13
      question: "tentukan x dari 3x - 5 = 16",
      options: ["5","6","7","8"],
      answer: 2
  },
   {//14
      question: "Tentukan persamaan dari (x + 3) (x + 2)",
      options: ["x² + 5x + 6","x² + 6x + 5","x² + 5x + 5","x² + 5"],
      answer: 0
  },
  {//15
      question: "tentukan x dari persamaan x² - 7x + 12 = 0",
      options: ["x = 2 atau x = 6","x = 3 atau x = 4","x = -3 atau x = -4","x = 7 atau x = 12"],
      answer: 1
  },
  {//1
    question: "Jika f(x) = 3x - 5, berapakah rumus fungsi inversnya f⁻¹(x)?",
    options: ["3x + 5", "3/(x + 5)", "(x - 5)/3", "(x + 5)/3"],
    answer: 3
  },
  {//2
    question: "Berapakah hasil penyederhanaan bentuk eksponen 2³ · 2⁴?",
    options: ["2⁷", "9⁷", "4¹²", "2¹²"],
    answer: 0
  },
  {//3
    question: "Berapakah hasil dari bentuk perpangkatan 5⁶ / 5⁴?",
    options: ["125", "2", "5", "25"],
    answer: 3
  },
  {//4
    question: "Jika diketahui 2x + y = 7 dan x = 2, berapakah nilai y?",
    options: ["7", "3", "-3", "5"],
    answer: 1
  },
  {//5
    question: "Berapakah hasil pemfaktoran bentuk aljabar kuadrat x² - 9?",
    options: ["(x + 3)(x + 3)", "(x - 9)(x + 1)", "(x - 3)(x + 3)", "(x - 3)(x - 3)"],
    answer: 2
  },
  {//6
    question: "Jika diketahui f(x) = x² - 2x, berapakah nilai fungsi untuk f(-3)?",
    options: ["3", "15", "-3", "11"],
    answer: 1
  },
  {//7
    question: "Berapakah hasil pemfaktoran dari bentuk kuadrat x² - 5x + 6?",
    options: ["(x + 1)(x + 6)", "(x - 1)(x - 6)", "(x - 2)(x - 3)", "(x + 2)(x + 3)"],
    answer: 2
  },
  {//8
    question: "Jika akar-akar persamaan kuadrat x² - 5x + 6 = 0 adalah x₁ dan x₂, berapakah hasil penjumlahan akar-akarnya?",
    options: ["5", "-5", "6", "-6"],
    answer: 0
  },
  {//9
    question: "Jika akar-akar persamaan kuadrat x² - 7x + 12 = 0 adalah x₁ dan x₂, berapakah hasil kali akar-akarnya?",
    options: ["-7", "7", "-12", "12"],
    answer: 3
  },
  {//10
    question: "Hasil dari penjumlahan bentuk aljabar (2x + 3) + (x + 1) adalah",
    options: ["3x + 3", "4x + 3", "3x + 4", "2x + 4"],
    answer: 2
  },
  {//11
    question: "Penyelesaian dari persamaan linier satu variabel x + 7 = 12 adalah",
    options: ["x = 2", "x = 19", "x = 6", "x = 5"],
    answer: 3
  },
  {//12
    question: "Berapakah hasil penyederhanaan bentuk eksponen 3² · 3³?",
    options: ["9⁵", "3⁵", "3⁶", "9⁵"],
    answer: 1
  },
  {//13
    question: "Berapakah nilai dari bentuk perpangkatan (3²)²?",
    options: ["27", "18", "9", "81"],
    answer: 3
  },
  {//14
    question: "Berapakah nilai dari 7⁰?",
    options: ["0", "7", "-1", "1"],
    answer: 3
  },
  {//15
    question: "Berapakah bentuk sederhana dari 2⁻³?",
    options: ["-1/8", "1/8", "-8", "8"],
    answer: 1
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
  { text: "Mendapat hadiah dari alumni. Terima $80.", amount: 80 },

  { text: "Membantu guru menyiapkan kelas. Terima uang saku $30.", amount: 30 },
  { text: "Mendapat penghargaan sebagai siswa teladan. Terima $120!", amount: 120 },
  { text: "Menjual hasil karya di bazar sekolah. Terima $60.", amount: 60 },
  { text: "Mendapat uang dari keluarga untuk membeli buku. Terima $70.", amount: 70 },
  { text: "Menang kuis pengetahuan umum. Terima hadiah $45.", amount: 45 },
  { text: "Mendapat bonus karena rajin membantu perpustakaan. Terima $55.", amount: 55 },
  { text: "Mendapat hadiah ulang tahun dari teman-teman. Terima $100!", amount: 100 },
  { text: "Memenangkan lomba karya ilmiah. Terima hadiah $175!", amount: 175 },
  { text: "Mendapat uang saku tambahan. Terima $25.", amount: 25 },
  { text: "Menemukan uang di tas lama. Terima $20.", amount: 20 },
  { text: "Mendapat penghargaan atas proyek kelompok. Terima $85.", amount: 85 },
  { text: "Menjadi tutor teman sekelas. Terima upah $65.", amount: 65 },
  { text: "Mendapat bantuan dana kegiatan sekolah. Terima $130!", amount: 130 },
  { text: "Mendapat hadiah karena membaca banyak buku. Terima $40.", amount: 40 },
  { text: "Menang lomba cerdas cermat. Terima hadiah $150!", amount: 150 },
  { text: "Mendapat uang dari menjual kerajinan tangan. Terima $90.", amount: 90 },
  { text: "Mendapat bonus karena hadir tepat waktu. Terima $35.", amount: 35 },
  { text: "Menerima hadiah dari kakak kelas. Terima $50.", amount: 50 },
  { text: "Mendapat penghargaan sebagai anggota klub terbaik. Terima $110!", amount: 110 },

  { text: "Buku pelajaran hilang. Beli pengganti seharga $45.", amount: -45 },
  { text: "Terlambat mengembalikan buku perpustakaan. Bayar denda $20.", amount: -20 },
  { text: "Bayar biaya pendaftaran lomba sekolah $35.", amount: -35 },
  { text: "Peralatan praktikum rusak. Bayar ganti rugi $80.", amount: -80 },
  { text: "Bayar biaya fotokopi materi pelajaran $15.", amount: -15 },
  { text: "Seragammu perlu diperbaiki. Bayar $30.", amount: -30 },
  { text: "Bayar biaya perjalanan untuk kegiatan sekolah $60.", amount: -60 },
  { text: "Kehilangan alat tulis. Beli pengganti seharga $25.", amount: -25 },
  { text: "Bayar iuran klub sekolah $40.", amount: -40 },
  { text: "Membeli buku latihan tambahan. Bayar $55.", amount: -55 },
  { text: "Bayar biaya pemeliharaan komputer sekolah $70.", amount: -70 },
  { text: "Membayar biaya kegiatan kelas $50.", amount: -50 },
  { text: "Kartu pelajar hilang. Bayar biaya penggantian $20.", amount: -20 },
  { text: "Bayar biaya bahan untuk proyek sains $65.", amount: -65 },
  { text: "Sepatumu rusak. Bayar biaya perbaikan $45.", amount: -45 },
  { text: "Bayar denda karena terlambat mengumpulkan tugas $30.", amount: -30 },
  { text: "Membeli kalkulator baru untuk pelajaran matematika. Bayar $100.", amount: -100 },
  { text: "Bayar biaya makan saat kegiatan sekolah $25.", amount: -25 },
  { text: "Membantu memperbaiki papan kelas. Bayar biaya bahan $35.", amount: -35 },
  { text: "Bayar biaya kebersihan kelas $15.", amount: -15 }
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
    const tileClass = tile.type === "free" ? " rest-tile" : "";

    return `
      <div class="tile${tileClass} ${players[currentPlayer].position === index ? "current" : ""}"
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
  if (index <= 10) {
    return { gridColumn: 11 - index, gridRow: 11 };
  }

  if (index <= 20) {
    return { gridColumn: 1, gridRow: 21 - index };
  }

  if (index <= 30) {
    return { gridColumn: index - 19, gridRow: 1 };
  }

  return { gridColumn: 11, gridRow: index - 29 };
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
    `Soal ${challengeQuestionIndex + 1} dari ${CHALLENGE_QUESTION_COUNT}`;
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
