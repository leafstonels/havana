//const savedOn = localStorage.getItem("onStage");
// savedOff = localStorage.getItem("offStage");

//if (savedOn) onStagePrograms = JSON.parse(savedOn);
//if (savedOff) offStagePrograms = JSON.parse(savedOff);

async function loadData() {
  const res = await fetch("js/data.js?v=" + Date.now());
  const text = await res.text();
  eval(text); // loads teams, onStagePrograms, offStagePrograms
}

let isAdminOpen = false;


const individualScores = {};

function getProgramsForPage() {
  const isOnStage = document.title.includes("On Stage");
  return isOnStage ? onStagePrograms : offStagePrograms;
}

function renderPrograms() {
  const list = document.getElementById("programList");
  if (!list) return;

  list.innerHTML = "";

 const programs = getProgramsForPage() || [];


  programs.forEach(p => {
    const div = document.createElement("div");
    div.className = "program";
    div.innerText = p.name;
    div.onclick = () => showWinners(p);
    list.appendChild(div);
  });
}




localStorage.removeItem("onStage");
localStorage.removeItem("offStage");

const POINTS = {
  first: 5,
  second: 3,
  third: 2
};


//const isOnStage = document.title.includes("On Stage");
//const programs = isOnStage ? onStagePrograms : offStagePrograms;

// render program cards

// recalculate scores
function calculateScores() {
  if (!window.teams || !window.onStagePrograms || !window.offStagePrograms) return;

  // RESET TEAM SCORES
  Object.values(teams).forEach(t => t.score = 0);

  // 🔴 RESET INDIVIDUAL SCORES (THIS FIXES MULTIPLY BUG)
  for (const key in individualScores) {
    delete individualScores[key];
  }


  [...onStagePrograms, ...offStagePrograms].forEach(p => {
    ["first", "second", "third"].forEach(pos => {
      const winner = p[pos];
      if (!winner) return;

      const winners = Array.isArray(winner) ? winner : [winner];

    winners.forEach(w => {
  teams[w.team].score += w.points;

  if (!individualScores[w.student]) {
    individualScores[w.student] = 0;
  }
  individualScores[w.student] += w.points;
});

    });
  });
}


function showTeamDetails(teamId) {
  calculateScores();

  const team = teams[teamId];

  const sorted = Object.entries(teams)
    .sort((a, b) => b[1].score - a[1].score)
    .map(t => t[0]);

  const rank = sorted.indexOf(String(teamId)) + 1;

  const popup = document.getElementById("popup");

  popup.innerHTML = `
    <div class="popup-card">
      <div class="popup-header">
        <h3>${team.name}</h3>
        <button class="close-btn" onclick="closePopup()">✕</button>
      </div>

      <div class="team-stats">
        <p><strong>Total Score:</strong> ${team.score}</p>
        <p><strong>Rank:</strong> #${rank}</p>
        <p><strong>Group No:</strong> ${team.groupNo}</p>

        <p><strong>Teachers:</strong><br>
          ${team.Teachers.join(", ")}
        </p>

       <p><strong>Departments:</strong><br>
       ${team.departments.join("<br>")}
       </p>

      </div>
    </div>
  `;

  popup.classList.remove("hidden");
}


// popup
function showWinners(p) {
  calculateScores();

 const formatWinner = (winner, medal, label) => {
  if (!winner) {
    return `
      <div class="result-card muted">
        <span class="medal">${medal}</span>
        <div class="result-body">
          <strong>${label}</strong>
          <em>Unannounced</em>
        </div>
      </div>
    `;
  }

  const winners = Array.isArray(winner) ? winner : [winner];

  return `
    <div class="result-card">
      <span class="medal">${medal}</span>

      <div class="result-body">
        <strong>
          ${label}${winners.length > 1 ? " (Tie)" : ""}
        </strong>

        ${winners.map(w => `
          <div class="winner-row">
            <span class="student">${w.student}</span>
            <span class="team">
              ${teams[w.team].name}
            </span>
            <span class="points">
              +${w.points} pts
            </span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
};

  const popup = document.getElementById("popup");
  popup.innerHTML = `
    <div class="popup-card">
      <div class="popup-header">
        <h3>${p.name}</h3>
        <button class="close-btn" onclick="closePopup()">✕</button>
      </div>

      <div class="result-list">
       ${formatWinner(p.first, "🥇", "First")}
${formatWinner(p.second, "🥈", "Second")}
${formatWinner(p.third, "🥉", "Third")}

      </div>
    </div>
  `;

  popup.classList.remove("hidden");
}



function closePopup() {
  document.getElementById("popup").classList.add("hidden");
  isAdminOpen = false;
}



// leaderboard update (numeric team IDs)

function renderLeaderboard() {
  calculateScores();

  const container = document.getElementById("leaderboard");
  if (!container) return;

  const leaderboard = Object.entries(teams)
    .map(([id, team]) => ({
      id: Number(id),
      name: team.name,
      score: team.score
    }))
    .sort((a, b) => b.score - a.score);

  // 🟢 TIE-SAFE RANKING
  let currentRank = 1;
  let lastScore = null;

leaderboard.forEach((team, index) => {
  let medalClass = "";

  if (index === 0) medalClass = "gold";
  else if (index === 1) medalClass = "silver";
  else if (index === 2) medalClass = "bronze";

  const div = document.createElement("div");
  div.className = `team-card ${medalClass}`;

  div.innerHTML = `
    <div class="team-name">${team.name}</div>
    <div class="team-score">${team.score}</div>
  `;

  div.onclick = () => showTeamDetails(team.id);
  container.appendChild(div);
});

function getTopIndividual() {
  let top = null;
  let max = 0;

  for (const [name, score] of Object.entries(individualScores)) {
    if (score > max) {
      max = score;
      top = name;
    }
  }

  return { name: top, score: max };
}

function getAllIndividualsSorted() {
  return Object.entries(individualScores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score);
}



// ---------- ADMIN ACCESS ----------
let keyPresses = [];

document.addEventListener("keydown", e => {
  keyPresses.push(e.key.toLowerCase());
  keyPresses = keyPresses.slice(-3);

  if (keyPresses.join("") === "aaa") {
    askPin();
  }
});




const ADMIN_PIN = "2563"; // 🔴 change this

function askPin() {
  const pin = prompt("Enter Admin PIN");
  if (pin === ADMIN_PIN) {
    openAdminPanel();
  } else {
    alert("Wrong PIN");
  }
}

let tapCount = 0;
let tapTimer = null;

document.addEventListener("click", () => {
  tapCount++;

  if (tapCount === 1) {
    tapTimer = setTimeout(() => {
      tapCount = 0;
    }, 1200); // 1.2s window
  }

  if (tapCount === 4) {
    clearTimeout(tapTimer);
    tapCount = 0;
    askPin();
  }
});

function renderScoreEditor() {
  const allPrograms = [
    ...onStagePrograms.map(p => ({ ...p, type: "On Stage" })),
    ...offStagePrograms.map(p => ({ ...p, type: "Off Stage" }))
  ];

  return `
    <label>Program</label>
    <select id="programSelect">
      ${allPrograms.map(p =>
        `<option value="${p.id}">${p.type} — ${p.name}</option>`
      ).join("")}
    </select>

    ${["first", "second", "third"].map(pos => `
      <div class="winner-row">
        <strong>${pos.toUpperCase()}</strong>

        <div class="student-list" id="${pos}Students"></div>

        <button type="button" onclick="addStudentField('${pos}')">➕ Add Student</button>

        <input type="number" id="${pos}Points" value="${POINTS[pos]}">
      </div>
    `).join("")}

    <button class="admin-save" onclick="generateBulkWinnerCode()">
      Generate Code
    </button>
  `;
}


function openAdminPanel() {
  isAdminOpen = true;
  const popup = document.getElementById("popup");
  const individuals = getAllIndividualsSorted();

  popup.innerHTML = `
    <div class="popup-card admin-card scrollable">
      <div class="popup-header">
        <h3>Admin Panel</h3>
        <button class="close-btn" onclick="closePopup()">✕</button>
      </div>

      <div class="admin-tabs">
        <button onclick="showAdminTab('scores')" class="active">Scores</button>
        <button onclick="showAdminTab('individuals')">Top Scores</button>
      </div>

      <!-- TAB 1 -->
      <div id="tab-scores" class="admin-tab">
        ${renderScoreEditor()}
      </div>

      <!-- TAB 2 -->
      <div id="tab-individuals" class="admin-tab hidden">
        <h4>Individual Scores</h4>
        <div class="score-list">
          ${individuals.map(i => `
            <div class="score-row">
              <strong>${i.name}</strong>
              <span>${i.score} pts</span>
            </div>
          `).join("") || "<p>No data</p>"}
        </div>
      </div>
    </div>
  `;

  popup.classList.remove("hidden");
}
function showAdminTab(tab) {
  document.getElementById("tab-scores").classList.add("hidden");
  document.getElementById("tab-individuals").classList.add("hidden");

  document.getElementById("tab-" + tab).classList.remove("hidden");

  document.querySelectorAll(".admin-tabs button")
    .forEach(b => b.classList.remove("active"));

  document
    .querySelector(`.admin-tabs button[onclick*="${tab}"]`)
    .classList.add("active");
}





function addStudentField(pos) {
  const container = document.getElementById(pos + "Students");

  const row = document.createElement("div");
  row.className = "student-row";

  row.innerHTML = `
    <input class="student-input" placeholder="Student name">

    <select class="student-team">
      ${Object.entries(teams).map(([id,t]) =>
        `<option value="${id}">${t.name}</option>`
      ).join("")}
    </select>

    <button type="button" onclick="this.parentElement.remove()">➖</button>
  `;

  container.appendChild(row);
}


function removeStudentField(pos) {
  const container = document.getElementById(pos + "Students");
  if (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}



function generateBulkWinnerCode() {
  const programId = document.getElementById("programSelect").value;
  let code = "";

  ["first","second","third"].forEach(pos => {
    const team = document.getElementById(pos + "Team").value;
    const points = document.getElementById(pos + "Points").value;

    document.querySelectorAll(`#${pos}Students .student-row`)
  .forEach(row => {
    const student = row.querySelector(".student-input").value.trim();
    const team = row.querySelector(".student-team").value;
    const points = document.getElementById(pos + "Points").value;

    if (student) {
      code += `addWinner("${programId}", "${pos}", "${student}", ${team}, ${points});\n`;
    }
  });

  });

  if (!code) {
    alert("Enter at least one winner");
    return;
  }

  showGeneratedCode(code.trim());
}


function showGeneratedCode(code) {
  const popup = document.getElementById("popup");

  popup.innerHTML = `
    <div class="popup-card admin-card">
      <div class="popup-header">
        <h3>Copy & Paste This</h3>
        <button class="close-btn" onclick="closePopup()">✕</button>
      </div>

      <textarea class="code-box" readonly>${code}</textarea>

      <button class="admin-save" onclick="copyCode()">
        Copy Code
      </button>
    </div>
  `;

  popup.classList.remove("hidden");

  window.generatedCode = code;
}


function copyCode() {
  navigator.clipboard.writeText(window.generatedCode);
  alert("Code copied! Paste into data.js");
}

function generateAddWinnerCode(programId, position, student, team, points) {
  return `
addWinner("${programId}", "${position}", "${student}", ${team}, ${points});
`.trim();
}


(async () => {
  await loadData();      // 1️⃣ load data.js
  renderPrograms();      // 2️⃣ render on/off stage programs
  renderLeaderboard();   // 3️⃣ render leaderboard
})();


setInterval(async () => {
  if (!isAdminOpen) {
    await loadData();
    renderPrograms();
    renderLeaderboard();
  }
}, 15000); // every 15 seconds





























