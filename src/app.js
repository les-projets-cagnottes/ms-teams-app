// Read botFilePath and botFileSecret from .env file.
require('dotenv').config()

const restify = require('restify');
const botbuilder = require('botbuilder');

const { TeamsStartNewThreadInChannel } = require('./bot');

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
var adapter = new botbuilder.BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
    channelAuthTenant: process.env.MICROSOFT_TENANT_ID
});

// Create the bot that will handle incoming messages.
const bot = new TeamsStartNewThreadInChannel();

// Create HTTP server.
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(process.env.port || process.env.PORT || 3333, function() {
    console.log(`\n${ server.name } listening to ${ server.url }`);
});

// Listen for incoming requests.
server.post('/api/messages', async (req, res) => {
    // Route received a request to adapter for processing
    await adapter.process(req, res, (context) => bot.run(context));
});

server.get('/api/proactive/user', async (req, res) => {
    await bot.proactiveUser(adapter);
    res.send("Message sent");
});

server.get('/api/proactive/channel', async (req, res) => {
    await bot.proactiveChannel(adapter);
    res.send("Message sent");
});
