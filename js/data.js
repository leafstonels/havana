const teams = {
  "Team Alpha": {
    score: 0,
    groupNo: "Group 1",
    leaders: ["Arjun K", "Nihal P"],
    coordinators: [
      { name: "Rahul S", phone: "9876543210" },
      { name: "Ameen T", phone: "9123456780" }
    ]
  },
  "Team Beta": {
    score: 0,
    groupNo: "Group 2",
    leaders: ["Adhil M", "Shameer K"],
    coordinators: [
      { name: "Faris A", phone: "9988776655" }
    ]
  },
  "Team Gamma": {
    score: 0,
    groupNo: "Group 3",
    leaders: ["Sanjay R"],
    coordinators: [
      { name: "Kiran P", phone: "9090909090" }
    ]
  },
  "Team Delta": {
    score: 0,
    groupNo: "Group 4",
    leaders: ["Abhishek V"],
    coordinators: [
      { name: "Anand K", phone: "9012345678" }
    ]
  }
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

