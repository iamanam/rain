/*
 Template welcome
 it will show the rain background and display some text animation with jquery
 */
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
            $("#welcome_text_ani").slideDown();
            $('h1.tlt').textillate({
                initialDelay: 1000
            });
            $('h2.tlt').textillate({
                initialDelay: 4500,
                type: "char",
                callback: function () {
                    return step.set("typedElement");
                }
            })
        }, 3000);
    };
    downloadImg.src = "/images/1.jpg";
});

/**
 * Template text for rendering text animation
 */
