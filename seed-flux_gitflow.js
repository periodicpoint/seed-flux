var graphConfig = new GitGraph.Template({
  colors: [ "#9993FF", "#47E8D4", "#6BDB52", "#F85BB5", "#FFA657", "#F85BB5" ],
  branch: {
    color: "#000000",
    lineWidth: 3,
    spacingX: 60,
    mergeStyle: "straight",
    showLabel: true, // display branch names on graph
    labelFont: "normal 10pt Arial",
    labelRotation: 0
  },
  commit: {
    spacingY: -30,
    dot: {
      size: 8,
      strokeColor: "#000000",
      strokeWidth: 4
    },
    tag: {
      font: "normal 10pt Arial",
      color: "yellow"
    },
    message: {
      color: "black",
      font: "normal 12pt Arial",
      displayAuthor: false,
      displayBranch: false,
      displayHash: false,
    }
  },
  arrow: {
    size: 8,
    offset: 3
  }
});

var config = {
  template: graphConfig,
  mode: "extended",
  orientation: "vertical"
};

var bugFixCommit = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Bug fix commit(s)"
};

var stabilizationCommit = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Release stabilization commit(s)"
};

// You can manually fix columns to control the display.
var secfeatureCol = 1;
var featureCol = 2;
var tidyCol = 3;
var reviseCol = 3;
var reviewCol = 3;
var editCol = 3;
var fixCol = 4;
var masterCol = 5;

// start git graph
var gitgraph = new GitGraph(config);

// master branch
var master = gitgraph.branch({
  name: "master",
  column: masterCol
});
master.commit("Initial commit");
master.commit({
  message: "Add yaml metadata",
  tag: "time stamp",
  displayTagBox: true
});

// edit branch
var edit = gitgraph.branch({
  parentBranch: master,
  name: "edit",
  column: editCol
});
edit.commit({
  messageDisplay: false
});
// alice feature branch on edit
var edit_feature1 = gitgraph.branch({
  parentBranch: edit,
  name: "alice/prelims",
  column: featureCol
});
edit_feature1.commit("Edit abstract").commit({
  messageDisplay: false
});
edit_feature1.commit("Edit keywords").commit({
  messageDisplay: false
});
edit_feature1.merge(edit);
//edit.merge(master);

// judy feature branch on edit
var edit_feature2 = gitgraph.branch({
  parentBranch: edit,
  name: "judy/mainmatter",
  column: featureCol
});
edit_feature2.commit("Edit introduction").commit({
  messageDisplay: false
});
edit_feature2.commit("Edit equations").commit({
  messageDisplay: false
});
edit_feature2.merge(edit);
edit.merge(master);

// Commits on master
master.commit({
  tag: "time stamp",
  displayTagBox: true
});

// fix branch
var fix1 = gitgraph.branch({
  parentBranch: master,
  name: "fix",
  column: fixCol
});
fix1.commit("Fix bug #1").commit({
  messageDisplay: false
});
fix1.commit("Fix bug #2").commit({
  messageDisplay: false
});
fix1.merge(master);

// review branch
var review = gitgraph.branch({
  parentBranch: master,
  name: "review",
  column: reviewCol
});
review.commit({
  messageDisplay: false
});
//review.commit({
//  messageDisplay: false
//});

// feature branch on review
var review_feature1 = gitgraph.branch({
  parentBranch: review,
  name: "bob/prelims",
  column: featureCol
});
review_feature1.commit("Review on abstract").commit({
  messageDisplay: false
});
review_feature1.commit("Review on keywords").commit({
  messageDisplay: false
});

// fix branch
var fix2 = gitgraph.branch({
  parentBranch: master,
  name: "fix",
  column: fixCol
});
fix2.commit("Fix bug #3").commit({
  messageDisplay: false
});
fix2.commit("Fix bug #4").commit({
  messageDisplay: false
});
fix2.merge(master);
fix2.merge(review);

review_feature1.merge(review);
review.merge(master);

// Commits on master
master.commit({
  tag: "time stamp",
  displayTagBox: true
});

// revise branch
var revise = gitgraph.branch({
  parentBranch: master,
  name: "revise",
  column: reviseCol
});
revise.commit({
  messageDisplay: false
});
//revise.commit({
//  messageDisplay: false
//});

// feature branch on revise
var revise_feature1 = gitgraph.branch({
  parentBranch: revise,
  name: "eve/prelims",
  column: featureCol
});
revise_feature1.commit("Revise abstract").commit({
  messageDisplay: false
});

// feature branch on revise
var revise_feature2 = gitgraph.branch({
  parentBranch: revise,
  name: "trudy/tables",
  column: secfeatureCol
});
revise_feature1.commit("Revise keywords").commit({
  messageDisplay: false
});
revise_feature2.commit("Revise tables").commit({
  messageDisplay: false
});
revise_feature2.commit("Revise tables again").commit({
  messageDisplay: false
});
revise_feature2.merge(revise);
revise_feature1.commit("Revise abstract").commit({
  messageDisplay: false
});
revise_feature1.merge(revise);
revise.merge(master);

// Commits on master
master.commit({
  messageDisplay: false
});
master.commit({
  messageDisplay: false
});

// tidy branch
var tidy = gitgraph.branch({
  parentBranch: master,
  name: "tidy",
  column: tidyCol
});
tidy.commit({
  messageDisplay: false
});
//tidy.commit({
//  messageDisplay: false
//});

// feature branch on tidy
var tidy_feature1 = gitgraph.branch({
  parentBranch: tidy,
  name: "carol/abstract",
  column: featureCol
});
tidy_feature1.commit("Tidy abstract").commit({
  messageDisplay: false
});
tidy_feature1.commit("Tidy keywords").commit({
  messageDisplay: false
});
tidy_feature1.merge(tidy);
tidy.merge(master);

// Commits on master
master.commit({
  tag: "time stamp",
  displayTagBox: true
});
