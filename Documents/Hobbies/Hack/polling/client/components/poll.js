// attach events to our poll template
Template.poll.events({

  // event to handle clicking a choice
  'click .vote': function(event) {

    // prevent the default behavior
    event.preventDefault();
    console.log("You clicked me!")
    // get the parent (poll) id
    var pollID = $('.poll').data('id');
    var voteID = $(event.currentTarget).data('id');

    console.log(pollID, voteID)

    // create the incrementing object so we can add to the corresponding vote
    var voteString = 'choices.' + voteID + '.votes';
    var action = {};
    action[voteString] = 1;

    // increment the number of votes for this choice
    Polls.update(
      { _id: pollID },
      { $inc: action }
    );

  }

});

Template.poll.helpers({
  'ifPuppy': function(index){
    if (index == 0)
      return true;
    else
      return false;
  }
})
