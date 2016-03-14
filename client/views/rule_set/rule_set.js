/*
 template typed Element will type the rule for test
 */
Template.rule_set.events({
    "click .agree": function () {
        step.set("quiz");
    }
});


Template.rule_set.rendered = function () {
    $(function () {
        $("#typed").typed({
            strings: [
                "Based on your answer you can see an outcome between two outcome",
                "One will be in my favor and another against",
                "Those outcome will explain my view about you",
                "So Be honest",
                "Only one chance to choose the right things! You can't play again.",
                "Each question will contain 10 marks"],
            stringsElement: $('#typed-strings'),
            liPlace: $(".li_place"),
            typeSpeed: 100,
            arrayPos: 0,
            startDelay: 5000,
            showCursor: false,
            timeReq: function () {
                return this.strings[this.arrayPos].length * this.typeSpeed;
            },
            //when all the string finish then
            callback: function () {
                setTimeout(function () {
                    $("span#typed").hide().next().hide();
                    $("button.agree").show();
                }, 2000)
            },
            // call when done callback function
            onStringTyped: function () {
                $("#indicator").hide();
                let li = this.strings[this.arrayPos];
                this.liPlace.prepend("<li class='animated slideInRight li_rule'><i class='fa-li fa fa-check-square'>⚛</i>" + li + "</li>");
                this.arrayPos++;
            },
            // starting callback function before each string
            preStringTyped: function () {
                var self = this;
                var dur = Math.round(this.timeReq() / 1000);

            }
        });
    });
};