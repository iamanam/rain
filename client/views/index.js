if (Meteor.isClient) {
    Template.index.helpers({
        "step": ()=> {
            return step.get();
        }
    });

    Template.index.rendered = function () {
        "use strict";
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
        };
        downloadImg.src = "/images/1.jpg";
    };
}
