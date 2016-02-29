if (Meteor.isClient) {
    var question = ["Do you know my name?",
        "Did you enjoy our relationship so far?",
        "From the very first day did you like me?",
        "Were you honest with everything you said about yourself",
        "How much you trust me (1-10)?"
    ];

    var step = new ReactiveVar("welcome");
    var answerSet = [];
    var mark = [];
/////////////////////////////////////////----------------------------------------////////////////
    /*
     global helpers
     */

    Template.index.helpers({
        "step": ()=> {
            return step.get();
        }
    });
}