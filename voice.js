const speech = require("@google-cloud/speech");
const fs = require("fs");
const path = require("path");

// Load JSON credentials file
const keyFilename = path.join(__dirname, "./key.json");
const credentials = JSON.parse(fs.readFileSync(keyFilename));

// Create Speech-to-Text client with credentials
const speechClient = new speech.SpeechClient({ credentials });

function handleVoiceMessage(bot, msg) {  

  const chatId = msg.chat.id;
  const voice = msg.voice;
  console.log(
    `Received voice message with ID ${voice.file_id} from user ${chatId}`
  );

  // Download voice file to local disk
  bot
    .downloadFile(voice.file_id, __dirname)
    .then((filePath) => {
      // Transcribe voice file
      const audioBytes = fs.readFileSync(filePath);      

      const audioConfig = {
        encoding: "OGG_OPUS",
        sampleRateHertz: 48000,
        languageCode: "es-LA",
      };
      const request = {
        audio: {
          content: audioBytes,
        },
        config: audioConfig,
      };

      speechClient
        .recognize(request)
        .then((response) => {
          console.log(
            `Speech-to-Text API response: ${JSON.stringify(response)}`
          );
          const results =
            response && response.length > 0 ? response[0].results : [];
          return results;
        })
        .then((results) => {
          const transcription = results
            .map(
              (result) =>
                `Resultado: ${
                  result.alternatives[0].transcript
                },Nivel de Acierto: ${
                  result.alternatives[0].confidence.toFixed(2) * 100
                }%`
            )
            .join("\n\n");
          console.log(transcription);
          // Send transcription back to user
          bot.sendMessage(chatId, transcription);
        })
        .catch((err) => {
          console.error(`Error transcribing voice: ${err}`);
          bot.sendMessage(chatId, "Error transcribing voice");
        });
    })
    .catch((err) => {
      console.error(`Error downloading voice: ${err}`);
      bot.sendMessage(chatId, "Error downloading voice");
    });
}

module.exports = { handleVoice: handleVoiceMessage };
