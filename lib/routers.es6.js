Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  action() {
    Meteor.call('newConversation', (error, result) => {
      if (!error) {
        let conversationId = result;
        Router.go('conversation', {_id: conversationId});
      } else {
        console.error("[Router] create conversation error: ", error);
      }
    });
    this.render("home");
  }
});

Router.route('conversation/:_id', {
  name: 'conversation',
  waitOn() {
    Meteor.subscribe('conversation', this.params._id);
  },
  data() {
    return {
      conversation: Conversations.findOne(this.params._id)
    }
  },
  action() {
    this.render('conversation');
  }
});
