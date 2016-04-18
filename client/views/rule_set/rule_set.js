/*
 template typed Element will type the rule for test
 */
"use strict";
Template.rule_set.events({
  "click .agree": function () {
    step.set("quiz");
  }
});


Template.rule_set.rendered = function () {

  $(function () {

    $("#typed").typed({
      strings: [
        "There will be only few question to decide our future.",
        "You won't get any chance to replay any question more than one time.",
        "So select wisely and put your honest view.",
        "Based on your answers,i will speak out my thought.",
        "Everything happens automatically, so eveything here is pre determined.",
        "Good luck!!"],
      liPlace: $(".li_place"),
      typeSpeed: 100,
      arrayPos: 0,
      startDelay: 5000
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
        this.liPlace.prepend("<li class='animated slideInRight li_rule'><i class='fa-li fa fa-check-square'></i>" + li + "</li>");
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
