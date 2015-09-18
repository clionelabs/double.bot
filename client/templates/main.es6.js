Template.dialog.helpers({
  messages() {
    let conversation = this.conversation;
    return conversation.messages;
  },

  messageInputData() {
    return {
      conversation: this.conversation
    }
  }
});

Template.dialogMessage.onRendered(function() {
  let $container = $("#messages-container");
  $container.scrollTop($container.prop("scrollHeight"));
});

Template.dialogMessage.helpers({
  messageTemplateName() {
    if (this.isBot) {
      return "dialogMessageBot";
    } else {
      return "dialogMessageUser";
    }
  },

  messageTemplateData() {
    return this;
  }
});

Template.dialogMessageInput.events({
  'click #message-form-submit': function(e) {
     e.preventDefault();
     e.stopPropagation();

     let conversationId = this.conversation._id;
     let content = $("#message-form-content").val();

     $("#message-form").addClass("loading");
     Meteor.call("talk", conversationId, content, (error, result) => {
       if (!error) {
         $("#message-form").removeClass("loading");
         $("#message-form-content").val("");
         $("#message-form-content").focus();
       } else {
         console.error("[Template.dialogMessageInput] error: ", error);
       }
     });
  }
});

Template.captures.helpers({
  vars() {
    let conversation = this.conversation;
    let keys = _.filter(_.keys(conversation.vars), function(key) {
      return key != '__history__';
      // return key.substring(0, 2) != '__';
    });
    return _.map(keys, function(key) {
      return {
        key: key,
        value: JSON.stringify(conversation.vars[key])
      }
    });
  }
});
