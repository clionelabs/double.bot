Meteor.methods({
  // @param {String} userId Unique identifier for the user
  talk(conversationId, input) {
    let conversation = Conversations.findOne(conversationId);
    if (!conversation) {
      throw new Meteor.Error('conversation-not-found', '');
    }

    let output = Bot.talk(conversationId, input);
    conversation.addMessage(input, false);

    Meteor.setTimeout(() => {
      conversation.addMessage(output, true);
      conversation.updateVars(Bot.userVars(conversationId));
    }, 1000);

    return output;
  },

  newConversation() {
    let conversationId = Conversations.create();
    return conversationId;
  }
});
