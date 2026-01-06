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

  const team = teams[teamName];

  const sorted = Object.entries(teams)
    .sort((a, b) => b[1].score - a[1].score)
    .map(t => t[0]);

  const rank = sorted.indexOf(teamName) + 1;

  const popup = document.getElementById("popup");
  popup.innerHTML = `
    <div class="popup-card">
      <div class="popup-header">
        <h3>${teams[teamId].name}</h3>
        <button class="close-btn" onclick="closePopup()">✕</button>
      </div>

      <div class="team-stats">
        <p><strong>Total Score:</strong> ${team.score}</p>
        <p><strong>Rank:</strong> #${rank}</p>
        <p><strong>Group No:</strong> ${team.groupNo}</p>

        <p><strong>Group Leaders:</strong><br>
          ${team.leaders.join(", ")}
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
          <small>(${winner.team}) +${winner.points} pts</small>
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
  <span>${teams[map[id]].score}</span>
`;
el.onclick = () => showTeamDetails(map[id]);

});







