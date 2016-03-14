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


Template.quiz.events({
  "submit .question, click li": (event, tem)=> {
    event.preventDefault();
    const qusAns = tem.$(".ans").val() !== undefined ? tem.$(".ans").val() : event.currentTarget.getAttribute("data-mark");
    tem.$(".ans").val("");
    answerSet.push(qusAns);//save the answer
    //go to next step
    mark += parseInt(qusAns);
    //tem.$("span").eq(tem.counter.get()).find("i");
    tem.counter.set(tem.counter.get() + 1);
  }
});

