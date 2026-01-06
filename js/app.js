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
  Object.keys(teams).forEach(t => teams[t] = 0);

  [...onStagePrograms, ...offStagePrograms].forEach(p => {
    if (p.first) teams[p.first] += scorePoints.first;
    if (p.second) teams[p.second] += scorePoints.second;
    if (p.third) teams[p.third] += scorePoints.third;
  });
}

// popup
function showWinners(p) {
  calculateScores();

  const popup = document.getElementById("popup");
  popup.innerHTML = `
    <div class="popup-card">
      <h3>${p.name}</h3>
      <p>🥇 ${p.first ?? "—"}</p>
      <p>🥈 ${p.second ?? "—"}</p>
      <p>🥉 ${p.third ?? "—"}</p>
      <button onclick="closePopup()">Close</button>
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
});
