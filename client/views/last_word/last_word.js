/**
 * Created by iamanam on 4/16/2016.
 */

Template.last_word.helpers({
  "match": function () {
    "use strict";
    if (mark) {
      var match = mark / (10 * answerSet.length) * 100 || 60;
      return match;
    }
    return 80;
  }
});

Template.last_word.rendered = function () {
  "use strict";
};
