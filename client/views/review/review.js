Template.review.helpers({
    getDetail(){
        return answerSet;
    },
    getQus: function (index) {
        return question[index]

    },
    markAchieved: function () {
        let sum = [];
        sum.allQ = 0;
        sum.countQ = mark.length;
        sum.possibleTotal = mark.length * 10;
        mark.forEach(function (num) {
            if (num !== NaN)
                sum.allQ += num;
        });
        console.log(sum);
        return sum;
    }

})