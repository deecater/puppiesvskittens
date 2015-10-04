Template.body.helpers({

  polls: function() {
    return Polls.find({}, {limit: 1, sort:{createdAt: -1}}
    );
  }

});

// adds index to each item
UI.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index;
      return item;
    });
  }
});
