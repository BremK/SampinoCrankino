require("dotenv").config()
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require("ytdl-core")
const { Client, GatewayIntentBits, Partials } = require("discord.js")
const axios = require("axios")
const prefix = process.env.PREFIX
const API_KEY = process.env.YOUTUBE_API_KEY
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
// The ready event is vital, it means that your bot will only start reacting to information
// from Discord after ready is emitted

// counting amount of images
let counter = 0

//https://api.imgflip.com/get_memes --> get

client.on("messageCreate", async (msg) => {
  // not start with prefix -> return early
  if (!msg.content.startsWith(prefix)) return

  // remove prefix to get command name
  const commandName = msg.content.slice(prefix.length)

  // check for command name directly

  //meme command
  if (commandName === "meme") {
    const response = await axios.get("https://api.imgflip.com/get_memes")
    const randomNumber = Math.floor(
      Math.random() * response.data.data.memes.length
    )
    const meme = response.data.data.memes[randomNumber].url
    counter++

    msg.channel.send(
      ` ${msg.author} requested a meme! :smirk: → ` +
        meme +
        "  Amount of memes: " +
        counter
    )
    // test command
  } else if (msg.content.startsWith(".test ")) {
    // Extract the input from the message
    const userInput = msg.content.slice(".test".length).trim()
    console.log(userInput.length)

    // Now you have the userInput, you can do whatever you want with it
    // For example, reply to the user
    msg.channel.send(`You entered: ${userInput}`)
    //youtube functionality
  } else if (msg.content.startsWith(".yt")) {

    const userInput = msg.content.slice(".yt".length).trim()

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${userInput}+videos&part=snippet&type=video&maxResults=1&key=${API_KEY}`
    )


    const videoId = response.data.items[0].id.videoId

    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
        msg.channel.send('You must be in a voice channel to play music!')
    }

    const channelId = '1227919271628242948'

    const connection = joinVoiceChannel(
        {
            channelId: msg.member.voice.channelId,
            guildId: msg.guild.id,
            adapterCreator: msg.guild.voiceAdapterCreator
        });

    msg.channel.send(`https://www.youtube.com/watch?v=${videoId}`)

  } else {
    return
  }
})

client.on("ready", () => {
  console.log("I am ready!")
})

client.login(tokens)
