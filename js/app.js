const teamMap = {
  alpha: "Team Alpha",
  beta: "Team Beta",
  gamma: "Team Gamma",
  delta: "Team Delta"
};

Object.keys(teams).forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `
    <h4>${teamMap[id]}</h4>
    <span>${teams[id]}</span>
  `;
});

function showWinners(key) {
  const p = programs[key];
  const popup = document.getElementById("popup");

  popup.innerHTML = `
    <div class="popup-card">
      <h3>${p.name}</h3>
      <p>🥇 ${p.first}</p>
      <p>🥈 ${p.second}</p>
      <p>🥉 ${p.third}</p>
      <button onclick="closePopup()">Close</button>
    </div>
  `;

  popup.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

