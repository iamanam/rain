if (Meteor.isClient) {
    var question = ["whats your name", "From the very first day did u like me?", "ok"];

    Template.pic.onRendered(function () {
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

function getQuestion(counter) {
    return question[counter];
}

var counter = new ReactiveVar(0);

Template.quiz.helpers({
    question: function (p) {
        if (Session.get("anim_stop")) {
            var template =$(".quiz");
            $("#animation").hide();
            template.fadeIn(1000);
            var q = getQuestion(counter.get());
            if (q) {
                return q;
            }
            else {
                template.fadeOut(1000);
                var associative_array = new Object();
                for (var i = 0; i < 3; i++) {
                    associative_array[question[i]] = answer[i];
                }
                console.log(associative_array);
            }
        }
    }
});

var answer = [];

Template.quiz.events({
    "submit .question": function (e, t) {
        e.preventDefault();
        var value = t.$(".ans").val();
        t.$(".ans").val("");
        if (value && value !== undefined && value !== null) {
            Template.instance().$(".error").slideUp(500);
            var step = $(".step");
            step.eq(counter.get()).removeClass(".step-unfinish").addClass("step-finish");
            answer.push(value);
            counter.set(counter.get() + 1);
        }
        else {
            Template.instance().$(".error").slideDown(500);
        }
    }
});

Template.step.onRendered(function () {
});

Template.step.helpers({
    questionSet: function () {
        return question;
    }
});