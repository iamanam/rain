step = new ReactiveVar("rule_set");


if (!Meteor.isDevelopment())
  step.set("welcome");

qsData = {
  0: {
    qs: "Do you know my name?",
    option: [{title: 'hasan', val: 0}, {title: "anamul"}, {title: "error", val: 0}, {title: "karim", val: 0}]
  },
  1: {
    qs: "Did you enjoy our relationship so far?",
    option: [{title: "yes", val: 10}, {title: "never", val: 10}, {title: "After a whilr", val: 7}]
  },
  2: {
    qs: "From the very first day did you like me?",
    option: [{title: "yes", val: 10}, {title: "never", val: 10}, {title: "sometime", val: 7}]
  },
  3: {
    qs: "Were you honest with everything you said about yourself",
    option: undefined
  },
  4: {
    qs: "How much you trust me (1-10)?",
    option: undefined
  }
};

answerSet = [];// the array for holding each value of ans
mark = 0;//for total mark
UI.registerHelper('Meteor', function () {
  return {
    isDevelopment: function () {
      return Meteor.isDevelopment;
    }
  };
});
