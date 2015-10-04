Template.pollForm.events({

  // handle the form submission
  'submit form': function(event) {

    // stop the form from submitting
    event.preventDefault();

    // get the data we need from the form
    //var newPoll = {
      //question: event.target.question.value,
    //   choices: [
    //     {  url: event.target.choice1.value, votes: 0 },
    //     {  url: event.target.choice2.value, votes: 0 }
    //   ], createdAt: new Date()
    // };
    //
    // // create the new poll
    // Polls.insert(newPoll);

    //Save images into database
    DogImages.insert({
      url: event.target.choice1.value,
      hasLost:false
    });

    CatImages.insert({
      url: event.target.choice2.value,
      hasLost:false
    });
    Questions.insert({
      text: event.target.question.value,
      used:false
    });
    console.log(event.target.question.value);

  },
  'click .newPollButton': function(event){
    event.preventDefault();
    console.log("You Clicked New Poll")
    var currPoll = Polls.findOne({}, {limit: 1, sort:{createdAt: -1}});
    var dogVotes = currPoll.choices[0].votes;
    var catVotes = currPoll.choices[1].votes;
    console.log(dogVotes, catVotes)
    var nextQuestion = Questions.findOne({
      used: false
    });
    if(nextQuestion == null){
      Meteor.call('clearQuestionUse', function(){
        nextQuestion = Questions.findOne({
          used: false
        });

        Questions.update({_id: nextQuestion._id},{
          used: true
        });
      });
    } else {
      Questions.update({_id: nextQuestion._id},{
        used: true
      });
    }

    if(dogVotes < catVotes){
      $('#woodchipperpuppy').fadeIn(1000);
      setTimeout(function(){
        $('#woodchipperpuppy').fadeOut(1000);

      newDog = DogImages.findOne({
        hasLost: false
      });
      if(newDog == null){
        Meteor.call('clearDogUse', function(){
          newDog = DogImages.findOne({
            hasLost: false
          });

          DogImages.update({_id: newDog._id},{
            hasLost: true
          });
        });
      } else {
        DogImages.update({_id: newDog._id},{
          hasLost: true
        });
      }

      console.log('hit')
      Polls.insert({
        question: nextQuestion.text,
        choices: [
          { url: newDog.url, votes: 0 },
          { url: currPoll.choices[1].url, votes: 0},
        ], createdAt: new Date()
      });

      }, 3000);
    }
    else if(dogVotes > catVotes){
      $('#woodchipperkitten').fadeIn(1000);
      setTimeout(function(){
        $('#woodchipperkitten').fadeOut(1000);

      newCat = CatImages.findOne({
        hasLost: false
      });
      if(newCat == null){
        Meteor.call('clearCatUse', function(){
          newCat = CatImages.findOne({
            hasLost: false
          });

          CatImages.update({_id: newCat._id},{
            hasLost: true
          });
        });
      } else {
        CatImages.update({_id: newCat._id},{
          hasLost: true
        });
      }

      console.log('hit')
      Polls.insert({
        question: nextQuestion.text,
        choices: [
          { url: currPoll.choices[0].url, votes: 0 },
          { url: newCat.url, votes: 0},
        ], createdAt: new Date()
      });
    }, 3000);



    }
    else{
      Polls.insert({
        question: 'Rematch!!!!',
        choices: [
          { url: currPoll.choices[0].url, votes: 0 },
          { url: currPoll.choices[1].url, votes: 0},
        ], createdAt: new Date()
      });

    }
  }

});
