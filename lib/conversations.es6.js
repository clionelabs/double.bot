/**
 * @property {Object[]} messages Messages of the conversation
 * @property {Object} vars User variables of the conversation
 */
Conversations = new Meteor.Collection("conversations", {
  transform(doc) {
    return _.extend(doc, Conversation);
  }
});

Conversations.create = () => {
  let _id = Conversations.insert({messages: [], vars: {}});
  let conversation = Conversations.findOne(_id);
  let output = Bot.talk(_id, 'Hi'); // just trigger the first message
  conversation.addMessage(output, true);
  return _id;
}

Conversation = {
  addMessage(content, isBot) {
    let message = {
      content: content,
      isBot: isBot
    }
    Conversations.update(this._id, {$push: {messages: message}});
  },

  updateVars(vars) {
    Conversations.update(this._id, {$set: {vars: vars}});
  }
}
