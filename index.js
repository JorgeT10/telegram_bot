const TelegramBot = require('node-telegram-bot-api');

// Add your bot's token here
const token = '5835536667:AAHZuimf-vyWhKHSmCdW6W1QUCBHnpw5twI';

// Create a new bot instance
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    // Extract chat ID and message text from incoming message
    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    // Send a reply back to the user
    bot.sendMessage(chatId, `You wrote: ${messageText}`);
  });


  const webhookUrl = 'https://telegram-bot-385815.rj.r.appspot.com/bot' + token;
bot.setWebHook(webhookUrl)
  .then(() => {
    console.log(`Webhook set at ${webhookUrl}`);
  })
  .catch((err) => {
    console.error(`Error setting webhook: ${err}`);
  });