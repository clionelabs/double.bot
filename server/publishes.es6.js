Meteor.publish("conversation", (conversationId) => {
  return Conversations.find({_id: conversationId});
});
