if (Meteor.isClient) {


/////////////////////////////////////////----------------------------------------////////////////
    /*
     global helpers
     */

    Template.index.helpers({
        "step": ()=> {
            return step.get();
        }
    });
}