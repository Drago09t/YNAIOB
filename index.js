const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const logs = require('discord-logs');
const { DisTube } = require("distube");
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');

const { handleLogs } = require('./Handlers/handleLogs');
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
const { loadModals } = require("./Handlers/modalHandler");
const { loadButtons } = require("./Handlers/buttonHandler");
const { LoadErrorHandler } = require("./Handlers/ErrorHandler");




const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

logs(client, {
  debug: true
});
/*process.on("unhandledRejection", (reason, p) => {
  const ChannelID = "1091125319081148498";
  console.error("Unhandled promise rejection:", reason, p);
  const Embed = new EmbedBuilder()
    .setColor("Random")
    .setTimestamp()
    .setFooter({ text: "⚠️Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
      ),
    ],
  });
});*/
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true, // you can change this to your needs
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()]
});
client.config = require("./config.json");
client.giveawayConfig = require("./config.js");
client.commands = new Collection();
client.modals = new Collection();
client.buttons = new Collection();
client.errors = new Collection();

['giveawaysEventsHandler', 'giveawaysManager'].forEach((x) => {
  require(`./Utils/${x}`)(client);
})

module.exports = client;

client.login(process.env.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});
//keep-alive//
const express = require('express');
const app = express();
const port = 3000 || 8080;

app.all('/', (req, res) => {
  // res.setHeader('Content-Type', 'text/html');
  res.send(`24/7 KeepAlive Server is online!`);
  res.end();
});
