Meteor.methods({
  'clearQuestionUse': function(){
    Questions.update({used: true},{
      used: false
    });
  }, 'clearDogUse': function(){
    DogImages.update({hasLost: true},{
      hasLost: false
    });
  }, 'clearCatUse': function(){
    CatImages.update({hasLost: true},{
      hasLost: false
    });
  }
})
