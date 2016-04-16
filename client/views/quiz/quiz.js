"use strict";
Template.quiz.created = function () {
  this.counter = new ReactiveVar(0);
};

Template.quiz.helpers({
  questionSet: () => {
    var op = qsData[Template.instance().counter.get()];
    return op || step.set("review");
  }
});

Template.step.onRendered (function () {
  let l = Object.keys(qsData).length;
  let store = "";
  for (var i = 0; i <= l; i++) {
    store += "<span class='fa fa-2x'><i class='fa fa-circle-o'></i></span>";
  }
  let stepHolder = this.$("#stephold");
  stepHolder.html(store);
});


Template.quiz.events({
  "submit .question, click li": (event, tem)=> {
    event.preventDefault();
    const qusAns = tem.$(".ans").val() !== undefined ? tem.$(".ans").val() : event.currentTarget.getAttribute("data-mark");
    tem.$(".ans").val("");
    answerSet.push(qusAns);//save the answer
    //go to next step
    mark += parseInt(qusAns);
    let x=tem.$("#stephold span").eq(tem.counter.get()).find("i").removeClass("fa-circle-o").addClass("fa-circle");
    console.log(x);
    tem.counter.set(tem.counter.get() + 1);
  }
});

