/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require("discord.js")
const axios = require("axios");
const prefix = process.env.PREFIX
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction,
    ],
})

const tokens = process.env.TOKEN

console.log(tokens)
// The ready event is vital, it means that your bot will only start reacting to information
// from Discord after ready is emitted

// counting amount of images
let counter= 0

//https://api.imgflip.com/get_memes --> get

 client.on('messageCreate', async msg => {
    // not start with prefix -> return early
    if (!msg.content.startsWith(prefix)) return;

    // remove prefix to get command name
    const commandName = msg.content.slice(prefix.length);

    // check for command name directly
    if (commandName === 'meme') {
        const response = await axios.get('https://api.imgflip.com/get_memes')
        const randomNumber = Math.floor(Math.random() * response.data.data.memes.length);
        const meme =  response.data.data.memes[randomNumber].url
            counter++

        msg.channel.send(` ${msg.author} requested a meme! :smirk: → ` + meme + "  Amount of memes: " +  counter)
    }

    else{
        return
    }
})


client.on("ready", () => {
    console.log("I am ready!")
})

function execute(message, args) {
    // Check if arguments are provided
    if (!args.length) {
        return message.channel.send('You need to provide some text to repeat!');
    }

    // Join the arguments into a single string
    const text = args.join(' ');

    // Send the repeated text to the channel
    message.channel.send(text);
}
client.login(tokens)