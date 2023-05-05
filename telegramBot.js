const TelegramBot = require('node-telegram-bot-api');
const { handleVoice: handleVoice } = require('./voice');

function startBot(token, webhookUrl) {

  console.log('Send you messages');
  // Create a new bot instance
  const bot = new TelegramBot(token, { polling: true });

  // Handle incoming messages
  bot.on('message', (msg) => {

    console.log('message received type: ');
    // Handle audio messages
    if (msg.voice) {
      handleVoice(bot, msg);
      return;
    }

    // Handle text messages
    if (msg.text) {
      const chatId = msg.chat.id;
      const messageText = msg.text;

      if (messageText.startsWith('/echo')) {
        const resp = messageText.substring(6);
        bot.sendMessage(chatId, resp);
        return;
      }

      bot.sendMessage(chatId, `You wrote: ${messageText}`);
      return;
    }

    // Handle other kinds of messages
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');
  });

  if (webhookUrl) {
    // Set up webhook if webhook URL is provided
    bot.setWebHook(webhookUrl)
      .then(() => {
        console.log(`Webhook set at ${webhookUrl}`);
      })
      .catch((err) => {
        console.error(`Error setting webhook: ${err}`);
      });
  }
}

module.exports = { startBot };