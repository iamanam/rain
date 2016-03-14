"use strict";
Template.review.rendered = function () {
  $("h2.tlt").textillate({
    initialDelay: 500,
    callback: function () {
      $(".match_info h1").show().addClass("animated flipInX")
        .next("span").delay(2000).slideDown();
    }
  });
  var match = mark / (10 * answerSet.length) * 100;
  var tv = $(".tv");
  var textTv = tv.children();
  var i = 0;

  function repeat() {
    Meteor.setTimeout(function () {
      textTv.show().text(i + " %");
      i++;
      if (i <= match) {
        repeat();
        if (i === match) {
          $("button").delay(2000).slideDown();
        }
      }
    }, 150);
  }

  Meteor.setTimeout(()=> {
    tv.css("background-image", "none");
    repeat();
  }, 8000);
};
