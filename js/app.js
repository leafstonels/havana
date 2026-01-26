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

let CURRENT_PROGRAM = null;

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

//const CURTAIN_ENABLED = true; // 🔴 true = hide scores | falsxe = show scores
//const CURTAIN_ENABLED = false;

const POINTS = {
  first: 5,
  second: 3,
  third: 1
};

const TOP_SCORERS = {
  1: {
    name: "JURAIJ",
    department: "ENGLISH",
    class: "THRID YEAR",
    group: "SAHITHI",
    score: "28",
    photo: "assets/kala.png"
  },
  2: {
    name: "SAYANA SUNIL",
    department: "PSYCHOLOGY",
    class: "SECOND YEAR",
    group: "GEETHAM",
    score: "21",
    photo: "assets/kala2.png"
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
  CURRENT_PROGRAM = p;
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
    <div class="popup-card" id="resultCard">
     <div class="popup-header">
  <h3>${p.name}</h3>

 <button onclick="downloadResultImage()" class="download-btn">
    Download Result
  </button>

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
        <h3>${rank === 1 ? "കലാപ്രതിഭ" : "കലാതിലകം"}</h3>
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
              <p><strong>Year:</strong> ${data.class || "—"}</p>
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

function downloadResultImage() {

  if (!CURRENT_PROGRAM) {
    alert("No program selected");
    return;
  }

  const p = CURRENT_PROGRAM;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Poster Size
  canvas.width = 1080;
  canvas.height = 1350;

  // ============================
  // Gradient Background
  // ============================
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(1, "#f3e5c6");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ============================
  // Load Logos
  // ============================
  const leftLogo = new Image();
  const rightLogo = new Image();

  leftLogo.src = "assets/logo2.png";
  rightLogo.src = "assets/logo.png";

  Promise.all([
    new Promise(res => leftLogo.onload = res),
    new Promise(res => rightLogo.onload = res)
  ]).then(() => {

    // Keep proportions like website
    ctx.drawImage(leftLogo, 60, 60, 200, 120);
    ctx.drawImage(rightLogo, canvas.width - 260, 60, 200, 120);

    // ============================
    // Program Title
    // ============================
    ctx.fillStyle = "#3b2f1c";
    ctx.font = "bold 64px Arima";
    ctx.textAlign = "center";
    ctx.fillText(p.name, canvas.width / 2, 260);

    // Divider
    ctx.strokeStyle = "#c9b27c";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(220, 300);
    ctx.lineTo(canvas.width - 220, 300);
    ctx.stroke();

    // ============================
    // Winner Cards
    // ============================
    let y = 420;

    function drawBlock(emoji, title, winners) {

      // Card background
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(240, y - 60, 600, 110);

      // Emoji
      ctx.font = "48px Arial";
      ctx.fillStyle = "#b8860b";
      ctx.textAlign = "left";
      ctx.fillText(emoji, 260, y + 10);

      // Title
      ctx.font = "bold 36px Arima";
      ctx.fillStyle = "#2b1d0e";
      ctx.fillText(title, 330, y);

      // Winners
      ctx.font = "32px Arima";
      ctx.fillStyle = "#1f2933";

      if (!winners) {
        ctx.fillText("Unannounced", 330, y + 45);
        y += 150;
        return;
      }

      const list = Array.isArray(winners) ? winners : [winners];

      list.forEach(w => {
        ctx.fillText(w.student, 330, y + 45);
        y += 40;
      });

      y += 70;
    }

    drawBlock("🥇", "FIRST PLACE", p.first);
    drawBlock("🥈", "SECOND PLACE", p.second);
    drawBlock("🥉", "THIRD PLACE", p.third);

    // ============================
    // Footer
    // ============================
    ctx.font = "30px Arima";
    ctx.fillStyle = "#6b4e2e";
    ctx.textAlign = "center";
    ctx.fillText("Official Results", canvas.width / 2, canvas.height - 120);

    // ============================
    // Download
    // ============================
    const link = document.createElement("a");
    link.download = p.name.replaceAll(" ", "_") + "_Poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

  });

}



(async () => {
  await loadData();

  renderPrograms();
  renderLeaderboard();
})();


setInterval(async () => {
  if (isAdminOpen) return;

  await loadData();
  renderPrograms();
  renderLeaderboard();
}, 15000);











































