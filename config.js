const prodConfig = {
    BOT_TOKEN: '5835536667:AAHZuimf-vyWhKHSmCdW6W1QUCBHnpw5twI',
    WEBHOOK_URL: 'https://telegram-bot-385815.rj.r.appspot.com/bot5835536667:AAHZuimf-vyWhKHSmCdW6W1QUCBHnpw5twI'
  };
  
  const devConfig = {
    BOT_TOKEN: '5835536667:AAHZuimf-vyWhKHSmCdW6W1QUCBHnpw5twI',
    WEBHOOK_URL: null // set to null to disable webhook in development
  }
  
  module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;