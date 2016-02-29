Template.quiz.created = function () {
    this.answerSet = [];
    this.counter = new ReactiveVar(0);
};


Template.quiz.helpers({
    dataQ: ()=> {
        return question.length - 1 >= Template.instance().counter.get() ?
            question[Template.instance().counter.get()] : step.set("resultshow");
    },
    possibleAns: () => {
        const optionAns = [
            ["hasan", "anamul", "error", "korim"],
            ["yes", "never", "after a while"],
            ["yes", "most of the time", "sometime", "no"]];
        var op = optionAns[Template.instance().counter.get()];
        return op || false;
    },
    getMark: (index)=> {
        const optionMark = [[0, 10, 0, 0], [10, 0, 5], [10, 8, 6, 0]];
        return optionMark[Template.instance().counter.get()][index];

    }
});


Template.quiz.events({
    "submit .question, click li": function (event, tem) {
        event.preventDefault();
        const qusAns = tem.$(".ans").val() !== undefined ? tem.$(".ans").val() : event.target.innerText;
        answerSet.push(qusAns);//save the answer
        //go to next step
        mark.push(parseInt(event.target.getAttribute("data-mark") || tem.$(".ans").val()));
        tem.$(".step").eq(tem.counter.get()).removeClass(".step-unfinish").addClass("step-finish");
        tem.counter.set(tem.counter.get() + 1);
        console.log(mark);
    }
});


Template.step.helpers({
    questionSet: function () {
        return question;
    }
});