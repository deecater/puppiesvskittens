Template.pollForm.events({

  // handle the form submission
  'submit form': function(event) {

    // stop the form from submitting
    event.preventDefault();

    // get the data we need from the form
    var newPoll = {
      question: event.target.question.value,
      choices: [
        {  url: event.target.choice1.value, votes: 0 },
        {  url: event.target.choice2.value, votes: 0 }
      ], createdAt: new Date()
    };

    // create the new poll
    Polls.insert(newPoll);
  }

});
