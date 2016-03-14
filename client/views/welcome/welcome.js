/*
 Template welcome
 it will show the rain background and display some text animation with jquery
 */
Template.welcome.onRendered(function () {

    Meteor.setTimeout(()=> {
        $("#welcome_text_ani").slideDown();
        $('h1.tlt').textillate({
            initialDelay: 1000
        });
        $('h2.tlt').textillate({
            initialDelay: 4500,
            type: "char",
            callback: function () {
                $("#welcome_text_ani").addClass("animated fadeOutLeft");
                Meteor.setTimeout(function () {
                    "use strict";
                    return step.set("rule_set");
                }, 1500);
            }
        });
    }, 3000);
});

/**
 * Template text for rendering text animation
 */
