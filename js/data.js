const teams = {
  1: {
    name: "ഗീതം",
    score: 0,
    groupNo: "1",
    Teachers: ["Aswathi miss", "Blessy miss"],
    departments: ["Ba economics","Bcom cooperation","ba politics","bsc phychology"]
  },

  2: {
    name: "സാഹിതി",
    score: 0,
    groupNo: "2",
    Teachers: ["Jasmin miss", "Niyas sir"],
    departments: ["BBA","BCA","Ba English"]
  },

  3: {
    name: "നാട്യം",
    score: 0,
    groupNo: "3",
    Teachers: ["Geedha miss","parvathi miss"],
    departments: ["MA English","Bcom TT","Msw","Ba history"]
  },

  4: {
    name: "ചിത്രധാര",
    score: 0,
    groupNo: "4",
    Teachers: ["Navya miss", "Athulya miss"],
    departments: ["BSW","finance","Mcom"]
  }
};


// 28 ON STAGE
const onStagePrograms = [
  { id: "on1", name: "test", first: null, second: null, third: null },
  { id: "on2", name: "Solo Song", first: null, second: null, third: null },
  { id: "on3", name: "Group Dance", first: null, second: null, third: null },
  { id: "on4", name: "Mime", first: null, second: null, third: null },
  { id: "on5", name: "Mono Act", first: null, second: null, third: null },
  { id: "on6", name: "Poetry Recitation", first: null, second: null, third: null },
  { id: "on7", name: "Story Writing", first: null, second: null, third: null },
  { id: "on8", name: "Essay Writing", first: null, second: null, third: null },
  { id: "on9", name: "Poster Making", first: null, second: null, third: null },
  { id: "on10", name: "Cartoon Drawing", first: null, second: null, third: null },
  { id: "on11", name: "Pencil Drawing", first: null, second: null, third: null },
  { id: "on12", name: "Painting", first: null, second: null, third: null },
  { id: "on13", name: "Photography", first: null, second: null, third: null },
  { id: "on14", name: "Short Film", first: null, second: null, third: null },
  { id: "on15", name: "Quiz", first: null, second: null, third: null },
  { id: "on16", name: "Debate", first: null, second: null, third: null },
  { id: "on17", name: "Extempore", first: null, second: null, third: null },
  { id: "on18", name: "Elocution", first: null, second: null, third: null },
  { id: "on19", name: "Word Puzzle", first: null, second: null, third: null },
  { id: "on20", name: "Crossword", first: null, second: null, third: null },
  { id: "on21", name: "Spot Photography", first: null, second: null, third: null },
  { id: "on22", name: "Face Painting", first: null, second: null, third: null },
  { id: "on23", name: "Mehndi Design", first: null, second: null, third: null },
  { id: "on24", name: "Best Manager", first: null, second: null, third: null },
  { id: "on25", name: "Treasure Hunt", first: null, second: null, third: null },
  { id: "on26", name: "Collage Making", first: null, second: null, third: null },
  { id: "on27", name: "Clay Modelling", first: null, second: null, third: null },
  { id: "on28", name: "Rangoli", first: null, second: null, third: null }
];


// 28 OFF STAGE
const offStagePrograms = [
  { id: "off1", name: "Essay Writting(ENG)", first: null, second: null, third: null },
  { id: "off2", name: "Essay Writing(MAL)", first: null, second: null, third: null },
  { id: "off3", name: "Essay Writting(Hindi)", first: null, second: null, third: null },
  { id: "off4", name: "Essay Writting(Arabic)", first: null, second: null, third: null },
  { id: "off5", name: "Short Story Writing(ENG)", first: null, second: null, third: null },
  { id: "off6", name: "Short Story Writing(MAL)", first: null, second: null, third: null },
  { id: "off7", name: "Short Story Writing(Hindi)", first: null, second: null, third: null },
  { id: "off8", name: "Short Story Writing(Arabic)", first: null, second: null, third: null },
  { id: "off9", name: "Poem Versification(ENG)", first: null, second: null, third: null },
  { id: "off10", name: "Poem Versification(MAL)", first: null, second: null, third: null },
  { id: "off11", name: "Poem Versification(Hindi)", first: null, second: null, third: null },
  { id: "off12", name: "Poem Versification(Arabic)", first: null, second: null, third: null },
  { id: "off13", name: "Elocution(ENG)", first: null, second: null, third: null },
  { id: "off14", name: "Elocution(MAL)", first: null, second: null, third: null },
  { id: "off15", name: "Elocution(Hindi)", first: null, second: null, third: null },
  { id: "off16", name: "Elocution(Arabic)", first: null, second: null, third: null },
  { id: "off17", name: "Quiz(grp)", first: null, second: null, third: null },
  { id: "off18", name: "Debate(grp)", first: null, second: null, third: null },
  { id: "off19", name: "Water Colour", first: null, second: null, third: null },
  { id: "off20", name: "Pencil Drawing", first: null, second: null, third: null },
  { id: "off21", name: "Cartoon Drawing", first: null, second: null, third: null },
  { id: "off22", name: "Poster Making", first: null, second: null, third: null },
  { id: "off23", name: "Collage", first: null, second: null, third: null },
  { id: "off24", name: "Clay Modeling", first: null, second: null, third: null },
  { id: "off25", name: "Embroidery", first: null, second: null, third: null },
  { id: "off26", name: "Rangoli", first: null, second: null, third: null },
  { id: "off27", name: "Photography", first: null, second: null, third: null },
  { id: "off28", name: "Poem Recitation(MAL)", first: null, second: null, third: null }
];

function addWinner(programId, position, student, team, points) {
  const allPrograms = [...onStagePrograms, ...offStagePrograms];
  const program = allPrograms.find(p => p.id === programId);
  if (!program) return;

  program[position] = { student, team, points };
}

/*addWinner("on1", "first", "Anjali S", "Team Alpha", 100);
addWinner("on1", "second", "Rahul M", "Team Beta", 70);
addWinner("on1", "third", "Sneha P", "Team Gamma", 50);

addWinner("on3", "first", "Nikhil R", "Team Delta", 100);*/

//addWinner("on5", "first", "hadi", 2, 10);
addWinner("off5", "first", "Hadi", 3, 10);












