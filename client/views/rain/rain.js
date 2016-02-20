if (Meteor.isClient) {
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
            initialDelay: 1000
        });
        $('h2.tlt').textillate({
            initialDelay: 3000,
            type: "char",
            callback: function () {
                Session.set("anim_stop", true);
                $(this).hide();

            }
        }).delay(0000).fadeIn(1000)
    };

}

function getQuestion(counter) {
    var question = ["whats your name", "From the very first day did u like me?", "ok"];
    return question[counter];
}
var counter = new ReactiveVar(0);
Template.quiz.helpers({
    question: function () {
        if (Session.get("anim_stop")) {
            $("#animation").hide();
            Template.instance().$(".quiz").fadeIn(1000);
            var q = getQuestion(counter.get());
            if (q)
                return q;
            else
                Blaze.remove(Template.instance);
        }
    }
});
Template.quiz.events({
    "submit .question": function (e) {
        e.preventDefault();
        var value=$(this).find(".ans").val();
        console.log(value);
        counter.set(counter.get() + 1);
    }
});