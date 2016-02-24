if (Meteor.isClient) {
    var question = ["Do you know m?", "From the very first day did you like me?",
        "Were you honest with everything you said about yourself", "How much you trust me (in percentage-%)?"];
    var step = new ReactiveVar("quiz");
    var answerSet = [];
/////////////////////////////////////////----------------------------------------////////////////
    /*
     global helpers
     */

    Template.rain.helpers({
        "step": ()=> {
            return step.get();
        }
    });

    Template.welcome.onRendered(function () {
        var self = this;
        var image = document.getElementById('background');
        var downloadImg = new Image();
        downloadImg.onload = function () {
            image.src = this.src;
            var engine = new RainyDay({
                image: image,
                crop: [50, 50, 600, 400]
            }, document.getElementById('canvas'));
            engine.trail = engine.TRAIL_SMUDGE;
            engine.rain([[3, 3, 0.1]], 33);
            Meteor.setTimeout(()=> {
                return Blaze.render(Template.text, document.getElementById("text-animation"));
            }, 3000);
        };
        downloadImg.src = "/images/1.jpg";
    });

    Template.text.rendered = function () {
        $('h1.tlt').textillate({
            initialDelay: 1000
        });
        $('h2.tlt').textillate({
            initialDelay: 4500,
            type: "char",
            callback: function () {
                return step.set("quiz");
            }
        })
    };


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
            const optionAns = [["hasan", "anamul", "error", "korim"], ["yes", "never", "after a while"],
                ["yes", "most of the time", "sometime", "no"]];
            var op = optionAns[Template.instance().counter.get()];
            return op || false;
        }
    });


    Template.quiz.events({
        "submit .question, click li": function (event, tem) {
            event.preventDefault();
            const qusAns = tem.$(".ans").val() !== undefined ? tem.$(".ans").val() : event.target.innerText;
            answerSet.push(qusAns);//save the answer
            //go to next step
            tem.$(".step").eq(tem.counter.get()).removeClass(".step-unfinish").addClass("step-finish");
            tem.counter.set(tem.counter.get() + 1);
            console.log(answerSet);
        }
    });


    Template.step.helpers({
        questionSet: function () {
            return question;
        }
    });

    Template.resultshow.helpers({
        getDetail(){

            return answerSet;
        },
        getQus: function (index) {
            return question[index]

        }

    })
}