//const savedOn = localStorage.getItem("onStage");
// savedOff = localStorage.getItem("offStage");

//if (savedOn) onStagePrograms = JSON.parse(savedOn);
//if (savedOff) offStagePrograms = JSON.parse(savedOff);

const isOnStage = document.title.includes("On Stage");
const programs = isOnStage ? onStagePrograms : offStagePrograms;

// render program cards
const list = document.getElementById("programList");
if (list) {
  programs.forEach(p => {
    const div = document.createElement("div");
    div.className = "program";
    div.innerText = p.name;
    div.onclick = () => showWinners(p);
    list.appendChild(div);
  });
}

// recalculate scores
function calculateScores() {
  Object.values(teams).forEach(t => t.score = 0);

  [...onStagePrograms, ...offStagePrograms].forEach(p => {
    if (p.first) teams[p.first.team].score += p.first.points;
    if (p.second) teams[p.second.team].score += p.second.points;
    if (p.third) teams[p.third.team].score += p.third.points;
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

        <p><strong>Student Coordinators:</strong><br>
          ${team.coordinators
            .map(c => `${c.name} (${c.phone})`)
            .join("<br>")}
        </p>
      </div>
    </div>
  `;

  popup.classList.remove("hidden");
}


// popup
function showWinners(p) {
  calculateScores();

  const formatWinner = (winner, medal) => {
    if (!winner) {
      return `
        <div class="result unannounced">
          ${medal} <em>Unannounced</em>
        </div>
      `;
    }

    return `
      <div class="result">
        <span>${medal}</span>
        <div>
         <strong>${winner.student}</strong>
         <br>
         <small>(${teams[winner.team].name}) +${winner.points} pts</small>
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
        ${formatWinner(p.first, "🥇")}
        ${formatWinner(p.second, "🥈")}
        ${formatWinner(p.third, "🥉")}
      </div>
    </div>
  `;

  popup.classList.remove("hidden");
}



function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}


// leaderboard update (numeric team IDs)
[1, 2, 3, 4].forEach(teamId => {
  const el = document.getElementById(teamId);
  if (!el) return;

  calculateScores();

  el.innerHTML = `
    <h4>${teams[teamId].name}</h4>
    <span>${teams[teamId].score}</span>
  `;

  el.onclick = () => showTeamDetails(teamId);
});

// ---------- ADMIN ACCESS ----------
let keyPresses = [];

document.addEventListener("keydown", e => {
  keyPresses.push(e.key.toLowerCase());
  keyPresses = keyPresses.slice(-3);

  if (keyPresses.join("") === "aaa") {
    askPin();
  }
});

const ADMIN_PIN = "1234"; // 🔴 change this

function askPin() {
  const pin = prompt("Enter Admin PIN");
  if (pin === ADMIN_PIN) {
    openAdminPanel();
  } else {
    alert("Wrong PIN");
  }
}

function openAdminPanel() {
  const popup = document.getElementById("popup");

  const allPrograms = [
    ...onStagePrograms.map(p => ({ ...p, type: "On Stage" })),
    ...offStagePrograms.map(p => ({ ...p, type: "Off Stage" }))
  ];

  popup.innerHTML = `
    <div class="popup-card admin-card">
      <div class="popup-header">
        <h3>Admin Panel</h3>
        <button class="close-btn" onclick="closePopup()">✕</button>
      </div>

      <div class="admin-form">

        <label>Program</label>
        <select id="programSelect">
          ${allPrograms.map(p =>
            `<option value="${p.id}">
              ${p.type} — ${p.name}
            </option>`
          ).join("")}
        </select>

        <label>Position</label>
        <select id="position">
          <option value="first">🥇 First</option>
          <option value="second">🥈 Second</option>
          <option value="third">🥉 Third</option>
        </select>

        <label>Student Name</label>
        <input id="studentName" placeholder="Student name">

        <label>Team</label>
        <select id="teamSelect">
          <option value="1">${teams[1].name}</option>
          <option value="2">${teams[2].name}</option>
          <option value="3">${teams[3].name}</option>
          <option value="4">${teams[4].name}</option>
        </select>

        <label>Points</label>
        <input id="points" type="number" value="100">

        <button class="admin-save" onclick="generateWinnerCode()">
          code
        </button>

      </div>
    </div>
  `;

  popup.classList.remove("hidden");
}


function saveWinnerFromAdmin() {
  const programId = document.getElementById("programSelect").value;
  const position = document.getElementById("position").value;
  const student = document.getElementById("studentName").value;
  const team = Number(document.getElementById("teamSelect").value);
  const points = Number(document.getElementById("points").value);

  const program =
    onStagePrograms.find(p => p.id === programId) ||
    offStagePrograms.find(p => p.id === programId);

  if (!program) {
    alert("Program not found");
    return;
  }

  program[position] = { student, team, points };

  saveToLocal();
  closePopup();
  location.reload();
}

function saveToLocal() {
  localStorage.setItem("onStage", JSON.stringify(onStagePrograms));
  localStorage.setItem("offStage", JSON.stringify(offStagePrograms));
}


function generateWinnerCode() {
  const programId = document.getElementById("programSelect").value;
  const position = document.getElementById("position").value;
  const student = document.getElementById("studentName").value;
  const team = Number(document.getElementById("teamSelect").value);
  const points = Number(document.getElementById("points").value);

  if (!student.trim()) {
    alert("Enter student name");
    return;
  }

  const code = generateAddWinnerCode(
    programId,
    position,
    student,
    team,
    points
  );

  showGeneratedCode(code);
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







