//const savedOn = localStorage.getItem("onStage");
// savedOff = localStorage.getItem("offStage");

//if (savedOn) onStagePrograms = JSON.parse(savedOn);
//if (savedOff) offStagePrograms = JSON.parse(savedOff);

async function loadData() {
  const res = await fetch("js/data.js?v=" + Date.now());
  const text = await res.text();
  eval(text); // loads teams, onStagePrograms, offStagePrograms
}
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
  third: 1
};

const TOP_SCORERS = {
  1: {
    name: "devaandi",
    department: "cs",
    class: "bca",
    group: "konayadi",
    score: "69",
    photo: "assets/deva2.png"
  },
  2: {
    name: "shiji",
    department: "phyco",
    class: "-_-",
    group: "kona",
    score: "6969",
    photo: "assets/shiji2.png"
  }
};



//const isOnStage = document.title.includes("On Stage");
//const programs = isOnStage ? onStagePrograms : offStagePrograms;

// render program cards

// recalculate scores
function calculateScores() {
   if (!window.teams || !window.onStagePrograms || !window.offStagePrograms) return;
  Object.values(teams).forEach(t => t.score = 0);

  [...onStagePrograms, ...offStagePrograms].forEach(p => {
    ["first", "second", "third"].forEach(pos => {
      const winner = p[pos];
      if (!winner) return;

      const winners = Array.isArray(winner) ? winner : [winner];

      winners.forEach(w => {
        teams[w.team].score += w.points;
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
      <div class="result unannounced">
        ${medal} <em>Unannounced</em>
      </div>
    `;
  }

  const winners = Array.isArray(winner) ? winner : [winner];

  return `
    <div class="result">
      <span>${medal}</span>
      <div>
        <strong>${label}${winners.length > 1 ? " (Tie)" : ""}</strong>
        ${winners.map(w => `
          <div>
            ${w.student}
            <br>
            <small>(${teams[w.team].name}) +${w.points} pts</small>
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

function showTopScorer(rank) {
  const data = TOP_SCORERS[rank];
  const popup = document.getElementById("popup");

  const hasData =
    data.name || data.department || data.class || data.group || data.score || data.photo;

  popup.innerHTML = `
    <div class="popup-card">
      <div class="popup-header">
        <h3>${rank === 1 ? "🥇 Top Scorer" : "🥈 Second Scorer"}</h3>
        <button class="close-btn" onclick="closePopup()">✕</button>
      </div>

      ${
        hasData
          ? `
            <div class="team-stats">
              ${
                data.photo
                  ? `<img src="${data.photo}" style="width:100%;border-radius:14px;margin-bottom:12px;">`
                  : ""
              }
              <p><strong>Name:</strong> ${data.name || "—"}</p>
              <p><strong>Department:</strong> ${data.department || "—"}</p>
              <p><strong>Class:</strong> ${data.class || "—"}</p>
              <p><strong>Group:</strong> ${data.group || "—"}</p>
              <p><strong>Total Score:</strong> ${data.score || "—"}</p>
            </div>
          `
          : `<p style="text-align:center;opacity:0.7;">Announcing Soon</p>`
      }
    </div>
  `;

  popup.classList.remove("hidden");
}



function closePopup() {
  document.getElementById("popup").classList.add("hidden");
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
    if (lastScore !== null && team.score < lastScore) {
      currentRank = index + 1;
    }
    team.rank = currentRank;
    lastScore = team.score;
  });

  container.innerHTML = "";

  leaderboard.forEach(team => {
    const div = document.createElement("div");
    div.className = `team-card rank-${team.rank}`;

  div.innerHTML = `
  <h4>${team.name}</h4>
  <span>${team.score}</span>
`;


    div.onclick = () => showTeamDetails(team.id);
    container.appendChild(div);
  });
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

        ${["first", "second", "third"].map(pos => `
          <div class="winner-row">
            <strong>${pos === "first" ? "🥇 First" : pos === "second" ? "🥈 Second" : "🥉 Third"}</strong>

            <input id="${pos}Student" placeholder="Student name">

            <select id="${pos}Team">
              <option value="1">${teams[1].name}</option>
              <option value="2">${teams[2].name}</option>
              <option value="3">${teams[3].name}</option>
              <option value="4">${teams[4].name}</option>
            </select>

            <input type="number" id="${pos}Points" value="${POINTS[pos]}">
          </div>
        `).join("")}

        <button class="admin-save" onclick="generateBulkWinnerCode()">
          Generate Code
        </button>

      </div>
    </div>
  `;

  popup.classList.remove("hidden");
}




  function generateBulkWinnerCode() {
  const programId = document.getElementById("programSelect").value;

  let code = "";

  ["first", "second", "third"].forEach(pos => {
    const student = document.getElementById(pos + "Student").value.trim();
    const team = Number(document.getElementById(pos + "Team").value);
    const points = Number(document.getElementById(pos + "Points").value);

    if (student) {
      code += `addWinner("${programId}", "${pos}", "${student}", ${team}, ${points});\n`;
    }
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





























