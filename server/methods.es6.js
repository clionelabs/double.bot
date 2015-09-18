Meteor.methods({
  // @param {String} userId Unique identifier for the user
  talk(conversationId, input) {
    let conversation = Conversations.findOne(conversationId);
    if (!conversation) {
      throw new Meteor.Error('conversation-not-found', '');
    }

    let output = Bot.talk(conversationId, input);
    conversation.addMessage(input, false);
    conversation.addMessage(output, true);
    conversation.updateVars(Bot.userVars(conversationId));

    return output;
  },

  newConversation() {
    let conversationId = Conversations.create();
    return conversationId;
  }
});
