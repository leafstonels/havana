const teams = {
  1: {
    name: "ഗീതം",
    score: 0,
    groupNo: "1",
    Teachers: ["Aswathi miss", "Blessy miss"],
    departments: ["BA Economics","Bcom Cooperation","BA Politics","Bsc Phychology"]
  },

  2: {
    name: "സാഹിതി",
    score: 0,
    groupNo: "2",
    Teachers: ["Jasmin miss", "Niyas sir"],
    departments: ["BBA","BCA","BA English"]
  },

  3: {
    name: "നാട്യം",
    score: 0,
    groupNo: "3",
    Teachers: ["Geedha miss","Parvathi miss"],
    departments: ["MA English","Bcom TT","MSW","BA History"]
  },

  4: {
    name: "ചിത്രധാര",
    score: 0,
    groupNo: "4",
    Teachers: ["Navya miss", "Athulya miss"],
    departments: ["BSW","Finance","Mcom"]
  }
};


// 28 ON STAGE
const onStagePrograms = [
  { id: "on1", name: "Light Music(boys)", first: null, second: null, third: null },
  { id: "on2", name: "Light Music(girls)", first: null, second: null, third: null },
  { id: "on3", name: "Group Song", first: null, second: null, third: null },
  { id: "on4", name: "Mappila Pattu(single,boys)", first: null, second: null, third: null },
  { id: "on5", name: "Mappila Pattu(single,girls)", first: null, second: null, third: null },
  { id: "on6", name: "Mappila Pattu(group)", first: null, second: null, third: null },
  { id: "on7", name: "Desha Bakthi Ganam(grp)", first: null, second: null, third: null },
  { id: "on8", name: "Kavitha Parayanam", first: null, second: null, third: null },
  { id: "on9", name: "Bharatha Natyam", first: null, second: null, third: null },
  { id: "on10", name: "Mohiniyattam", first: null, second: null, third: null },
  { id: "on11", name: "Classical Dance", first: null, second: null, third: null },
  { id: "on12", name: "Nadam Pattu(group)", first: null, second: null, third: null },
  { id: "on13", name: "Folk Dance(single)", first: null, second: null, third: null },
  { id: "on14", name: "Folk Dance(group)", first: null, second: null, third: null },
  { id: "on15", name: "Thiruvathira", first: null, second: null, third: null },
  { id: "on16", name: "Kolkali", first: null, second: null, third: null },
  { id: "on17", name: "Duff Muttu", first: null, second: null, third: null },
  { id: "on18", name: "Oppana", first: null, second: null, third: null },
  { id: "on19", name: "Drama(MAL)", first: null, second: null, third: null },
  { id: "on20", name: "Drama(ENG)", first: null, second: null, third: null },
  { id: "on21", name: "Drama(Hindi)", first: null, second: null, third: null },
  { id: "on22", name: "Mime", first: null, second: null, third: null },
  { id: "on23", name: "Skit", first: null, second: null, third: null },
  { id: "on24", name: "Kadhaprasangam", first: null, second: null, third: null },
  { id: "on25", name: "Mono Act", first: null, second: null, third: null },
  { id: "on26", name: "Mimicry", first: null, second: null, third: null },
  { id: "on27", name: "Vattappattu", first: null, second: null, third: null },
  { id: "on28", name: "Margamkali", first: null, second: null, third: null },
  { id: "on29", name: "instrumental music", first: null, second: null, third: null },
  { id: "on30", name: "ganamela", first: null, second: null, third: null }
  
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
//addWinner("off5", "first", "Hadi", 3, 10);
addWinner("off4", "first", "Muhammed Sidan MK", 3, 5);
addWinner("off4", "second", "Shahina K", 2, 3);
addWinner("off4", "third", "Juraij V", 2, 1);

addWinner("off3", "first", "Sneha", 1, 5);
addWinner("off3", "second", "Mohammed sajil P", 2, 3);
addWinner("off3", "third", "Vivek", 2, 1);

addWinner("off2", "first", "Mushrifa R", 3, 5);
addWinner("off2", "second", "Sayana Sunil", 1, 3);
addWinner("off2", "third", "Devi Chandana KP", 1, 1);

addWinner("off1", "first", "Jabiya Salim", 1, 5);
addWinner("off1", "second", "said mazin", 2, 3);
addWinner("off1", "second", "Ransila", 3, 3);
addWinner("off2", "third", "Fathima Shabana", 3, 1);
















