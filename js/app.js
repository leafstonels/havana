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

function showTeamDetails(teamName) {
  calculateScores();

  const participated = [...onStagePrograms, ...offStagePrograms]
    .filter(p => p.first === teamName || p.second === teamName || p.third === teamName)
    .length;

  const sorted = Object.entries(teams)
    .sort((a,b) => b[1] - a[1])
    .map(t => t[0]);

  const rank = sorted.indexOf(teamName) + 1;

  const popup = document.getElementById("popup");
  popup.innerHTML = `
    <div class="popup-card">
      <div class="popup-header">
        <h3>${teamName}</h3>
        <button class="close-btn" onclick="closePopup()">✕</button>
      </div>

      <div class="team-stats">
        <p><strong>Total Score:</strong> ${teams[teamName]}</p>
        <p><strong>Programs Played:</strong> ${participated}</p>
        <p><strong>Current Rank:</strong> #${rank}</p>
      </div>
    </div>
  `;
  popup.classList.remove("hidden");
}


// popup
function showWinners(p) {
  calculateScores();

  const popup = document.getElementById("popup");
  popup.innerHTML = `
    <div class="popup-card">
      <div class="popup-header">
        <h3>${p.name}</h3>
        <button class="close-btn" onclick="closePopup()">✕</button>
      </div>

      <div class="result-list">
        <div class="result first">
          <span>🥇</span>
          <strong>${p.first ?? "TBD"}</strong>
        </div>
        <div class="result second">
          <span>🥈</span>
          <strong>${p.second ?? "TBD"}</strong>
        </div>
        <div class="result third">
          <span>🥉</span>
          <strong>${p.third ?? "TBD"}</strong>
        </div>
      </div>
    </div>
  `;
  popup.classList.remove("hidden");
}


function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

// leaderboard update
["alpha","beta","gamma","delta"].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;

  calculateScores();

  const map = {
    alpha: "Team Alpha",
    beta: "Team Beta",
    gamma: "Team Gamma",
    delta: "Team Delta"
  };

  el.innerHTML = `
  <h4>${map[id]}</h4>
  <span>${teams[map[id]]}</span>
`;
el.onclick = () => showTeamDetails(map[id]);

});




