/**
 * Created by iamanam on 2/20/2016.
 */

Router.route("/", {
    self: this,
    action: function () {
            this.render("rain");
    },
    loadingTemplate: "loading"
});