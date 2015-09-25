_bot = null;

Bot = {
  _bot: null,

  init() {
    let self = this;
    self._loadBot(() => {
      console.log("[Bot] done loading bot");
    });
  },

  talk(conversationId, input) {
    let self = this;
    let output = _bot.reply(conversationId, input);
    return output;
  },

  userVars(conversationId) {
    return _bot.getUservars(conversationId);
  },

  _loadBot(cb) {
    let self = this;
    let RiveScript = Meteor.npmRequire('rivescript');
    _bot = new RiveScript({debug: true, depth: 3});
    _bot.loadDirectory(self._botDirectory(), () => {
      _bot.sortReplies();
      cb();
    });
  },

  _botDirectory() {
    return process.env.PWD + '/private/bot';
  }
}
