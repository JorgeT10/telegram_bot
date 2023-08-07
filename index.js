const { startBot } = require('./telegramBot');
const { BOT_TOKEN, WEBHOOK_URL } = require('./config');

console.log('Starting the bot...');

startBot(BOT_TOKEN, WEBHOOK_URL);