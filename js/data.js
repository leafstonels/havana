const scorePoints = {
  first: 100,
  second: 70,
  third: 50
};

const teams = {
  "Team Alpha": 0,
  "Team Beta": 0,
  "Team Gamma": 0,
  "Team Delta": 0
};

// 28 ON STAGE
const onStagePrograms = Array.from({ length: 28 }, (_, i) => ({
  id: `on${i+1}`,
  name: `On Stage Program ${i+1}`,
  first: null,
  second: null,
  third: null
}));

// 28 OFF STAGE
const offStagePrograms = Array.from({ length: 28 }, (_, i) => ({
  id: `off${i+1}`,
  name: `Off Stage Program ${i+1}`,
  first: null,
  second: null,
  third: null
}));
