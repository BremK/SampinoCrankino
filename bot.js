/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection, ActivityType } = require('discord.js')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
})
const tokens ="MTIyNzkxNzg2ODE0MjY5MDMzNQ.Gb6td8.E5Yrp98oOrsRlApkGzW-dXDr3Qu0x5pcFfcj2E"

console.log(tokens)
// The ready event is vital, it means that your bot will only start reacting to information
// from Discord after ready is emitted

// Log our bot in


client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    // If the message is "ping"
    console.log("step 1")
    if (message.content === 'ping') {
        console.log("step 2")
        // Send "pong" in the same channel
        message.channel.send('pong');
    }
    console.log("step 3")
});

client.login(tokens);