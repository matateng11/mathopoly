const startingMoney = 1500;

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

  { name: "Ruang Kepala Sekolah", type: "goToJail", info: "Langsung ke ruang disiplin" },
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

let players;
let currentPlayer;
let pendingPurchase = null;
let gameOver = false;

const boardEl = document.getElementById("board");
const playersEl = document.getElementById("players");
const statusEl = document.getElementById("status");
const rollButton = document.getElementById("rollButton");
const questionForm = document.getElementById("questionForm");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");

function newGame() {
  players = [
    { name: "Pemain 1", icon: "🔵", color: "#3498db",position: 0, money: startingMoney },
    { name: "Pemain 2", icon: "🔴", color: "#e74c3c", position: 0, money: startingMoney }
  ];

  tiles.forEach(tile => {
    tile.owner = null;
  });

  currentPlayer = 0;
  pendingPurchase = null;
  gameOver = false;

  questionForm.classList.remove("visible");
  rollButton.disabled = false;
  statusEl.textContent = "Giliran Pemain 1. Lempar dadu untuk mulai!";

  render();
}

function render() {
  boardEl.innerHTML = tiles.map((tile, index) => {
    const position = getBoardPosition(index);

    const occupants = players
      .filter(player => player.position === index)
      .map(player =>
        `<span class="token" title="${player.name}">${player.icon}</span>`
      )
      .join("");

    let info = tile.info || "";

    if (["property", "railroad", "utility"].includes(tile.type)) {
      info = `Harga $${tile.price}${tile.rent ? ` · Sewa $${tile.rent}` : ""}`;
    } else if (tile.type === "tax") {
      info = `Bayar $${tile.amount}`;
    }

    const owner = tile.owner !== null && tile.owner !== undefined
      ? `<div class="tile-owner">Milik ${players[tile.owner].name}</div>`
      : "";

    const tileColor = tile.owner !== null && tile.owner !== undefined
    ? players[tile.owner].color
    : "";

    return `
      <div class="tile ${players[currentPlayer].position === index ? "current" : ""}"
          style="
            grid-column:${position.gridColumn};
            grid-row:${position.gridRow};
            ${tileColor ? `background-color:${tileColor};` : ""}
          ">
        <div>
          <div class="tile-name">${tile.name}</div>
          <div class="tile-info">${info}</div>
        </div>
        <div>
          ${owner}
          <div class="tokens">${occupants}</div>
        </div>
      </div>
    `;
  }).join("");

  playersEl.innerHTML = players.map((player, index) => `
    <div class="player-card ${index === currentPlayer ? "active" : ""}">
      <div class="player-top">
        <span>${player.icon} ${player.name}</span>
        <span>${player.money <= 0 ? "Bangkrut" : ""}</span>
      </div>
      <div class="player-money">Uang: $${player.money}</div>
    </div>
  `).join("");
}
async function rollDice() {
  if (gameOver || pendingPurchase !== null) return;

  const player = players[currentPlayer];
  const roll = Math.floor(Math.random() * 6) + 1;
  const oldPosition = player.position;
  const newPosition = (oldPosition + roll) % tiles.length;


// Lanjutkan kode giliran berikutnya di bawah sini

  let message = "";

  if (oldPosition + roll >= tiles.length) {
    player.money += 200;
    message = `${player.name} mendapat $100 karena melewati Mulai. `;
  }

  player.position = newPosition;
  const tile = tiles[newPosition];

  message += `${player.name} melempar ${roll} dan mendarat di ${tile.name}.`;

    if (["property", "railroad", "utility"].includes(tile.type)) {
    if (tile.owner === null) {
      statusEl.textContent = message;
      askPurchaseQuestion(tile, newPosition);
      return;
    }

    if (tile.owner !== currentPlayer) {
      const owner = players[tile.owner];
      const rent = Math.min(tile.rent, player.money);

      player.money -= rent;
      owner.money += rent;
      message += ` Membayar sewa $${rent} kepada ${owner.name}.`;
    } else {
      message += " Properti ini milikmu.";
    }
  } else if (tile.type === "bonus") {
    const bonus = Math.floor(Math.random() * 81) + 20;
    player.money += bonus;
    message += ` Kamu mendapat bonus $${bonus}!`;
  } else if (tile.type === "community") {
    const card = drawCommunityCard(player);
    showCommunityPopup(card);
    message += ` ${card.text}`;
  } else if (tile.type === "tax") {
    const tax = Math.min(tile.amount, player.money);
    player.money -= tax;
    message += ` Kamu membayar pajak $${tax}.`;
  }

  statusEl.textContent = message;
  finishTurn();
}

function getBoardPosition(index) {
  if (index <= 10) {
    return { gridColumn: 10 - index + 1, gridRow: 10 };
  }
  if (index <= 20) {
    return { gridColumn: 1, gridRow: 10 - (index -10) };
  }
  if (index <= 30) {
    return { gridColumn: index - 20, gridRow: 1 };
  }
  return { gridColumn: 10, gridRow: index - 30 };
}

function askPurchaseQuestion(tile, tileIndex) {
  const a = Math.floor(Math.random() * 12) + 3;
  const b = Math.floor(Math.random() * 12) + 3;

  pendingPurchase = {
    tileIndex,
    answer: a * b
  };

  questionText.textContent =
    `Untuk membeli ${tile.name} seharga $${tile.price}: berapa ${a} × ${b}?`;

  questionForm.classList.add("visible");
  answerInput.value = "";
  answerInput.focus();
  rollButton.disabled = true;
}

function drawCommunityCard(player) {
  const cards = [
     // Kartu hadiah
    { text: "Kamu mendapat beasiswa. Terima $100!", amount: 100 },
    { text: "Nilaimu sempurna! Terima hadiah $50.", amount: 50 },
    { text: "Menang lomba matematika! Terima $75.", amount: 75 },
    { text: "Mendapat hadiah dari sekolah. Terima $150!", amount: 150 },
    { text: "Menjual buku pelajaran bekas. Terima $40.", amount: 40 },
    { text: "Membantu guru mengoreksi tugas. Terima $25.", amount: 25 },
    { text: "Mendapat uang saku tambahan. Terima $30.", amount: 30 },
    { text: "Memenangkan kuis kelas. Terima $60.", amount: 60 },
    { text: "Mendapat penghargaan akademik. Terima $120!", amount: 120 },
    { text: "Menemukan uang di perpustakaan. Terima $20.", amount: 20 },
    { text: "Menjadi juara olimpiade sekolah. Terima $200!", amount: 200 },
    { text: "Mendapat hadiah dari alumni. Terima $80.", amount: 80 },
    { text: "Membuat proyek sains terbaik. Terima $90.", amount: 90 },
    { text: "Mendapat uang dari pekerjaan paruh waktu. Terima $70.", amount: 70 },
    { text: "Memenangkan kompetisi membaca. Terima $55.", amount: 55 },
    { text: "Mendapat penghargaan kehadiran. Terima $35.", amount: 35 },
    { text: "Menjual hasil karya seni. Terima $65.", amount: 65 },
    { text: "Membantu mengatur acara sekolah. Terima $45.", amount: 45 },
    { text: "Mendapat hadiah ulang tahun. Terima $100!", amount: 100 },
    { text: "Memenangkan turnamen catur. Terima $85.", amount: 85 },
    { text: "Mendapat bantuan dana pendidikan. Terima $175!", amount: 175 },
    { text: "Berhasil menyelesaikan tantangan akademik. Terima $110!", amount: 110 },
    { text: "Mendapat hadiah dari pameran sains. Terima $130!", amount: 130 },
    { text: "Menjadi tutor teman sekelas. Terima $40.", amount: 40 },
    { text: "Mendapat bonus karena rajin belajar. Terima $50.", amount: 50 },

    // Kartu biaya
    { text: "Bayar biaya buku dan alat tulis $40.", amount: -40 },
    { text: "Bayar iuran kegiatan sekolah $25.", amount: -25 },
    { text: "Buku pelajaran rusak. Bayar denda $30.", amount: -30 },
    { text: "Bayar biaya laboratorium $50.", amount: -50 },
    { text: "Terlambat mengembalikan buku. Bayar denda $20.", amount: -20 },
    { text: "Bantu biaya acara sekolah. Bayar $35.", amount: -35 },
    { text: "Perlengkapan sekolah hilang. Bayar $45.", amount: -45 },
    { text: "Bayar biaya ujian tambahan $60.", amount: -60 },
    { text: "Perbaiki alat praktikum. Bayar $70.", amount: -70 },
    { text: "Bayar sumbangan untuk perpustakaan $15.", amount: -15 },
    { text: "Kamu harus membeli buku baru. Bayar $80.", amount: -80 },
    { text: "Bayar biaya perjalanan studi $55.", amount: -55 },
    { text: "Laptop sekolah rusak. Bayar biaya perbaikan $100.", amount: -100 },
    { text: "Bayar biaya pendaftaran lomba $30.", amount: -30 },
    { text: "Kehilangan kartu pelajar. Bayar penggantian $20.", amount: -20 },
    { text: "Bayar biaya kegiatan olahraga $40.", amount: -40 },
    { text: "Seragammu perlu diperbaiki. Bayar $25.", amount: -25 },
    { text: "Bayar biaya cetak tugas dan proyek $15.", amount: -15 },
    { text: "Kamu merusakkan kursi kelas. Bayar denda $50.", amount: -50 },
    { text: "Bayar biaya kursus tambahan $90.", amount: -90 },
    { text: "Kalkulatormu rusak. Beli pengganti seharga $35.", amount: -35 },
    { text: "Bayar iuran klub matematika $20.", amount: -20 },
    { text: "Kamu lupa membawa perlengkapan praktikum. Bayar $30.", amount: -30 },
    { text: "Bayar biaya perbaikan perpustakaan $65.", amount: -65 },
    { text: "Bantu teman membeli perlengkapan sekolah. Bayar $45.", amount: -45 }
  ];

  const card = cards[Math.floor(Math.random() * cards.length)];
  player.money += card.amount;

  return card;
}

function showCommunityPopup(card) {
  const overlay = document.getElementById("communityPopup");

  document.getElementById("communityTitle").textContent =
    card.amount >= 0 ? "Kartu Hadiah!" : "Kartu Biaya";
  document.getElementById("communityDescription").textContent = card.text;

  overlay.style.display = "flex";
}

  document.getElementById("communityOk").addEventListener("click", () => {
  document.getElementById("communityPopup").style.display = "none";
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
      `Belum tepat! Jawabannya ${pendingPurchase.answer}. Properti tidak dibeli.`;
  }

  pendingPurchase = null;
  questionForm.classList.remove("visible");
  finishTurn();
});

function finishTurn() {
  const bankruptPlayer = players.find(player => player.money <= 0);

  if (bankruptPlayer) {
    gameOver = true;
    const winner = players.find(player => player !== bankruptPlayer);

    statusEl.textContent +=
      ` ${bankruptPlayer.name} kehabisan uang. ${winner.name} menang!`;

    rollButton.disabled = true;
  } else {
    currentPlayer = (currentPlayer + 1) % players.length;
    rollButton.disabled = false;
  }

  render();
}

rollButton.addEventListener("click", rollDice);
document.getElementById("resetButton").addEventListener("click", newGame);

newGame();