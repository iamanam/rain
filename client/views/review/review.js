"use strict";
Template.review.rendered = function () {
  $("h2.tlt").textillate({
    initialDelay: 500,
    callback: function () {
      $(".match_info h1").show().addClass("animated flipInX")
        .next("#tv_ani").children(".percent_show").delay(2000).slideDown();
    }
  });
  var match = mark / (10 * answerSet.length) * 100 || 60;
  var tv = $("#tv_ani");
  var textTv = tv.children(".percent_show").children("p");
  var i = 0;

  function repeat() {
    Meteor.setTimeout(function () {
      tv.children(".percent_show").css("background-image", "none");
      // console.log(textTv);
      textTv.show().text(i + " %");
      i++;
      if (i <= match) {
        repeat();
        if (i === match) {
          $("button").delay(2000).slideDown();
        }
      }
    }, 100);
  }

  Meteor.setTimeout(()=> {
    repeat();
  }, 8000);
};
Template.review.events({
  "click button": function (e, t) {
    e.preventDefault();
    $(e.currentTarget).addClass("animated fadeOut").prevAll(".result-box").children().each(function (e) {
      console.log(this, e);
      $(this).addClass("animated flipOutX");
    });
    console.log(t);
  }
})
