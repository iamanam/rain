if (Meteor.isClient) {
    var question = ["Do you know my name? If you do what is it?", "From the very first day did you like me?",
        "Were you honest with everything you said about yourself", "How much you trust me (in percentage-%)?"];
    var possibleAnswer = [["hasan", "anamul", "error", "korim"], ["yes", "never", "after a while"], ["yes", "most of the time", "sometime", "no"]];
    var step = new ReactiveVar(1);

    Template.registerHelper("step", () => {
        return step.get();
    });
    Template.pic.onRendered(function () {
        Session.set("anim_stop", false);
        Session.set("resultShow", false);

        var self = this;
        var image = document.getElementById('background');
        image.crossOrigin = 'anonymous';
        image.onload = function () {
            var engine = new RainyDay({
                image: this,
                // crop: [50, 50, 600, 400]
            }, document.getElementById('canvas'));
            engine.trail = engine.TRAIL_SMUDGE;
            engine.rain([[3, 3, 0.1]], 33);
            $(image).hide();
            self.$(".loading-cat").hide();
            Meteor.setTimeout(function () {
                return Blaze.render(Template.text, document.getElementById("animation"));
            }, 3000)
        };
        image.src = '/images/1.jpg';
    });

    Template.text.rendered = function () {
        $('h1.tlt').textillate({
            initialDelay: 000
        });
        $('h2.tlt').textillate({
            initialDelay: 000,
            type: "char",
            callback: function () {
                Session.set("anim_stop", true);
            }
        }).delay(0000).fadeIn(1000)
    };

}

Template.rain.helpers({
    showResult: function () {
        if (Session.get("resultShow"))
            return Session.get("resultShow");
    }
});
Template.rain.onCreated = function () {
    this.step = 1;
};
function getQuestion(counter) {
    return question[counter];
}

Template.quiz.created = function () {
    this.answerSet = [];
    this.answer = new ReactiveVar();
    this.counter = new ReactiveVar(0);
};

Template.quiz.helpers({
    question: function () {
        if (Session.get("anim_stop")) {
            var tmpl = Template.instance();
            var template = tmpl.$(".quiz");
            $("#animation").hide();
            template.fadeIn(1000);
            var q = getQuestion(tmpl.counter.get());
            if (q) {
                return q;
            }
            else {
                template.fadeOut(1000);
                var associative_array = new Object();
                var result = [];
                for (var i = 0; i < 3; i++) {
                    associative_array[question[i]] = tmpl.answerSet[i];
                }
                Session.set("resultShow", true);
                // Blaze.render(Template.resultshow, document.getElementsByClassName("quiz"));
                //console.log(Template.parentData());

            }
        }
    },
    possibleAns: function () {
        if (Session.get("anim_stop")) {
            var op = possibleAnswer[Template.instance().counter.get()];
            return op || false;
        }
    }
});


Template.quiz.events({
    "submit .question": function (e, t) {
        e.preventDefault();
        var value = t.answer.get() === undefined ? t.$(".ans").val() : t.answer.get();
        t.$(".ans").val("");
        if (value && value !== undefined && value !== null) {
            Template.instance().$(".error").slideUp(500);
            var step = $(".step");
            step.eq(t.counter.get()).removeClass(".step-unfinish").addClass("step-finish");
            t.answerSet.push(value);
            t.counter.set(t.counter.get() + 1);
        }
        else {
            Template.instance().$(".error").slideDown(500);
        }
    },
    "click li": function (e, t) {
        var ans = $(e)[0].currentTarget.innerText;
        t.answer.set(ans);
        $(".question").trigger("submit");
        console.log(ans);

    }
});


Template.step.helpers({
    questionSet: function () {
        return question;
    }
});